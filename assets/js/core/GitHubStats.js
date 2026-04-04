export class GitHubStats {
    constructor() {
        this.cacheKey = 'gh_stats_cache';
        this.cacheTTL = 10 * 60 * 1000; // 10 minutes
    }

    async getStats() {
        const cached = sessionStorage.getItem(this.cacheKey);
        if (cached) {
            const data = JSON.parse(cached);
            if (Date.now() - data.timestamp < this.cacheTTL) {
                return data.stats;
            }
        }

        try {
            const [userRes, reposRes, eventsRes] = await Promise.all([
                fetch('https://api.github.com/users/Mathiyass').then(r => r.json()),
                fetch('https://api.github.com/users/Mathiyass/repos?per_page=100').then(r => r.json()),
                fetch('https://api.github.com/users/Mathiyass/events').then(r => r.json())
            ]);

            let totalStars = 0;
            const langs = {};
            let mostActiveRepo = null;
            let maxPushes = 0;

            if(Array.isArray(reposRes)) {
                 for (const repo of reposRes) {
                     totalStars += repo.stargazers_count;
                     if (repo.language) langs[repo.language] = (langs[repo.language] || 0) + 1;
                 }
            }

            if(Array.isArray(eventsRes)) {
                const repoPushes = {};
                for (const event of eventsRes) {
                    if (event.type === 'PushEvent') {
                        repoPushes[event.repo.name] = (repoPushes[event.repo.name] || 0) + 1;
                        if (repoPushes[event.repo.name] > maxPushes) {
                            maxPushes = repoPushes[event.repo.name];
                            mostActiveRepo = event.repo.name;
                        }
                    }
                }
            }

            const stats = {
                followers: userRes.followers || 0,
                publicRepos: userRes.public_repos || 0,
                avatarUrl: userRes.avatar_url,
                totalStars: totalStars,
                topLanguages: Object.entries(langs).sort((a,b) => b[1]-a[1]).slice(0,3).map(e => e[0]),
                mostActiveRepo: mostActiveRepo,
                lastCommitAge: eventsRes && eventsRes.length > 0 ? (Date.now() - new Date(eventsRes[0].created_at).getTime()) / (1000 * 60 * 60) : 0
            };

            sessionStorage.setItem(this.cacheKey, JSON.stringify({ timestamp: Date.now(), stats }));
            return stats;

        } catch (e) {
            console.error("Failed to fetch GitHub stats:", e);
            // Fallback mock data
            return {
                followers: 42,
                publicRepos: 18,
                avatarUrl: '',
                totalStars: 120,
                topLanguages: ['Kotlin', 'JavaScript', 'HTML'],
                mostActiveRepo: 'Mathiyass/MAportfolio',
                lastCommitAge: 2
            };
        }
    }
}

export class GitHubStats {
  constructor(username = 'Mathiyass') {
    this.username = username;
    this.cacheKey = 'gh_stats_cache';
    this.ttl = 10 * 60 * 1000; // 10 minutes
  }

  async getStats() {
    const cached = this._getCache();
    if (cached) return cached;

    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(\`https://api.github.com/users/\${this.username}\`),
        fetch(\`https://api.github.com/users/\${this.username}/repos?per_page=100\`)
      ]);

      if (!userRes.ok || !reposRes.ok) throw new Error('GitHub API Error');

      const user = await userRes.json();
      const repos = await reposRes.json();

      let totalStars = 0;
      const langs = {};
      let mostActiveRepo = null;
      let lastPush = 0;

      repos.forEach(repo => {
        totalStars += repo.stargazers_count;
        
        if (repo.language) {
          langs[repo.language] = (langs[repo.language] || 0) + 1;
        }

        const pushTime = new Date(repo.pushed_at).getTime();
        if (pushTime > lastPush) {
          lastPush = pushTime;
          mostActiveRepo = repo;
        }
      });

      const topLanguages = Object.entries(langs)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3)
        .map(entry => entry[0]);

      const stats = {
        followers: user.followers,
        publicRepos: user.public_repos,
        totalStars,
        avatarUrl: user.avatar_url,
        topLanguages,
        mostActiveRepo: mostActiveRepo ? mostActiveRepo.name : null,
        lastCommitAge: Date.now() - lastPush
      };

      this._setCache(stats);
      return stats;
    } catch (e) {
      console.warn('GitHub Stats failed:', e);
      // Fallback defaults
      return {
        followers: 0,
        publicRepos: 0,
        totalStars: 0,
        avatarUrl: '',
        topLanguages: [],
        mostActiveRepo: null,
        lastCommitAge: 0
      };
    }
  }

  _getCache() {
    try {
      const item = localStorage.getItem(this.cacheKey);
      if (!item) return null;
      const data = JSON.parse(item);
      if (Date.now() > data.expiry) {
        localStorage.removeItem(this.cacheKey);
        return null;
      }
      return data.value;
    } catch (e) {
      return null;
    }
  }

  _setCache(value) {
    try {
      const data = {
        value,
        expiry: Date.now() + this.ttl
      };
      localStorage.setItem(this.cacheKey, JSON.stringify(data));
    } catch (e) {}
  }
}


// GitHubStats.js
export class GitHubStats {
  constructor(username) {
    this.username = username;
  }

  async getStats() {
    const cached = sessionStorage.getItem('github_stats');
    if (cached) {
      const { timestamp, data } = JSON.parse(cached);
      if (Date.now() - timestamp < 600000) return data;
    }

    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(\`https://api.github.com/users/\${this.username}\`),
        fetch(\`https://api.github.com/users/\${this.username}/repos?per_page=100\`)
      ]);

      if (!userRes.ok || !reposRes.ok) throw new Error('API Error');

      const user = await userRes.json();
      const repos = await reposRes.json();

      let stars = 0;
      repos.forEach(repo => stars += repo.stargazers_count);

      const stats = {
        repos: user.public_repos,
        stars: stars,
        followers: user.followers
      };

      sessionStorage.setItem('github_stats', JSON.stringify({
        timestamp: Date.now(),
        data: stats
      }));

      return stats;
    } catch (e) {
      console.warn("Failed to fetch GitHub stats", e);
      return { repos: 24, stars: 147, followers: 12 }; // Fallback values
    }
  }
}

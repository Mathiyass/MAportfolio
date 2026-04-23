import { NextResponse } from 'next/server';

export const revalidate = 3600; // Cache for 1 hour

interface GitHubRepo {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
}

export async function GET() {
  try {
    const username = 'Mathiyass';
    const response = await fetch(`https://api.github.com/users/${username}`);
    
    if (!response.ok) {
      throw new Error(`GitHub API responded with ${response.status}`);
    }
    
    const data = await response.json();
    
    // Also fetch pinned repos or recent repos if needed
    const reposResponse = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=5`);
    const repos: GitHubRepo[] = reposResponse.ok ? await reposResponse.json() : [];

    return NextResponse.json({
      followers: data.followers,
      publicRepos: data.public_repos,
      latestRepos: repos.map((repo) => ({
        name: repo.name,
        description: repo.description,
        url: repo.html_url,
        stars: repo.stargazers_count,
        language: repo.language
      }))
    });
  } catch (error) {
    console.error('Error fetching GitHub stats:', error);
    return NextResponse.json({ error: 'Failed to fetch GitHub stats' }, { status: 500 });
  }
}

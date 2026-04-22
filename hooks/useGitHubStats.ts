'use client';
import useSWR from 'swr';

interface GitHubStats {
  repos: number;
  stars: number;
  followers: number;
  events: Array<{ type: string; created_at: string; repo: { name: string } }>;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useGitHubStats() {
  const { data, error, isLoading } = useSWR<GitHubStats>('/api/github', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshInterval: 3600000,
    dedupingInterval: 3600000,
  });

  return {
    stats: data ?? { repos: 0, stars: 0, followers: 0, events: [] },
    isLoading,
    error,
  };
}

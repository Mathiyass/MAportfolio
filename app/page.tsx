import { Suspense } from 'react';
import { HeroSection } from '@/components/sections/home/HeroSection';
import { StatsBar } from '@/components/sections/home/StatsBar';
import { FeaturedWork } from '@/components/sections/home/FeaturedWork';
import { Teasers } from '@/components/sections/home/Teasers';
import { PageWrapper } from '@/components/layout/PageWrapper';

async function getGitHubStats() {
  const [userRes, reposRes] = await Promise.all([
    fetch('https://api.github.com/users/Mathiyass', { next: { revalidate: 3600 } }),
    fetch('https://api.github.com/users/Mathiyass/repos?per_page=100', { next: { revalidate: 3600 } })
  ]);
  
  if (!userRes.ok || !reposRes.ok) {
    return { repos: 0, stars: 0, followers: 0 };
  }
  
  const user = await userRes.json();
  const repos = await reposRes.json();
  
  const stars = repos.reduce((sum: number, repo: { stargazers_count: number }) => sum + repo.stargazers_count, 0);
  
  return {
    repos: user.public_repos,
    stars,
    followers: user.followers
  };
}

export default async function HomePage() {
  const stats = await getGitHubStats();
  
  return (
    <PageWrapper>
      <div className="flex flex-col gap-12 pb-24">
        <HeroSection />
        <Suspense fallback={<div>Loading stats...</div>}>
          <StatsBar stats={stats} />
        </Suspense>
        <Suspense fallback={<div>Loading featured work...</div>}>
          <FeaturedWork />
        </Suspense>
        <Teasers />
      </div>
    </PageWrapper>
  );
}

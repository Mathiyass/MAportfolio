import { Suspense } from 'react';
import { HeroSection } from '@/components/sections/home/HeroSection';
import { StatsBar } from '@/components/sections/home/StatsBar';
import { SystemTerminal } from '@/components/sections/home/SystemTerminal';
import { FeaturedWork } from '@/components/sections/home/FeaturedWork';
import { NetworkHub } from '@/components/sections/home/NetworkHub';
import { DigitalEcosystem } from '@/components/sections/home/DigitalEcosystem';
import { Teasers } from '@/components/sections/home/Teasers';
import { PageWrapper } from '@/components/layout/PageWrapper';
import { ThreeScene } from '@/components/three/Scene';
import { NoiseFieldShader } from '@/components/three/NoiseFieldShader';
import { HexGridShader } from '@/components/three/HexGridShader';

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
      {/* WebGL Background Layer */}
      <ThreeScene className="fixed inset-0 -z-10">
        <NoiseFieldShader opacity={0.18} />
        <HexGridShader opacity={0.12} />
      </ThreeScene>

      <div className="flex flex-col gap-12 pb-24 relative z-10">
        <HeroSection />
        <Suspense fallback={<div>Loading stats...</div>}>
          <StatsBar stats={stats} />
        </Suspense>
        <SystemTerminal />
        <NetworkHub />
        <Suspense fallback={<div>Loading featured work...</div>}>
          <FeaturedWork />
        </Suspense>
        <DigitalEcosystem />
        <Teasers />
      </div>
    </PageWrapper>
  );
}


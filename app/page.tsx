import HomeClient from "@/components/HomeClient";
import { fetchRepoStats } from "@/lib/repoStats";

// Static page, re-rendered at most every 6 hours to refresh repo stats (ISR).
export const revalidate = 21600;

export default async function Page() {
  const repoStats = await fetchRepoStats();
  return <HomeClient repoStats={repoStats} />;
}

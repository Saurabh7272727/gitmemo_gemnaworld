import { useEffect } from "react";
import { useGithubProfile } from "../hooks/useGithubRepo.jsx";
import ProfileCard from "../components/ProfileCard.jsx";
import StatsBar from "../components/StatsBar.jsx";
import RepoCard from "../components/RepoCard.jsx";

export default function GithubDashboard() {
    const { data, isLoading, isError } = useGithubProfile();

    useEffect(() => {
        if (!localStorage.getItem("installation_id")) {
            if (data?.repoData?.installationId) {
                localStorage.setItem("installation_id", data?.repoData?.installationId);
            }
            if (data?.repoData?.user?.githubId) {
                localStorage.setItem('ownerId', data?.repoData?.user?.githubId);
            }
        }
    }, [data]);

    if (isLoading) {
        return <div className="panel text-center">Loading GitHub workspace...</div>;
    }

    if (isError) {
        return <div className="panel text-center text-rose-600">Error loading profile</div>;
    }

    return (
        <div className="space-y-8">
            <ProfileCard profile={data?.repoData?.user || undefined} />
            {data.repoData.repo.length > 0 && <StatsBar repos={data.repoData.repo} />}

            <div className="flex flex-col gap-2">
                <p className="eyebrow">Repositories</p>
                <h2 className="text-3xl font-bold text-slate-900">Your connected GitHub inventory</h2>
                <p className="muted-copy">See which repositories are already available through the GitHub App connection.</p>
            </div>

            {!(data.repoData.repo.length > 0) && (
                <div className="panel text-slate-500">
                    No repositories were found for this installation yet.
                </div>
            )}

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {data.repoData.repo.length > 0 && data.repoData.repo.map((repo) => (
                    <RepoCard key={repo.id} repo={repo} />
                ))}
            </div>
        </div>
    );
}

import { useGithubProfile } from "../hooks/useGithubRepo.jsx";
import ProfileCard from "../components/ProfileCard.jsx";
import StatsBar from "../components/StatsBar.jsx";
import RepoCard from "../components/RepoCard.jsx";
import { useEffect } from "react";

export default function GithubDashboard() {
    const { data, isLoading, isError } = useGithubProfile();


    useEffect(() => {
        if (!localStorage.getItem("installation_id")) {
            if (data?.repoData?.installationId)
                localStorage.setItem("installation_id", data?.repoData?.installationId);
            if (data?.repoData?.user?.githubId) {
                localStorage.setItem('ownerId', data?.repoData?.user?.githubId)
            }
        }

        console.log(data?.repoData?.user?.githubId);
    }, [isLoading]);

    if (isLoading)
        return <div className="text-center mt-20 text-white h-full w-full">Loading...</div>;

    if (isError)
        return <div className="text-center mt-20 text-red-500 h-full w-full">Error loading profile</div>;

    return (
        <div className="h-full w-full bg-black text-white p-8 overflow-y-scroll">

            <ProfileCard profile={data?.repoData?.user || undefined} />
            {data.repoData.repo.length > 0 && <StatsBar repos={data.repoData.repo} />}

            <h2 className="text-2xl font-bold mt-10 mb-5">
                Your Repositories
            </h2>

            {
                !(data.repoData.repo.length > 0) && <h2 className="text-2xl w-full font-bold mt-10 mb-5">
                    No any Repositories
                </h2>
            }

            <div className="grid md:grid-cols-3 gap-6">
                {data.repoData.repo.length > 0 && data.repoData.repo.map(repo => (
                    <RepoCard key={repo.id} repo={repo} />
                ))}
            </div>
        </div>
    );
}
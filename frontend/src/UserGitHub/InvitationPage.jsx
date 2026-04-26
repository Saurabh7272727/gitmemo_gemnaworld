import React from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '../api/httpClient.js';

const RepoCard = ({ repo }) => {
    return (
        <div className="panel transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(15,23,42,0.14)]">
            <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-bold text-slate-900">{repo.name}</h2>
                <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${repo.private
                        ? "bg-rose-100 text-rose-700"
                        : "bg-emerald-100 text-emerald-700"
                        }`}
                >
                    {repo.private ? "Private" : "Public"}
                </span>
            </div>

            <p className="mb-4 text-sm text-slate-600">
                {repo.description || "No description provided."}
            </p>

            <div className="mb-4 space-y-1 text-xs text-slate-500">
                <p>Owner ID: <span className="font-medium text-slate-700">{repo.owner}</span></p>
                <p>Created: <span className="text-slate-700">{new Date(repo.createdAt).toLocaleString()}</span></p>
                <p>Updated: <span className="text-slate-700">{new Date(repo.updatedAt).toLocaleString()}</span></p>
            </div>

            <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full"
            >
                View on GitHub
            </a>
        </div>
    );
};

const InvitationPage = () => {
    const ownerId = localStorage.getItem('ownerId');

    if (!ownerId) {
        return (
            <div className='panel text-center'>
                Owner ID is missing
            </div>
        );
    }

    const fetchCreatedRepo = async () => {
        const response = await api.get(`/githubapp/access/created/repo/${ownerId}`);
        return response.data;
    };

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ['createdRepos', ownerId],
        queryFn: fetchCreatedRepo,
        enabled: Boolean(ownerId),
        retry: 2,
        staleTime: 60 * 1000,
    });

    if (isLoading) {
        return (
            <div className='panel text-center'>
                Loading...
            </div>
        );
    }

    if (isError) {
        return (
            <div className='panel text-center text-rose-600'>
                {error?.message || 'Unable to fetch repositories.'}
            </div>
        );
    }

    const repos = data?.findAllCreatedRepo || [];

    return (
        <div className='space-y-6'>
            <div>
                <p className='eyebrow'>Created repositories</p>
                <h1 className='mt-2 text-3xl font-bold text-slate-900'>Repos you launched from GitMemo</h1>
                <p className='muted-copy mt-2'>Track your generated repositories and jump back into GitHub when you need to continue building.</p>
            </div>
            {repos.length > 0 ? (
                <div className='grid gap-6 md:grid-cols-2 xl:grid-cols-3'>
                    {repos.map((repo) => (
                        <RepoCard key={repo._id} repo={repo} />
                    ))}
                </div>
            ) : (
                <div className='panel p-6'>
                    <h1 className='text-slate-900'>No repositories created yet.</h1>
                </div>
            )}
        </div>
    );
};

export default InvitationPage

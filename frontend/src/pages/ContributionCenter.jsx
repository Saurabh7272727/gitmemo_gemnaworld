import React, { useMemo, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import api from '../api/httpClient.js';

const createContributionUrl = (projectId, userId) => {
    const params = new URLSearchParams();
    if (projectId) params.set('projectId', projectId);
    if (userId) params.set('userId', userId);
    const queryString = params.toString();
    return queryString ? `/contributions?${queryString}` : '/contributions';
};

const ContributionCenter = () => {
    const [searchParams] = useSearchParams();
    const currentUserId = localStorage.getItem('userId') || '';
    const [filters, setFilters] = useState({
        projectId: searchParams.get('projectId') || '',
        userId: searchParams.get('userId') || currentUserId,
    });
    const [form, setForm] = useState({
        projectId: searchParams.get('projectId') || '',
        taskId: '',
        type: 'manual',
        description: '',
        proof: '',
    });

    const contributionsUrl = useMemo(
        () => createContributionUrl(filters.projectId, filters.userId),
        [filters.projectId, filters.userId]
    );

    const { data: contributions = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['contributions', filters.projectId, filters.userId],
        queryFn: async () => {
            const response = await api.get(contributionsUrl);
            return response.data;
        },
        staleTime: 60 * 1000,
        retry: 2,
    });

    const logContributionMutation = useMutation({
        mutationFn: async (payload) => {
            const response = await api.post('/contributions', payload);
            return response.data;
        },
        onSuccess: () => {
            setForm((previous) => ({
                ...previous,
                taskId: '',
                type: 'manual',
                description: '',
                proof: '',
            }));
            refetch();
        },
    });

    const handleLogContribution = (event) => {
        event.preventDefault();
        logContributionMutation.mutate({
            projectId: form.projectId,
            taskId: form.taskId || undefined,
            type: form.type,
            description: form.description,
            proof: form.proof || undefined,
        });
    };

    return (
        <div className="space-y-8">
            <div className="hero-panel p-8 text-white">
                <p className="eyebrow">Contribution center</p>
                <h1 className="mt-3 text-4xl font-bold">Capture the work that proves you actually built something.</h1>
                <p className="muted-copy-dark mt-4 max-w-3xl">
                    Log meaningful delivery, connect it to tasks and projects, and keep a visible contribution record for your team and future profile.
                </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                <div className="space-y-6">
                    <form onSubmit={handleLogContribution} className="panel space-y-4">
                        <div>
                            <p className="eyebrow">Log work</p>
                            <h2 className="mt-2 text-3xl font-bold text-slate-900">Record a new contribution</h2>
                        </div>
                        <input
                            type="text"
                            placeholder="Project ID"
                            value={form.projectId}
                            onChange={(event) => setForm({ ...form, projectId: event.target.value })}
                            className="input-surface"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Task ID, optional"
                            value={form.taskId}
                            onChange={(event) => setForm({ ...form, taskId: event.target.value })}
                            className="input-surface"
                        />
                        <select
                            value={form.type}
                            onChange={(event) => setForm({ ...form, type: event.target.value })}
                            className="input-surface"
                        >
                            <option value="manual">Manual</option>
                            <option value="commit">Commit</option>
                            <option value="review">Review</option>
                        </select>
                        <textarea
                            placeholder="Describe the contribution"
                            value={form.description}
                            onChange={(event) => setForm({ ...form, description: event.target.value })}
                            className="input-surface"
                            rows="5"
                            required
                        />
                        <input
                            type="url"
                            placeholder="Proof URL, optional"
                            value={form.proof}
                            onChange={(event) => setForm({ ...form, proof: event.target.value })}
                            className="input-surface"
                        />
                        <button type="submit" disabled={logContributionMutation.isPending} className="btn-primary w-full">
                            {logContributionMutation.isPending ? 'Saving...' : 'Log Contribution'}
                        </button>
                        {logContributionMutation.isError && (
                            <p className="text-sm text-rose-600">
                                {logContributionMutation.error?.response?.data?.message || 'Unable to log contribution.'}
                            </p>
                        )}
                    </form>

                    <div className="panel space-y-4">
                        <div>
                            <p className="eyebrow">Filters</p>
                            <h2 className="mt-2 text-2xl font-bold text-slate-900">Refine the feed</h2>
                        </div>
                        <input
                            type="text"
                            placeholder="Project ID"
                            value={filters.projectId}
                            onChange={(event) => setFilters({ ...filters, projectId: event.target.value })}
                            className="input-surface"
                        />
                        <input
                            type="text"
                            placeholder="User ID"
                            value={filters.userId}
                            onChange={(event) => setFilters({ ...filters, userId: event.target.value })}
                            className="input-surface"
                        />
                        <div className="flex flex-wrap gap-3">
                            <button type="button" onClick={() => setFilters({ projectId: '', userId: currentUserId })} className="btn-ghost">
                                My Contributions
                            </button>
                            <button type="button" onClick={() => setFilters({ projectId: '', userId: '' })} className="btn-ghost">
                                All Contributions
                            </button>
                        </div>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <p className="eyebrow">Feed</p>
                        <h2 className="mt-2 text-3xl font-bold text-slate-900">Contribution history</h2>
                    </div>
                    {isLoading && <div className="panel">Loading contributions...</div>}
                    {isError && <div className="panel text-rose-600">Unable to load contributions.</div>}
                    {!isLoading && !isError && contributions.length === 0 && (
                        <div className="panel text-slate-500">No contributions found for the current filters.</div>
                    )}
                    <div className="grid gap-4">
                        {contributions.map((contribution) => (
                            <div key={contribution._id} className="panel">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <h3 className="text-2xl font-semibold text-slate-900">
                                        {contribution.project?.title || contribution.project}
                                    </h3>
                                    <span className="status-pill bg-slate-100 text-slate-700">{contribution.type}</span>
                                </div>
                                <p className="mt-3 text-sm leading-6 text-slate-600">{contribution.description}</p>
                                <div className="mt-4 grid gap-3 md:grid-cols-3">
                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                                        User <span className="ml-2 font-semibold text-slate-900">{contribution.user?.username || contribution.user?.email || contribution.user}</span>
                                    </div>
                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                                        Task <span className="ml-2 font-semibold text-slate-900">{contribution.task?.title || contribution.task || 'Not linked'}</span>
                                    </div>
                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                                        Date <span className="ml-2 font-semibold text-slate-900">{new Date(contribution.createdAt || contribution.date).toLocaleString()}</span>
                                    </div>
                                </div>
                                {contribution.proof && (
                                    <a href={contribution.proof} target="_blank" rel="noreferrer" className="mt-4 inline-flex font-semibold text-teal-700 underline underline-offset-4">
                                        View proof
                                    </a>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContributionCenter;

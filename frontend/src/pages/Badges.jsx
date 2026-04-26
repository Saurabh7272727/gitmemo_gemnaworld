import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import api from '../api/httpClient.js';

const Badges = () => {
    const { userId: routeUserId } = useParams();
    const resolvedUserId = routeUserId || localStorage.getItem('userId') || '';
    const [form, setForm] = useState({
        userId: resolvedUserId,
        projectId: '',
        type: 'contribution',
        title: '',
        description: '',
    });

    const fetchBadges = async () => {
        const response = await api.get(`/badges/${resolvedUserId}`);
        return response.data;
    };

    const { data: badges = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['badges', resolvedUserId],
        queryFn: fetchBadges,
        enabled: Boolean(resolvedUserId),
        staleTime: 2 * 60 * 1000,
        retry: 2,
    });

    const awardBadgeMutation = useMutation({
        mutationFn: async (payload) => {
            const response = await api.post('/badges', payload);
            return response.data;
        },
        onSuccess: () => {
            setForm({
                userId: resolvedUserId,
                projectId: '',
                type: 'contribution',
                title: '',
                description: '',
            });
            refetch();
        },
    });

    if (isLoading) return <div className="panel">Loading badges...</div>;
    if (isError) return <div className="panel text-rose-600">Unable to load badges.</div>;

    return (
        <div className="space-y-8">
            <div className="hero-panel p-8 text-white">
                <p className="eyebrow">Badges</p>
                <h1 className="mt-3 text-4xl font-bold">Turn finished work into visible recognition.</h1>
                <p className="muted-copy-dark mt-4 max-w-3xl">
                    View earned badges or award a new one to mark contribution, completion, or leadership.
                </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        awardBadgeMutation.mutate(form);
                    }}
                    className="panel space-y-4"
                >
                    <div>
                        <p className="eyebrow">Award badge</p>
                        <h2 className="mt-2 text-3xl font-bold text-slate-900">Create a recognition record</h2>
                    </div>
                    <input
                        type="text"
                        placeholder="User ID"
                        value={form.userId}
                        onChange={(event) => setForm({ ...form, userId: event.target.value })}
                        className="input-surface"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Project ID"
                        value={form.projectId}
                        onChange={(event) => setForm({ ...form, projectId: event.target.value })}
                        className="input-surface"
                        required
                    />
                    <select
                        value={form.type}
                        onChange={(event) => setForm({ ...form, type: event.target.value })}
                        className="input-surface"
                    >
                        <option value="completion">Completion</option>
                        <option value="leadership">Leadership</option>
                        <option value="contribution">Contribution</option>
                    </select>
                    <input
                        type="text"
                        placeholder="Badge title"
                        value={form.title}
                        onChange={(event) => setForm({ ...form, title: event.target.value })}
                        className="input-surface"
                        required
                    />
                    <textarea
                        placeholder="Badge description"
                        value={form.description}
                        onChange={(event) => setForm({ ...form, description: event.target.value })}
                        className="input-surface"
                        rows="4"
                    />
                    <button type="submit" disabled={awardBadgeMutation.isPending} className="btn-primary w-full">
                        {awardBadgeMutation.isPending ? 'Awarding...' : 'Award Badge'}
                    </button>
                </form>

                <div className="space-y-4">
                    <div>
                        <p className="eyebrow">Recognition feed</p>
                        <h2 className="mt-2 text-3xl font-bold text-slate-900">Earned badges</h2>
                    </div>
                    {badges.length === 0 && <div className="panel text-slate-500">No badges available yet.</div>}
                    <div className="grid gap-4 md:grid-cols-2">
                        {badges.map((badge) => (
                            <div key={badge._id} className="panel">
                                <span className="status-pill bg-amber-50 text-amber-800">{badge.type}</span>
                                <h2 className="mt-4 text-2xl font-semibold text-slate-900">{badge.title}</h2>
                                <p className="mt-3 text-sm leading-6 text-slate-600">{badge.description}</p>
                                <p className="mt-4 text-xs uppercase tracking-[0.18em] text-slate-400">
                                    Issued {new Date(badge.issuedAt).toLocaleDateString()}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Badges;

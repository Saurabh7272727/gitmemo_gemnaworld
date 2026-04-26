import React, { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import api from '../api/httpClient.js';

const SkillGraph = () => {
    const { userId: routeUserId } = useParams();
    const resolvedUserId = routeUserId || localStorage.getItem('userId') || '';
    const [skillsInput, setSkillsInput] = useState('');
    const [leadershipCount, setLeadershipCount] = useState('0');

    const fetchReputation = async () => {
        const response = await api.get(`/reputation/${resolvedUserId}`);
        return response.data;
    };

    const { data: reputation, isLoading, isError, refetch } = useQuery({
        queryKey: ['reputation', resolvedUserId],
        queryFn: fetchReputation,
        enabled: Boolean(resolvedUserId),
        staleTime: 120 * 1000,
        retry: 2,
    });

    const parsedSkills = useMemo(() => {
        if (!skillsInput.trim()) return [];
        return skillsInput
            .split(',')
            .map((entry) => entry.trim())
            .filter(Boolean)
            .map((entry) => {
                const [skill, level] = entry.split(':').map((item) => item.trim());
                return {
                    skill,
                    level: Number(level || 1),
                };
            })
            .filter((item) => item.skill);
    }, [skillsInput]);

    const updateReputationMutation = useMutation({
        mutationFn: async () => {
            const response = await api.put(`/reputation/${resolvedUserId}`, {
                userId: resolvedUserId,
                skills: parsedSkills,
                leadershipCount: Number(leadershipCount || 0),
            });
            return response.data;
        },
        onSuccess: () => refetch(),
    });

    if (isLoading) return <div className="panel">Loading skill graph...</div>;
    if (isError) return <div className="panel text-rose-600">Unable to load reputation data.</div>;

    return (
        <div className="space-y-8">
            <div className="hero-panel p-8 text-white">
                <p className="eyebrow">Skill graph</p>
                <h1 className="mt-3 text-4xl font-bold">See how delivery turns into reputation over time.</h1>
                <p className="muted-copy-dark mt-4 max-w-3xl">
                    Track completed projects, reliability, leadership, and skills in one place, then update your profile as you grow.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <MetricCard label="Projects Completed" value={reputation.projectsCompleted || 0} />
                <MetricCard label="Completion Rate" value={`${Math.round(reputation.completionRate || 0)}%`} />
                <MetricCard label="Reliability Score" value={Math.round(reputation.reliabilityScore || 0)} />
                <MetricCard label="Leadership Count" value={reputation.leadershipCount || 0} />
            </div>

            <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        updateReputationMutation.mutate();
                    }}
                    className="panel space-y-4"
                >
                    <div>
                        <p className="eyebrow">Update profile</p>
                        <h2 className="mt-2 text-3xl font-bold text-slate-900">Refresh skill and leadership data</h2>
                    </div>
                    <textarea
                        placeholder="Skills as skill:level, skill:level"
                        value={skillsInput}
                        onChange={(event) => setSkillsInput(event.target.value)}
                        className="input-surface"
                        rows="5"
                    />
                    <input
                        type="number"
                        min="0"
                        value={leadershipCount}
                        onChange={(event) => setLeadershipCount(event.target.value)}
                        className="input-surface"
                        placeholder="Leadership count"
                    />
                    <button type="submit" disabled={updateReputationMutation.isPending} className="btn-primary w-full">
                        {updateReputationMutation.isPending ? 'Updating...' : 'Update Reputation'}
                    </button>
                </form>

                <div className="space-y-4">
                    <div>
                        <p className="eyebrow">Skills</p>
                        <h2 className="mt-2 text-3xl font-bold text-slate-900">Current capability map</h2>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2">
                        {reputation.skills?.length ? (
                            reputation.skills.map((skill, index) => (
                                <div key={index} className="panel">
                                    <p className="text-xl font-semibold text-slate-900">{skill.skill}</p>
                                    <p className="mt-2 text-sm text-slate-500">Level {skill.level}/10</p>
                                    <div className="mt-4 h-2 rounded-full bg-slate-100">
                                        <div className="h-2 rounded-full bg-gradient-to-r from-teal-600 to-emerald-400" style={{ width: `${Math.min(skill.level * 10, 100)}%` }} />
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="panel text-slate-500">No skills available yet.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

function MetricCard({ label, value }) {
    return (
        <div className="panel">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-500">{label}</p>
            <p className="mt-3 text-4xl font-bold text-slate-900">{value}</p>
        </div>
    );
}

export default SkillGraph;

import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import api from '../api/httpClient.js';
import { problemFormSchema } from '../utils/validation.js';

const OpenInnovationBoard = () => {
    const [form, setForm] = useState({ title: '', description: '', category: '', tags: '' });
    const [formError, setFormError] = useState(null);
    const [solutions, setSolutions] = useState({});

    const fetchProblems = async () => {
        const response = await api.get('/problems');
        return response.data;
    };

    const { data: problems = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['problems'],
        queryFn: fetchProblems,
        staleTime: 90 * 1000,
        retry: 2,
    });

    const createProblemMutation = useMutation({
        mutationFn: async (payload) => {
            const response = await api.post('/problems', payload);
            return response.data;
        },
        onSuccess: () => {
            setForm({ title: '', description: '', category: '', tags: '' });
            refetch();
        },
    });

    const joinProblemMutation = useMutation({
        mutationFn: async (payload) => {
            const response = await api.post('/problems/join', payload);
            return response.data;
        },
        onSuccess: () => refetch(),
    });

    const solveProblemMutation = useMutation({
        mutationFn: async ({ problemId, solution }) => {
            const response = await api.post(`/problems/${problemId}/solve`, { problemId, solution });
            return response.data;
        },
        onSuccess: (_, variables) => {
            setSolutions((previous) => ({ ...previous, [variables.problemId]: '' }));
            refetch();
        },
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormError(null);
        const parsed = problemFormSchema.safeParse(form);
        if (!parsed.success) {
            setFormError(parsed.error.errors.map((err) => err.message).join(', '));
            return;
        }

        const tags = form.tags.split(',').map((item) => item.trim()).filter(Boolean);
        createProblemMutation.mutate({ ...form, tags });
    };

    return (
        <div className="space-y-8">
            <div className="hero-panel p-8 text-white">
                <p className="eyebrow">Open innovation board</p>
                <h1 className="mt-3 text-4xl font-bold">Share hard problems and invite solvers into the room.</h1>
                <p className="muted-copy-dark mt-4 max-w-3xl">
                    Post a challenge, gather collaborators, and accept solutions that turn scattered discussion into visible progress.
                </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                <form onSubmit={handleSubmit} className="panel space-y-4">
                    <div>
                        <p className="eyebrow">Post problem</p>
                        <h2 className="mt-2 text-3xl font-bold text-slate-900">Publish a challenge</h2>
                    </div>
                    <input
                        type="text"
                        placeholder="Problem title"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="input-surface"
                        required
                    />
                    <textarea
                        placeholder="Describe the problem and what makes it interesting"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="input-surface"
                        rows="5"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        value={form.category}
                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                        className="input-surface"
                    />
                    <input
                        type="text"
                        placeholder="Tags, comma separated"
                        value={form.tags}
                        onChange={(e) => setForm({ ...form, tags: e.target.value })}
                        className="input-surface"
                    />
                    {formError && <p className="text-sm text-rose-600">{formError}</p>}
                    <button type="submit" className="btn-primary w-full" disabled={createProblemMutation.isPending}>
                        {createProblemMutation.isPending ? 'Posting...' : 'Post Problem'}
                    </button>
                </form>

                <div className="space-y-4">
                    <div>
                        <p className="eyebrow">Problem feed</p>
                        <h2 className="mt-2 text-3xl font-bold text-slate-900">Open challenges</h2>
                    </div>
                    {isLoading && <div className="panel">Loading problems...</div>}
                    {isError && <div className="panel text-rose-600">Unable to load problems.</div>}
                    {!isLoading && !isError && problems.length === 0 && (
                        <div className="panel text-slate-500">No challenges posted yet.</div>
                    )}
                    <div className="grid gap-4">
                        {problems.map((problem) => (
                            <div key={problem?._id} className="panel">
                                <div className="flex flex-wrap items-center justify-between gap-3">
                                    <h3 className="text-2xl font-semibold text-slate-900">{problem.title}</h3>
                                    <span className="status-pill bg-slate-100 text-slate-700">{problem.status}</span>
                                </div>
                                <p className="mt-3 text-sm leading-6 text-slate-600">{problem.description}</p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {(problem.tags || []).map((tag) => (
                                        <span key={tag} className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-800">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-4 grid gap-3 md:grid-cols-2">
                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                                        Category <span className="ml-2 font-semibold text-slate-900">{problem.category || 'General'}</span>
                                    </div>
                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                                        Solvers <span className="ml-2 font-semibold text-slate-900">{problem.solvers?.length || 0}</span>
                                    </div>
                                </div>
                                <div className="mt-5 flex flex-wrap gap-3">
                                    <button onClick={() => joinProblemMutation.mutate({ problemId: problem._id })} className="btn-primary px-4 py-2">
                                        Join as Solver
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => solveProblemMutation.mutate({ problemId: problem._id, solution: solutions[problem._id] || '' })}
                                        className="btn-ghost"
                                    >
                                        Submit Solution
                                    </button>
                                </div>
                                <textarea
                                    placeholder="Write your proposed solution"
                                    value={solutions[problem._id] || ''}
                                    onChange={(event) => setSolutions((previous) => ({ ...previous, [problem._id]: event.target.value }))}
                                    className="input-surface mt-4"
                                    rows="4"
                                />
                                {problem.solution?.description && (
                                    <div className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                                        <p className="font-semibold">Accepted Solution</p>
                                        <p className="mt-2">{problem.solution.description}</p>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OpenInnovationBoard;

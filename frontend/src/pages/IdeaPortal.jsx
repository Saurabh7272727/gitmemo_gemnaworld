import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import api from '../api/httpClient.js';
import { projectFormSchema } from '../utils/validation.js';

const IdeaPortal = () => {
    const navigate = useNavigate();
    const currentUserId = localStorage.getItem('userId') || '';
    const [form, setForm] = useState({ title: '', description: '', techStack: '', teamSize: '', roles: '' });
    const [formError, setFormError] = useState(null);

    const fetchProjects = async () => {
        const response = await api.get('/projects');
        return response.data;
    };

    const { data: ideas = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['projects'],
        queryFn: fetchProjects,
        staleTime: 90 * 1000,
        retry: 2,
    });

    const createProjectMutation = useMutation({
        mutationFn: async (payload) => {
            const response = await api.post('/projects', payload);
            return response.data;
        },
        onSuccess: () => {
            setForm({ title: '', description: '', techStack: '', teamSize: '', roles: '' });
            refetch();
        },
    });

    const joinProjectMutation = useMutation({
        mutationFn: async (payload) => {
            const response = await api.post('/projects/join', payload);
            return response.data;
        },
        onSuccess: () => refetch(),
    });

    const completeProjectMutation = useMutation({
        mutationFn: async (projectId) => {
            const response = await api.put(`/projects/${projectId}/complete`);
            return response.data;
        },
        onSuccess: () => refetch(),
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormError(null);
        const result = projectFormSchema.safeParse(form);
        if (!result.success) {
            setFormError(result.error.errors.map((item) => item.message).join(', '));
            return;
        }

        const techStack = form.techStack.split(',').map((item) => item.trim()).filter(Boolean);
        const roles = form.roles.split(',').map((item) => item.trim()).filter(Boolean).map((role) => ({ role, count: 1 }));

        createProjectMutation.mutate({
            title: form.title,
            description: form.description,
            techStack,
            teamSize: Number(form.teamSize),
            roles,
        });
    };

    return (
        <div className="space-y-8">
            <div className="hero-panel p-8 text-white">
                <p className="eyebrow">Idea portal</p>
                <h1 className="mt-3 text-4xl font-bold">Turn an idea into a structured, joinable project space.</h1>
                <p className="muted-copy-dark mt-4 max-w-3xl">
                    Define the problem, team roles, and stack once, then connect tasks and contribution records as execution begins.
                </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                <form onSubmit={handleSubmit} className="panel space-y-4">
                    <div>
                        <p className="eyebrow">Create project</p>
                        <h2 className="mt-2 text-3xl font-bold text-slate-900">Launch a new collaboration idea</h2>
                    </div>
                    <input
                        type="text"
                        placeholder="Project title"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="input-surface"
                        required
                    />
                    <textarea
                        placeholder="Describe the idea, goal, and expected outcome"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="input-surface"
                        rows="5"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Tech stack, comma separated"
                        value={form.techStack}
                        onChange={(e) => setForm({ ...form, techStack: e.target.value })}
                        className="input-surface"
                    />
                    <div className="grid gap-4 md:grid-cols-2">
                        <input
                            type="number"
                            placeholder="Team size"
                            value={form.teamSize}
                            onChange={(e) => setForm({ ...form, teamSize: e.target.value })}
                            className="input-surface"
                            required
                        />
                        <input
                            type="text"
                            placeholder="Roles, comma separated"
                            value={form.roles}
                            onChange={(e) => setForm({ ...form, roles: e.target.value })}
                            className="input-surface"
                        />
                    </div>
                    {formError && <p className="text-sm text-rose-600">{formError}</p>}
                    <button type="submit" className="btn-primary w-full" disabled={createProjectMutation.isPending}>
                        {createProjectMutation.isPending ? 'Creating...' : 'Create Project'}
                    </button>
                </form>

                <div className="space-y-4">
                    <div>
                        <p className="eyebrow">Live projects</p>
                        <h2 className="mt-2 text-3xl font-bold text-slate-900">Current collaboration spaces</h2>
                    </div>
                    {isLoading && <div className="panel">Loading ideas...</div>}
                    {isError && <div className="panel text-rose-600">Unable to load ideas.</div>}
                    {!isLoading && !isError && ideas.length === 0 && (
                        <div className="panel text-slate-500">No projects yet. Start the first one.</div>
                    )}
                    <div className="grid gap-4">
                        {ideas.map((idea) => (
                            <div key={idea?._id} className="panel">
                                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                                    <div>
                                        <div className="flex flex-wrap items-center gap-2">
                                            <h3 className="text-2xl font-semibold text-slate-900">{idea.title}</h3>
                                            <span className="status-pill bg-slate-100 text-slate-700">{idea.status}</span>
                                        </div>
                                        <p className="mt-3 text-sm leading-6 text-slate-600">{idea.description}</p>
                                    </div>
                                    <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-500">
                                        Team size <span className="ml-2 font-semibold text-slate-900">{idea.teamSize}</span>
                                    </div>
                                </div>

                                <div className="mt-4 flex flex-wrap gap-2">
                                    {idea.techStack?.map((tech) => (
                                        <span key={tech} className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800">
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="mt-4 grid gap-3 text-sm text-slate-500 md:grid-cols-3">
                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                                        Members <span className="ml-2 font-semibold text-slate-900">{idea.members?.length || 0}</span>
                                    </div>
                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                                        Roles <span className="ml-2 font-semibold text-slate-900">{idea.roles?.length || 0}</span>
                                    </div>
                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                                        Owner <span className="ml-2 font-semibold text-slate-900">{idea.creator?.username || 'Project lead'}</span>
                                    </div>
                                </div>

                                <div className="mt-5 flex flex-wrap gap-3">
                                    <button onClick={() => joinProjectMutation.mutate({ projectId: idea._id, role: 'member' })} className="btn-primary px-4 py-2">
                                        Join
                                    </button>
                                    <button type="button" onClick={() => navigate(`/gemna_gitmemo.html/tasks/${idea._id}`)} className="btn-ghost">
                                        Open Tasks
                                    </button>
                                    <button type="button" onClick={() => navigate(`/gemna_gitmemo.html/contributions?projectId=${idea._id}`)} className="btn-ghost">
                                        View Contributions
                                    </button>
                                    {(idea.creator?._id === currentUserId || idea.creator === currentUserId) && (
                                        <button
                                            type="button"
                                            onClick={() => completeProjectMutation.mutate(idea._id)}
                                            className="btn-secondary px-4 py-2"
                                        >
                                            Complete Project
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IdeaPortal;

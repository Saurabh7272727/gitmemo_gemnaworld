import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import api from '../api/httpClient.js';
import { taskFormSchema } from '../utils/validation.js';

const TaskManagement = () => {
    const { projectId } = useParams();
    const [form, setForm] = useState({ title: '', description: '', assignedTo: '', deadline: '' });
    const [errorMessage, setErrorMessage] = useState(null);

    const fetchTasks = async () => {
        const response = await api.get(`/tasks/${projectId}`);
        return response.data;
    };

    const { data: tasks = [], isLoading, isError, refetch } = useQuery({
        queryKey: ['tasks', projectId],
        queryFn: fetchTasks,
        enabled: Boolean(projectId),
        staleTime: 60 * 1000,
        retry: 2,
    });

    const createTaskMutation = useMutation({
        mutationFn: async (payload) => {
            const response = await api.post('/tasks', payload);
            return response.data;
        },
        onSuccess: () => {
            setForm({ title: '', description: '', assignedTo: '', deadline: '' });
            refetch();
        },
    });

    const updateTaskMutation = useMutation({
        mutationFn: async ({ taskId, status }) => {
            const response = await api.put(`/tasks/${taskId}/status`, { status });
            return response.data;
        },
        onSuccess: () => refetch(),
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMessage(null);
        const parsed = taskFormSchema.safeParse(form);
        if (!parsed.success) {
            setErrorMessage(parsed.error.errors.map((err) => err.message).join(', '));
            return;
        }
        createTaskMutation.mutate({ projectId, ...form });
    };

    return (
        <div className="space-y-8">
            <div className="hero-panel p-8 text-white">
                <p className="eyebrow">Task management</p>
                <h1 className="mt-3 text-4xl font-bold">Keep ownership, deadlines, and completion visible.</h1>
                <p className="muted-copy-dark mt-4 max-w-3xl">
                    Create execution-ready tasks for this project and move them from planning to completion without losing accountability.
                </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                <form onSubmit={handleSubmit} className="panel space-y-4">
                    <div>
                        <p className="eyebrow">Create task</p>
                        <h2 className="mt-2 text-3xl font-bold text-slate-900">Assign the next concrete piece of work</h2>
                    </div>
                    <input
                        type="text"
                        placeholder="Task title"
                        value={form.title}
                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                        className="input-surface"
                        required
                    />
                    <textarea
                        placeholder="Task description"
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="input-surface"
                        rows="4"
                    />
                    <input
                        type="text"
                        placeholder="Assigned to user ID"
                        value={form.assignedTo}
                        onChange={(e) => setForm({ ...form, assignedTo: e.target.value })}
                        className="input-surface"
                    />
                    <input
                        type="date"
                        value={form.deadline}
                        onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                        className="input-surface"
                    />
                    {errorMessage && <p className="text-sm text-rose-600">{errorMessage}</p>}
                    <button type="submit" className="btn-primary w-full" disabled={createTaskMutation.isPending}>
                        {createTaskMutation.isPending ? 'Creating...' : 'Create Task'}
                    </button>
                </form>

                <div className="space-y-4">
                    <div>
                        <p className="eyebrow">Project queue</p>
                        <h2 className="mt-2 text-3xl font-bold text-slate-900">Active tasks</h2>
                    </div>
                    {isLoading && <div className="panel">Loading tasks...</div>}
                    {isError && <div className="panel text-rose-600">Error loading tasks.</div>}
                    {!isLoading && !isError && tasks.length === 0 && (
                        <div className="panel text-slate-500">No tasks created for this project yet.</div>
                    )}
                    <div className="grid gap-4">
                        {tasks.map((task) => (
                            <div key={task._id} className="panel">
                                <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                                    <div>
                                        <h3 className="text-2xl font-semibold text-slate-900">{task.title}</h3>
                                        <p className="mt-2 text-sm leading-6 text-slate-600">{task.description || 'No description provided.'}</p>
                                    </div>
                                    <span className="status-pill bg-slate-100 text-slate-700">{task.status}</span>
                                </div>

                                <div className="mt-4 grid gap-3 md:grid-cols-3">
                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                                        Assigned to <span className="ml-2 font-semibold text-slate-900">{task.assignedTo?.email || task.assignedTo || 'Unassigned'}</span>
                                    </div>
                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                                        Deadline <span className="ml-2 font-semibold text-slate-900">{task.deadline ? new Date(task.deadline).toLocaleDateString() : 'N/A'}</span>
                                    </div>
                                    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                                        Created by <span className="ml-2 font-semibold text-slate-900">{task.createdBy?.email || task.createdBy || 'Unknown'}</span>
                                    </div>
                                </div>

                                <div className="mt-5 flex flex-wrap gap-3">
                                    <button type="button" onClick={() => updateTaskMutation.mutate({ taskId: task._id, status: 'in_progress' })} className="btn-ghost">
                                        Start
                                    </button>
                                    <button type="button" onClick={() => updateTaskMutation.mutate({ taskId: task._id, status: 'completed' })} className="btn-primary px-4 py-2">
                                        Complete
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TaskManagement;

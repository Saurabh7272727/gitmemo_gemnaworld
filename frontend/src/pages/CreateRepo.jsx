import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FaCodeBranch, FaEye, FaGlobe, FaLock } from "react-icons/fa";

export default function RepoCreatePage() {
    const [form, setForm] = useState({
        name: "",
        description: "",
        private: false,
        auto_init: true,
    });

    const { mutate, data, isSuccess, isError, isPending, error } = useMutation({
        mutationFn: async (payload) => {
            const installation_id = localStorage.getItem('installation_id');

            if (!installation_id) {
                throw new Error("installation_id are missing");
            }

            const res = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/githubapp/create/repo`, payload, {
                headers: {
                    Authorization: `Bearer ${installation_id}`,
                    "Content-Type": 'application/json',
                }
            });

            if (res.status !== 201) {
                throw new Error("somthing was wrong");
            }

            return res.data;
        },
        retry: 1,
    });

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        mutate(form);
    };

    return (
        <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="hero-panel p-8 text-white">
                <p className="eyebrow">Repository setup</p>
                <h1 className="mt-3 text-4xl font-bold">Create a fresh GitHub repository from your workspace.</h1>
                <p className="muted-copy-dark mt-4">
                    Start a new repo without leaving GitMemo. This is best for project seeds, internal workspaces, and idea-specific repos.
                </p>
                <div className="mt-8 space-y-3 text-sm text-slate-300">
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Choose visibility and initialize with a README if you want a clean starting point.</div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">After creation, the repo appears in your GitHub dashboard and repo inventory.</div>
                </div>
            </div>

            <div className="panel w-full p-8">
                <div className="mb-8">
                    <p className="eyebrow">Create repository</p>
                    <h2 className="mt-3 text-3xl font-bold text-slate-900">Create Repository</h2>
                    <p className="muted-copy mt-2">Initialize a new repository with GitMemo</p>
                </div>

                {isSuccess && (
                    <div className="mb-6 rounded-3xl border border-emerald-200 bg-emerald-50 p-5">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-slate-900">Repository - {data?.data?.name}</h3>
                            {data?.data.private === true ? <FaLock className="text-rose-500" /> : <FaGlobe className="text-emerald-600" />}
                        </div>

                        <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                            Description - {data?.data?.description || "No description provided."}
                        </p>

                        <div className="mt-4 flex flex-col items-start justify-between gap-3 text-sm text-slate-600 md:flex-row md:items-center">
                            <span>{data?.data?.language || "Unknown"}</span>
                            <div className="flex items-center gap-3">
                                <span className="flex items-center gap-1">
                                    <FaEye /> {data?.data?.owner}
                                </span>
                                <a href={`${data?.data.html_url}`} className="flex items-center gap-1 text-teal-700">
                                    <FaCodeBranch /> {data?.data.html_url}
                                </a>
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">Repository Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form?.name}
                            onChange={handleChange}
                            placeholder="e.g. gitmemo-ai"
                            className="input-surface"
                            required
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-slate-700">Description</label>
                        <textarea
                            name="description"
                            value={form?.description}
                            onChange={handleChange}
                            placeholder="Write a short description..."
                            rows="3"
                            className="input-surface"
                        />
                    </div>

                    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div>
                            <p className="font-medium text-slate-900">Private Repository</p>
                            <p className="text-sm text-slate-500">Only invited users can access</p>
                        </div>
                        <input
                            type="checkbox"
                            name="private"
                            checked={form?.private}
                            onChange={handleChange}
                            className="h-5 w-5 accent-teal-600"
                        />
                    </div>

                    <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 p-4">
                        <div>
                            <p className="font-medium text-slate-900">Initialize with README</p>
                            <p className="text-sm text-slate-500">Create first commit automatically</p>
                        </div>
                        <input
                            type="checkbox"
                            name="auto_init"
                            checked={form.auto_init}
                            onChange={handleChange}
                            className="h-5 w-5 accent-teal-600"
                        />
                    </div>

                    <button type="submit" disabled={isPending} className="btn-primary w-full">
                        {isPending ? "Creating..." : "Create Repository"}
                    </button>

                    {isSuccess && (
                        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                            Repository created successfully.
                        </div>
                    )}

                    {isError && (
                        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
                            {error?.message || "something was wrong"}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}

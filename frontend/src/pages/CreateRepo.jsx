import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { FaCodeBranch, FaEye, FaLock, FaGlobe } from "react-icons/fa";


export default function RepoCreatePage() {
    const [showSuccess, setShowSuccess] = useState(false);

    const [form, setForm] = useState({
        name: "",
        description: "",
        private: false,
        auto_init: true,
    });

    const { mutate, data, isSuccess, isError, isPending, error } = useMutation({
        mutationFn: async (data) => {
            const installation_id = localStorage.getItem('installation_id');

            if (!installation_id) {
                throw new Error("installation_id are missing");
            }

            const res = await axios.post(`${import.meta.env.VITE_APP_BACKEND_URL}/githubapp/create/repo`, data, {
                headers: {
                    "Authorization": `Bearer ${installation_id}`,
                    "Content-Type": 'application/json'
                }
            });



            if (res.status !== 201) {
                throw new Error("somthing was wrong");
            }

            return res.data;
        },
        retry: 1,
        onError: (err) => {
            console.log("error ===========", err);
        }
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setForm({
            ...form,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate(form);
        console.log('form data================================', form);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-zinc-900 to-black flex items-center justify-center px-4 py-10">
            <div className="w-full max-w-xl bg-zinc-900/70 backdrop-blur-lg border border-zinc-800 rounded-2xl shadow-2xl p-8">

                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold text-white">
                        Create Repository
                    </h1>
                    <p className="text-zinc-400 mt-2">
                        Initialize a new repository with GitMemo
                    </p>
                </div>
                {
                    isSuccess && <div>
                        <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 hover:border-green-500 transition-all duration-300 hover:shadow-lg">

                            <div className="flex justify-between items-center">
                                <h3 className="text-lg font-semibold text-white">Repository -  {data?.data?.name}</h3>

                                <span></span>{data?.data.private === true ? (
                                    <FaLock className="text-red-500" />
                                ) : (
                                    <FaGlobe className="text-green-500" />
                                )}
                            </div>

                            <p className="text-zinc-400 text-sm mt-2 line-clamp-2">
                                Description - {data?.data?.description || "No description provided."}
                            </p>

                            <div className="flex justify-between flex-col items-center mt-4 text-sm text-zinc-400">
                                <span>{data?.data?.language || "Unknown"}</span>

                                <div className="flex items-center gap-3">
                                    <span className="flex items-center gap-1">
                                        <FaEye /> {data?.data?.owner}
                                    </span>

                                    <a href={`${data?.data.html_url}`} className="flex items-center gap-1">
                                        <FaCodeBranch /> {data?.data.html_url}
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                }
                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Repo Name */}
                    <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                            Repository Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={form?.name}
                            onChange={handleChange}
                            placeholder="e.g. gitmemo-ai"
                            className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm text-zinc-400 mb-2">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={form?.description}
                            onChange={handleChange}
                            placeholder="Write a short description..."
                            rows="3"
                            className="w-full px-4 py-3 rounded-xl bg-zinc-800 border border-zinc-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                    </div>

                    {/* Toggles */}
                    <div className="flex items-center justify-between bg-zinc-800/50 p-4 rounded-xl border border-zinc-700">

                        <div>
                            <p className="text-white font-medium">Private Repository</p>
                            <p className="text-zinc-400 text-sm">
                                Only invited users can access
                            </p>
                        </div>

                        <input
                            type="checkbox"
                            name="private"
                            checked={form?.private}
                            onChange={handleChange}
                            className="w-5 h-5 accent-indigo-600"
                        />
                    </div>

                    <div className="flex items-center justify-between bg-zinc-800/50 p-4 rounded-xl border border-zinc-700">

                        <div>
                            <p className="text-white font-medium">Initialize with README</p>
                            <p className="text-zinc-400 text-sm">
                                Create first commit automatically
                            </p>
                        </div>

                        <input
                            type="checkbox"
                            name="auto_init"
                            checked={form.auto_init}
                            onChange={handleChange}
                            className="w-5 h-5 accent-indigo-600"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={isPending}
                        className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 transition-all text-white font-semibold shadow-lg disabled:opacity-50"
                    >
                        {isPending ? "Creating..." : "Create Repository"}
                    </button>

                    {/* Success */}
                    {isSuccess && (
                        <div className="p-4 rounded-xl bg-green-900/40 border border-green-700 text-green-400 text-sm">
                            Repository created successfully 🚀
                        </div>
                    )}

                    {/* Error */}
                    {isError && (
                        <div className="p-4 rounded-xl bg-red-900/40 border border-red-700 text-red-400 text-sm">
                            {error?.message || "something was wrong"}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}
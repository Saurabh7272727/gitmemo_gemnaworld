import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SimpleLogin = () => {
    const navi = useNavigate();
    return (
        <div className="page-frame flex min-h-screen items-center justify-center">
            <div className="grid w-full max-w-6xl gap-6 lg:grid-cols-[1.1fr_0.9fr]">
                <div className="hero-panel hidden p-10 text-white lg:flex lg:flex-col lg:justify-between">
                    <div>
                        <p className="eyebrow">Professional student collaboration</p>
                        <h1 className="mt-4 max-w-xl text-5xl font-bold leading-tight">
                            Turn every idea, task, and repo into visible proof of work.
                        </h1>
                        <p className="muted-copy-dark mt-5 max-w-lg text-base">
                            GitMemo combines GitHub identity, team execution, contribution logs, and verified achievement into one clean workspace.
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-3">
                        {[
                            ['Projects', 'Structured idea portal'],
                            ['Tasks', 'Clear execution rhythm'],
                            ['Proof', 'Contribution history that lasts'],
                        ].map(([title, copy]) => (
                            <div key={title} className="metric-card">
                                <p className="text-sm uppercase tracking-[0.22em] text-teal-300/80">{title}</p>
                                <p className="mt-3 text-sm text-slate-300">{copy}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="panel mx-auto w-full max-w-xl p-8 md:p-10">
                    <div className="mb-8 text-center">
                        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-50 text-2xl text-teal-700 shadow-inner shadow-teal-100">
                            <FaGithub />
                        </div>
                        <p className="eyebrow">Welcome back</p>
                        <h1 className="mt-3 text-4xl font-bold text-slate-900">Open your builder workspace</h1>
                        <p className="muted-copy mt-3">
                            Use GitHub to continue into your projects, repos, contributions, badges, and team board.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="GitHub email appears after OAuth"
                                className="input-surface"
                                disabled
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-medium text-slate-700">
                                Password
                            </label>
                            <input
                                type="password"
                                placeholder="GitHub handles sign-in for this build"
                                className="input-surface"
                                disabled
                            />
                        </div>

                        <div className="rounded-2xl border border-teal-100 bg-teal-50/80 p-4 text-sm text-teal-900">
                            This prototype uses GitHub OAuth as the primary identity layer.
                        </div>
                    </div>

                    <button
                        onClick={() => {
                            window.location.href = 'http://localhost:3000/auth/oauth/login&signup'
                        }}
                        className="btn-primary mt-6 w-full"
                    >
                        <FaGithub className="text-xl" />
                        <span>Continue with GitHub</span>
                    </button>

                    <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
                        <span>New here?</span>
                        <button onClick={() => navi('/signup')} className="font-semibold text-teal-700 transition hover:text-teal-800">
                            Create account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SimpleLogin;

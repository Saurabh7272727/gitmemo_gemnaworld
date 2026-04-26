// src/components/SimpleSignup.jsx
import React from 'react';
import { FaGithub } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const SimpleSignup = () => {
    const navi = useNavigate();
    const check = () => {
        window.location.href = 'http://localhost:3000/auth/oauth/login&signup'
    }

    return (
        <div className="page-frame flex min-h-screen items-center justify-center">
            <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                <div className="panel order-2 p-8 md:p-10 lg:order-1">
                    <p className="eyebrow">Quick onboarding</p>
                    <h1 className="mt-3 text-4xl font-bold text-slate-900">Create your GitMemo account</h1>
                    <p className="muted-copy mt-4">
                        Sign up with GitHub to unlock repo connection, project collaboration, contribution tracking, and verified achievement records.
                    </p>

                    <div className="mt-8 space-y-3">
                        {[
                            'Connect your GitHub identity',
                            'Install the GitHub App for repo context',
                            'Start building projects with visible proof',
                        ].map((step, index) => (
                            <div key={step} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-700">
                                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">{index + 1}</span>
                                {step}
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={() => check()}
                        className="btn-primary mt-8 w-full"
                    >
                        <FaGithub className="text-xl" />
                        <span>Sign up with GitHub</span>
                    </button>

                    <div className="mt-6 flex items-center justify-between text-sm text-slate-500">
                        <span>Already have an account?</span>
                        <button onClick={() => navi('/login')} className="font-semibold text-teal-700 transition hover:text-teal-800">
                            Login
                        </button>
                    </div>
                </div>

                <div className="hero-panel order-1 p-10 text-white lg:order-2">
                    <p className="eyebrow">Why students use GitMemo</p>
                    <h2 className="mt-4 max-w-lg text-5xl font-bold leading-tight">
                        Build a portfolio that shows how you actually contributed.
                    </h2>
                    <div className="mt-10 grid gap-4 md:grid-cols-2">
                        {[
                            ['Idea Portal', 'Launch structured projects with team roles and scope.'],
                            ['Task Flow', 'Keep ownership, deadlines, and execution visible.'],
                            ['Contribution Logs', 'Capture commits, reviews, and proof links.'],
                            ['Badges & Reputation', 'Convert delivery into verified recognition.'],
                        ].map(([title, copy]) => (
                            <div key={title} className="metric-card">
                                <h3 className="font-['Space_Grotesk'] text-lg font-semibold text-white">{title}</h3>
                                <p className="mt-2 text-sm text-slate-300">{copy}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SimpleSignup;

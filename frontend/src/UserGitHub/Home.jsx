import React from 'react';
import { useNavigate } from 'react-router-dom';
import TopBar from "./component/TopBar.jsx";
import StatsSection from "./component/StatsSection.jsx";
import IdeaCard from "./component/IdeaCard.jsx";

const demoIdeas = [
    {
        title: "Smart Attendance AI",
        city: "Prayagraj",
        state: "Uttar Pradesh",
        description: "AI based facial recognition attendance system.",
        tech: "MERN + AI"
    },
    {
        title: "Farmer Market App",
        city: "Pune",
        state: "Maharashtra",
        description: "Connecting farmers directly to customers.",
        tech: "React Native"
    }
];

export default function Home() {
    const navi = useNavigate();

    return (
        <div className='space-y-8'>
            <TopBar githubConnected={Boolean(localStorage.getItem('installation_id'))} />

            <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-8">
                    <div className="panel">
                        <p className="eyebrow">Discover, collaborate, build</p>
                        <h2 className="mt-3 max-w-3xl text-4xl font-bold text-slate-900 md:text-5xl">
                            A serious workspace for student teams shipping real projects.
                        </h2>
                        <p className="muted-copy mt-4 max-w-2xl text-base">
                            Browse live ideas, connect with builders across colleges, and turn execution into visible proof you can actually show.
                        </p>
                        <div className="mt-6 flex flex-wrap gap-3">
                            <button onClick={() => navi('/gemna_gitmemo.html/idea-portal')} className="btn-primary">
                                Explore Projects
                            </button>
                            <button
                                onClick={() => navi('/gemna_gitmemo.html/create-repo')}
                                className="btn-ghost"
                            >
                                Create Repository
                            </button>
                        </div>
                    </div>

                    <StatsSection />

                    <div>
                        <div className="mb-5 flex items-end justify-between">
                            <div>
                                <p className="eyebrow">Featured ideas</p>
                                <h2 className="mt-2 text-3xl font-bold text-slate-900">Momentum from the community</h2>
                            </div>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                            {demoIdeas.map((idea, index) => (
                                <IdeaCard key={index} idea={idea} />
                            ))}
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="hero-panel p-6 text-white">
                        <p className="eyebrow">Today's focus</p>
                        <h3 className="mt-3 text-3xl font-bold">Keep your build loop tight.</h3>
                        <ul className="mt-5 space-y-3 text-sm text-slate-300">
                            <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Open Idea Portal and join a live project.</li>
                            <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Create or update tasks with clear ownership.</li>
                            <li className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">Log contributions to build visible project proof.</li>
                        </ul>
                    </div>

                    <div className="panel">
                        <p className="eyebrow">Quick links</p>
                        <div className="mt-4 grid gap-3">
                            <button onClick={() => navi('/gemna_gitmemo.html/contributions')} className="btn-ghost justify-between">
                                Contribution Center
                                <span>Open</span>
                            </button>
                            <button onClick={() => navi('/gemna_gitmemo.html/innovation-board')} className="btn-ghost justify-between">
                                Innovation Board
                                <span>Open</span>
                            </button>
                            <button onClick={() => navi('/gemna_gitmemo.html/profile')} className="btn-ghost justify-between">
                                GitHub Dashboard
                                <span>Open</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

import React from 'react'

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
        <div className='w-full h-full bg-black ring-1 ring-gray-600 overflow-y-scroll'>
            <div className="min-h-screen bg-black text-white">

                <TopBar githubConnected={false} />

                <div className="px-8 py-16">

                    <div className="text-center max-w-3xl mx-auto">
                        <h1 className="text-5xl font-bold leading-tight">
                            Discover. Collaborate. Build.
                        </h1>

                        <p className="text-zinc-400 mt-6 text-lg">
                            A hub of innovative ideas and student-driven projects across India.
                        </p>

                        <div className="flex justify-center gap-4 mt-8">
                            <button className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl">
                                Explore Projects
                            </button>
                            <button
                                onClick={() => navi('/create-repo')}
                                className="bg-zinc-800 hover:bg-zinc-700 px-6 py-3 rounded-xl">
                                Create Idea
                            </button>
                        </div>
                    </div>

                    <StatsSection />

                    <h2 className="text-2xl font-bold mt-16 mb-6">
                        Featured Ideas
                    </h2>

                    <div className="grid md:grid-cols-3 gap-6">
                        {demoIdeas.map((idea, index) => (
                            <IdeaCard key={index} idea={idea} />
                        ))}
                    </div>
                </div>
            </div>
        </div>

    );
}

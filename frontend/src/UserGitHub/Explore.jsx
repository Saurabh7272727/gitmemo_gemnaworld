import React, { useState } from "react";

const demoIdeas = [
    {
        id: 1,
        title: "AI Powered local Predictor",
        description: "Predict student attendance using ML models.",
        tags: ["AI", "ML", "Education"],
        owner: "Saurabh",
        requests: 12,
    },
    {
        id: 2,
        title: "Git-based Idea Collaboration Platform",
        description: "Build ideas collaboratively using Git workflow.",
        tags: ["SaaS", "GitHub", "Startup"],
        owner: "Rahul",
        requests: 7,
    },
    {
        id: 3,
        title: "Smart Resume Builder",
        description: "Generate AI-based optimized resumes for students.",
        tags: ["AI", "Career"],
        owner: "Aman",
        requests: 20,
    },
];

const ExplorePage = () => {
    const [search, setSearch] = useState("");

    const filteredIdeas = demoIdeas.filter((idea) =>
        idea.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="h-full bg-zinc-950 text-white p-8">
            {/* Header */}
            <div className="max-w-6xl mx-auto mb-10">
                <h1 className="text-4xl font-bold mb-4">
                    Explore Ideas - gitmemo@gemna.com
                </h1>

                <input
                    type="text"
                    placeholder="Search ideas..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full md:w-1/2 px-4 py-3 rounded-xl bg-zinc-900 border border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            {/* Ideas Grid */}
            <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {filteredIdeas.map((idea) => (
                    <div
                        key={idea.id}
                        className="group bg-zinc-900 border border-zinc-800 p-6 rounded-2xl 
                       hover:border-blue-500 transition-all duration-300 
                       hover:-translate-y-2 hover:shadow-2xl"
                    >
                        {/* Title */}
                        <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-400 transition">
                            {idea.title}
                        </h2>

                        {/* Description */}
                        <p className="text-zinc-400 text-sm mb-4 line-clamp-3">
                            {idea.description}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2 mb-4">
                            {idea.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="text-xs bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full"
                                >
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between text-sm text-zinc-400 mb-4">
                            <span>By {idea.owner}</span>
                            <span>{idea.requests} Requests</span>
                        </div>

                        {/* Action Button */}
                        <button
                            className="w-full bg-blue-600 hover:bg-blue-700 
                         py-2 rounded-xl font-medium transition duration-300"
                            onClick={() => alert(`Request sent for ${idea.title}`)}
                        >
                            Send Request
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};




const saurabh = 'saurabh sharma ';

export default ExplorePage;
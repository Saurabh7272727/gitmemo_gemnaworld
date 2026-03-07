import React, { useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';

const RepoCard = ({ repo }) => {
    return (
        <div className="group relative bg-gradient-to-br from-zinc-900 to-zinc-800 
                    border border-zinc-700 rounded-2xl p-6 
                    shadow-lg hover:shadow-2xl 
                    transition-all duration-300 
                    hover:-translate-y-2">

            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-white group-hover:text-blue-400 transition">
                    {repo.name}
                </h2>

                <span
                    className={`text-xs px-3 py-1 rounded-full font-medium ${repo.private
                        ? "bg-red-500/20 text-red-400"
                        : "bg-green-500/20 text-green-400"
                        }`}
                >
                    {repo.private ? "Private" : "Public"}
                </span>
            </div>

            {/* Description */}
            <p className="text-zinc-400 text-sm mb-4 line-clamp-2">
                {repo.description || "No description provided."}
            </p>

            {/* Owner */}
            <div className="flex items-center justify-between text-sm text-zinc-500 mb-4">
                <span>
                    Owner ID: <span className="text-zinc-300">{repo.owner}</span>
                </span>
            </div>

            {/* Dates */}
            <div className="text-xs text-zinc-500 space-y-1 mb-4">
                <p>
                    Created:{" "}
                    <span className="text-zinc-400">
                        {new Date(repo.createdAt).toLocaleString()}
                    </span>
                </p>
                <p>
                    Updated:{" "}
                    <span className="text-zinc-400">
                        {new Date(repo.updatedAt).toLocaleString()}
                    </span>
                </p>
            </div>

            {/* Action Button */}
            <a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-blue-600 hover:bg-blue-700 
                   text-white font-medium py-2 rounded-xl 
                   transition duration-300"
            >
                View on GitHub
            </a>

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-2xl opacity-0 
                      group-hover:opacity-100 
                      bg-gradient-to-r from-blue-500/10 to-purple-500/10 
                      transition duration-500 pointer-events-none" />
        </div>
    );
};

const InvitationPage = () => {

    if (!localStorage.getItem("ownerId")) {
        return (<>
            <div className='w-full h-11 flex justify-center items-center'>
                Owner ID are missing
            </div>
        </>)
    }

    const fetchCreatedRepo = async () => {
        const ownerid = localStorage.getItem("ownerId");

        try {
            const response = await fetch(`${import.meta.env.VITE_APP_BACKEND_URL}/githubapp/access/created/repo/${ownerid}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const result = await response.json();
            if (result.status === 200) {
                return result;
            }
            throw new Error("error - on try")
        } catch (error) {
            throw new Error("error - on catch")
        }
    }
    const { status, data, error, mutate } = useMutation({
        mutationFn: fetchCreatedRepo,
        retry: 1,
        onSuccess: (data) => {
            console.log("data ==================>", data);
        }
    });

    useEffect(() => {
        mutate();
    }, [])

    if (status === 'pending') {
        return (
            <div className='w-full h-11 flex justify-center items-center'>
                loading.......
            </div>
        )
    }

    if (status === 'error') {
        return (
            <div className='w-full h-11 flex justify-center items-center'>
                {error.message}
            </div>
        )
    }

    return (
        <>
            {
                status === 'idle' && (data?.findAllCreatedRepo?.length > 0) && <div>Function sync</div>
            }
            <div className='w-full h-full bg-gray-700'>

                {
                    status === 'success' && (data?.findAllCreatedRepo?.length > 0) && <div className='w-full h-fit p-4 gap-x-3 bg-black flex justify-center flex-wrap'>
                        {
                            data?.findAllCreatedRepo.map((repo) => {
                                return (

                                    <RepoCard repo={repo} />
                                )
                            })
                        }
                    </div>
                }
                {
                    status === 'success' && (data?.findAllCreatedRepo?.length == 0) && <div className='w-full h-full bg-black'>
                        <h1 className='text-white pt-4 pl-4'>No repo</h1>
                    </div>
                }
            </div>
        </>
    )
}

export default InvitationPage
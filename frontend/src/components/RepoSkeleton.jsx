import { FaCodeBranch, FaEye, FaLock, FaGlobe } from "react-icons/fa";

export default function RepoCard({ repo }) {
    return (
        <div className="bg-zinc-900 p-5 rounded-2xl border border-zinc-800 hover:border-green-500 transition-all duration-300 hover:shadow-lg">

            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-white">{repo.name}</h3>

                {repo.visibility === "private" ? (
                    <FaLock className="text-red-500" />
                ) : (
                    <FaGlobe className="text-green-500" />
                )}
            </div>

            <p className="text-zinc-400 text-sm mt-2 line-clamp-2">
                {repo.description || "No description provided."}
            </p>

            <div className="flex justify-between items-center mt-4 text-sm text-zinc-400">
                <span>{repo.language || "Unknown"}</span>

                <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                        <FaEye /> {repo.watchers}
                    </span>

                    <span className="flex items-center gap-1">
                        <FaCodeBranch /> {repo.forks}
                    </span>
                </div>
            </div>
        </div>
    );
}
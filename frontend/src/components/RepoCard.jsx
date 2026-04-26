import { FaCodeBranch, FaEye, FaGlobe, FaLock } from "react-icons/fa";

export default function RepoCard({ repo }) {
    return (
        <div className="panel transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_22px_50px_rgba(15,23,42,0.14)]">
            <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-slate-900">{repo.name}</h3>

                {repo.visibility === "private" ? (
                    <FaLock className="text-rose-500" />
                ) : (
                    <FaGlobe className="text-emerald-600" />
                )}
            </div>

            <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-600">
                {repo.description || "No description provided."}
            </p>

            <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
                <span className="status-pill bg-slate-100 text-slate-700">{repo.language || "Unknown"}</span>

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

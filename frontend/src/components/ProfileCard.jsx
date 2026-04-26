import { FaCheckCircle, FaGithub } from "react-icons/fa";

export default function ProfileCard({ profile }) {
    return (
        <div className="hero-panel p-6 text-white md:p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-5">
                    <img
                        src={`${profile?.avatar}`}
                        alt="avatar"
                        className="h-20 w-20 rounded-[24px] object-cover shadow-lg ring-4 ring-white/10"
                    />
                    <div>
                        <div className="flex flex-wrap items-center gap-3">
                            <h2 className="text-3xl font-bold text-white">{profile?.username || profile?.email}</h2>
                            <span className="status-pill bg-emerald-500/15 text-emerald-300">
                                <FaCheckCircle className="text-xs" />
                                Connected
                            </span>
                        </div>
                        <p className="mt-2 text-base text-slate-300">{profile?.email}</p>
                        <p className="mt-3 flex items-center gap-2 text-sm text-slate-400">
                            <FaGithub />
                            GitHub App synced through GitMemo
                        </p>
                    </div>
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                    <div className="metric-card">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">GitHub ID</p>
                        <p className="mt-3 text-lg font-semibold text-white">{profile?.githubId || 'N/A'}</p>
                    </div>
                    <div className="metric-card">
                        <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Identity</p>
                        <p className="mt-3 text-lg font-semibold text-white">{profile?.username || 'User'}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

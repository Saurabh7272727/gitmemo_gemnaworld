import { FaGithub } from "react-icons/fa";
import { FiArrowRight, FiZap } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function TopBar({ githubConnected }) {
    const state = localStorage.getItem('userId');
    const navigate = useNavigate();

    return (
        <div className="hero-panel overflow-hidden p-6 text-white md:p-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
                <div className="max-w-2xl">
                    <p className="eyebrow">Builder workspace</p>
                    <h1 className="mt-3 text-4xl font-bold leading-tight md:text-5xl">
                        Move from idea to shipped proof with a workspace that feels serious.
                    </h1>
                    <p className="muted-copy-dark mt-4 max-w-xl text-base">
                        Plan new projects, connect your GitHub app, manage team execution, and keep every contribution visible.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <button onClick={() => navigate('/gemna_gitmemo.html/idea-portal')} className="btn-primary">
                            <FiZap />
                            Start a Project
                        </button>
                        <button onClick={() => navigate('/gemna_gitmemo.html/contributions')} className="btn-secondary">
                            View Contribution Feed
                            <FiArrowRight />
                        </button>
                    </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="metric-card min-w-[180px]">
                        <p className="text-xs uppercase tracking-[0.22em] text-slate-400">GitHub App</p>
                        <div className="mt-4 flex items-center gap-3">
                            <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${githubConnected ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-200'}`}>
                                <FaGithub size={18} />
                            </div>
                            {githubConnected ? (
                                <div>
                                    <p className="font-semibold text-white">Connected</p>
                                    <p className="text-sm text-slate-400">Repo context is available</p>
                                </div>
                            ) : (
                                <a href={`https://github.com/apps/gemnaworld/installations/new?state=${state}`} className="text-sm font-semibold text-white underline decoration-teal-400/70 underline-offset-4">
                                    Connect GitHub App
                                </a>
                            )}
                        </div>
                    </div>

                    <div className="metric-card min-w-[180px]">
                        <p className="text-xs uppercase tracking-[0.22em] text-slate-400">Workspace Mode</p>
                        <p className="mt-4 font-['Space_Grotesk'] text-2xl font-bold text-white">Execution</p>
                        <p className="mt-2 text-sm text-slate-400">Track projects, tasks, and proof from one flow.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}



{/* <div>AuthHomePage</div>

<a href={`https://github.com/apps/gemnaworld/installations/new?state=${state}`}>
                click me
</a> */}

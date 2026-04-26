import { useState } from "react";
import {
    FiHome,
    FiUser,
    FiSend,
    FiChevronLeft,
    FiChevronRight,
    FiAward,
    FiFolderPlus,
    FiGrid,
    FiTrello,
} from "react-icons/fi";
import clsx from "clsx";
import { useLocation, useNavigate } from "react-router-dom";
import { Aperture, GitBranch } from 'lucide-react';


export default function Sidebar({ active, setActive }) {
    const [collapsed, setCollapsed] = useState(false);
    const navi = useNavigate();
    const location = useLocation();
    const currentUserId = localStorage.getItem('userId');
    const menuItems = [
        { name: "Home", icon: FiHome, path: "/gemna_gitmemo.html" },
        { name: "Profile", icon: FiUser, path: "/gemna_gitmemo.html/profile" },
        { name: "Created Repos", icon: GitBranch, path: "/gemna_gitmemo.html/invitation" },
        { name: "Ideas", icon: FiGrid, path: "/gemna_gitmemo.html/idea-portal" },
        { name: "Contributions", icon: FiSend, path: "/gemna_gitmemo.html/contributions" },
        { name: "Innovation", icon: Aperture, path: "/gemna_gitmemo.html/innovation-board" },
        { name: "Badges", icon: FiAward, path: currentUserId ? `/gemna_gitmemo.html/badges/${currentUserId}` : "/gemna_gitmemo.html/badges" },
        { name: "Skill Graph", icon: FiTrello, path: currentUserId ? `/gemna_gitmemo.html/skill-graph/${currentUserId}` : "/gemna_gitmemo.html/skill-graph" },
        { name: "Create Repo", icon: FiFolderPlus, path: "/gemna_gitmemo.html/create-repo" },
        { name: "Explore", icon: FiHome, path: "/gemna_gitmemo.html/explore" }
    ];

    return (
        <div
            className={clsx(
                "flex h-full flex-col border-b border-white/8 bg-[linear-gradient(180deg,rgba(5,12,23,0.98),rgba(9,19,33,0.96))] transition-all duration-300 lg:border-b-0 lg:border-r lg:border-white/8",
                collapsed ? "w-full lg:w-24" : "w-full lg:w-72"
            )}
        >
            <div className="flex items-center justify-between border-b border-white/8 p-5">
                {!collapsed && (
                    <div>
                        <h1 className="font-['Space_Grotesk'] text-xl font-bold text-white tracking-tight">Workspace</h1>
                        <p className="mt-1 text-xs uppercase tracking-[0.26em] text-teal-300/70">Builder mode</p>
                    </div>
                )}

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="rounded-2xl border border-white/10 bg-white/5 p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
                >
                    {collapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
                </button>
            </div>

            <div className="flex-1 space-y-2 overflow-y-auto p-3">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path || (item.path !== "/gemna_gitmemo.html" && location.pathname.startsWith(item.path));

                    return (
                        <button
                            key={item.name}
                            onClick={() => {
                                setActive?.(item.name);
                                navi(item.path);
                            }}
                            className={clsx(
                                "flex w-full items-center gap-4 rounded-2xl p-3 transition-all duration-200",
                                isActive
                                    ? "bg-[linear-gradient(135deg,#0f766e,#14b8a6)] text-white shadow-[0_14px_35px_rgba(20,184,166,0.26)]"
                                    : "text-slate-400 hover:bg-white/6 hover:text-white"
                            )}
                        >
                            <Icon size={20} />
                            {!collapsed && <span className="text-sm font-medium">{item.name}</span>}
                        </button>
                    );
                })}
            </div>

            <div className="border-t border-white/8 p-4 text-center text-xs text-slate-500">
                {!collapsed && "Projects, proof, and GitHub context in one place"}
            </div>
        </div>
    );
}

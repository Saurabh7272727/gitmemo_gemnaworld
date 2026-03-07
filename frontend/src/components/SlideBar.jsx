import { useState } from "react";
import {
    FiHome,
    FiUser,
    FiSend,
    FiChevronLeft,
    FiChevronRight,
} from "react-icons/fi";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { Aperture } from 'lucide-react';

const menuItems = [
    { name: "Home", icon: FiHome, path: "/gemna_gitmemo.html" },
    { name: "Profile", icon: FiUser, path: "/gemna_gitmemo.html/profile" },
    { name: "Invitation", icon: FiSend, path: "/gemna_gitmemo.html/invitation" },
    { name: "Explore", icon: Aperture, path: "/gemna_gitmemo.html/explore" }
];


export default function Sidebar({ active, setActive }) {
    const [collapsed, setCollapsed] = useState(false);
    const navi = useNavigate();
    return (
        <div
            className={clsx(
                "h-full bg-zinc-950 border-r border-zinc-800 transition-all duration-300 flex flex-col",
                collapsed ? "w-20" : "w-64"
            )}
        >
            <div className="flex items-center justify-between p-4 border-b border-zinc-800">
                {!collapsed && (
                    <h1 className="text-xl font-bold text-white tracking-wide">
                        GitMemo
                    </h1>
                )}

                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="text-zinc-400 hover:text-white transition"
                >
                    {collapsed ? <FiChevronRight size={20} /> : <FiChevronLeft size={20} />}
                </button>
            </div>

            <div className="flex-1 p-3 space-y-2">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = active === item.name;

                    return (
                        <button
                            key={item.name}
                            onClick={() => {
                                setActive(item.name);
                                navi(item.path);
                            }}
                            className={clsx(
                                "w-full flex items-center gap-4 p-3 rounded-xl transition-all duration-200",
                                isActive
                                    ? "bg-green-600 text-white shadow-md"
                                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                            )}
                        >
                            <Icon size={20} />
                            {!collapsed && <span className="text-sm font-medium">{item.name}</span>}
                        </button>
                    );
                })}
            </div>

            <div className="p-4 border-t border-zinc-800 text-xs text-zinc-500 text-center">
                {!collapsed && "Connected via GitHub"}
            </div>
        </div>
    );
}
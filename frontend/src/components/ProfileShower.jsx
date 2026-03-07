import React from "react";
import { motion } from "framer-motion";
import { Mail, Github, Calendar, Hash } from "lucide-react";

export default function ProfessionalUserProfileCard({ user }) {


    const formatDate = (date) =>
        new Date(date).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });

    return (
        <div className="h-fit flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-200 p-6 rounded-md">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-xl"
            >
                <div className="rounded-2xl shadow-xl bg-white p-8 space-y-6">
                    <div className="flex items-center gap-6">
                        <img
                            src={user.avatar}
                            alt={user.username}
                            className="h-24 w-24 rounded-full object-cover ring-4 ring-slate-100 shadow-md"
                        />

                        <div className="space-y-2">
                            <h2 className="text-2xl font-bold tracking-tight">
                                {user.username}
                            </h2>
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Github className="h-4 w-4" />
                                <span>GitHub ID: {user.githubId}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <InfoItem
                            icon={<Mail size={16} />}
                            label="Email"
                            value={user.email}
                        />
                        <InfoItem
                            icon={<Calendar size={16} />}
                            label="Created At"
                            value={formatDate(user.createdAt)}
                        />
                        <InfoItem
                            icon={<Calendar size={16} />}
                            label="Updated At"
                            value={formatDate(user.updatedAt)}
                        />
                        <InfoItem
                            icon={<Hash size={16} />}
                            label="Mongo ID"
                            value={'**********************'}
                        />
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold text-slate-600 uppercase tracking-wide">
                            Badges
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {user.badges.length > 0 ? (
                                user.badges.map((badge, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 text-xs rounded-xl bg-slate-100"
                                    >
                                        {badge}
                                    </span>
                                ))
                            ) : (
                                <span className="text-sm text-slate-400">
                                    No badges assigned
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="pt-4 border-t text-xs text-slate-400 flex justify-between">
                        <span>Version: {user.__v}</span>
                        <span>Internal ID: {user._id.slice(-6)}</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

function InfoItem({ icon, label, value }) {
    return (
        <div className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 hover:bg-slate-100 transition">
            <div className="text-slate-500 mt-1">{icon}</div>
            <div>
                <p className="text-xs text-slate-500 uppercase tracking-wide">
                    {label}
                </p>
                <p className="text-sm font-medium break-all">{value}</p>
            </div>
        </div>
    );
}

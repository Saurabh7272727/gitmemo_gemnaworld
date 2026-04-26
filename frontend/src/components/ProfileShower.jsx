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
        <div className="panel h-fit p-0">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full"
            >
                <div className="space-y-6 p-6 md:p-8">
                    <div className="flex items-center gap-6">
                        <img
                            src={user.avatar}
                            alt={user.username}
                            className="h-24 w-24 rounded-[28px] object-cover ring-4 ring-teal-100 shadow-md"
                        />

                        <div className="space-y-2">
                            <p className="eyebrow">Synced account</p>
                            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                                {user.username}
                            </h2>
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Github className="h-4 w-4" />
                                <span>GitHub ID: {user.githubId}</span>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <InfoItem icon={<Mail size={16} />} label="Email" value={user.email} />
                        <InfoItem icon={<Calendar size={16} />} label="Created At" value={formatDate(user.createdAt)} />
                        <InfoItem icon={<Calendar size={16} />} label="Updated At" value={formatDate(user.updatedAt)} />
                        <InfoItem icon={<Hash size={16} />} label="Mongo ID" value={'**********************'} />
                    </div>

                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-600">
                            Badges
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {user.badges.length > 0 ? (
                                user.badges.map((badge, index) => (
                                    <span
                                        key={index}
                                        className="rounded-xl bg-teal-50 px-3 py-1 text-xs text-teal-800"
                                    >
                                        {badge?.type || badge}
                                    </span>
                                ))
                            ) : (
                                <span className="text-sm text-slate-400">
                                    No badges assigned
                                </span>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-between border-t pt-4 text-xs text-slate-400">
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
        <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4 transition hover:bg-white">
            <div className="mt-1 text-slate-500">{icon}</div>
            <div>
                <p className="text-xs uppercase tracking-wide text-slate-500">
                    {label}
                </p>
                <p className="break-all text-sm font-medium">{value}</p>
            </div>
        </div>
    );
}

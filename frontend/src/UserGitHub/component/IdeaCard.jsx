import { FaMapMarkerAlt, FaUserPlus } from "react-icons/fa";

export default function IdeaCard({ idea }) {
    return (
        <div className="panel-dark transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/40">

            <h3 className="text-xl font-semibold text-white">
                {idea.title}
            </h3>

            <div className="mt-3 flex items-center gap-2 text-sm text-slate-400">
                <FaMapMarkerAlt />
                {idea.city}, {idea.state}
            </div>

            <p className="mt-4 text-sm leading-6 text-slate-300 line-clamp-2">
                {idea.description}
            </p>

            <div className="mt-5 flex items-center justify-between">
                <span className="status-pill bg-white/8 text-teal-300">
                    {idea.tech}
                </span>

                <button className="btn-primary px-4 py-2 text-sm">
                    <FaUserPlus />
                    Join
                </button>
            </div>
        </div>
    );
}

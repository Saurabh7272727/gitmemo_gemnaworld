import { FaMapMarkerAlt, FaUserPlus } from "react-icons/fa";

export default function IdeaCard({ idea }) {
    return (
        <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 hover:border-green-500 transition-all duration-300 hover:shadow-xl">

            <h3 className="text-lg font-semibold text-white">
                {idea.title}
            </h3>

            <div className="flex items-center gap-2 text-zinc-400 text-sm mt-2">
                <FaMapMarkerAlt />
                {idea.city}, {idea.state}
            </div>

            <p className="text-zinc-400 text-sm mt-3 line-clamp-2">
                {idea.description}
            </p>

            <div className="flex justify-between items-center mt-4">
                <span className="text-xs bg-zinc-800 px-3 py-1 rounded-full text-green-400">
                    {idea.tech}
                </span>

                <button className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl text-sm transition">
                    <FaUserPlus />
                    Join
                </button>
            </div>
        </div>
    );
}
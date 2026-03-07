export default function StatsBar({ repos }) {
    const total = repos.length;
    const publicCount = repos.filter(r => r.visibility === "public").length;
    const privateCount = repos.filter(r => r.visibility === "private").length;

    const languages = [...new Set(repos.map(r => r.language).filter(Boolean))];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            <Stat title="Total Repos" value={total} />
            <Stat title="Public" value={publicCount} />
            <Stat title="Private" value={privateCount} />
            <Stat title="Languages" value={languages.length} />
        </div>
    );
}

function Stat({ title, value }) {
    return (
        <div className="bg-zinc-900 p-5 rounded-xl border border-zinc-800 text-center">
            <p className="text-zinc-400 text-sm">{title}</p>
            <h3 className="text-2xl font-bold text-white">{value}</h3>
        </div>
    );
}
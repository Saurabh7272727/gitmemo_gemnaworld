export default function StatsBar({ repos }) {
    const total = repos.length;
    const publicCount = repos.filter((r) => r.visibility === "public").length;
    const privateCount = repos.filter((r) => r.visibility === "private").length;
    const languages = [...new Set(repos.map((r) => r.language).filter(Boolean))];

    return (
        <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            <Stat title="Total Repos" value={total} />
            <Stat title="Public" value={publicCount} />
            <Stat title="Private" value={privateCount} />
            <Stat title="Languages" value={languages.length} />
        </div>
    );
}

function Stat({ title, value }) {
    return (
        <div className="panel text-center">
            <p className="text-sm uppercase tracking-[0.18em] text-slate-500">{title}</p>
            <h3 className="mt-3 text-3xl font-bold text-slate-900">{value}</h3>
        </div>
    );
}

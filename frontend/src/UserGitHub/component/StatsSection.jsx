export default function StatsSection() {
    const stats = [
        { label: "Projects", value: "1.2K+" },
        { label: "Students", value: "8.5K+" },
        { label: "Cities", value: "120+" },
        { label: "Active Teams", value: "430+" },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 text-center"
                >
                    <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                    <p className="text-zinc-400 mt-2 text-sm">{stat.label}</p>
                </div>
            ))}
        </div>
    );
}
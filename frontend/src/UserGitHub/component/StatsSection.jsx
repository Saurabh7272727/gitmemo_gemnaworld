export default function StatsSection() {
    const stats = [
        { label: "Projects", value: "1.2K+" },
        { label: "Students", value: "8.5K+" },
        { label: "Cities", value: "120+" },
        { label: "Active Teams", value: "430+" },
    ];

    return (
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((stat) => (
                <div
                    key={stat.label}
                    className="panel-dark text-center"
                >
                    <h3 className="text-3xl font-bold text-white">{stat.value}</h3>
                    <p className="mt-2 text-sm uppercase tracking-[0.18em] text-slate-400">{stat.label}</p>
                </div>
            ))}
        </div>
    );
}

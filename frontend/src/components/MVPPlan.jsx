import React from 'react';
import { motion } from 'framer-motion';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';

const MVPPlan = () => {
    const days = [
        {
            day: "Day 1",
            icon: <SunIcon className="w-8 h-8" />,
            tasks: [
                "Authentication System",
                "Project Creation Flow",
                "Join Project Feature",
                "Task Assignment Module"
            ],
            color: "from-yellow-400 to-orange-500",
            bgColor: "bg-gradient-to-br from-yellow-50 to-orange-50"
        },
        {
            day: "Day 2",
            icon: <MoonIcon className="w-8 h-8" />,
            tasks: [
                "Contribution Score Logic",
                "Badge Generation System",
                "Dashboard Visualization",
                "Final Pitch Preparation"
            ],
            color: "from-indigo-400 to-purple-600",
            bgColor: "bg-gradient-to-br from-indigo-50 to-purple-50"
        }
    ];

    return (
        <section className="py-20">
            <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">
                2-Day MVP Execution Plan
            </h2>
            <p className="text-xl text-center text-gray-600 mb-12">
                From idea to working prototype in just 48 hours
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {days.map((day, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        className={`${day.bgColor} rounded-2xl shadow-xl p-8 border-2 border-transparent hover:border-${day.color.split('-')[1]}-200`}
                    >
                        <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${day.color} text-white mb-6`}>
                            {day.icon}
                        </div>
                        <h3 className="text-3xl font-bold text-gray-900 mb-6">{day.day}</h3>
                        <ul className="space-y-4">
                            {day.tasks.map((task, idx) => (
                                <motion.li
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.2 + idx * 0.1 }}
                                    className="flex items-center"
                                >
                                    <span className={`inline-block w-3 h-3 rounded-full bg-gradient-to-r ${day.color} mr-3`} />
                                    <span className="text-gray-700 text-lg">{task}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default MVPPlan;
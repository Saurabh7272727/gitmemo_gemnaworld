import React from 'react';
import { motion } from 'framer-motion';
import {
    ChartBarIcon,
    SparklesIcon,
    GlobeAltIcon,
    ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { useInView } from 'react-intersection-observer';

const AdvancedFeatures = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const advancedFeatures = [
        {
            icon: <ChartBarIcon className="w-10 h-10" />,
            title: "Contribution Proof Engine",
            points: [
                "Calculates measurable contribution percentage",
                "Tracks tasks completed & peer validation",
                "Dynamic contribution score generation"
            ],
            color: "from-purple-600 to-pink-600",
        },
        {
            icon: <SparklesIcon className="w-10 h-10" />,
            title: "Skill Graph Dashboard",
            points: [
                "Visual representation of skills",
                "Collaboration diversity tracking",
                "Data-backed skill validation"
            ],
            color: "from-blue-600 to-indigo-600",
        },
        {
            icon: <GlobeAltIcon className="w-10 h-10" />,
            title: "Open Innovation Board",
            points: [
                "Public problem-posting board",
                "Join as solver or contributor",
                "Idea incubation platform"
            ],
            color: "from-green-600 to-teal-600",
        },
        {
            icon: <ShieldCheckIcon className="w-10 h-10" />,
            title: "Reputation & Reliability Score",
            points: [
                "Project completion rate tracking",
                "Team reliability calculation",
                "Long-term credibility building"
            ],
            color: "from-red-600 to-orange-600",
        }
    ];

    return (
        <section ref={ref} className="py-20 bg-gray-50 rounded-3xl px-8">
            <motion.div
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                className="text-center mb-12"
            >
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Advanced Features
                </h2>
                <p className="text-xl text-gray-600">
                    Next-generation tools for serious collaborators
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {advancedFeatures.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                        animate={inView ? { x: 0, opacity: 1 } : {}}
                        transition={{ delay: index * 0.2 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white rounded-2xl shadow-xl overflow-hidden"
                    >
                        <div className={`h-3 bg-gradient-to-r ${feature.color}`} />
                        <div className="p-8">
                            <div className="flex items-center mb-6">
                                <div className={`p-4 rounded-xl bg-gradient-to-r ${feature.color} text-white mr-4`}>
                                    {feature.icon}
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900">
                                        {feature.title}
                                    </h3>
                                    <span className="text-2xl text-gray-900">
                                        Gemna COP
                                    </span>
                                </div>
                            </div>
                            <ul className="space-y-3">
                                {feature.points.map((point, idx) => (
                                    <motion.li
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={inView ? { opacity: 1, x: 0 } : {}}
                                        transition={{ delay: index * 0.2 + idx * 0.1 }}
                                        className="flex items-start"
                                    >
                                        <span className={`inline-block w-2 h-2 rounded-full bg-gradient-to-r ${feature.color} mt-2 mr-3`} />
                                        <span className="text-gray-700">{point}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};

export default AdvancedFeatures;
import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
    LightBulbIcon,
    UserGroupIcon,
    CalendarIcon,
    ClipboardDocumentCheckIcon,
    TrophyIcon,
    DocumentCheckIcon
} from '@heroicons/react/24/outline';

const MainFeatures = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const features = [
        {
            icon: <LightBulbIcon className="w-8 h-8" />,
            title: "Idea Portal",
            description: "Create your project idea with tech stack, required roles, and team size configuration",
            color: "from-yellow-400 to-orange-500"
        },
        {
            icon: <UserGroupIcon className="w-8 h-8" />,
            title: "Open Join System",
            description: "Collaborate with students from any college - break the boundaries",
            color: "from-green-400 to-emerald-500"
        },
        {
            icon: <CalendarIcon className="w-8 h-8" />,
            title: "Task & Deadline Tracking",
            description: "Assign tasks, set deadlines, and track progress efficiently",
            color: "from-blue-400 to-indigo-500"
        },
        {
            icon: <ClipboardDocumentCheckIcon className="w-8 h-8" />,
            title: "Contribution Logging",
            description: "Role-based management with detailed contribution tracking",
            color: "from-purple-400 to-pink-500"
        },
        {
            icon: <TrophyIcon className="w-8 h-8" />,
            title: "Badges & Certificates",
            description: "Earn verified badges and certificates on project completion",
            color: "from-red-400 to-rose-500"
        },
        {
            icon: <DocumentCheckIcon className="w-8 h-8" />,
            title: "Resume Verification",
            description: "Public proof links for authentic experience validation",
            color: "from-teal-400 to-cyan-500"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100
            }
        }
    };

    return (
        <section ref={ref} className="py-20">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6 }}
                className="text-center mb-12"
            >
                <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Core Features
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Everything you need to turn ideas into verified achievements
                </p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate={inView ? "visible" : "hidden"}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05, y: -5 }}
                        className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
                    >
                        <div className={`h-2 bg-gradient-to-r ${feature.color}`} />
                        <div className="p-8">
                            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.color} text-white mb-4`}>
                                {feature.icon}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">
                                {feature.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </section>
    );
};

export default MainFeatures;
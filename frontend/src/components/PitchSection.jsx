import React from 'react';
import { motion } from 'framer-motion';
import { RocketLaunchIcon } from '@heroicons/react/24/outline';

const PitchSection = () => {
    return (
        <motion.section
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="py-20 text-center"
        >
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-12 shadow-2xl">
                <motion.div
                    animate={{
                        y: [0, -10, 0],
                        rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        repeatType: "reverse"
                    }}
                    className="inline-flex p-4 bg-white/20 rounded-full mb-6"
                >
                    <RocketLaunchIcon className="w-16 h-16 text-white" />
                </motion.div>

                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    One-Line Pitch
                </h2>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-2xl md:text-3xl text-white/90 max-w-3xl mx-auto leading-relaxed"
                >
                    "GitMemo transforms student ideas into
                    <span className="font-bold text-yellow-300"> verified collaborative achievements</span>"
                </motion.p>
            </div>
        </motion.section>
    );
};

export default PitchSection;
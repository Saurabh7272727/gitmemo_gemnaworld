import React from 'react';

const Footer = () => {
    return (
        <footer className="mt-16 border-t border-white/10 bg-slate-950/60 py-10 text-slate-300">
            <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-4 px-4 text-center md:flex-row md:items-center md:justify-between md:px-6 md:text-left">
                <div>
                    <p className="font-['Space_Grotesk'] text-lg font-bold text-white">GitMemo</p>
                    <p className="text-sm text-slate-400">Student collaboration, proof of work, and project identity in one workspace.</p>
                </div>
                <div className="text-sm text-slate-400">
                    <p>Copyright 2026 GitMemo. All rights reserved.</p>
                    <p className="mt-1 uppercase tracking-[0.24em] text-teal-300/70">HackIndia build</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

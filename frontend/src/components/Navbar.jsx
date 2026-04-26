import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useLocation, useNavigate } from 'react-router-dom';
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    const navi = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const syncAuth = () => setIsAuth(Boolean(localStorage.getItem('userId')));
        syncAuth();
        window.addEventListener('focus', syncAuth);
        return () => window.removeEventListener('focus', syncAuth);
    }, [location.pathname]);

    const guestLinks = [
        { label: 'Vision', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
        { label: 'Login', action: () => navi('/login') },
        { label: 'Sign Up', action: () => navi('/signup') },
    ];

    const memberLinks = [
        { label: 'Workspace', action: () => navi('/gemna_gitmemo.html') },
        { label: 'Projects', action: () => navi('/gemna_gitmemo.html/idea-portal') },
        { label: 'Contributions', action: () => navi('/gemna_gitmemo.html/contributions') },
    ];

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
                ? 'border-b border-white/10 bg-slate-950/82 shadow-[0_16px_50px_rgba(2,6,23,0.28)] backdrop-blur-xl'
                : 'bg-transparent'
                }`}
        >
            <div className="mx-auto flex h-20 w-full max-w-[1440px] items-center justify-between px-4 md:px-6">
                <div className="flex items-center gap-4">
                    <motion.div
                        onClick={() => navi('/')}
                        whileHover={{ scale: 1.05 }}
                        className="flex cursor-pointer items-center gap-3"
                    >
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                            <img src="/logoSymbol.png" alt="GitMemo logo" className="h-7 w-7 object-contain" />
                        </div>
                        <div>
                            <p className="font-['Space_Grotesk'] text-xl font-bold text-white">GitMemo</p>
                            <p className="text-xs uppercase tracking-[0.26em] text-teal-300/80">Build verified work</p>
                        </div>
                    </motion.div>
                </div>

                <div className="hidden items-center gap-3 md:flex">
                    {(isAuth ? memberLinks : guestLinks).map((link) => (
                        <button
                            key={link.label}
                            onClick={link.action}
                            className="rounded-full px-4 py-2 text-sm font-medium text-slate-200/88 transition hover:bg-white/6 hover:text-white"
                        >
                            {link.label}
                        </button>
                    ))}
                    {isAuth ? (
                        <button
                            onClick={() => {
                                localStorage.removeItem('userId');
                                localStorage.removeItem('ownerId');
                                localStorage.removeItem('installation_id');
                                setIsAuth(false);
                                navi('/');
                            }}
                            className="btn-secondary px-4 py-2 text-sm"
                        >
                            Logout
                        </button>
                    ) : (
                        <button onClick={() => navi('/login')} className="btn-primary px-4 py-2 text-sm">
                            Open Workspace
                        </button>
                    )}
                </div>

                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="rounded-2xl border border-white/10 bg-white/5 p-2 text-slate-200 md:hidden"
                >
                    {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                </button>
            </div>

            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={isOpen ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                className="mx-4 overflow-hidden rounded-b-[24px] border-x border-b border-white/10 bg-slate-950/96 shadow-[0_22px_70px_rgba(2,6,23,0.32)] backdrop-blur-xl md:hidden"
            >
                <div className="space-y-2 px-4 py-4">
                    {(isAuth ? memberLinks : guestLinks).map((link) => (
                        <button
                            key={link.label}
                            onClick={() => {
                                setIsOpen(false);
                                link.action();
                            }}
                            className="block w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-slate-200 transition hover:bg-white/6"
                        >
                            {link.label}
                        </button>
                    ))}
                </div>
            </motion.div>
        </motion.nav>
    );
};

export default Navbar;

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isAuth, setIsAuth] = useState(false);

    const navi = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (localStorage.getItem('userId')) {
            setIsAuth(true);
        }

    }, [localStorage.getItem('userId')])

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
                }`}
        >
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center h-20">
                    <motion.div
                        onClick={() => navi('/')}
                        whileHover={{ scale: 1.05 }}
                        className="cursor-pointer"
                    >
                        <h1 className='flex justify-center items-center gap-x-1 cursor-pointer'>
                            <img src="../../logoSymbol.png" alt="logoimage"
                                className='w-15 h-12 object-contain'
                            />
                            <span className='text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                                Gemna
                            </span>
                        </h1>
                    </motion.div>
                    {
                        isAuth ? <div>

                            <motion.a
                                onClick={() => navi('/gemna_gitmemo.html')}
                                whileHover={{ scale: 1 }}
                                className="text-gray-700 hover:text-blue-600 font-medium transition-colors cursor-pointer"
                            >
                                Go-to-memo
                            </motion.a>
                            <motion.a
                                onClick={() => {
                                    localStorage.removeItem('userId');
                                    setIsAuth(false);
                                    setTimeout(() => {
                                        navi('/')
                                    })
                                }}
                                whileHover={{ scale: 1 }}
                                className="text-gray-700 ml-3 hover:text-blue-600 font-medium transition-colors cursor-pointer"
                            >
                                Logout
                            </motion.a>

                        </div> :
                            <div className="hidden md:flex space-x-8">

                                <motion.a
                                    onClick={() => navi('/login')}
                                    whileHover={{ scale: 1.1 }}
                                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors cursor-pointer"
                                >
                                    login
                                </motion.a>
                                <motion.a
                                    onClick={() => navi("/signup")}
                                    whileHover={{ scale: 1.1 }}
                                    className="text-gray-700 hover:text-blue-600 font-medium transition-colors cursor-pointer"
                                >
                                    signup
                                </motion.a>
                            </div>
                    }



                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="md:hidden text-gray-700"
                    >
                        {isOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
                    </button>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={isOpen ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                className="md:hidden bg-white border-t"
            >
                <div className="container mx-auto px-4 py-4">
                    {['login/signup'].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            className="block py-2 text-gray-700 hover:text-blue-600"
                            onClick={() => setIsOpen(false)}
                        >
                            {item}
                        </a>
                    ))}
                </div>
            </motion.div>
        </motion.nav>
    );
};

export default Navbar;
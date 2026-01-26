import React, { useState } from 'react';
import { Menu, X, Globe, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    const isActive = (path: string) => location.pathname === path;

    return (
        <nav className="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">

                    {/* Logo */}
                    <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
                        <div className="bg-brand-orange p-2 rounded-lg group-hover:scale-105 transition-transform">
                            <Globe className="text-white w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold text-brand-dark">
                            MWA <span className="text-brand-blue">MKHULU</span>
                        </span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-center space-x-8">
                            <Link
                                to="/"
                                className={`text-sm font-bold transition-colors ${isActive('/') ? 'text-brand-blue' : 'text-gray-500 hover:text-brand-blue'}`}
                            >
                                Home
                            </Link>
                            <Link
                                to="/agents"
                                className={`text-sm font-bold transition-colors ${isActive('/agents') ? 'text-brand-blue' : 'text-gray-500 hover:text-brand-blue'}`}
                            >
                                Find an Agent
                            </Link>
                            <Link
                                to="/dashboard"
                                className={`text-sm font-bold transition-colors ${isActive('/dashboard') ? 'text-brand-blue' : 'text-gray-500 hover:text-brand-blue'}`}
                            >
                                My Projects
                            </Link>
                            <div className='flex items-center gap-4 border-l pl-8 border-gray-200'>
                                <Link to="/login" className="text-sm font-bold text-gray-500 hover:text-brand-dark">Log In</Link>
                                <Link to="/post-job" className="bg-brand-blue hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-lg shadow-brand-blue/20">
                                    Post a Job
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden">
                        <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 hover:text-brand-dark p-2">
                            {isOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden bg-white border-b border-gray-200 shadow-xl"
                >
                    <div className="px-4 pt-2 pb-6 space-y-2">
                        <Link to="/" className="block px-3 py-3 text-base font-medium text-gray-600 hover:bg-gray-50 rounded-lg">Home</Link>
                        <Link to="/agents" className="block px-3 py-3 text-base font-medium text-gray-600 hover:bg-gray-50 rounded-lg">Find an Agent</Link>
                        <Link to="/dashboard" className="block px-3 py-3 text-base font-medium text-gray-600 hover:bg-gray-50 rounded-lg">My Projects</Link>
                        <div className="h-px bg-gray-100 my-2" />
                        <Link to="/post-job" className="block w-full text-center mt-4 bg-brand-blue text-white px-4 py-3 rounded-lg font-bold">
                            Post a Job
                        </Link>
                    </div>
                </motion.div>
            )}
        </nav>
    );
};

export default Navbar;

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-brand-dark pt-20">

            {/* Background Image - Multi-sector collage concept or generic landscape 
          Using a broader image showing land/development
      */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=2674&auto=format&fit=crop"
                    alt="Kenyan Landscape and Development"
                    className="w-full h-full object-cover opacity-30"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center sm:text-left">
                <div className="grid md:grid-cols-2 gap-12 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 1, x: 0 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-blue/10 border border-brand-blue/20 mb-6">
                            <span className="text-brand-blue font-bold text-sm tracking-wide uppercase">Your Eyes & Ears on the Ground</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-extrabold text-white leading-tight mb-6">
                            Connect with Trusted <br />
                            <span className="text-brand-blue">Agents in Kenya.</span>
                        </h1>

                        <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                            Whether it's construction, managing your farm, or handling logistics.
                            Mwa Mkhulu connects you with verified professionals to get the job done right.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <button className="bg-brand-orange hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-orange-500/20 transition-all">
                                Find an Agent <ArrowRight size={20} />
                            </button>
                            <button className="bg-white hover:bg-gray-100 text-brand-dark px-8 py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all">
                                Our Services
                            </button>
                        </div>

                        <div className="mt-10 flex items-center gap-6 text-sm font-medium text-gray-400">
                            <span className="flex items-center gap-2"><CheckCircle size={16} className="text-brand-blue" /> Construction</span>
                            <span className="flex items-center gap-2"><CheckCircle size={16} className="text-brand-blue" /> Farming</span>
                            <span className="flex items-center gap-2"><CheckCircle size={16} className="text-brand-blue" /> Logistics</span>
                        </div>
                    </motion.div>

                    {/* Floating UI Card - "The Solution" */}
                    <motion.div
                        initial={{ opacity: 1, y: 0 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="hidden md:block relative"
                    >
                        {/* Visualizing diverse activities */}
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-brand-dark/50 backdrop-blur-sm">
                            <div className="grid grid-cols-2 gap-2 p-2">
                                <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2653&auto=format&fit=crop" className="rounded-xl h-40 w-full object-cover" alt="Home" />
                                <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2670&auto=format&fit=crop" className="rounded-xl h-40 w-full object-cover" alt="Farm" />
                            </div>

                            {/* Floating "Live Status" Badge */}
                            <div className="p-6">
                                <div className="flex items-center justify-between mb-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2574&auto=format&fit=crop" alt="Agent" />
                                        </div>
                                        <div>
                                            <div className="font-bold text-white">John Kamau</div>
                                            <div className="text-xs text-brand-blue">Farm Manager • Nakuru</div>
                                        </div>
                                    </div>
                                    <span className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-bold">Verified</span>
                                </div>
                                <div className="text-sm text-gray-300">
                                    "Weekly fertilizer application complete. Maize crop inspection report uploaded."
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Hero;

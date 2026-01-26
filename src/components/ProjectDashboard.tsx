import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Wallet, CheckCircle, Camera, Clock, AlertCircle } from 'lucide-react';

const ProjectDashboard = () => {
    // Example: Farm Management Project
    const milestones = [
        { title: "Soil Testing", status: "completed", date: "Jan 10" },
        { title: "Ploughing", status: "completed", date: "Jan 24" },
        { title: "Fertilizer App", status: "in-progress", date: "Due Feb 10" },
        { title: "Planting", status: "locked", date: "Pending Rain" },
        { title: "Weeding", status: "locked", date: "Pending" },
    ];

    return (
        <section id="dashboard" className="py-24 bg-brand-bg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-brand-dark mb-4">My Project: Nakuru Farm Revamp 🚜</h2>
                    <div className="flex gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1"><Calendar size={16} /> Season 1 • 2026</span>
                        <span className="flex items-center gap-1"><Wallet size={16} /> Budget: KES 500k</span>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Main Progress Feed */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Timeline */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold mb-6">Activity Roadmap</h3>
                            <div className="relative">
                                <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 -translate-y-1/2 rounded-full" />
                                <div className="absolute top-1/2 left-0 h-1 bg-brand-blue -translate-y-1/2 rounded-full w-[45%]" />

                                <div className="grid grid-cols-5 relative z-10">
                                    {milestones.map((m, i) => (
                                        <div key={i} className="flex flex-col items-center text-center">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 mb-2 bg-white transition-colors ${m.status === 'completed' ? 'border-brand-blue text-brand-blue' :
                                                    m.status === 'in-progress' ? 'border-brand-orange text-brand-orange animate-pulse' :
                                                        'border-gray-200 text-gray-300'
                                                }`}>
                                                {m.status === 'completed' && <CheckCircle size={14} />}
                                                {m.status === 'in-progress' && <Clock size={14} />}
                                                {m.status === 'locked' && <div className="w-2 h-2 rounded-full bg-gray-200" />}
                                            </div>
                                            <span className={`text-xs font-semibold ${m.status === 'locked' ? 'text-gray-400' : 'text-gray-800'}`}>{m.title}</span>
                                            <span className="text-[10px] text-gray-400 mt-1">{m.date}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Photo Updates Grid */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <Camera size={20} className="text-brand-orange" /> Proof of Work
                                </h3>
                                <span className="text-sm text-brand-blue font-medium bg-brand-blue/5 px-3 py-1 rounded-full">
                                    GPS Verified • 5 Acres
                                </span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                <img
                                    src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2670&auto=format&fit=crop"
                                    alt="Farm Update 1"
                                    className="rounded-lg h-32 w-full object-cover hover:scale-105 transition-transform cursor-pointer"
                                />
                                <img
                                    src="https://images.unsplash.com/photo-1592982537447-6f2a6a0c7c18?q=80&w=2670&auto=format&fit=crop"
                                    alt="Farm Update 2"
                                    className="rounded-lg h-32 w-full object-cover hover:scale-105 transition-transform cursor-pointer"
                                />
                                <div className="rounded-lg h-32 w-full bg-gray-50 flex flex-col items-center justify-center border-2 border-dashed border-gray-200 text-gray-400 hover:border-brand-blue hover:text-brand-blue cursor-pointer transition-colors">
                                    <span className="text-2xl font-bold">+5</span>
                                    <span className="text-xs">Reports</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Sidebar - Financials & Alerts */}
                    <div className="space-y-6">
                        <div className="bg-brand-dark text-white p-6 rounded-2xl shadow-lg relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/20 rounded-full blur-3xl -mr-10 -mt-10" />
                            <h3 className="text-lg font-bold mb-4">Input Costs</h3>
                            <div className="mb-4">
                                <div className="text-gray-400 text-xs mb-1">Total Disbursed</div>
                                <div className="text-3xl font-bold">KES 200k</div>
                                <div className="w-full bg-white/10 h-1.5 rounded-full mt-2">
                                    <div className="bg-brand-orange h-1.5 rounded-full w-[40%]"></div>
                                </div>
                                <div className="text-right text-xs text-brand-orange mt-1">40% of Budget</div>
                            </div>
                            <button className="w-full bg-white/10 hover:bg-white/20 text-white py-2 rounded-lg text-sm font-medium transition-colors border border-white/10">
                                View Receipts
                            </button>
                        </div>

                        <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
                            <h3 className="text-brand-dark font-bold mb-2 flex items-center gap-2">
                                <AlertCircle size={18} className="text-brand-blue" /> Action Item
                            </h3>
                            <p className="text-brand-dark text-sm mb-4">
                                Farm Manager recommends DAP Fertilizer purchase (10 Bags).
                            </p>
                            <div className="flex gap-2">
                                <button className="flex-1 bg-brand-blue text-white py-2 rounded-lg text-sm font-medium hover:bg-blue-600">Approve</button>
                                <button className="flex-1 bg-white text-brand-blue border border-brand-blue/20 py-2 rounded-lg text-sm font-medium hover:bg-blue-50">Decline</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default ProjectDashboard;

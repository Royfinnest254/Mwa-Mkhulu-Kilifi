import React, { useState } from 'react';
import { Calendar, Wallet, CheckCircle, Camera, Clock, AlertCircle, FileText, ChevronRight, Download } from 'lucide-react';

const Dashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');

    const milestones = [
        { title: "Foundation", status: "completed", date: "Oct 12, 2025" },
        { title: "Walling", status: "completed", date: "Nov 05, 2025" },
        { title: "Roofing", status: "in-progress", date: "Est. Jan 30" },
        { title: "Plumbing", status: "locked", date: "Pending" },
        { title: "Finishing", status: "locked", date: "Pending" },
    ];

    return (
        <div className="pt-24 pb-20 bg-brand-bg min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Project Header */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <span className="bg-brand-blue/10 text-brand-blue px-3 py-1 rounded-full text-xs font-bold uppercase">Construction</span>
                                <span className="text-green-600 flex items-center gap-1 text-xs font-bold"><div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> Active</span>
                            </div>
                            <h1 className="text-2xl font-bold text-brand-dark">Kileleshwa Apartments Block A</h1>
                            <p className="text-gray-500 text-sm flex items-center gap-2 mt-1">
                                <Calendar size={14} /> Started Sept 2025 • Agent: BuildRight Kenya
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <button className="bg-white border border-gray-200 text-gray-600 px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-gray-50">
                                <FileText size={16} /> Reports
                            </button>
                            <button className="bg-brand-blue text-white px-6 py-2 rounded-lg font-bold text-sm shadow-lg shadow-brand-blue/20">
                                Message Agent
                            </button>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Timeline - ENHANCED */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
                                <Clock size={20} className="text-brand-orange" /> Construction Roadmap
                            </h3>
                            <div className="relative pl-4">
                                {/* Vertical Line */}
                                <div className="absolute top-0 bottom-0 left-[19px] w-0.5 bg-gray-100" />

                                <div className="space-y-8 relative">
                                    {milestones.map((m, i) => (
                                        <div key={i} className="flex gap-6 items-start group">
                                            {/* Icon */}
                                            <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-colors ${m.status === 'completed' ? 'bg-brand-blue text-white' :
                                                    m.status === 'in-progress' ? 'bg-brand-orange text-white' :
                                                        'bg-gray-100 text-gray-400'
                                                }`}>
                                                {m.status === 'completed' && <CheckCircle size={18} />}
                                                {m.status === 'in-progress' && <Clock size={18} className="animate-spin-slow" />}
                                                {m.status === 'locked' && <div className="w-3 h-3 rounded-full bg-gray-300" />}
                                            </div>

                                            {/* Content */}
                                            <div className={`flex-1 p-4 rounded-xl border transition-all ${m.status === 'in-progress' ? 'bg-brand-orange/5 border-brand-orange/20' : 'bg-white border-gray-100'
                                                }`}>
                                                <div className="flex justify-between items-center mb-1">
                                                    <h4 className={`font-bold ${m.status === 'locked' ? 'text-gray-400' : 'text-brand-dark'}`}>{m.title}</h4>
                                                    <span className="text-xs text-gray-400 font-medium">{m.date}</span>
                                                </div>
                                                <p className="text-sm text-gray-500">
                                                    {m.status === 'completed' ? 'Verified by Site Engineer.' :
                                                        m.status === 'in-progress' ? 'Currently installing trusted roofing materials.' :
                                                            'Waiting for previous phase.'}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Photo Gallery - ENHANCED */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-bold flex items-center gap-2">
                                    <Camera size={20} className="text-brand-blue" /> Site Gallery
                                </h3>
                                <button className="text-brand-blue text-sm font-bold flex items-center gap-1 hover:underline">
                                    View All Photos <ChevronRight size={16} />
                                </button>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=2670&auto=format&fit=crop",
                                    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2531&auto=format&fit=crop",
                                    "https://images.unsplash.com/photo-1590674899505-1c5c4195c361?q=80&w=2670&auto=format&fit=crop",
                                    "https://images.unsplash.com/photo-1531834685032-c34bf0d84c7c?q=80&w=2597&auto=format&fit=crop"
                                ].map((src, i) => (
                                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer">
                                        <img src={src} alt={`Site Update ${i}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    {/* Sidebar - Financials & Approvals */}
                    <div className="space-y-6">

                        {/* Financial Card */}
                        <div className="bg-brand-dark text-white p-6 rounded-2xl shadow-xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-40 h-40 bg-brand-blue/20 rounded-full blur-3xl -mr-10 -mt-10" />
                            <div className="flex items-center gap-2 mb-6">
                                <div className="p-2 bg-white/10 rounded-lg"><Wallet size={20} /></div>
                                <h3 className="text-lg font-bold">Project Wallet</h3>
                            </div>

                            <div className="mb-6">
                                <div className="flex justify-between text-sm text-gray-400 mb-1">
                                    <span>Total Disbursed</span>
                                    <span>75%</span>
                                </div>
                                <div className="text-3xl font-bold mb-3">KES 4.2M</div>
                                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                    <div className="bg-green-500 h-full rounded-full w-[75%] shadow-[0_0_10px_rgba(34,197,94,0.5)]"></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                    <span>Budget: 5.6M</span>
                                    <span>Remaining: 1.4M</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm py-2 border-b border-white/10">
                                    <span className="text-gray-300">Materials (Cement)</span>
                                    <span className="font-mono text-orange-400">-50k</span>
                                </div>
                                <div className="flex items-center justify-between text-sm py-2 border-b border-white/10">
                                    <span className="text-gray-300">Labor (Week 4)</span>
                                    <span className="font-mono text-orange-400">-120k</span>
                                </div>
                            </div>

                            <button className="w-full mt-6 bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl text-sm font-bold transition-colors flex items-center justify-center gap-2">
                                <Download size={16} /> Download Statement
                            </button>
                        </div>

                        {/* Approvals Card */}
                        <div className="bg-white p-6 rounded-2xl shadow-sm border border-red-100">
                            <h3 className="text-brand-dark font-bold mb-4 flex items-center gap-2">
                                <AlertCircle size={20} className="text-red-500" /> Pending Approval
                            </h3>

                            <div className="p-4 bg-gray-50 rounded-xl mb-4 border border-gray-100">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="font-bold text-sm text-gray-800">Roofing Tiles Purchase</span>
                                    <span className="bg-brand-blue/10 text-brand-blue text-[10px] font-bold px-2 py-0.5 rounded">PO #4021</span>
                                </div>
                                <p className="text-xs text-gray-500 mb-3">requesting ~250k KES for Decra Roofing Tiles (Verified Supplier).</p>
                                <div className="flex gap-2">
                                    <button className="flex-1 bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg text-xs font-bold transition-colors">Approve</button>
                                    <button className="flex-1 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 py-2 rounded-lg text-xs font-bold transition-colors">Decline</button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Dashboard;

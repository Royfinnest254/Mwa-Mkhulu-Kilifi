import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Server, AlertTriangle, CheckCircle, Lock } from 'lucide-react';

const DemoDashboard = () => {
    const [isMpesaDown, setIsMpesaDown] = useState(false);
    const [synchroActive, setSynchroActive] = useState(true);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [stats, setStats] = useState({ processed: 1420, locked: 0, failed: 0 });

    // Simulate incoming transactions
    useEffect(() => {
        const interval = setInterval(() => {
            const newTx = {
                id: Math.random().toString(36).substr(2, 9),
                amount: Math.floor(Math.random() * 5000) + 50,
                time: new Date().toLocaleTimeString(),
                status: 'processing'
            };

            setTransactions(prev => [newTx, ...prev].slice(0, 8));

            // Process logic
            setTimeout(() => {
                setTransactions(prev => prev.map(t => {
                    if (t.id !== newTx.id) return t;

                    if (isMpesaDown) {
                        if (synchroActive) {
                            setStats(p => ({ ...p, locked: p.locked + 1 }));
                            return { ...t, status: 'locked' };
                        } else {
                            setStats(p => ({ ...p, failed: p.failed + 1 }));
                            return { ...t, status: 'failed' };
                        }
                    }
                    setStats(p => ({ ...p, processed: p.processed + 1 }));
                    return { ...t, status: 'success' };
                }));
            }, 800);

        }, 1200);

        return () => clearInterval(interval);
    }, [isMpesaDown, synchroActive]);

    return (
        <section id="demo" className="py-24 bg-synchro-dark relative">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Dashboard Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
                    <div>
                        <h2 className="text-3xl font-bold text-white mb-2">Live Network Status</h2>
                        <div className="flex items-center gap-2 text-sm text-gray-400">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            Mainnet Alpha • Nairobi Region
                        </div>
                    </div>

                    {/* Controls */}
                    <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/10">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-300">Simulate Outage:</span>
                            <button
                                onClick={() => setIsMpesaDown(!isMpesaDown)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${isMpesaDown ? 'bg-red-500' : 'bg-gray-600'}`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${isMpesaDown ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>
                        <div className="h-6 w-px bg-white/10 mx-2"></div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-gray-300">SynchroChain:</span>
                            <button
                                onClick={() => setSynchroActive(!synchroActive)}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${synchroActive ? 'bg-synchro-green' : 'bg-gray-600'}`}
                            >
                                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${synchroActive ? 'translate-x-6' : 'translate-x-1'}`} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Dashboard Grid */}
                <div className="grid lg:grid-cols-3 gap-8">

                    {/* Left: Transaction Log */}
                    <div className="lg:col-span-2 bg-black/20 border border-white/10 rounded-2xl p-6 overflow-hidden">
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Activity size={18} className="text-synchro-blue" /> Transaction Stream
                        </h3>
                        <div className="space-y-3">
                            <AnimatePresence>
                                {transactions.map((tx) => (
                                    <motion.div
                                        key={tx.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="flex justify-between items-center p-3 rounded-lg bg-white/5 border border-white/5"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className={`p-2 rounded-full ${tx.status === 'success' ? 'bg-green-500/20 text-green-500' :
                                                tx.status === 'locked' ? 'bg-yellow-500/20 text-yellow-500' :
                                                    tx.status === 'failed' ? 'bg-red-500/20 text-red-500' :
                                                        'bg-blue-500/20 text-blue-500'
                                                }`}>
                                                {tx.status === 'success' && <CheckCircle size={16} />}
                                                {tx.status === 'locked' && <Lock size={16} />}
                                                {tx.status === 'failed' && <AlertTriangle size={16} />}
                                                {tx.status === 'processing' && <Loader2 size={16} className="animate-spin" />}
                                            </div>
                                            <div>
                                                <div className="text-white font-mono text-sm">{tx.id}</div>
                                                <div className="text-xs text-gray-500">KES {tx.amount}</div>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className={`text-xs font-bold uppercase ${tx.status === 'success' ? 'text-green-500' :
                                                tx.status === 'locked' ? 'text-yellow-500' :
                                                    tx.status === 'failed' ? 'text-red-500' :
                                                        'text-blue-500'
                                                }`}>
                                                {tx.status}
                                            </div>
                                            <div className="text-xs text-gray-600">{tx.time}</div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Right: Metrics & System State */}
                    <div className="space-y-6">

                        {/* System Health */}
                        <div className="bg-black/20 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Server size={18} className="text-purple-400" /> System State
                            </h3>
                            <div className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 text-sm">M-Pesa API</span>
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${!isMpesaDown ? 'bg-green-500/20 text-green-500' : 'bg-red-500/20 text-red-500'}`}>
                                        {!isMpesaDown ? 'OPERATIONAL' : 'CRITIAL FAILURE'}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-gray-400 text-sm">Synchro Layer</span>
                                    <span className={`px-2 py-1 rounded text-xs font-bold ${synchroActive ? 'bg-synchro-green/20 text-synchro-green' : 'bg-gray-500/20 text-gray-500'}`}>
                                        {synchroActive ? 'Active' : 'Bypassed'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Live Stats */}
                        <div className="bg-black/20 border border-white/10 rounded-2xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-4">Session Stats</h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-white/5 rounded-lg">
                                    <div className="text-xs text-gray-500 mb-1">Processed</div>
                                    <div className="text-2xl font-bold text-white">{stats.processed}</div>
                                </div>
                                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                                    <div className="text-xs text-red-400 mb-1">Lost</div>
                                    <div className="text-2xl font-bold text-red-500">{stats.failed}</div>
                                </div>
                                <div className="col-span-2 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                                    <div className="text-xs text-yellow-400 mb-1">Locked (Safe)</div>
                                    <div className="text-2xl font-bold text-yellow-500">{stats.locked}</div>
                                    <div className="text-xs text-yellow-400/60 mt-1">Ready for replay</div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

// Helper for loading icon since I forgot to import it in previous artifact 
const Loader2 = ({ size, className }: { size: number, className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`lucide lucide-loader-2 ${className}`}>
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
);

export default DemoDashboard;

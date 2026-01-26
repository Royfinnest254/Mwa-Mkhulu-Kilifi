import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { XCircle, CheckCircle } from 'lucide-react';

const ProblemVisualization = () => {
    const [activeTab, setActiveTab] = useState<'legacy' | 'synchro'>('legacy');

    // Animation simulation state
    const [transactions, setTransactions] = useState<any[]>([]);

    useEffect(() => {
        const interval = setInterval(() => {
            const id = Date.now();
            setTransactions(prev => [...prev.slice(-5), { id, status: 'pending', created: Date.now() }]);
        }, 2000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="problem" className="py-24 bg-black/40 border-y border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">

                    {/* Text Content */}
                    <div>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                            The M-Pesa <span className="text-red-500">Black Hole</span>
                        </h2>
                        <p className="text-gray-400 mb-6 text-lg">
                            When M-Pesa goes down, transactions enter a "limbo state". Money leaves the sender but never reaches the receiver.
                        </p>

                        <div className="space-y-6">
                            <div
                                onClick={() => setActiveTab('legacy')}
                                className={`p-6 rounded-xl border cursor-pointer transition-all ${activeTab === 'legacy' ? 'bg-red-500/10 border-red-500' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                            >
                                <h3 className={`text-xl font-semibold mb-2 ${activeTab === 'legacy' ? 'text-red-400' : 'text-gray-300'}`}>Without SynchroChain</h3>
                                <p className="text-sm text-gray-500">Transactions fail silently. Dispute resolution takes 3 days. Trust is eroded.</p>
                            </div>

                            <div
                                onClick={() => setActiveTab('synchro')}
                                className={`p-6 rounded-xl border cursor-pointer transition-all ${activeTab === 'synchro' ? 'bg-synchro-green/10 border-synchro-green' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}
                            >
                                <h3 className={`text-xl font-semibold mb-2 ${activeTab === 'synchro' ? 'text-synchro-green' : 'text-gray-300'}`}>With SynchroChain</h3>
                                <p className="text-sm text-gray-500">Atomic locking means a transaction is either 100% complete or 100% refunded instantly.</p>
                            </div>
                        </div>
                    </div>

                    {/* Visualization */}
                    <div className="bg-synchro-dark border border-white/10 rounded-2xl p-8 h-[400px] relative overflow-hidden flex flex-col items-center justify-center">
                        <div className="absolute top-4 right-4 px-3 py-1 bg-white/10 rounded-full text-xs text-gray-400">
                            Live Simulation
                        </div>

                        <div className="flex w-full justify-between px-10 mb-10 text-sm font-mono text-gray-500">
                            <span>SENDER</span>
                            <span>NETWORK</span>
                            <span>RECEIVER</span>
                        </div>

                        <div className="w-full relative h-40">
                            {/* Rails */}
                            <div className="absolute top-1/2 left-0 w-full h-1 bg-white/5 -translate-y-1/2 rounded-full" />

                            {/* Middle Node (The Failure Point) */}
                            <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full flex items-center justify-center border-2 transition-colors duration-500 z-10 ${activeTab === 'legacy' ? 'bg-red-500/20 border-red-500 shadow-red-500/50 shadow-lg' : 'bg-green-500/20 border-green-500 shadow-green-500/50 shadow-lg'}`}>
                                {activeTab === 'legacy' ? <XCircle className="text-red-500" /> : <CheckCircle className="text-green-500" />}
                            </div>

                            {/* Moving Dots */}
                            <AnimatePresence>
                                {transactions.map((tx) => (
                                    <motion.div
                                        key={tx.id}
                                        initial={{ left: '10%' }}
                                        animate={{
                                            left: activeTab === 'legacy' ? '50%' : '90%',
                                            opacity: activeTab === 'legacy' ? [1, 1, 0] : 1
                                        }}
                                        transition={{ duration: 3, ease: "linear" }}
                                        className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full shadow-lg z-20 ${activeTab === 'legacy' ? 'bg-red-400' : 'bg-synchro-green'}`}
                                        onAnimationComplete={() => {
                                            // In legacy mode, it disappears at 50% (The Black Hole)
                                        }}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>

                        <div className="mt-8 text-center">
                            <p className={`text-lg font-medium transition-colors ${activeTab === 'legacy' ? 'text-red-400' : 'text-synchro-green'}`}>
                                {activeTab === 'legacy' ? '⚠️ CONNECTION LOST - FUNDS FROZEN' : '✅ COORDINATION ACTIVE - STATE VERIFIED'}
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProblemVisualization;

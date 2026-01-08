'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { mockDb } from '@/services/mockDb';
import { MessageThread, Business } from '@/types';
import { ArrowLeft, MessageSquare, Plus } from 'lucide-react';
import Link from 'next/link';

export default function MessageThreadsPage() {
    const params = useParams();
    const businessId = params.id as string;
    const [threads, setThreads] = useState<MessageThread[]>([]);
    const [business, setBusiness] = useState<Business | null>(null);
    const [loading, setLoading] = useState(true);

    // New Thread State
    const [showNewThread, setShowNewThread] = useState(false);
    const [newSubject, setNewSubject] = useState('');

    const loadData = async () => {
        setLoading(true);
        const [t, b] = await Promise.all([
            mockDb.getThreadsByBusinessId(businessId),
            mockDb.getBusinessById(businessId)
        ]);
        setThreads(t);
        setBusiness(b || null);
        setLoading(false);
    };

    useEffect(() => {
        if (businessId) loadData();
    }, [businessId]);

    const handleCreateThread = async (e: React.FormEvent) => {
        e.preventDefault();
        await mockDb.createThread({
            business_id: businessId,
            related_type: 'general', // Default for now
            subject: newSubject,
        });
        setNewSubject('');
        setShowNewThread(false);
        await loadData();
    };

    if (loading) return <div className="p-10 text-center">Loading threads...</div>;
    if (!business) return <div className="p-10 text-center text-red-500">Business not found</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <Link href={`/businesses/${businessId}`} className="text-sm text-gray-500 hover:underline flex items-center mb-1">
                        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
                    </Link>
                    <h1 className="text-2xl font-bold">Communication History</h1>
                    <p className="text-gray-500">Official Mediation & Support Threads</p>
                </div>
                <button
                    onClick={() => setShowNewThread(true)}
                    className="flex items-center bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800">
                    <Plus className="w-4 h-4 mr-2" /> Start Conversation
                </button>
            </div>

            {showNewThread && (
                <div className="bg-gray-50 p-6 rounded-xl border animate-in slide-in-from-top-4">
                    <h3 className="font-bold mb-4">Start New Thread</h3>
                    <form onSubmit={handleCreateThread} className="flex gap-4">
                        <input
                            required
                            autoFocus
                            type="text"
                            className="flex-1 p-2 border rounded-md"
                            placeholder="Subject (e.g., Clarification on Feb Report)"
                            value={newSubject}
                            onChange={e => setNewSubject(e.target.value)}
                        />
                        <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500">
                            Create
                        </button>
                        <button type="button" onClick={() => setShowNewThread(false)} className="px-4 py-2 border rounded-md hover:bg-white bg-transparent">
                            Cancel
                        </button>
                    </form>
                </div>
            )}

            <div className="space-y-4">
                {threads.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed">
                        <MessageSquare className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                        <h3 className="text-gray-900 font-medium">No threads found</h3>
                        <p className="text-gray-500 text-sm">Start a conversation to request clarification or provide support.</p>
                    </div>
                ) : (
                    threads.map(t => (
                        <Link key={t.thread_id} href={`/businesses/${businessId}/messages/${t.thread_id}`}
                            className="block bg-white p-6 rounded-xl border shadow-sm hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900">{t.subject}</h3>
                                    <div className="text-sm text-gray-500 mt-1 flex items-center space-x-2">
                                        <span className="capitalize bg-gray-100 px-2 py-0.5 rounded text-xs">{t.related_type}</span>
                                        <span>•</span>
                                        <span>{new Date(t.created_at).toLocaleDateString()}</span>
                                    </div>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${t.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                                    {t.status}
                                </span>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
}

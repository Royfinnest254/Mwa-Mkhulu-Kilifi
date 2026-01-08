'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import { mockDb } from '@/services/mockDb';
import { MessageThread, Message, MessageSenderLabel } from '@/types';
import { ArrowLeft, Send, ShieldAlert, User, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function ThreadDetailPage() {
    const params = useParams();
    const businessId = params.id as string;
    const threadId = params.threadId as string;

    const [thread, setThread] = useState<MessageThread | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(true);

    // Messaging State
    const [newMessage, setNewMessage] = useState('');
    const [activeRole, setActiveRole] = useState<MessageSenderLabel>('admin'); // Simulatable Role
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const loadData = async () => {
        const [t, m] = await Promise.all([
            mockDb.getThreadById(threadId),
            mockDb.getMessagesByThreadId(threadId)
        ]);
        setThread(t || null);
        setMessages(m);
        setLoading(false);
    };

    useEffect(() => {
        if (threadId) loadData();
    }, [threadId]);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMessage.trim()) return;

        await mockDb.createMessage({
            thread_id: threadId,
            sender_label: activeRole,
            message_body: newMessage,
        });

        setNewMessage('');
        await loadData();
    };

    if (loading) return <div className="p-10 text-center">Loading conversation...</div>;
    if (!thread) return <div className="p-10 text-center text-red-500">Thread not found</div>;

    return (
        <div className="max-w-4xl mx-auto h-[calc(100vh-100px)] flex flex-col">
            {/* Header */}
            <div className="mb-4 flex-none border-b pb-4">
                <Link href={`/businesses/${businessId}/messages`} className="text-sm text-gray-500 hover:underline flex items-center mb-2">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Threads
                </Link>
                <div className="flex justify-between items-start">
                    <div>
                        <h1 className="text-xl font-bold">{thread.subject}</h1>
                        <span className="text-xs text-gray-400 uppercase tracking-widest">{thread.related_type} Context</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${thread.status === 'open' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                        {thread.status}
                    </span>
                </div>
            </div>

            {/* Role Simulator Toggles (No Auth MVP Feature) */}
            <div className="flex bg-gray-100 p-2 rounded-lg mb-4 text-xs font-medium space-x-2 flex-none">
                <span className="p-2 text-gray-500 uppercase">Simulate As:</span>
                <button onClick={() => setActiveRole('admin')}
                    className={`flex-1 p-2 rounded flex items-center justify-center ${activeRole === 'admin' ? 'bg-black text-white shadow' : 'hover:bg-gray-200'}`}>
                    <ShieldAlert className="w-3 h-3 mr-1" /> Admin
                </button>
                <button onClick={() => setActiveRole('business')}
                    className={`flex-1 p-2 rounded flex items-center justify-center ${activeRole === 'business' ? 'bg-white text-blue-600 shadow' : 'hover:bg-gray-200'}`}>
                    <Briefcase className="w-3 h-3 mr-1" /> Business
                </button>
                <button onClick={() => setActiveRole('investor')}
                    className={`flex-1 p-2 rounded flex items-center justify-center ${activeRole === 'investor' ? 'bg-white text-green-600 shadow' : 'hover:bg-gray-200'}`}>
                    <User className="w-3 h-3 mr-1" /> Investor
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto bg-gray-50 border rounded-xl p-4 space-y-4 mb-4">
                {messages.length === 0 ? (
                    <div className="text-center text-gray-400 italic py-10">
                        This is the start of the conversation. Messages are immutable.
                    </div>
                ) : (
                    messages.map(m => (
                        <div key={m.message_id} className={`flex ${m.sender_label === activeRole ? 'justify-end' : 'justify-start'}`}>
                            <div className={`max-w-[80%] rounded-xl p-4 ${m.sender_label === 'admin' ? 'bg-gray-800 text-white' :
                                    m.sender_label === 'business' ? 'bg-blue-100 text-blue-900' :
                                        'bg-green-100 text-green-900'
                                }`}>
                                <div className="text-xs font-bold uppercase mb-1 opacity-75 flex items-center">
                                    {m.sender_label === 'admin' && <ShieldAlert className="w-3 h-3 mr-1" />}
                                    {m.sender_label === 'business' && <Briefcase className="w-3 h-3 mr-1" />}
                                    {m.sender_label}
                                </div>
                                <p className="whitespace-pre-wrap text-sm">{m.message_body}</p>
                                <div className="text-[10px] opacity-50 text-right mt-2">
                                    {new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </div>
                            </div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form onSubmit={handleSendMessage} className="flex-none flex gap-2">
                <input
                    type="text"
                    disabled={thread.status === 'closed'}
                    className="flex-1 p-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-black"
                    placeholder={thread.status === 'closed' ? "Thread is closed." : `Type a message as ${activeRole.toUpperCase()}...`}
                    value={newMessage}
                    onChange={e => setNewMessage(e.target.value)}
                />
                <button
                    disabled={!newMessage.trim() || thread.status === 'closed'}
                    type="submit"
                    className="bg-black text-white p-3 rounded-xl hover:bg-gray-800 disabled:opacity-50">
                    <Send className="w-5 h-5" />
                </button>
            </form>
        </div>
    );
}

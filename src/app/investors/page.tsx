'use client';

import { useEffect, useState } from 'react';
import { mockDb } from '@/services/mockDb';
import { Investor } from '@/types';
import { Plus, User, Mail, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function InvestorPage() {
    const [investors, setInvestors] = useState<Investor[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [loading, setLoading] = useState(true);

    // Form State
    const [formData, setFormData] = useState({
        full_name: '',
        country: '',
        contact_email: '',
        contact_phone: '',
        notes: '',
    });

    const loadData = async () => {
        setLoading(true);
        const data = await mockDb.getInvestors();
        setInvestors(data);
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await mockDb.createInvestor(formData);
        setIsCreating(false);
        setFormData({ full_name: '', country: '', contact_email: '', contact_phone: '', notes: '' });
        loadData();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Investors</h1>
                    <p className="text-gray-500">Manage investor profiles</p>
                </div>
                <button
                    onClick={() => setIsCreating(!isCreating)}
                    className={cn(
                        "flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                        isCreating ? "bg-red-100 text-red-700" : "bg-primary text-white hover:bg-primary/90"
                    )}
                >
                    {isCreating ? 'Cancel' : <><Plus className="w-4 h-4 mr-2" /> Add Investor</>}
                </button>
            </div>

            {isCreating && (
                <div className="bg-white p-6 rounded-xl border shadow-sm animate-in slide-in-from-top-2">
                    <h2 className="text-lg font-semibold mb-4">New Investor Profile</h2>
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Full Name / Entity Name</label>
                                <input required className="w-full p-2 border rounded-md"
                                    value={formData.full_name} onChange={e => setFormData({ ...formData, full_name: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Country</label>
                                <input required className="w-full p-2 border rounded-md"
                                    value={formData.country} onChange={e => setFormData({ ...formData, country: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Contact Email</label>
                                <input required type="email" className="w-full p-2 border rounded-md"
                                    value={formData.contact_email} onChange={e => setFormData({ ...formData, contact_email: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Phone (Optional)</label>
                                <input className="w-full p-2 border rounded-md"
                                    value={formData.contact_phone} onChange={e => setFormData({ ...formData, contact_phone: e.target.value })} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Internal Notes</label>
                            <textarea className="w-full p-2 border rounded-md" rows={2}
                                value={formData.notes} onChange={e => setFormData({ ...formData, notes: e.target.value })} />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90">
                                Create Profile
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {loading ? (
                    <div>Loading investors...</div>
                ) : investors.length === 0 ? (
                    <div className="text-center p-10 bg-gray-50 rounded-lg text-gray-500 w-full col-span-full">No investors found.</div>
                ) : (
                    investors.map(inv => (
                        <div key={inv.investor_id} className="bg-white p-6 rounded-xl border hover:shadow-md transition-shadow">
                            <div className="flex items-center space-x-3 mb-4">
                                <div className="bg-green-100 p-2 rounded-full">
                                    <User className="w-5 h-5 text-green-700" />
                                </div>
                                <h3 className="font-semibold text-lg truncate">{inv.full_name}</h3>
                            </div>
                            <div className="space-y-2 text-sm text-gray-600">
                                <div className="flex items-center">
                                    <Globe className="w-4 h-4 mr-2 text-gray-400" />
                                    {inv.country}
                                </div>
                                <div className="flex items-center">
                                    <Mail className="w-4 h-4 mr-2 text-gray-400" />
                                    <a href={`mailto:${inv.contact_email}`} className="text-blue-600 hover:underline">{inv.contact_email}</a>
                                </div>
                            </div>
                            {inv.notes && (
                                <div className="mt-4 p-2 bg-gray-50 rounded text-xs text-gray-500 italic border">
                                    "{inv.notes}"
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

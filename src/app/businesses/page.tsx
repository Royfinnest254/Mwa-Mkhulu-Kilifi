'use client';

import { useEffect, useState } from 'react';
import { mockDb } from '@/services/mockDb';
import { Business } from '@/types';
import { Plus, Search, MapPin, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BusinessPage() {
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [isCreating, setIsCreating] = useState(false);
    const [loading, setLoading] = useState(true);

    // Form State
    const [formData, setFormData] = useState({
        business_name: '',
        business_type: '',
        physical_location: '',
        county: '',
        description: '',
        status: 'active' as const,
    });

    const loadData = async () => {
        setLoading(true);
        const data = await mockDb.getBusinesses();
        setBusinesses(data);
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await mockDb.createBusiness({
            ...formData,
            date_registered: new Date().toISOString().split('T')[0]
        });
        setIsCreating(false);
        setFormData({ business_name: '', business_type: '', physical_location: '', county: '', description: '', status: 'active' });
        loadData();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Businesses</h1>
                    <p className="text-gray-500">Manage registered entities</p>
                </div>
                <button
                    onClick={() => setIsCreating(!isCreating)}
                    className={cn(
                        "flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                        isCreating ? "bg-red-100 text-red-700" : "bg-primary text-white hover:bg-primary/90"
                    )}
                >
                    {isCreating ? 'Cancel' : <><Plus className="w-4 h-4 mr-2" /> Register Business</>}
                </button>
            </div>

            {isCreating && (
                <div className="bg-white p-6 rounded-xl border shadow-sm animate-in slide-in-from-top-2">
                    <h2 className="text-lg font-semibold mb-4">New Business Registration</h2>
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Business Name</label>
                                <input required className="w-full p-2 border rounded-md"
                                    value={formData.business_name} onChange={e => setFormData({ ...formData, business_name: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Type (Sector)</label>
                                <input required className="w-full p-2 border rounded-md" placeholder="e.g. Agriculture"
                                    value={formData.business_type} onChange={e => setFormData({ ...formData, business_type: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Physical Location</label>
                                <input required className="w-full p-2 border rounded-md"
                                    value={formData.physical_location} onChange={e => setFormData({ ...formData, physical_location: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">County</label>
                                <input required className="w-full p-2 border rounded-md"
                                    value={formData.county} onChange={e => setFormData({ ...formData, county: e.target.value })} />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Description</label>
                            <textarea required className="w-full p-2 border rounded-md" rows={3}
                                value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90">
                                Register Entity
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* List */}
            <div className="grid gap-4">
                {loading ? (
                    <div>Loading businesses...</div>
                ) : businesses.length === 0 ? (
                    <div className="text-center p-10 bg-gray-50 rounded-lg text-gray-500">No businesses found.</div>
                ) : (
                    businesses.map(b => (
                        <div key={b.business_id} className="bg-white p-4 rounded-xl border hover:shadow-md transition-shadow flex justify-between items-start">
                            <div className="flex items-start space-x-4">
                                <div className="bg-blue-100 p-2 rounded-lg">
                                    <Building2 className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg">{b.business_name}</h3>
                                    <div className="flex items-center text-sm text-gray-500 space-x-4">
                                        <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {b.physical_location}, {b.county}</span>
                                        <span className="bg-gray-100 px-2 py-0.5 rounded text-xs uppercase">{b.business_type}</span>
                                    </div>
                                    <p className="text-sm text-gray-600 mt-2">{b.description}</p>
                                </div>
                            </div>
                            <div className="flex flex-col items-end">
                                <span className={cn(
                                    "px-2 py-1 rounded-full text-xs font-medium capitalize",
                                    b.status === 'active' ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                                )}>
                                    {b.status}
                                </span>
                                <span className="text-xs text-gray-400 mt-2">ID: {b.business_id.slice(0, 8)}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

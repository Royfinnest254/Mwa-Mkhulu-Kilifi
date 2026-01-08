'use client';

import { useEffect, useState } from 'react';
import { mockDb } from '@/services/mockDb';
import { Business, Investor, InvestorBusinessLink, RelationshipType } from '@/types';
import { Plus, Link as LinkIcon, ArrowRight, User, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface EnrichedLink extends InvestorBusinessLink {
    businessName?: string;
    investorName?: string;
}

export default function RelationshipsPage() {
    const [links, setLinks] = useState<EnrichedLink[]>([]);
    const [businesses, setBusinesses] = useState<Business[]>([]);
    const [investors, setInvestors] = useState<Investor[]>([]);

    const [isCreating, setIsCreating] = useState(false);
    const [loading, setLoading] = useState(true);

    // Form
    const [formData, setFormData] = useState({
        investorId: '',
        businessId: '',
        relationshipType: 'partner' as RelationshipType,
    });

    const loadData = async () => {
        setLoading(true);
        const [l, b, i] = await Promise.all([
            mockDb.getLinks(),
            mockDb.getBusinesses(),
            mockDb.getInvestors()
        ]);
        setLinks(l);
        setBusinesses(b);
        setInvestors(i);
        setLoading(false);
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.investorId || !formData.businessId) return;

        await mockDb.createLink({
            investor_id: formData.investorId,
            business_id: formData.businessId,
            relationship_type: formData.relationshipType,
            start_date: new Date().toISOString().split('T')[0],
            status: 'active'
        });

        setIsCreating(false);
        setFormData({ investorId: '', businessId: '', relationshipType: 'partner' });
        loadData();
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Relationships</h1>
                    <p className="text-gray-500">Link Investors to Businesses</p>
                </div>
                <button
                    onClick={() => setIsCreating(!isCreating)}
                    className={cn(
                        "flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                        isCreating ? "bg-red-100 text-red-700" : "bg-primary text-white hover:bg-primary/90"
                    )}
                >
                    {isCreating ? 'Cancel' : <><Plus className="w-4 h-4 mr-2" /> Link Entities</>}
                </button>
            </div>

            {isCreating && (
                <div className="bg-white p-6 rounded-xl border shadow-sm animate-in slide-in-from-top-2">
                    <h2 className="text-lg font-semibold mb-4">Create New Relationship</h2>
                    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Select Investor</label>
                                <select required className="w-full p-2 border rounded-md"
                                    value={formData.investorId} onChange={e => setFormData({ ...formData, investorId: e.target.value })}>
                                    <option value="">-- Choose Investor --</option>
                                    {investors.map(i => <option key={i.id} value={i.id}>{i.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Select Business</label>
                                <select required className="w-full p-2 border rounded-md"
                                    value={formData.businessId} onChange={e => setFormData({ ...formData, businessId: e.target.value })}>
                                    <option value="">-- Choose Business --</option>
                                    {businesses.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Relationship Type</label>
                            <div className="flex space-x-4 mt-1">
                                {['owner', 'partner', 'observer'].map(type => (
                                    <label key={type} className="flex items-center space-x-2 cursor-pointer bg-gray-50 px-3 py-2 rounded border">
                                        <input type="radio" name="rtype" value={type}
                                            checked={formData.relationshipType === type}
                                            onChange={() => setFormData({ ...formData, relationshipType: type as RelationshipType })}
                                        />
                                        <span className="capitalize text-sm">{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="flex justify-end p-2 bg-yellow-50 text-yellow-800 text-xs rounded border border-yellow-200 mb-2">
                            Note: This action grants the investor visibility into the business's reports.
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90">
                                Establish Link
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* List */}
            <div className="space-y-3">
                {loading ? (
                    <div>Loading links...</div>
                ) : links.length === 0 ? (
                    <div className="text-center p-10 bg-gray-50 rounded-lg text-gray-500">No active relationships found.</div>
                ) : (
                    links.map(link => (
                        <div key={link.id} className="bg-white p-4 rounded-xl border flex justify-between items-center shadow-sm">
                            <div className="flex items-center space-x-6">
                                <div className="flex items-center space-x-3">
                                    <div className="bg-green-50 p-2 rounded-lg"><User className="w-4 h-4 text-green-600" /></div>
                                    <span className="font-medium">{link.investorName}</span>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-300" />
                                <div className="flex items-center space-x-3">
                                    <div className="bg-blue-50 p-2 rounded-lg"><Building2 className="w-4 h-4 text-blue-600" /></div>
                                    <span className="font-medium">{link.businessName}</span>
                                </div>
                            </div>

                            <div className="flex items-center space-x-4">
                                <span className={cn(
                                    "px-3 py-1 rounded-full text-xs font-medium uppercase border",
                                    link.relationship_type === 'owner' ? "bg-purple-100 text-purple-700 border-purple-200" :
                                        link.relationship_type === 'partner' ? "bg-blue-100 text-blue-700 border-blue-200" :
                                            "bg-gray-100 text-gray-700 border-gray-200"
                                )}>
                                    {link.relationship_type}
                                </span>
                                <span className="text-xs text-gray-400">Since {link.start_date}</span>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

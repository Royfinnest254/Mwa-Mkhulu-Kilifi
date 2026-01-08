'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { mockDb } from '@/services/mockDb';
import { AuditStatus, RiskLevel, Business } from '@/types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewAuditPage() {
    const params = useParams();
    const router = useRouter();
    const businessId = params.id as string;
    const [business, setBusiness] = useState<Business | null>(null);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        audit_type: 'periodic',
        audit_status: 'pending' as AuditStatus,
        findings_summary: '',
        risk_level: 'low' as RiskLevel,
        recommendations: '',
    });

    useEffect(() => {
        mockDb.getBusinessById(businessId).then(b => setBusiness(b || null));
    }, [businessId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        await mockDb.createAudit({
            business_id: businessId,
            audit_type: formData.audit_type as any,
            audit_status: formData.audit_status,
            findings_summary: formData.findings_summary,
            risk_level: formData.risk_level,
            recommendations: formData.recommendations,
            auditor_label: 'admin',
        });

        setLoading(false);
        router.push(`/businesses/${businessId}`);
    };

    if (!business) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <Link href={`/businesses/${businessId}`} className="text-sm text-gray-500 hover:underline flex items-center mb-4">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
                </Link>
                <h1 className="text-2xl font-bold">Initiate New Audit</h1>
                <p className="text-gray-500">Record verification findings for {business.business_name}</p>
            </div>

            <div className="bg-white p-8 rounded-xl border shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Type & Status */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Audit Type</label>
                            <select className="w-full p-2 border rounded-md"
                                value={formData.audit_type} onChange={e => setFormData({ ...formData, audit_type: e.target.value })}>
                                <option value="periodic">Periodic Review</option>
                                <option value="report">Specific Report Audit</option>
                                <option value="special">Special Investigation</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Initial Status</label>
                            <select className="w-full p-2 border rounded-md"
                                value={formData.audit_status} onChange={e => setFormData({ ...formData, audit_status: e.target.value as AuditStatus })}>
                                <option value="pending">Pending</option>
                                <option value="verified">Verified (Clean)</option>
                                <option value="flagged">Flagged (Risk)</option>
                                <option value="rejected">Rejected</option>
                            </select>
                        </div>
                    </div>

                    {/* Findings */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Findings Summary</label>
                        <textarea required rows={5} className="w-full p-2 border rounded-md" placeholder="Detailed observations..."
                            value={formData.findings_summary} onChange={e => setFormData({ ...formData, findings_summary: e.target.value })} />
                    </div>

                    {/* Risk Level */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Risk Level Assessment</label>
                        <select className="w-full p-2 border rounded-md"
                            value={formData.risk_level} onChange={e => setFormData({ ...formData, risk_level: e.target.value as RiskLevel })}>
                            <option value="low">Low Risk</option>
                            <option value="medium">Medium Risk</option>
                            <option value="high">High Risk</option>
                        </select>
                    </div>

                    {/* Recommendations */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Recommendations (Optional)</label>
                        <textarea rows={3} className="w-full p-2 border rounded-md" placeholder="Recommended actions for the business..."
                            value={formData.recommendations} onChange={e => setFormData({ ...formData, recommendations: e.target.value })} />
                    </div>

                    <div className="flex justify-end pt-4">
                        <button type="submit" disabled={loading} className="bg-black text-white px-8 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50">
                            {loading ? 'Submitting...' : 'Submit Audit Record'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { mockDb } from '@/services/mockDb';
import { ReportType } from '@/types';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function NewReportPage() {
    const params = useParams();
    const router = useRouter();
    const businessId = params.id as string;
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        reporting_period_start: '',
        reporting_period_end: '',
        report_type: 'monthly' as ReportType,
        summary_text: '',
        revenue_amount: '',
        expense_amount: '',
        operational_notes: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const net_result = (Number(formData.revenue_amount) || 0) - (Number(formData.expense_amount) || 0);

        await mockDb.createReport({
            business_id: businessId,
            reporting_period_start: formData.reporting_period_start,
            reporting_period_end: formData.reporting_period_end,
            report_type: formData.report_type,
            summary_text: formData.summary_text,
            revenue_amount: Number(formData.revenue_amount) || 0,
            expense_amount: Number(formData.expense_amount) || 0,
            net_result: net_result,
            operational_notes: formData.operational_notes,
        });

        setLoading(false);
        router.push(`/businesses/${businessId}`);
    };

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <Link href={`/businesses/${businessId}`} className="text-sm text-gray-500 hover:underline flex items-center mb-4">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
                </Link>
                <h1 className="text-2xl font-bold">Submit New Report</h1>
                <p className="text-gray-500">Enter operational data for the reporting period.</p>
            </div>

            <div className="bg-white p-8 rounded-xl border shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Period */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Period Start</label>
                            <input required type="date" className="w-full p-2 border rounded-md"
                                value={formData.reporting_period_start} onChange={e => setFormData({ ...formData, reporting_period_start: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">Period End</label>
                            <input required type="date" className="w-full p-2 border rounded-md"
                                value={formData.reporting_period_end} onChange={e => setFormData({ ...formData, reporting_period_end: e.target.value })} />
                        </div>
                    </div>

                    {/* Type */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Report Type</label>
                        <select className="w-full p-2 border rounded-md"
                            value={formData.report_type} onChange={e => setFormData({ ...formData, report_type: e.target.value as ReportType })}>
                            <option value="monthly">Monthly</option>
                            <option value="quarterly">Quarterly</option>
                            <option value="custom">Custom</option>
                        </select>
                    </div>

                    {/* Summary */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Executive Summary</label>
                        <textarea required rows={4} className="w-full p-2 border rounded-md" placeholder="Brief overview of operations..."
                            value={formData.summary_text} onChange={e => setFormData({ ...formData, summary_text: e.target.value })} />
                    </div>

                    {/* Financials */}
                    <div className="p-4 bg-gray-50 rounded-lg border space-y-4">
                        <h3 className="font-semibold text-sm text-gray-900 border-b pb-2">Financial Snapshot (Optional)</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-600">Revenue (KES)</label>
                                <input type="number" className="w-full p-2 border rounded-md" placeholder="0"
                                    value={formData.revenue_amount} onChange={e => setFormData({ ...formData, revenue_amount: e.target.value })} />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1 text-gray-600">Expenses (KES)</label>
                                <input type="number" className="w-full p-2 border rounded-md" placeholder="0"
                                    value={formData.expense_amount} onChange={e => setFormData({ ...formData, expense_amount: e.target.value })} />
                            </div>
                        </div>
                    </div>

                    {/* Notes */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Operational Notes / Challenges</label>
                        <textarea rows={3} className="w-full p-2 border rounded-md"
                            value={formData.operational_notes} onChange={e => setFormData({ ...formData, operational_notes: e.target.value })} />
                    </div>

                    <div className="flex justify-end pt-4">
                        <button type="submit" disabled={loading} className="bg-black text-white px-8 py-2 rounded-lg hover:bg-gray-800 disabled:opacity-50">
                            {loading ? 'Submitting...' : 'Submit Report'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

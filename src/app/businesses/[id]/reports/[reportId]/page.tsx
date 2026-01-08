'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { mockDb } from '@/services/mockDb';
import { Report, ReportStatus, Business } from '@/types';
import { ArrowLeft, CheckCircle, Clock, AlertTriangle, Printer } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function ReportDetailPage() {
    const params = useParams();
    const businessId = params.id as string;
    const reportId = params.reportId as string;

    const [report, setReport] = useState<Report | null>(null);
    const [business, setBusiness] = useState<Business | null>(null);
    const [loading, setLoading] = useState(true);

    // Admin Action State
    const [adminComment, setAdminComment] = useState('');
    const [updating, setUpdating] = useState(false);

    const loadData = async () => {
        setLoading(true);
        const [r, b] = await Promise.all([
            mockDb.getReportById(reportId),
            mockDb.getBusinessById(businessId)
        ]);
        setReport(r || null);
        setBusiness(b || null);
        if (r?.admin_comments) setAdminComment(r.admin_comments);
        setLoading(false);
    };

    useEffect(() => {
        if (businessId && reportId) loadData();
    }, [businessId, reportId]);

    const handleStatusUpdate = async (newStatus: ReportStatus) => {
        if (!report) return;
        setUpdating(true);
        await mockDb.updateReportStatus(report.report_id, newStatus, adminComment);
        await loadData();
        setUpdating(false);
    };

    if (loading) return <div className="p-10 text-center">Loading report...</div>;
    if (!report || !business) return <div className="p-10 text-center text-red-500">Report not found</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8 print:max-w-none">
            {/* Header */}
            <div className="flex justify-between items-center print:hidden">
                <Link href={`/businesses/${business.business_id}`} className="text-sm text-gray-500 hover:underline flex items-center">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Business
                </Link>
                <button onClick={() => window.print()} className="flex items-center text-gray-500 hover:text-black">
                    <Printer className="w-4 h-4 mr-2" /> Print Report
                </button>
            </div>

            {/* Report Paper */}
            <div className="bg-white p-8 md:p-12 rounded-xl shadow-sm border space-y-8 print:shadow-none print:border-none">

                {/* Report Header */}
                <div className="border-b pb-6 flex justify-between items-start">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{business.business_name}</h1>
                        <p className="text-gray-500">{business.physical_location}, {business.county}</p>
                    </div>
                    <div className="text-right">
                        <div className="text-xs text-gray-400 uppercase tracking-widest font-semibold">Report Period</div>
                        <div className="text-lg font-medium">{report.reporting_period_start} — {report.reporting_period_end}</div>
                        <div className="mt-2 text-sm text-gray-500 capitalize">{report.report_type} Report</div>
                    </div>
                </div>

                {/* Status Banner */}
                <div className={cn(
                    "p-4 rounded-lg flex items-center space-x-3 text-sm font-medium",
                    report.status === 'reviewed' ? "bg-green-50 text-green-800 border border-green-100" :
                        report.status === 'submitted' ? "bg-blue-50 text-blue-800 border border-blue-100" :
                            "bg-gray-100 text-gray-800 border border-gray-200"
                )}>
                    {report.status === 'reviewed' ? <CheckCircle className="w-5 h-5" /> :
                        report.status === 'submitted' ? <Clock className="w-5 h-5" /> :
                            <AlertTriangle className="w-5 h-5" />}

                    <span className="flex-1">Status: {report.status.toUpperCase()}</span>
                    <span className="text-xs opacity-75">Ref: {report.report_id.slice(0, 8)}</span>
                </div>

                {/* Summary */}
                <div className="space-y-3">
                    <h3 className="text-lg font-bold text-gray-900">Executive Summary</h3>
                    <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{report.summary_text}</p>
                </div>

                {/* Financials */}
                <div className="bg-gray-50 p-6 rounded-xl border">
                    <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">Financial Overview (KES)</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Revenue</div>
                            <div className="text-xl font-mono text-gray-900">{(report.revenue_amount || 0).toLocaleString()}</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-500 mb-1">Expenses</div>
                            <div className="text-xl font-mono text-gray-900">{(report.expense_amount || 0).toLocaleString()}</div>
                        </div>
                        <div className="pt-4 md:pt-0 md:border-l pl-0 md:pl-6">
                            <div className="text-sm text-gray-500 mb-1">Net Result</div>
                            <div className={cn(
                                "text-2xl font-mono font-bold",
                                (report.net_result || 0) >= 0 ? "text-green-600" : "text-red-600"
                            )}>
                                {(report.net_result || 0).toLocaleString()}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Notes */}
                {report.operational_notes && (
                    <div className="space-y-3">
                        <h3 className="text-lg font-bold text-gray-900">Operational Notes</h3>
                        <p className="text-gray-600 italic border-l-4 pl-4">{report.operational_notes}</p>
                    </div>
                )}
            </div>

            {/* Admin Control Actions (Since No Auth, Anyone can see this for MVP) */}
            <div className="bg-gray-800 text-white p-6 rounded-xl shadow-lg print:hidden">
                <h3 className="font-bold flex items-center mb-4">
                    <AlertTriangle className="w-5 h-5 mr-2 text-yellow-400" />
                    Admin Controls (Internal)
                </h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm text-gray-300 mb-1">Admin Comments / Audit Notes</label>
                        <textarea className="w-full p-3 bg-gray-700 border-gray-600 rounded-lg text-white" rows={2}
                            value={adminComment} onChange={e => setAdminComment(e.target.value)}
                            placeholder="Internal notes regarding this report..." />
                    </div>
                    <div className="flex justify-end space-x-3">
                        <button
                            disabled={updating}
                            onClick={() => handleStatusUpdate('draft')}
                            className="px-4 py-2 text-sm bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors">
                            Mark as Draft
                        </button>
                        <button
                            disabled={updating}
                            onClick={() => handleStatusUpdate('submitted')}
                            className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors">
                            Mark as Submitted
                        </button>
                        <button
                            disabled={updating}
                            onClick={() => handleStatusUpdate('reviewed')}
                            className="px-4 py-2 text-sm bg-green-600 hover:bg-green-500 rounded-lg font-bold shadow-lg transition-colors">
                            Verify & Approve
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

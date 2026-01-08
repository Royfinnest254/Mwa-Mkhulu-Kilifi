'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { mockDb } from '@/services/mockDb';
import { Business, InvestorBusinessLink, Report, Evidence } from '@/types';
import { Building2, MapPin, Plus, FileText, ArrowRight, Users, ShieldCheck, UploadCloud, Download } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function BusinessDashboard() {
    const params = useParams();
    const id = params.id as string;
    const [business, setBusiness] = useState<Business | null>(null);
    const [links, setLinks] = useState<(InvestorBusinessLink & { investorName?: string })[]>([]);
    const [reports, setReports] = useState<Report[]>([]);
    const [evidence, setEvidence] = useState<Evidence[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const [b, l, r, e] = await Promise.all([
                mockDb.getBusinessById(id),
                mockDb.getLinksByBusinessId(id),
                mockDb.getReportsByBusinessId(id),
                mockDb.getEvidenceByBusinessId(id)
            ]);
            setBusiness(b || null);
            setLinks(l);
            setReports(r);
            setEvidence(e || []);
            setLoading(false);
        };
        if (id) loadData();
    }, [id]);

    if (loading) return <div className="p-10 text-center text-gray-400">Loading business profile...</div>;
    if (!business) return <div className="p-10 text-center text-red-500">Business not found</div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex justify-between items-start bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <div className="flex items-start space-x-5">
                    <div className="bg-[var(--color-primary-50)] p-4 rounded-xl">
                        <Building2 className="w-10 h-10 text-[var(--color-primary-900)]" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-[var(--color-primary-900)]">{business.business_name}</h1>
                        <div className="flex items-center text-gray-500 mt-2 space-x-4">
                            <span className="flex items-center text-sm"><MapPin className="w-4 h-4 mr-1" /> {business.physical_location}, {business.county}</span>
                            <span className="bg-gray-100 px-2.5 py-0.5 rounded text-xs uppercase font-medium tracking-wide">{business.business_type}</span>
                        </div>
                    </div>
                </div>
                <div className={cn(
                    "px-4 py-1.5 rounded-full text-sm font-medium capitalize border",
                    business.status === 'active' ? "bg-green-50 text-green-700 border-green-100" : "bg-red-50 text-red-700 border-red-100"
                )}>
                    {business.status}
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Left Column (Content) */}
                <div className="lg:col-span-2 space-y-8">

                    {/* About */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="text-lg font-bold text-[var(--color-primary-900)] mb-3">About</h3>
                        <p className="text-gray-600 leading-relaxed text-sm">{business.description}</p>
                    </div>

                    {/* Reports Section (Phase 5) */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
                        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-[var(--color-surface-50)]">
                            <div>
                                <h3 className="text-lg font-bold text-[var(--color-primary-900)]">Performance Reports</h3>
                                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">Monthly/Quarterly Updates</p>
                            </div>
                            <Link href={`/businesses/${id}/reports/new`} className="flex items-center bg-[var(--color-primary-900)] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[var(--color-primary-800)] transition-colors shadow-sm">
                                <Plus className="w-4 h-4 mr-2" /> Add Report
                            </Link>
                        </div>
                        <div className="divide-y divide-gray-50">
                            {reports.length === 0 ? (
                                <div className="p-10 text-center text-gray-400 italic text-sm">No reports submitted yet.</div>
                            ) : (
                                reports.map(r => (
                                    <Link key={r.report_id} href={`/businesses/${id}/reports/${r.report_id}`} className="block p-4 hover:bg-[var(--color-primary-50)] transition-colors group">
                                        <div className="flex justify-between items-center">
                                            <div className="flex items-start space-x-4">
                                                <div className="bg-purple-50 p-2 rounded-lg group-hover:bg-purple-100 transition-colors">
                                                    <FileText className="w-5 h-5 text-purple-600" />
                                                </div>
                                                <div>
                                                    <h4 className="font-medium text-[var(--color-primary-900)] group-hover:text-purple-700 transition-colors">{r.report_type.toUpperCase()} Report</h4>
                                                    <p className="text-xs text-gray-500 mt-0.5 font-mono">Period: {r.reporting_period_start} → {r.reporting_period_end}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <span className={cn(
                                                    "px-2 py-0.5 rounded text-[10px] font-bold uppercase",
                                                    r.status === 'reviewed' ? "bg-green-50 text-green-700" :
                                                        r.status === 'submitted' ? "bg-blue-50 text-blue-700" :
                                                            "bg-gray-100 text-gray-600"
                                                )}>
                                                    {r.status}
                                                </span>
                                                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[var(--color-primary-900)] transition-colors" />
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Evidence Section (Phase 6) */}
                    <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col overflow-hidden">
                        <div className="p-6 border-b border-gray-50 flex justify-between items-center bg-[var(--color-surface-50)]">
                            <div>
                                <h3 className="text-lg font-bold text-[var(--color-primary-900)]">Verifiable Evidence</h3>
                                <p className="text-xs text-gray-500 mt-1 uppercase tracking-wide">Supporting Documentation</p>
                            </div>
                            <Link href={`/businesses/${id}/evidence/new`} className="flex items-center border border-[var(--color-primary-900)] text-[var(--color-primary-900)] px-4 py-2 rounded-lg text-sm font-medium hover:bg-[var(--color-primary-50)] transition-colors">
                                <UploadCloud className="w-4 h-4 mr-2" /> Upload
                            </Link>
                        </div>
                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                            {evidence.length === 0 ? (
                                <div className="col-span-2 text-center text-gray-400 italic text-sm py-4">No evidence uploaded yet.</div>
                            ) : (
                                evidence.map(e => (
                                    <div key={e.evidence_id} className="p-4 rounded-lg border border-gray-100 flex justify-between items-start hover:shadow-sm transition-shadow">
                                        <div className="flex items-start space-x-3">
                                            <div className="bg-red-50 p-2 rounded">
                                                <FileText className="w-5 h-5 text-red-500" />
                                            </div>
                                            <div>
                                                <h4 className="font-medium text-sm text-[var(--color-primary-900)]">{e.file_name}</h4>
                                                <p className="text-xs text-gray-500 mt-1">{e.description}</p>
                                                <div className="flex items-center mt-2 space-x-2">
                                                    <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500 uppercase">{e.file_type}</span>
                                                    <span className="text-[10px] text-gray-400">{new Date(e.upload_date).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                        </div>
                                        <Link href="#" className="text-gray-400 hover:text-[var(--color-accent-600)]">
                                            <Download className="w-4 h-4" />
                                        </Link>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                </div>

                {/* Sidebar Column */}
                <div className="space-y-6">

                    {/* Action Cards */}
                    <div className="bg-gradient-to-br from-[var(--color-primary-900)] to-[var(--color-primary-800)] p-6 rounded-xl text-white shadow-md">
                        <h3 className="font-bold flex items-center mb-4">
                            <ShieldCheck className="w-5 h-5 mr-2 text-[var(--color-accent-600)]" />
                            Audit & Assurance
                        </h3>
                        <p className="text-sm text-gray-300 mb-6">Initiate formal verification procedures for this entity.</p>
                        <Link href={`/businesses/${id}/audits/new`} className="block w-full py-2 bg-[var(--color-accent-600)] hover:bg-teal-500 text-center rounded-lg text-sm font-bold transition-colors">
                            Initiate Audit
                        </Link>
                    </div>

                    {/* Messages */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-[var(--color-primary-900)] mb-2">Communication</h3>
                        <p className="text-sm text-gray-500 mb-4">Official mediation threads.</p>
                        <Link href={`/businesses/${id}/messages`} className="block w-full py-2 border border-gray-200 hover:bg-gray-50 text-[var(--color-primary-900)] text-center rounded-lg text-sm font-medium transition-colors">
                            View Message Threads
                        </Link>
                    </div>

                    {/* Linked Investors */}
                    <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                        <h3 className="font-bold text-[var(--color-primary-900)] mb-4 flex items-center">
                            <Users className="w-4 h-4 mr-2 text-gray-400" />
                            Linked Investors
                        </h3>
                        <div className="space-y-3">
                            {links.length === 0 ? (
                                <div className="text-sm text-gray-500 italic">No active investors linked.</div>
                            ) : (
                                links.map(l => (
                                    <div key={l.link_id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border border-gray-50">
                                        <span className="text-sm font-medium text-[var(--color-primary-900)]">{l.investorName}</span>
                                        <span className="text-[10px] px-2 py-0.5 bg-white border rounded text-gray-500 capitalize tracking-wide">{l.relationship_type}</span>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="mt-4 pt-4 border-t border-gray-50 text-center">
                            <Link href="/relationships" className="text-xs font-bold text-[var(--color-accent-600)] hover:text-teal-700 uppercase tracking-wide">
                                Manage Relationships
                            </Link>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { mockDb } from '@/services/mockDb';
import { Investor, InvestorBusinessLink, AuditRecord, Business } from '@/types';
import { User, Globe, Mail, Building2, ExternalLink, ShieldCheck, AlertTriangle, ShieldAlert, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface PortfolioItem extends InvestorBusinessLink {
    businessName?: string;
    location?: string;
    latestAudit?: AuditRecord;
    businessStatus?: string;
}

export default function InvestorDashboard() {
    const params = useParams();
    const id = params.id as string;
    const [investor, setInvestor] = useState<Investor | null>(null);
    const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            const [i, links] = await Promise.all([
                mockDb.getInvestorById(id),
                mockDb.getLinksByInvestorId(id)
            ]);

            if (links) {
                // Enrich links with latest audit data
                const enrichedLinks = await Promise.all(links.map(async (link) => {
                    const audits = await mockDb.getAuditsByBusinessId(link.business_id);
                    // Find latest audit
                    const latestAudit = audits.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())[0];
                    return { ...link, latestAudit };
                }));
                setPortfolio(enrichedLinks);
            }

            setInvestor(i || null);
            setLoading(false);
        };
        if (id) loadData();
    }, [id]);

    if (loading) return <div className="p-10 text-center text-gray-500">Loading investor profile...</div>;
    if (!investor) return <div className="p-10 text-center text-red-500">Investor not found</div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center">
                <div className="flex items-center space-x-5">
                    <div className="bg-[var(--color-primary-50)] p-4 rounded-full">
                        <User className="w-8 h-8 text-[var(--color-primary-900)]" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-[var(--color-primary-900)]">{investor.full_name}</h1>
                        <div className="flex items-center space-x-4 text-gray-500 text-sm mt-1">
                            <span className="flex items-center"><Globe className="w-4 h-4 mr-1" /> {investor.country}</span>
                            <span className="flex items-center"><Mail className="w-4 h-4 mr-1" /> {investor.contact_email}</span>
                        </div>
                    </div>
                </div>
                <div className="mt-4 md:mt-0 text-right">
                    <div className="text-sm text-gray-500">Active Allocations</div>
                    <div className="text-3xl font-bold text-[var(--color-primary-900)]">{portfolio.length}</div>
                </div>
            </div>

            {/* Portfolio Grid */}
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-[var(--color-primary-900)]">Your Trust Portfolio</h2>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">Read-Only View</span>
                </div>

                {portfolio.length === 0 ? (
                    <div className="bg-[var(--color-surface-50)] border border-dashed border-gray-200 rounded-xl p-12 text-center text-gray-400">
                        No active investments found. Contact Mwa-Mkhulu to link your assets.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {portfolio.map(item => (
                            <div key={item.link_id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col">
                                {/* Card Header */}
                                <div className="p-6 pb-4 flex justify-between items-start">
                                    <div className="flex items-start space-x-3">
                                        <div className="bg-[var(--color-primary-50)] p-2.5 rounded-lg">
                                            <Building2 className="w-6 h-6 text-[var(--color-primary-900)]" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg text-[var(--color-primary-900)]">{item.businessName}</h3>
                                            <p className="text-sm text-gray-500">{item.location}</p>
                                        </div>
                                    </div>
                                    <span className="px-2 py-1 bg-gray-50 border rounded text-[10px] uppercase font-bold text-gray-500 tracking-wide">
                                        {item.relationship_type}
                                    </span>
                                </div>

                                {/* Assurance Status (The "Peace of Mind" Section) */}
                                <div className="px-6 py-4 bg-[var(--color-surface-50)] border-t border-b border-gray-100 grid grid-cols-2 gap-4">
                                    {/* Audit Check */}
                                    <div>
                                        <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Audit Status</div>
                                        {item.latestAudit ? (
                                            <div className={cn("flex items-center text-sm font-bold",
                                                item.latestAudit.audit_status === 'verified' ? "text-[var(--color-accent-600)]" :
                                                    item.latestAudit.audit_status === 'flagged' ? "text-amber-600" : "text-red-600"
                                            )}>
                                                {item.latestAudit.audit_status === 'verified' && <ShieldCheck className="w-4 h-4 mr-1.5" />}
                                                {item.latestAudit.audit_status === 'flagged' && <AlertTriangle className="w-4 h-4 mr-1.5" />}
                                                {item.latestAudit.audit_status === 'rejected' && <ShieldAlert className="w-4 h-4 mr-1.5" />}
                                                <span className="capitalize">{item.latestAudit.audit_status}</span>
                                            </div>
                                        ) : (
                                            <div className="text-sm text-gray-400 flex items-center">
                                                <span className="w-2 h-2 rounded-full bg-gray-300 mr-2"></span>
                                                Pending Review
                                            </div>
                                        )}
                                    </div>

                                    {/* Risk Level */}
                                    <div>
                                        <div className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Risk Assessment</div>
                                        {item.latestAudit ? (
                                            <div className={cn("flex items-center text-sm font-bold",
                                                item.latestAudit.risk_level === 'low' ? "text-green-600" :
                                                    item.latestAudit.risk_level === 'medium' ? "text-amber-600" : "text-red-600"
                                            )}>
                                                <span className={cn("w-2 h-2 rounded-full mr-2",
                                                    item.latestAudit.risk_level === 'low' ? "bg-green-600" :
                                                        item.latestAudit.risk_level === 'medium' ? "bg-amber-600" : "bg-red-600"
                                                )}></span>
                                                <span className="capitalize">{item.latestAudit.risk_level} Risk</span>
                                            </div>
                                        ) : (
                                            <div className="text-sm text-gray-400">Not Assessed</div>
                                        )}
                                    </div>
                                </div>

                                {/* Footer Action */}
                                <div className="p-4 bg-gray-50/50 mt-auto flex justify-between items-center group-hover:bg-gray-50 transition-colors">
                                    <div className="text-xs text-gray-400">
                                        Active since {new Date(item.start_date || Date.now()).toLocaleDateString()}
                                    </div>
                                    <Link href={`/businesses/${item.business_id}`} className="text-sm font-medium text-[var(--color-accent-600)] hover:text-teal-800 flex items-center transition-colors">
                                        View Full Report <ExternalLink className="w-3 h-3 ml-1" />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

'use client';

import { useEffect, useState } from 'react';
import { mockDb } from '@/services/mockDb';
import { Business, Investor, Report } from '@/types';
import { Building2, Users, FileText, ArrowUpRight, TrendingUp, ShieldCheck } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    businesses: 0,
    investors: 0,
    reports: 0,
    audits: 0
  });
  const [recentBusinesses, setRecentBusinesses] = useState<Business[]>([]);
  const [recentInvestors, setRecentInvestors] = useState<Investor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [businesses, investors, reports, audits] = await Promise.all([
        mockDb.get<Business>('investor_platform_businesses_v2'),
        mockDb.get<Investor>('investor_platform_investors_v2'),
        mockDb.get<Report>('investor_platform_reports_v2'),
        mockDb.get('investor_platform_audits_v2') as any // Cast for now
      ]);

      setStats({
        businesses: businesses.length,
        investors: investors.length,
        reports: reports.length,
        audits: (audits || []).length
      });
      setRecentBusinesses(businesses.slice(0, 5));
      setRecentInvestors(investors.slice(0, 5));
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-full text-gray-400">
      <div className="animate-pulse">Loading Platform Data...</div>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">

      {/* Platform Title */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--color-primary-900)]">Platform Overview</h1>
        <p className="text-gray-500 text-sm">System-wide performance and verification status.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Building2 className="w-6 h-6 text-[var(--color-primary-900)]" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" /> +12%
            </span>
          </div>
          <div className="text-3xl font-bold text-[var(--color-primary-900)] mb-1">{stats.businesses}</div>
          <div className="text-sm text-gray-500 font-medium">Active Businesses</div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Users className="w-6 h-6 text-purple-700" />
            </div>
            <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center">
              <TrendingUp className="w-3 h-3 mr-1" /> +5%
            </span>
          </div>
          <div className="text-3xl font-bold text-[var(--color-primary-900)] mb-1">{stats.investors}</div>
          <div className="text-sm text-gray-500 font-medium">Registered Investors</div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-teal-50 rounded-lg">
              <FileText className="w-6 h-6 text-[var(--color-accent-600)]" />
            </div>
            <span className="text-xs font-medium text-gray-500 bg-gray-50 px-2 py-0.5 rounded-full">
              This Month
            </span>
          </div>
          <div className="text-3xl font-bold text-[var(--color-primary-900)] mb-1">{stats.reports}</div>
          <div className="text-sm text-gray-500 font-medium">Reports Submitted</div>
        </div>

        <div className="bg-gradient-to-br from-[var(--color-primary-900)] to-[var(--color-primary-800)] p-6 rounded-xl border border-[var(--color-primary-900)] shadow-sm text-white">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
              <ShieldCheck className="w-6 h-6 text-[var(--color-accent-600)]" />
            </div>
            <span className="text-xs font-medium text-white/80 bg-white/10 px-2 py-0.5 rounded-full">
              Phase 7
            </span>
          </div>
          <div className="text-3xl font-bold mb-1">{stats.audits}</div>
          <div className="text-sm text-blue-100 font-medium">Audits Verified</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* Recent Businesses Table */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-[var(--color-primary-900)]">Recent Registrations</h3>
            <Link href="/businesses" className="text-xs font-medium text-[var(--color-accent-600)] hover:text-teal-700 uppercase tracking-wide">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-50 text-gray-500 font-medium">
                <tr>
                  <th className="px-6 py-3">Business Name</th>
                  <th className="px-6 py-3">Location</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {recentBusinesses.map((b) => (
                  <tr key={b.business_id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-[var(--color-primary-900)]">{b.business_name}</td>
                    <td className="px-6 py-4 text-gray-500">{b.physical_location}</td>
                    <td className="px-6 py-4">
                      <span className={cn(
                        "px-2 py-1 rounded-full text-xs font-medium capitalize",
                        b.status === 'active' ? "bg-green-50 text-green-700 border border-green-100" : "bg-gray-50 text-gray-600"
                      )}>
                        {b.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <Link href={`/businesses/${b.business_id}`} className="p-1 rounded hover:bg-gray-200 inline-block text-gray-400 hover:text-[var(--color-primary-900)]">
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
                {recentBusinesses.length === 0 && (
                  <tr><td colSpan={4} className="px-6 py-8 text-center text-gray-400 italic">No businesses found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Investors List */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm flex flex-col">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-[var(--color-primary-900)]">Active Investors</h3>
            <Link href="/investors" className="text-xs font-medium text-[var(--color-accent-600)] hover:text-teal-700 uppercase tracking-wide">View All</Link>
          </div>
          <div className="p-6 space-y-4">
            {recentInvestors.map((i) => (
              <div key={i.investor_id} className="flex items-center justify-between group">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs uppercase">
                    {i.full_name.substring(0, 2)}
                  </div>
                  <div>
                    <div className="font-medium text-[var(--color-primary-900)]">{i.full_name}</div>
                    <div className="text-xs text-gray-400">{i.country}</div>
                  </div>
                </div>
                <Link href={`/investors/${i.investor_id}`} className="text-xs bg-gray-50 hover:bg-gray-100 text-gray-600 px-3 py-1.5 rounded border border-gray-100 transition-colors">
                  Portfolio
                </Link>
              </div>
            ))}
            {recentInvestors.length === 0 && (
              <div className="text-center text-gray-400 italic py-4">No investors found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import { Building2, Home, Users, Settings, ShieldCheck, LogOut, FileText } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();

    const isActive = (path: string) => {
        if (path === '/') return pathname === '/';
        return pathname.startsWith(path);
    };

    const NavItem = ({ href, icon: Icon, label }: { href: string; icon: any; label: string }) => (
        <Link href={href} className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors group ${isActive(href)
                ? 'bg-[var(--color-primary-800)] text-white'
                : 'text-gray-400 hover:bg-[var(--color-primary-800)] hover:text-white'
            }`}>
            <Icon className={`w-5 h-5 mr-3 transition-colors ${isActive(href) ? 'text-[var(--color-accent-600)]' : 'text-gray-500 group-hover:text-white'}`} />
            {label}
        </Link>
    );

    return (
        <div className="flex h-screen bg-[var(--color-surface-50)] text-[var(--color-primary-900)] font-sans antialiased overflow-hidden">

            {/* Sidebar */}
            <aside className="w-64 flex-shrink-0 bg-[var(--color-primary-900)] border-r border-[var(--color-primary-800)] flex flex-col">
                <div className="p-6">
                    <div className="flex items-center space-x-2 text-white">
                        <div className="bg-[var(--color-accent-600)] p-1.5 rounded-lg">
                            <ShieldCheck className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <span className="block text-sm font-bold tracking-wide">MWA-MKHULU</span>
                            <span className="block text-[10px] text-gray-400 tracking-wider">KILIFI CO. ASSURANCE</span>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-1 mt-4">
                    <NavItem href="/" icon={Home} label="Overview" />
                    <NavItem href="/businesses" icon={Building2} label="Businesses" />
                    <NavItem href="/investors" icon={Users} label="Investors" />
                    <NavItem href="/relationships" icon={FileText} label="Relationships" />
                </nav>

                <div className="p-4 border-t border-[var(--color-primary-800)]">
                    <div className="flex items-center px-4 py-3 text-sm font-medium text-gray-400 rounded-lg hover:bg-[var(--color-primary-800)] hover:text-white cursor-not-allowed opacity-50">
                        <Settings className="w-5 h-5 mr-3" />
                        Settings
                    </div>
                    <div className="mt-2 flex items-center px-4 py-3 text-sm font-medium text-gray-400 rounded-lg hover:bg-[var(--color-primary-800)] hover:text-white cursor-pointer group">
                        <LogOut className="w-5 h-5 mr-3 group-hover:text-red-400" />
                        Sign Out
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Header (Contextual) */}
                <header className="h-16 flex-shrink-0 bg-white border-b border-gray-100 flex items-center justify-between px-8 shadow-sm z-10">
                    <div className="flex items-center">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mr-2">Platform Status</span>
                        <div className="flex items-center space-x-2 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                            <span className="w-2 h-2 bg-[var(--color-accent-600)] rounded-full animate-pulse"></span>
                            <span className="text-xs font-medium text-[var(--color-primary-900)]">Operational</span>
                        </div>
                    </div>
                    <div className="flex items-center space-x-4">
                        <div className="text-right hidden sm:block">
                            <div className="text-sm font-bold text-[var(--color-primary-900)]">Admin User</div>
                            <div className="text-xs text-gray-500">Mwa-Mkhulu Internal</div>
                        </div>
                        <div className="h-8 w-8 bg-[var(--color-primary-900)] rounded-full flex items-center justify-center text-white font-bold text-xs">
                            AD
                        </div>
                    </div>
                </header>

                {/* Scrollable Page Content */}
                <div className="flex-1 overflow-y-auto p-8 relative">
                    {children}
                </div>
            </main>
        </div>
    );
}

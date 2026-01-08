'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Briefcase, Users, Link as LinkIcon, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

const items = [
    { href: '/', label: 'Overview', icon: Home },
    { href: '/businesses', label: 'Businesses', icon: Briefcase },
    { href: '/investors', label: 'Investors', icon: Users },
    { href: '/relationships', label: 'Relationships', icon: LinkIcon },
];

export function Sidebar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <button
                className="md:hidden fixed top-4 right-4 z-50 p-2 bg-white rounded shadow"
                onClick={() => setIsOpen(!isOpen)}
            >
                <Menu className="w-6 h-6" />
            </button>

            <div className={cn(
                "fixed inset-y-0 left-0 z-40 w-64 bg-white border-r shadow-sm transform transition-transform duration-200 ease-in-out md:translate-x-0",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-center h-16 border-b">
                        <h1 className="text-xl font-bold tracking-tight text-primary">InvestorPlatform</h1>
                    </div>
                    <nav className="flex-1 p-4 space-y-1">
                        {items.map((item) => {
                            const Icon = item.icon;
                            const active = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors",
                                        active
                                            ? "bg-primary/10 text-primary"
                                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                                    )}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Icon className="w-5 h-5 mr-3" />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>
                    <div className="p-4 border-t">
                        <div className="text-xs text-gray-500 text-center">
                            Phase 3: No Auth MVP
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

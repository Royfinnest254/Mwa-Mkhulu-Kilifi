'use client';

import { Business, Investor, InvestorBusinessLink, Report, ReportStatus, AuditRecord, MessageThread, Message, AuditStatus, MessageSenderLabel, Evidence } from '@/types';

// Helper to simulate delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const STORAGE_KEYS = {
    BUSINESSES: 'investor_platform_businesses_v2',
    INVESTORS: 'investor_platform_investors_v2',
    LINKS: 'investor_platform_links_v2',
    REPORTS: 'investor_platform_reports_v2',
    AUDITS: 'investor_platform_audits_v2',
    THREADS: 'investor_platform_threads_v2',
    MESSAGES: 'investor_platform_messages_v2',
    EVIDENCE: 'investor_platform_evidence_v2',
};

// Seed data
const SEED_BUSINESSES: Business[] = [
    {
        business_id: 'b1',
        business_name: 'Mwa-Mkhulu Kilifi Co',
        business_type: 'Agriculture',
        physical_location: 'Kilifi',
        county: 'Kilifi',
        description: 'Sustainable coconut processing plant.',
        date_registered: '2025-01-01',
        status: 'active',
        created_at: new Date().toISOString(),
    },
];

const SEED_INVESTORS: Investor[] = [
    {
        investor_id: 'i1',
        full_name: 'Global Ventures Ltd',
        country: 'UK',
        contact_email: 'contact@globalventures.test',
        notes: 'Primary seed investor.',
        created_at: new Date().toISOString(),
    },
];

const SEED_LINKS: InvestorBusinessLink[] = [
    {
        link_id: 'l1',
        investor_id: 'i1',
        business_id: 'b1',
        relationship_type: 'partner',
        start_date: '2025-02-01',
        status: 'active',
        created_at: new Date().toISOString(),
    }
];

const SEED_REPORTS: Report[] = [
    {
        report_id: 'r1',
        business_id: 'b1',
        reporting_period_start: '2025-01-01',
        reporting_period_end: '2025-01-31',
        report_type: 'monthly',
        summary_text: 'Operations started smoothly. Land preparation complete.',
        revenue_amount: 0,
        expense_amount: 50000,
        net_result: -50000,
        status: 'reviewed',
        admin_comments: 'Good initial progress.',
        created_at: new Date().toISOString(),
    }
];

class MockDbService {
    private get<T>(key: string): T[] {
        if (typeof window === 'undefined') return [];
        const stored = localStorage.getItem(key);
        if (!stored) return [];
        return JSON.parse(stored);
    }

    private set<T>(key: string, data: T[]) {
        if (typeof window === 'undefined') return;
        localStorage.setItem(key, JSON.stringify(data));
    }

    // --- INIT ---
    init() {
        if (typeof window === 'undefined') return;
        // Purge old keys if schema changed abruptly (optional but safe for dev)
        // actually let's just overwrite for now if existing data is incompatible or leave it. 
        // For MVP simplicity we check existence.

        if (!localStorage.getItem(STORAGE_KEYS.BUSINESSES)) {
            this.set(STORAGE_KEYS.BUSINESSES, SEED_BUSINESSES);
        }
        if (!localStorage.getItem(STORAGE_KEYS.INVESTORS)) {
            this.set(STORAGE_KEYS.INVESTORS, SEED_INVESTORS);
        }
        if (!localStorage.getItem(STORAGE_KEYS.LINKS)) {
            this.set(STORAGE_KEYS.LINKS, SEED_LINKS);
        }
        if (!localStorage.getItem(STORAGE_KEYS.REPORTS)) {
            this.set(STORAGE_KEYS.REPORTS, SEED_REPORTS);
        }
    }

    // --- BUSINESSES ---
    async getBusinesses(): Promise<Business[]> {
        await delay(300);
        return this.get<Business>(STORAGE_KEYS.BUSINESSES);
    }

    async getBusinessById(id: string): Promise<Business | undefined> {
        await delay(200);
        const list = this.get<Business>(STORAGE_KEYS.BUSINESSES);
        return list.find(b => b.business_id === id);
    }

    async createBusiness(data: Omit<Business, 'business_id' | 'created_at'>): Promise<Business> {
        await delay(500);
        const newBiz: Business = {
            ...data,
            business_id: crypto.randomUUID(),
            created_at: new Date().toISOString(),
        };
        const list = this.get<Business>(STORAGE_KEYS.BUSINESSES);
        list.push(newBiz);
        this.set(STORAGE_KEYS.BUSINESSES, list);
        return newBiz;
    }

    // --- INVESTORS ---
    async getInvestors(): Promise<Investor[]> {
        await delay(300);
        return this.get<Investor>(STORAGE_KEYS.INVESTORS);
    }

    async getInvestorById(id: string): Promise<Investor | undefined> {
        await delay(200);
        const list = this.get<Investor>(STORAGE_KEYS.INVESTORS);
        return list.find(i => i.investor_id === id);
    }

    async createInvestor(data: Omit<Investor, 'investor_id' | 'created_at'>): Promise<Investor> {
        await delay(500);
        const newInv: Investor = {
            ...data,
            investor_id: crypto.randomUUID(),
            created_at: new Date().toISOString(),
        };
        const list = this.get<Investor>(STORAGE_KEYS.INVESTORS);
        list.push(newInv);
        this.set(STORAGE_KEYS.INVESTORS, list);
        return newInv;
    }

    // --- LINKS ---
    async getLinks(): Promise<(InvestorBusinessLink & { businessName?: string, investorName?: string })[]> {
        await delay(300);
        const links = this.get<InvestorBusinessLink>(STORAGE_KEYS.LINKS);
        const businesses = this.get<Business>(STORAGE_KEYS.BUSINESSES);
        const investors = this.get<Investor>(STORAGE_KEYS.INVESTORS);

        return links.map(link => ({
            ...link,
            businessName: businesses.find(b => b.business_id === link.business_id)?.business_name,
            investorName: investors.find(i => i.investor_id === link.investor_id)?.full_name,
        }));
    }

    async getLinksByBusinessId(businessId: string): Promise<(InvestorBusinessLink & { investorName?: string })[]> {
        await delay(200);
        const links = this.get<InvestorBusinessLink>(STORAGE_KEYS.LINKS).filter(l => l.business_id === businessId && l.status === 'active');
        const investors = this.get<Investor>(STORAGE_KEYS.INVESTORS);

        return links.map(link => ({
            ...link,
            investorName: investors.find(i => i.investor_id === link.investor_id)?.full_name
        }));
    }

    async getLinksByInvestorId(investorId: string): Promise<(InvestorBusinessLink & { businessName?: string, location?: string })[]> {
        await delay(200);
        const links = this.get<InvestorBusinessLink>(STORAGE_KEYS.LINKS).filter(l => l.investor_id === investorId && l.status === 'active');
        const businesses = this.get<Business>(STORAGE_KEYS.BUSINESSES);

        return links.map(link => {
            const biz = businesses.find(b => b.business_id === link.business_id);
            return {
                ...link,
                businessName: biz?.business_name,
                location: biz?.physical_location
            };
        });
    }

    async createLink(data: Omit<InvestorBusinessLink, 'link_id' | 'created_at'>): Promise<InvestorBusinessLink> {
        await delay(500);
        const newLink: InvestorBusinessLink = {
            ...data,
            link_id: crypto.randomUUID(),
            created_at: new Date().toISOString(),
        };
        const list = this.get<InvestorBusinessLink>(STORAGE_KEYS.LINKS);
        list.push(newLink);
        this.set(STORAGE_KEYS.LINKS, list);
        return newLink;
    }

    // --- REPORTS ---
    async getReports(): Promise<Report[]> {
        await delay(300);
        return this.get<Report>(STORAGE_KEYS.REPORTS);
    }

    async getReportsByBusinessId(businessId: string): Promise<Report[]> {
        await delay(300);
        const reports = this.get<Report>(STORAGE_KEYS.REPORTS);
        return reports
            .filter(r => r.business_id === businessId)
            .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    async getReportById(reportId: string): Promise<Report | undefined> {
        await delay(200);
        const reports = this.get<Report>(STORAGE_KEYS.REPORTS);
        return reports.find(r => r.report_id === reportId);
    }

    async createReport(data: Omit<Report, 'report_id' | 'created_at' | 'status'>): Promise<Report> {
        await delay(500);
        const newReport: Report = {
            ...data,
            report_id: crypto.randomUUID(),
            status: 'draft',
            created_at: new Date().toISOString(),
        };
        const list = this.get<Report>(STORAGE_KEYS.REPORTS);
        list.push(newReport);
        this.set(STORAGE_KEYS.REPORTS, list);
        return newReport;
    }

    async updateReportStatus(reportId: string, status: ReportStatus, admin_comments?: string): Promise<Report | undefined> {
        await delay(400);
        const list = this.get<Report>(STORAGE_KEYS.REPORTS);
        const idx = list.findIndex(r => r.report_id === reportId);
        if (idx === -1) return undefined;

        list[idx].status = status;
        if (admin_comments) {
            list[idx].admin_comments = admin_comments;
        }

        this.set(STORAGE_KEYS.REPORTS, list);
        return list[idx];
    }

    // --- AUDITS (Phase 7) ---
    async getAudits(): Promise<AuditRecord[]> {
        await delay(300);
        return this.get<AuditRecord>(STORAGE_KEYS.AUDITS);
    }

    async getAuditsByBusinessId(businessId: string): Promise<AuditRecord[]> {
        await delay(300);
        const audits = this.get<AuditRecord>(STORAGE_KEYS.AUDITS);
        return audits.filter(a => a.business_id === businessId).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    async getAuditById(auditId: string): Promise<AuditRecord | undefined> {
        await delay(200);
        const audits = this.get<AuditRecord>(STORAGE_KEYS.AUDITS);
        return audits.find(a => a.audit_id === auditId);
    }

    async createAudit(data: Omit<AuditRecord, 'audit_id' | 'created_at'>): Promise<AuditRecord> {
        await delay(500);
        const newAudit: AuditRecord = {
            ...data,
            audit_id: crypto.randomUUID(),
            created_at: new Date().toISOString(),
        };
        const list = this.get<AuditRecord>(STORAGE_KEYS.AUDITS);
        list.push(newAudit);
        this.set(STORAGE_KEYS.AUDITS, list);
        return newAudit;
    }

    // --- MESSAGING (Phase 8) ---
    async getThreadsByBusinessId(businessId: string): Promise<MessageThread[]> {
        await delay(300);
        const threads = this.get<MessageThread>(STORAGE_KEYS.THREADS);
        return threads.filter(t => t.business_id === businessId).sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    }

    async getThreadById(threadId: string): Promise<MessageThread | undefined> {
        await delay(200);
        const threads = this.get<MessageThread>(STORAGE_KEYS.THREADS);
        return threads.find(t => t.thread_id === threadId);
    }

    async createThread(data: Omit<MessageThread, 'thread_id' | 'created_at' | 'status'>): Promise<MessageThread> {
        await delay(500);
        const newThread: MessageThread = {
            ...data,
            thread_id: crypto.randomUUID(),
            status: 'open',
            created_at: new Date().toISOString(),
        };
        const list = this.get<MessageThread>(STORAGE_KEYS.THREADS);
        list.push(newThread);
        this.set(STORAGE_KEYS.THREADS, list);
        return newThread;
    }

    async getMessagesByThreadId(threadId: string): Promise<Message[]> {
        await delay(200);
        const msgs = this.get<Message>(STORAGE_KEYS.MESSAGES);
        return msgs.filter(m => m.thread_id === threadId).sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
    }

    async createMessage(data: Omit<Message, 'message_id' | 'created_at'>): Promise<Message> {
        await delay(300);
        const newMsg: Message = {
            ...data,
            message_id: crypto.randomUUID(),
            created_at: new Date().toISOString(),
        };
        const list = this.get<Message>(STORAGE_KEYS.MESSAGES);
        list.push(newMsg);
        this.set(STORAGE_KEYS.MESSAGES, list);
        return newMsg;
    }

    // --- EVIDENCE (Phase 6) ---
    async getEvidenceByBusinessId(businessId: string): Promise<Evidence[]> {
        await delay(300);
        const allStats = this.get<Evidence>(STORAGE_KEYS.EVIDENCE);
        return allStats.filter(e => e.business_id === businessId).sort((a, b) => new Date(b.upload_date).getTime() - new Date(a.upload_date).getTime());
    }

    async uploadEvidence(data: Omit<Evidence, 'evidence_id' | 'upload_date' | 'status'>): Promise<Evidence> {
        await delay(500);
        const newItem: Evidence = {
            ...data,
            evidence_id: crypto.randomUUID(),
            upload_date: new Date().toISOString(),
            status: 'pending_review',
        };
        const list = this.get<Evidence>(STORAGE_KEYS.EVIDENCE);
        list.push(newItem);
        this.set(STORAGE_KEYS.EVIDENCE, list);
        return newItem;
    }
}

export const mockDb = new MockDbService();

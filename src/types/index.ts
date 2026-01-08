export type BusinessStatus = 'active' | 'suspended' | 'closed';
export type InvestorStatus = 'active' | 'inactive';
export type LinkStatus = 'active' | 'ended';
export type RelationshipType = 'owner' | 'partner' | 'observer';

export interface Business {
  business_id: string; // UUID
  business_name: string;
  business_type: string;
  physical_location: string;
  county: string;
  description: string;
  date_registered: string;
  status: BusinessStatus;
  notes?: string;
  created_at: string;
}

export interface Investor {
  investor_id: string; // UUID
  full_name: string;
  country: string;
  contact_email: string;
  contact_phone?: string;
  notes?: string;
  created_at: string;
}

export interface InvestorBusinessLink {
  link_id: string; // UUID
  investor_id: string;
  business_id: string;
  relationship_type: RelationshipType;
  start_date: string;
  status: LinkStatus;
  created_at: string;
}

export interface Admin {
  admin_id: string;
  name: string;
  role_description: string;
  created_at: string;
}

export type ReportType = 'monthly' | 'quarterly' | 'custom';
export type ReportStatus = 'draft' | 'submitted' | 'reviewed';

export interface Report {
  report_id: string; // UUID
  business_id: string; // FK
  reporting_period_start: string;
  reporting_period_end: string;
  report_type: ReportType;
  summary_text: string;
  revenue_amount?: number; // Optional
  expense_amount?: number; // Optional
  net_result?: number; // Derived or manual
  operational_notes?: string;
  submitted_date?: string;
  status: ReportStatus;
  admin_comments?: string;
  created_at: string;
}

export type AuditStatus = 'pending' | 'verified' | 'flagged' | 'rejected';
export type RiskLevel = 'low' | 'medium' | 'high';
export type AuditType = 'report' | 'periodic' | 'special';

export interface AuditRecord {
  audit_id: string; // UUID
  business_id: string; // FK
  report_id?: string; // FK (Optional)
  audit_type: AuditType;
  audit_status: AuditStatus;
  findings_summary: string;
  risk_level: RiskLevel;
  recommendations?: string;
  auditor_label: string; // 'admin'
  created_at: string;
}

export type MessageSenderLabel = 'admin' | 'business' | 'investor';
export type MessageThreadStatus = 'open' | 'closed';

export interface MessageThread {
  thread_id: string;
  business_id: string; // FK
  related_type: 'report' | 'audit' | 'general';
  related_id?: string; // FK
  subject: string;
  status: MessageThreadStatus;
  created_at: string;
}

export interface Message {
  message_id: string;
  thread_id: string; // FK
  sender_label: MessageSenderLabel;
  message_body: string;
  created_at: string;
}

export type EvidenceStatus = 'pending_review' | 'verified' | 'rejected' | 'archived';

export interface Evidence {
  evidence_id: string; // UUID
  business_id: string; // FK
  report_id?: string; // FK (Optional - evidence can be general)
  file_name: string;
  file_url: string; // local or mock url
  file_type: string; // pdf, png, etc
  description: string;
  upload_date: string;
  status: EvidenceStatus;
  verified_by?: string; // admin_label
  verified_date?: string;
}

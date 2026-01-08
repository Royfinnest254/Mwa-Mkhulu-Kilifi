'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { mockDb } from '@/services/mockDb';
import { Business } from '@/types';
import { ArrowLeft, UploadCloud, FileText } from 'lucide-react';
import Link from 'next/link';

export default function EvidenceUploadPage() {
    const params = useParams();
    const router = useRouter();
    const businessId = params.id as string;
    const [business, setBusiness] = useState<Business | null>(null);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        file_name: '',
        file_type: 'pdf',
        description: '',
    });

    useEffect(() => {
        mockDb.getBusinessById(businessId).then(b => setBusiness(b || null));
    }, [businessId]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate file upload (No Auth MVP)
        const mockUrl = `https://mock-storage.com/${businessId}/${crypto.randomUUID()}.pdf`;

        await mockDb.uploadEvidence({
            business_id: businessId,
            file_name: formData.file_name,
            file_type: formData.file_type,
            file_url: mockUrl,
            description: formData.description,
        });

        setLoading(false);
        // Redirect back to business dashboard
        router.push(`/businesses/${businessId}`);
    };

    if (!business) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="max-w-2xl mx-auto space-y-6">
            <div>
                <Link href={`/businesses/${businessId}`} className="text-sm text-gray-500 hover:underline flex items-center mb-4">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to Dashboard
                </Link>
                <div className="flex items-center space-x-3 mb-2">
                    <div className="bg-[var(--color-primary-50)] p-2 rounded-lg">
                        <UploadCloud className="w-6 h-6 text-[var(--color-primary-900)]" />
                    </div>
                    <h1 className="text-2xl font-bold text-[var(--color-primary-900)]">Upload Verification Evidence</h1>
                </div>
                <p className="text-gray-500">Submit supporting documents (Receipts, Bank Statements, contracts) for audit verification.</p>
            </div>

            <div className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* File Meta */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-1">Document Name</label>
                            <input required type="text" className="w-full p-2 border rounded-md"
                                placeholder="e.g. Q1 Bank Statement"
                                value={formData.file_name} onChange={e => setFormData({ ...formData, file_name: e.target.value })} />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-1">File Type</label>
                            <select className="w-full p-2 border rounded-md"
                                value={formData.file_type} onChange={e => setFormData({ ...formData, file_type: e.target.value })}>
                                <option value="pdf">PDF Document</option>
                                <option value="png">Image (PNG/JPG)</option>
                                <option value="csv">Data Sheet (CSV/XLS)</option>
                            </select>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-medium mb-1">Context / Description</label>
                        <textarea required rows={3} className="w-full p-2 border rounded-md"
                            placeholder="Describe what figures this evidence supports..."
                            value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                    </div>

                    {/* Fake Dropzone */}
                    <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center bg-[var(--color-primary-50)]">
                        <FileText className="w-10 h-10 text-gray-400 mx-auto mb-3" />
                        <p className="text-sm text-gray-600 font-medium">Drag and drop file here, or click to browse</p>
                        <p className="text-xs text-gray-400 mt-1">Supports PDF, PNG, JPEG (Max 10MB)</p>
                        <button type="button" className="mt-4 px-4 py-2 bg-white border shadow-sm rounded-lg text-sm font-medium hover:bg-gray-50">
                            Select File (Simulated)
                        </button>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button type="submit" disabled={loading} className="bg-[var(--color-primary-900)] text-white px-8 py-2 rounded-lg hover:bg-[var(--color-primary-800)] disabled:opacity-50 transition-colors shadow-sm">
                            {loading ? 'Uploading...' : 'Submit Evidence'}
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}

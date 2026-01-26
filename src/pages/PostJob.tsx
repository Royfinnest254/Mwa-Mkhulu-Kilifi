import React from 'react';
import { ArrowRight, MapPin, Briefcase } from 'lucide-react';

const PostJob = () => {
    return (
        <div className="pt-24 pb-20 bg-brand-bg min-h-screen">
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold text-brand-dark mb-2">Tell Us What You Need</h1>
                    <p className="text-gray-500">We'll match you with verified agents in under 24 hours.</p>
                </div>

                <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">I need help with...</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                {['Construction', 'Farming', 'Logistics', 'Land Survey', 'Legal', 'Other'].map(cat => (
                                    <label key={cat} className="cursor-pointer border border-gray-200 rounded-lg p-3 hover:border-brand-blue hover:bg-blue-50 transition-all flex items-center justify-center">
                                        <input type="radio" name="category" className="hidden" />
                                        <span className="text-sm font-medium text-gray-600">{cat}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Project Location</label>
                                <div className="relative">
                                    <MapPin className="absolute left-3 top-3 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="e.g. Nakuru, Pipeline"
                                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Estimated Budget (KES)</label>
                                <div className="relative">
                                    <Briefcase className="absolute left-3 top-3 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="e.g. 500,000"
                                        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Project Description</label>
                            <textarea
                                rows={5}
                                className="w-full p-4 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue resize-none"
                                placeholder="Describe your project requirements in detail..."
                            ></textarea>
                        </div>

                        <button type="button" className="w-full bg-brand-blue text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition-colors shadow-lg shadow-brand-blue/25 flex items-center justify-center gap-2">
                            Submit Request <ArrowRight size={20} />
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default PostJob;

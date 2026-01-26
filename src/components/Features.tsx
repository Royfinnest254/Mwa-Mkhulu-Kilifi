import { ShieldCheck, Zap, Users, Smartphone } from 'lucide-react';

const features = [
    {
        icon: <ShieldCheck className="w-8 h-8 text-brand-blue" />,
        title: "Verified Agents",
        description: "Every professional on our platform undergoes a strict vetting process, including ID checks and past project verification."
    },
    {
        icon: <Zap className="w-8 h-8 text-brand-orange" />,
        title: "Real-Time Updates",
        description: "Get daily photo and video updates from the ground. Track your project's progress as if you were there yourself."
    },
    {
        icon: <Smartphone className="w-8 h-8 text-green-500" />,
        title: "Escrow Payments",
        description: "Release funds only when milestones are met. Your money is safe until you approve the work."
    },
    {
        icon: <Users className="w-8 h-8 text-purple-500" />,
        title: "Diaspora Support",
        description: "Dedicated support team understanding the unique challenges of managing projects from abroad."
    }
];

const Features = () => {
    return (
        <section className="py-24 bg-white relative z-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4 text-brand-dark">
                        Why Choose <span className="text-brand-blue">Mwa Mkhulu?</span>
                    </h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">
                        We eliminate the uncertainty of remote project management.
                        Build, farm, and ship with confidence.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-brand-bg border border-gray-100 p-8 rounded-2xl hover:shadow-lg transition-all hover:-translate-y-2 group">
                            <div className="mb-6 p-4 bg-white rounded-full w-fit shadow-sm group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold text-brand-dark mb-3">{feature.title}</h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;

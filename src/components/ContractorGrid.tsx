import { Star, Shield, MapPin, Briefcase } from 'lucide-react';

const agents = [
    {
        name: "John Kamau",
        role: "Farm Manager",
        location: "Nakuru, Rift Valley",
        rating: 4.9,
        projects: 56,
        image: "https://images.unsplash.com/photo-1542838686-37da4a9fd1b3?q=80&w=2670&auto=format&fit=crop",
        specialty: "Agriculture"
    },
    {
        name: "Global Link Logistics",
        role: "Clearing Agent",
        location: "Mombasa Port",
        rating: 4.8,
        projects: 342,
        image: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?q=80&w=2574&auto=format&fit=crop",
        specialty: "Logistics"
    },
    {
        name: "Sarah Wanjiku",
        role: "Project Architect",
        location: "Nairobi, Kilimani",
        rating: 5.0,
        projects: 45,
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2576&auto=format&fit=crop",
        specialty: "Construction"
    }
];

const ContractorGrid = () => {
    return (
        <section id="find-agent" className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-brand-dark mb-4">Verified Agents for Any Task</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto">
                        Need someone to manage your farm? Clear a container at the port? Or build your home?
                        Mwa Mkhulu has verified professionals for every need.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {agents.map((agent, i) => (
                        <div key={i} className="group bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-200/50 overflow-hidden hover:-translate-y-1 transition-transform duration-300">
                            <div className="h-48 overflow-hidden bg-gray-100 relative">
                                <img
                                    src={agent.image}
                                    alt={agent.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-brand-blue flex items-center gap-1 shadow-sm">
                                    <Shield size={12} fill="currentColor" /> VERIFIED
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                                    <span className="text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                                        <Briefcase size={12} /> {agent.specialty}
                                    </span>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="text-lg font-bold text-gray-900">{agent.name}</h3>
                                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-1 rounded text-yellow-700 font-bold text-xs">
                                        <Star size={12} fill="currentColor" /> {agent.rating}
                                    </div>
                                </div>

                                <p className="text-brand-blue font-medium text-sm mb-4">{agent.role}</p>

                                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                                    <span className="flex items-center gap-1"><MapPin size={14} /> {agent.location}</span>
                                    <span>•</span>
                                    <span>{agent.projects} Jobs</span>
                                </div>

                                <button className="w-full border border-brand-dark text-brand-dark py-2.5 rounded-lg font-semibold hover:bg-brand-dark hover:text-white transition-colors">
                                    Contact Agent
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ContractorGrid;

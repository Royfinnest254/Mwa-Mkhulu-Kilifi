import React, { useState } from 'react';
import { Star, Shield, MapPin, Briefcase, Search, Filter } from 'lucide-react';

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
    },
    {
        name: "BuildRight Kenya",
        role: "General Contractor",
        location: "Kiambu Road",
        rating: 4.7,
        projects: 12,
        image: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=2531&auto=format&fit=crop",
        specialty: "Construction"
    },
    {
        name: "AgriTech Solutions",
        role: "Irrigation Expert",
        location: "Naivasha",
        rating: 4.9,
        projects: 89,
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=2670&auto=format&fit=crop",
        specialty: "Agriculture"
    },
    {
        name: "Swift Movers",
        role: "Relocation Services",
        location: "Nairobi, Westlands",
        rating: 4.6,
        projects: 210,
        image: "https://images.unsplash.com/photo-1600518464441-9154a4dea21e?q=80&w=2574&auto=format&fit=crop",
        specialty: "Logistics"
    }
];

const Marketplace = () => {
    const [filter, setFilter] = useState("All");

    const filteredAgents = filter === "All"
        ? agents
        : agents.filter(a => a.specialty === filter);

    return (
        <div className="pt-24 pb-20 bg-brand-bg min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header & Search */}
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-bold text-brand-dark mb-4">Find Your Trusted Agent</h1>
                    <p className="text-gray-500 max-w-2xl mx-auto mb-8">
                        Browse verified professionals for Construction, Agriculture, Logistics, and more.
                    </p>

                    <div className="max-w-2xl mx-auto flex gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search by name, location, or service..."
                                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand-blue/20 focus:border-brand-blue"
                            />
                        </div>
                        <button className="bg-brand-dark text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2">
                            <Filter size={18} /> Filters
                        </button>
                    </div>
                </div>

                {/* Categories */}
                <div className="flex justify-center gap-4 mb-12 overflow-x-auto pb-4">
                    {["All", "Construction", "Agriculture", "Logistics"].map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`px-6 py-2 rounded-full font-medium transition-all whitespace-nowrap ${filter === cat
                                    ? 'bg-brand-blue text-white shadow-lg shadow-brand-blue/25'
                                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Grid */}
                <div className="grid md:grid-cols-3 gap-8">
                    {filteredAgents.map((agent, i) => (
                        <div key={i} className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="h-48 overflow-hidden bg-gray-100 relative">
                                <img
                                    src={agent.image}
                                    alt={agent.name}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-bold text-brand-blue flex items-center gap-1 shadow-sm">
                                    <Shield size={12} fill="currentColor" /> VERIFIED
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

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <MapPin size={16} className="text-gray-400" /> {agent.location}
                                    </div>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <Briefcase size={16} className="text-gray-400" /> {agent.projects} Verified Projects
                                    </div>
                                </div>

                                <div className="flex gap-3">
                                    <button className="flex-1 border border-gray-200 text-gray-700 py-2.5 rounded-lg font-semibold hover:bg-gray-50 transition-colors text-sm">
                                        View Profile
                                    </button>
                                    <button className="flex-1 bg-brand-dark text-white py-2.5 rounded-lg font-semibold hover:bg-black transition-colors text-sm">
                                        Contact
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Marketplace;

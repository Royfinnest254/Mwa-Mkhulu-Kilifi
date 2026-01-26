import { Globe, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-brand-dark border-t border-white/10 py-12 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="bg-brand-orange p-1.5 rounded-lg">
                                <Globe className="text-white w-5 h-5" />
                            </div>
                            <span className="text-xl font-bold text-white">
                                MWA <span className="text-brand-blue">MKHULU</span>
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Your trusted eyes and ears on the ground in Kenya.
                            We connect the diaspora with verified agents for construction, farming, and logistics.
                        </p>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Platform</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/" className="hover:text-brand-orange transition-colors">Home</Link></li>
                            <li><Link to="/agents" className="hover:text-brand-orange transition-colors">Find an Agent</Link></li>
                            <li><Link to="/post-job" className="hover:text-brand-orange transition-colors">Post a Job</Link></li>
                            <li><Link to="/dashboard" className="hover:text-brand-orange transition-colors">My Projects</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Services</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li><Link to="/agents" className="hover:text-brand-orange transition-colors">Construction Management</Link></li>
                            <li><Link to="/agents" className="hover:text-brand-orange transition-colors">Farm Monitoring</Link></li>
                            <li><Link to="/agents" className="hover:text-brand-orange transition-colors">Logistics & Clearing</Link></li>
                            <li><Link to="/agents" className="hover:text-brand-orange transition-colors">Land Scouting</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-wider">Contact Us</h4>
                        <ul className="space-y-3 text-sm text-gray-400">
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-brand-orange shrink-0" />
                                <span>Westlands, Nairobi, Kenya</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <Mail size={18} className="text-brand-orange shrink-0" />
                                <a href="mailto:hello@mwamkhulu.com" className="hover:text-white">hello@mwamkhulu.com</a>
                            </li>
                            <li className="flex items-center gap-3">
                                <Phone size={18} className="text-brand-orange shrink-0" />
                                <span>+254 700 000 000</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center">
                    <p>© 2026 Mwa Mkhulu Platform. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

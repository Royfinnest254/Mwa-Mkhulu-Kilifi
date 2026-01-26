import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import Dashboard from './pages/Dashboard';
import PostJob from './pages/PostJob';
import Footer from './components/Footer';

function App() {
  return (
    <div className="bg-white min-h-screen text-brand-dark font-sans selection:bg-brand-blue/30">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/agents" element={<Marketplace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/post-job" element={<PostJob />} />
        {/* Fallback route */}
        <Route path="*" element={<Home />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;

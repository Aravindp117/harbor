import { Routes, Route } from 'react-router-dom';
import { Navbar } from './components/disaster/Navbar';
import { Footer } from './components/disaster/Footer';
import { LiveAlertsBanner } from './components/disaster/LiveAlertsBanner';
import Home from './pages/Home';
import DisasterMap from './pages/DisasterMap';
import AidResources from './pages/AidResources';
import AIAssistant from './pages/AIAssistant';
import Trends from './pages/Trends';
import About from './pages/About';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <LiveAlertsBanner />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<DisasterMap />} />
          <Route path="/aid" element={<AidResources />} />
          <Route path="/assistant" element={<AIAssistant />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

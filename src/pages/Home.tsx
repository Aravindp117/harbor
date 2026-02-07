import { Link } from 'react-router-dom';
import { MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const HEADLINES = [
  { id: 1, title: 'Earthquake Response', subtitle: 'Breaking disaster news updates', source: 'Reuters', slug: 'earthquake-response' },
  { id: 2, title: 'Flood Warning Issued', subtitle: 'Emergency response coverage', source: 'AP News', slug: 'flood-warning' },
  { id: 3, title: 'Global Relief Efforts', subtitle: 'Global relief efforts underway', source: 'BBC World', slug: 'global-relief' },
  { id: 4, title: 'Climate Event Tracking', subtitle: 'Climate event tracking report', source: 'Al Jazeera', slug: 'climate-tracking' },
  { id: 5, title: 'Aid Distribution', subtitle: 'Aid distribution developments', source: 'CNN', slug: 'aid-distribution' },
  { id: 6, title: 'Recovery Operations', subtitle: 'Recovery operations in progress', source: 'The Guardian', slug: 'recovery-ops' },
];

const ITEMS_PER_VIEW = 3;
const TOTAL_PAGES = Math.ceil(HEADLINES.length / ITEMS_PER_VIEW);

const fade = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function Home() {
  const [activePage, setActivePage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActivePage((prev) => (prev + 1) % TOTAL_PAGES);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const currentItems = HEADLINES.slice(
    activePage * ITEMS_PER_VIEW,
    activePage * ITEMS_PER_VIEW + ITEMS_PER_VIEW
  );

  return (
    <div className="relative h-screen overflow-hidden bg-black">
      {/* Subtle gradient background */}
      <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, hsl(220,20%,8%) 0%, hsl(240,15%,12%) 50%, hsl(220,18%,10%) 100%)' }} />

      {/* Content layer */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Hero — vertically centered with slight upward offset for visual balance */}
        <div className="flex-1 flex items-center justify-center px-4 pb-16">
          <div className="text-center">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={fade}
              transition={{ duration: 0.6 }}
              className="font-heading text-5xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-none"
            >
              HARBOR
            </motion.h1>

            <motion.p
              initial="hidden"
              animate="visible"
              variants={fade}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="mt-4 text-sm tracking-[0.2em] uppercase text-white/50"
            >
              Global Disaster Insight
            </motion.p>

            <motion.div
              initial="hidden"
              animate="visible"
              variants={fade}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6"
            >
              <Link
                to="/map"
                className="w-72 py-5 text-center text-sm font-semibold tracking-[0.2em] uppercase bg-white text-black hover:bg-white/90 transition-colors"
              >
                GET STARTED
              </Link>
              <Link
                to="/map"
                className="w-72 py-5 text-center text-sm font-semibold tracking-[0.2em] uppercase border border-white/40 text-white hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
              >
                <MapPin className="h-4 w-4" />
                DISASTER MAP
              </Link>
            </motion.div>
          </div>
        </div>

        {/* News carousel — bottom third */}
        <div className="px-4 sm:px-8 pb-10 pt-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-5">
              <h2 className="font-heading text-xl sm:text-2xl font-light text-white tracking-tight">
                Latest Headlines
              </h2>
              <div className="flex gap-2">
                {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePage(i)}
                    className={`w-8 h-1 transition-colors ${
                      i === activePage ? 'bg-white' : 'bg-white/25'
                    }`}
                  />
                ))}
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
              >
                {currentItems.map((item) => (
                  <Link
                    key={item.id}
                    to={`/headlines/${item.slug}`}
                    className="h-48 border border-white/15 bg-white/5 backdrop-blur-sm flex flex-col justify-end p-6 hover:bg-white/10 transition-colors cursor-pointer group"
                  >
                    <span className="text-[10px] tracking-[0.2em] uppercase text-white/35 mb-2">
                      {item.source}
                    </span>
                    <h3 className="font-heading text-lg font-semibold text-white mb-1 group-hover:text-white/90">
                      {item.title}
                    </h3>
                    <p className="text-sm text-white/50">{item.subtitle}</p>
                  </Link>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

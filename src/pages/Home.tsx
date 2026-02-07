import { Link } from 'react-router-dom';
import { MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useRef, useEffect } from 'react';

const VIDEO_SOURCES = [
  'https://mojli.s3.us-east-2.amazonaws.com/Mojli+Website+upscaled+(12mb).webm',
];

const fade = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.src = VIDEO_SOURCES[0];
      videoRef.current.load();
      videoRef.current.loop = true;
      videoRef.current.muted = true;
      const p = videoRef.current.play();
      if (p) p.catch(() => {});
    }
  }, []);

  return (
    <div>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          muted
          playsInline
          preload="auto"
          style={{ pointerEvents: 'none' }}
        />
        <div className="absolute inset-0 bg-black/70" />

        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fade}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight"
          >
            Global Disaster Insight
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fade}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-4 text-lg text-white/50 max-w-2xl mx-auto"
          >
            Track global disasters and find emergency resources in real time
          </motion.p>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={fade}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button asChild size="lg" className="px-10 font-semibold text-base">
              <Link to="/map">
                Get Started <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="px-10 font-semibold text-base border-white/20 text-white hover:bg-white/10 hover:text-white">
              <Link to="/map">
                <MapPin className="h-4 w-4 mr-2" /> Disaster Map
              </Link>
            </Button>
          </motion.div>
        </div>

        <style>{`
          video::-webkit-media-controls,
          video::-webkit-media-controls-panel,
          video::-webkit-media-controls-play-button,
          video::-webkit-media-controls-start-playback-button,
          video::-webkit-media-controls-enclosure {
            display: none !important;
            -webkit-appearance: none !important;
            opacity: 0 !important;
            pointer-events: none !important;
          }
        `}</style>
      </section>
    </div>
  );
}

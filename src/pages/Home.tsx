import { Link } from 'react-router-dom';
import { MapPin, Brain, BarChart3, ArrowRight, Shield, Globe2, Search, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const features = [
  {
    icon: BarChart3,
    title: 'Global Disaster Trends',
    description: 'See where earthquakes, floods, hurricanes, and wildfires occur most often.',
    color: 'text-disaster-blue',
    bg: 'bg-disaster-blue/10',
  },
  {
    icon: MapPin,
    title: 'Live Aid Resource Map',
    description: 'Find shelters, food banks, and emergency support near affected areas.',
    color: 'text-disaster-teal',
    bg: 'bg-disaster-teal/10',
  },
  {
    icon: Brain,
    title: 'AI Emergency Assistant',
    description: 'Ask questions and get guidance about disaster risks and available help.',
    color: 'text-disaster-purple',
    bg: 'bg-disaster-purple/10',
  },
];

const steps = [
  { num: '01', title: 'View disaster data', desc: 'Explore the interactive map showing global events.' },
  { num: '02', title: 'Click a region', desc: 'Select an event or region to see details.' },
  { num: '03', title: 'Discover aid nearby', desc: 'Find shelters, medical aid, and safety info.' },
  { num: '04', title: 'Ask the AI', desc: 'Get personalized guidance from the assistant.' },
];

const fade = { hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } };

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
        <div className="grain-overlay absolute inset-0" />
        {/* Glowing dots */}
        <div className="absolute inset-0 pointer-events-none">
          {[
            { top: '20%', left: '15%', delay: '0s' },
            { top: '35%', left: '72%', delay: '1s' },
            { top: '60%', left: '45%', delay: '0.5s' },
            { top: '25%', left: '55%', delay: '1.5s' },
            { top: '70%', left: '25%', delay: '2s' },
            { top: '45%', left: '85%', delay: '0.8s' },
          ].map((d, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-disaster-amber animate-pulse-dot"
              style={{ top: d.top, left: d.left, animationDelay: d.delay }}
            />
          ))}
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 py-28 md:py-40 text-center">
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fade}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight tracking-tight"
          >
            Understand Disasters.{' '}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: 'var(--gradient-accent)' }}>
              Find Help Faster.
            </span>
          </motion.h1>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fade}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto"
          >
            Explore global disaster trends and locate nearby emergency aid, shelters, and food resources in real time.
          </motion.p>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fade}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button asChild size="lg" className="rounded-full px-8 font-semibold">
              <Link to="/map">
                <Globe2 className="h-5 w-5 mr-2" />
                Explore Disaster Map
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 font-semibold border-white/20 text-white hover:bg-white/10 hover:text-white">
              <Link to="/assistant">
                <MessageSquare className="h-5 w-5 mr-2" />
                Ask the AI Assistant
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <h2 className="font-heading text-3xl md:text-4xl font-bold">What We Offer</h2>
            <p className="mt-3 text-muted-foreground max-w-xl mx-auto">Real-time data, interactive maps, and AI-powered guidance to help communities prepare and respond.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fade}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl border border-border p-8 hover:shadow-lg transition-shadow"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${f.bg} mb-5`}>
                  <f.icon className={`h-6 w-6 ${f.color}`} />
                </div>
                <h3 className="font-heading text-xl font-semibold mb-2">{f.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{f.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-center mb-16">How It Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((s, i) => (
              <motion.div
                key={s.num}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fade}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl font-heading font-bold text-primary/20 mb-3">{s.num}</div>
                <h3 className="font-heading font-semibold text-lg mb-1">{s.title}</h3>
                <p className="text-muted-foreground text-sm">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Preparedness CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden" style={{ background: 'var(--gradient-card)' }}>
            <div className="grain-overlay absolute inset-0" />
            <div className="relative z-10">
              <Shield className="h-10 w-10 mx-auto mb-5 text-disaster-teal" />
              <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">Check Your Region's Readiness</h2>
              <p className="text-white/70 mb-8 max-w-lg mx-auto">Discover disaster risk scores, shelter density, and medical facility access for any location worldwide.</p>
              <Button asChild size="lg" className="rounded-full px-8">
                <Link to="/map">
                  Explore the Map <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

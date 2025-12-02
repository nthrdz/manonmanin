import { motion } from 'framer-motion';
import { useCallback } from 'react';
import Particles from '@tsparticles/react';
import type { Engine } from '@tsparticles/engine';
import { loadSlim } from '@tsparticles/slim';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import heroImage from '@assets/generated_images/9.jpg';

export function Hero() {
  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine);
  }, []);

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    document.querySelector('#services')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroImage})`,
          }}
        />
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-background" />
      </div>

      {/* Particles Effect */}
      <div className="absolute inset-0 z-10">
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: {
              color: {
                value: 'transparent',
              },
            },
            fpsLimit: 120,
            particles: {
              color: {
                value: ['#E67E22', '#D35400', '#C0392B', '#A0522D', '#D4AF37'],
              },
              move: {
                direction: 'top',
                enable: true,
                outModes: {
                  default: 'out',
                },
                random: true,
                speed: 1,
                straight: false,
              },
              number: {
                density: {
                  enable: true,
                  area: 800,
                },
                value: 40,
              },
              opacity: {
                value: { min: 0.1, max: 0.5 },
                animation: {
                  enable: true,
                  speed: 1,
                  sync: false,
                },
              },
              shape: {
                type: 'circle',
              },
              size: {
                value: { min: 1, max: 4 },
              },
            },
            detectRetina: true,
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-40">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            className="font-serif text-4xl sm:text-5xl lg:text-7xl font-semibold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            data-testid="text-hero-title"
          >
            Votre voyage post-partum
            <br />
            <span className="text-chart-1">en toute sérénité</span>
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl lg:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl mx-auto font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            data-testid="text-hero-subtitle"
          >
            Ton voyage initiatique et holistique entre terre et mère. Je t'accompagne à chaque étape de ta maternité de façon globale pour une transformation profonde.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Button
              size="lg"
              onClick={scrollToContact}
              className="group relative overflow-hidden bg-chart-1 hover:bg-chart-2 text-white px-8 py-6 text-lg shadow-lg shadow-chart-1/30"
              data-testid="button-hero-contact"
            >
              <span className="relative z-10 flex items-center gap-2">
                Commencer mon accompagnement
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={scrollToServices}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border-white/30 text-white px-8 py-6 text-lg"
              data-testid="button-hero-services"
            >
              Découvrir mes services
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

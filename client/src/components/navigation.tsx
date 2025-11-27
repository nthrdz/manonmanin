import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import logoImage from '@assets/generated_images/logo manon off.png';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(252, 248, 243, 0.95)', 'rgba(252, 248, 243, 0.98)']
  );

  const backdropBlur = useTransform(
    scrollY,
    [0, 100],
    ['blur(0px)', 'blur(12px)']
  );

  useEffect(() => {
    const unsubscribe = scrollY.on('change', (latest) => {
      setIsScrolled(latest > 50);
    });
    return () => unsubscribe();
  }, [scrollY]);

  const navLinks = [
    { name: 'Accueil', href: '#hero' },
    { name: 'Services', href: '#services' },
    { name: 'À propos', href: '#about' },
    { name: 'Témoignages', href: '#testimonials' },
    { name: 'Ressources', href: '#resources' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <motion.header
      style={{ backgroundColor, backdropFilter: backdropBlur }}
      className="fixed top-0 left-0 right-0 z-50 transition-shadow duration-300"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div
        className={`border-b transition-colors duration-300 ${
          isScrolled ? 'border-border' : 'border-border/30'
        }`}
      >
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3 cursor-pointer"
              onClick={() => scrollToSection('#hero')}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-testid="link-logo"
            >
              <img 
                src={logoImage} 
                alt="Logo Manon" 
                className="h-16 lg:h-20 w-auto object-contain"
              />
              <span className="font-serif text-xl lg:text-2xl font-semibold text-foreground">
                Manon Mamamia
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <motion.button
                  key={link.name}
                  onClick={() => scrollToSection(link.href)}
                  className="text-sm font-medium text-foreground hover:text-chart-1 transition-colors relative group"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  data-testid={`link-${link.name.toLowerCase()}`}
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-chart-1 transition-all duration-300 group-hover:w-full" />
                </motion.button>
              ))}
            </div>

            {/* CTA Button Desktop */}
            <motion.div
              className="hidden lg:block"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <Button
                onClick={() => scrollToSection('#contact')}
                size="default"
                className="relative overflow-hidden group"
                data-testid="button-contact-nav"
              >
                <span className="relative z-10">Me contacter</span>
                <div className="absolute inset-0 bg-gradient-to-r from-chart-1 to-chart-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </Button>
            </motion.div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 rounded-md hover-elevate active-elevate-2"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              data-testid="button-menu-toggle"
            >
              {isOpen ? (
                <X className="w-6 h-6 text-foreground" />
              ) : (
                <Menu className="w-6 h-6 text-foreground" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <motion.div
          initial={false}
          animate={{ height: isOpen ? 'auto' : 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="lg:hidden overflow-hidden"
        >
          <div className="px-4 py-6 space-y-4 bg-card/50 backdrop-blur-lg border-t">
            {navLinks.map((link, index) => (
              <motion.button
                key={link.name}
                onClick={() => scrollToSection(link.href)}
                className="block w-full text-left px-4 py-3 text-base font-medium text-foreground/80 hover:text-foreground hover:bg-accent/20 rounded-md transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                data-testid={`link-mobile-${link.name.toLowerCase()}`}
              >
                {link.name}
              </motion.button>
            ))}
            <Button
              onClick={() => scrollToSection('#contact')}
              className="w-full"
              size="lg"
              data-testid="button-contact-mobile"
            >
              Me contacter
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.header>
  );
}

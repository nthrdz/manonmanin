import { motion } from 'framer-motion';
import { Instagram, MapPin, Mail } from 'lucide-react';
import { FaTelegram } from 'react-icons/fa';
import logoImage from '@assets/generated_images/logo manon off.png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: 'Accompagnement Post-Partum', href: '#services' },
      { name: 'Soutien Émotionnel', href: '#services' },
      { name: 'Cercles de Mamans', href: '#services' },
      { name: 'Ressources', href: '#resources' },
    ],
    about: [
      { name: 'À Propos', href: '#about' },
      { name: 'Témoignages', href: '#testimonials' },
      { name: 'Contact', href: '#contact' },
    ],
  };

  const socialLinks = [
    { icon: Instagram, href: 'https://www.instagram.com/manon.mama_mia/', label: 'Instagram' },
    { icon: FaTelegram, href: 'https://t.me/+N_FV4VqTdJl4NTJk', label: 'Telegram' },
    { icon: MapPin, href: 'https://www.google.com/maps/place/ManonMaMaMia/@47.2359697,-1.5899613,17z/data=!3m1!4b1!4m6!3m5!1s0x4805ed6d181a0e5f:0x4f9348b6cf6e78d1!8m2!3d47.2359697!4d-1.5899613!16s%2Fg%2F11k9n6gzl5?entry=ttu&g_ep=EgoyMDI1MTExNy4wIKXMDSoASAFQAw%3D%3D', label: 'Localisation' },
    { icon: Mail, href: 'mailto:contact@manon-manin.fr', label: 'Email' },
  ];

  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-card/50 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img 
                src={logoImage} 
                alt="Logo Manon" 
                className="h-14 lg:h-16 w-auto object-contain"
              />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Accompagnement professionnel et bienveillant pour les mamans.
              Un soutien personnalisé dans votre cheminement après la naissance.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center hover-elevate active-elevate-2 transition-all"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  data-testid={`link-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-5 h-5 text-primary" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">À Propos</h3>
            <ul className="space-y-3">
              {footerLinks.about.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    data-testid={`link-footer-${link.name.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Contact</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href="mailto:contact@manon-manin.fr"
                  className="hover:text-foreground transition-colors"
                >
                  contact@manon-manin.fr
                </a>
              </li>
              <li>
                <a href="tel:+33629865426" className="hover:text-foreground transition-colors">
                  +33 6 29 86 54 26
                </a>
              </li>
              <li className="pt-2">
                <p className="text-xs">Nantes</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Accompagnement Post-Partum. Tous droits réservés.
            </p>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="/mentions-legales" className="hover:text-foreground transition-colors">
                Mentions Légales
              </a>
              <button className="hover:text-foreground transition-colors">
                Politique de Confidentialité
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

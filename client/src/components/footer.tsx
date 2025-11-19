import { motion } from 'framer-motion';
import { Heart, Instagram, Facebook, Mail } from 'lucide-react';

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
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Mail, href: 'mailto:contact@accompagnement-postpartum.fr', label: 'Email' },
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
              <Heart className="w-7 h-7 text-primary fill-primary" />
              <span className="font-serif text-xl font-semibold text-foreground">
                Post-Partum
              </span>
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
                  href="mailto:contact@accompagnement-postpartum.fr"
                  className="hover:text-foreground transition-colors"
                >
                  contact@accompagnement-postpartum.fr
                </a>
              </li>
              <li>
                <a href="tel:+33612345678" className="hover:text-foreground transition-colors">
                  +33 6 12 34 56 78
                </a>
              </li>
              <li className="pt-2">
                <p className="text-xs">Paris et Île-de-France</p>
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
              <button className="hover:text-foreground transition-colors">
                Mentions Légales
              </button>
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

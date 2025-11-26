import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import { Heart, Users, BookOpen, Sparkles, Baby, Home } from 'lucide-react';
import type { Service } from '@shared/schema';

const services: Service[] = [
  {
    id: '1',
    titre: 'Accompagnement Post-Partum',
    description: 'Un soutien personnalisé pendant les premières semaines après la naissance',
    icone: 'heart',
    details: [
      'Visite à domicile dès les premiers jours',
      'Soutien émotionnel et écoute bienveillante',
      'Conseils sur les soins du bébé',
      'Aide à l\'allaitement',
    ],
  },
  {
    id: '2',
    titre: 'Soutien Émotionnel',
    description: 'Un espace sûr pour exprimer vos émotions et retrouver votre équilibre',
    icone: 'sparkles',
    details: [
      'Écoute active et sans jugement',
      'Gestion du baby blues',
      'Techniques de relaxation',
      'Renforcement de la confiance en soi',
    ],
  },
  {
    id: '3',
    titre: 'Cercles de Mamans',
    description: 'Rejoignez une communauté bienveillante de mamans',
    icone: 'users',
    details: [
      'Rencontres régulières en petit groupe',
      'Partage d\'expériences',
      'Création de liens durables',
      'Ateliers thématiques',
    ],
  },
  {
    id: '4',
    titre: 'Ressources & Formations',
    description: 'Accédez à des contenus exclusifs pour vous accompagner',
    icone: 'book',
    details: [
      'Bibliothèque de ressources',
      'Guides pratiques téléchargeables',
      'Vidéos éducatives',
      'Conseils d\'experts',
    ],
  },
  {
    id: '5',
    titre: 'Soins du Bébé',
    description: 'Apprenez les gestes essentiels avec confiance',
    icone: 'baby',
    details: [
      'Techniques de portage',
      'Soins quotidiens',
      'Massage bébé',
      'Comprendre les pleurs',
    ],
  },
  {
    id: '6',
    titre: 'Soutien à Domicile',
    description: 'Une aide pratique pour faciliter votre quotidien',
    icone: 'home',
    details: [
      'Organisation du quotidien',
      'Aide aux tâches ménagères légères',
      'Préparation de repas',
      'Accompagnement frères et sœurs',
    ],
  },
];

const iconMap = {
  heart: Heart,
  sparkles: Sparkles,
  users: Users,
  book: BookOpen,
  baby: Baby,
  home: Home,
};

export function Services() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="services" className="py-20 lg:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Mes Services
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Un accompagnement complet et sur-mesure pour répondre à vos besoins
            pendant cette période si spéciale
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icone as keyof typeof iconMap];
            return (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                data-testid={`card-service-${service.id}`}
              >
                <Card className="h-full p-8 hover-elevate active-elevate-2 transition-all duration-300 group cursor-pointer border-card-border bg-card/50 hover:bg-chart-2/5">
                  <motion.div
                    className="w-14 h-14 rounded-full bg-chart-1/15 flex items-center justify-center mb-6 group-hover:bg-chart-1/25 transition-colors border border-chart-1/20"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                  >
                    <Icon className="w-7 h-7 text-chart-1" />
                  </motion.div>

                  <h3 className="font-serif text-xl lg:text-2xl font-semibold text-foreground mb-3" data-testid={`text-service-title-${service.id}`}>
                    {service.titre}
                  </h3>

                  <p className="text-muted-foreground mb-6 leading-relaxed" data-testid={`text-service-description-${service.id}`}>
                    {service.description}
                  </p>

                  <ul className="space-y-2">
                    {service.details.map((detail, idx) => (
                      <motion.li
                        key={idx}
                        className="flex items-start gap-2 text-sm text-foreground/80"
                        initial={{ opacity: 0, x: -10 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.4, delay: index * 0.1 + idx * 0.05 }}
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-chart-2 mt-2 flex-shrink-0" />
                        <span>{detail}</span>
                      </motion.li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <p className="text-muted-foreground mb-4" data-testid="text-services-cta">
            Chaque accompagnement est personnalisé selon vos besoins
          </p>
          <button
            onClick={() =>
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="text-chart-1 font-medium hover:text-chart-2 hover:underline underline-offset-4 transition-colors"
            data-testid="link-services-contact"
          >
            Discutons de votre situation →
          </button>
        </motion.div>
      </div>
    </section>
  );
}

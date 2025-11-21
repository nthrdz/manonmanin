import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Award, Heart, Users, Sparkles } from 'lucide-react';
import aboutImage from '@assets/generated_images/1.jpg';

const milestones = [
  {
    year: '2018',
    title: 'Formation de Doula',
    description: 'Certification professionnelle en accompagnement périnatal',
    icon: Award,
  },
  {
    year: '2019',
    title: 'Première Accompagnements',
    description: 'Début de ma pratique avec passion et dévouement',
    icon: Heart,
  },
  {
    year: '2021',
    title: 'Création de Cercles',
    description: 'Lancement des cercles de mamans et ateliers de groupe',
    icon: Users,
  },
  {
    year: '2024',
    title: '100+ Familles',
    description: 'Plus de 100 familles accompagnées avec amour',
    icon: Sparkles,
  },
];

export function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="py-20 lg:py-32 bg-card/30" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-lg overflow-hidden shadow-2xl">
              <img
                src={aboutImage}
                alt="Portrait professionnel"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>

            {/* Floating Badge */}
            <motion.div
              className="absolute -bottom-6 -right-6 bg-primary text-primary-foreground p-6 rounded-lg shadow-xl"
              initial={{ scale: 0, rotate: -10 }}
              animate={inView ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              data-testid="badge-experience-years"
            >
              <div className="text-center">
                <div className="text-3xl font-bold" data-testid="text-years-count">6+</div>
                <div className="text-sm font-medium">Années</div>
                <div className="text-xs opacity-90">d\'expérience</div>
              </div>
            </motion.div>
          </motion.div>

          {/* Content Column */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
                À Propos de Moi
              </h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed mb-8">
                <p>
                  Je suis maman d'un merveilleux petit Gabriel, né en mars 2023. Psychomotricienne de formation depuis 2014, j'ai travaillé dans divers contextes : auprès d'adultes cérébrolésés, en maison de retraite, et en pédopsychiatrie.
                </p>
                <p>
                  Après avoir frôlé deux épisodes de burn-out et vécu un grave accident qui a marqué un tournant dans ma vie, j'ai décidé de me réorienter. Ce choix a ouvert la voie à des formations en coaching, naturopathie, gynécologie holistique et en tant que doula.
                </p>
              </div>
            </motion.div>

            {/* Timeline */}
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  className="flex gap-4"
                  initial={{ opacity: 0, x: -30 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                  data-testid={`milestone-${milestone.year}`}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <milestone.icon className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="text-primary font-semibold">{milestone.year}</span>
                      <h4 className="font-serif text-lg font-semibold text-foreground">
                        {milestone.title}
                      </h4>
                    </div>
                    <p className="text-sm text-muted-foreground">{milestone.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

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
    <section id="about" className="py-20 lg:py-32 bg-chart-2/3" ref={ref}>
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
              className="absolute -bottom-6 -right-6 bg-chart-1 text-white p-6 rounded-lg shadow-xl border-2 border-chart-2/30"
              initial={{ scale: 0, rotate: -10 }}
              animate={inView ? { scale: 1, rotate: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              data-testid="badge-experience-years"
            >
              <div className="text-center">
                <div className="text-3xl font-bold" data-testid="text-years-count">8+</div>
                <div className="text-sm font-medium">Années</div>
                <div className="text-xs opacity-90">d'expérience</div>
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
              <div className="space-y-5 text-muted-foreground leading-relaxed mb-8">
                <p className="text-lg font-medium text-foreground">
                  Accompagnante en périnatalité et facilitatrice de moments uniques pour les futures et jeunes mamans, j'allie science, tradition et humanité pour te soutenir dans cette aventure transformatrice qu'est la maternité.
                </p>
                
                <p>
                  Avec un Diplôme d'État de psychomotricité et 8 années d'expérience auprès de différents publics, j'ai affiné une approche globale qui prend soin de ton corps, de tes émotions et de ton esprit. Formée comme naturopathe, coach, doula, accompagnante périnatale, éducatrice menstruelle, facilitatrice de cercles et de Mama Blessings, je t'accompagne avec des outils qui mêlent rituels, pratiques psycho-corporelles, transmissions de savoirs et une écoute bienveillante. Au-delà de toutes ces étiquettes, je me considère avant tout comme une chouchouteuse de mamans, qui prend soin et soutient les femmes que j'accompagne, à tous les niveaux.
                </p>

                <p>
                  Au-delà de ma formation, mon expérience personnelle de maman me permet de comprendre profondément tes joies, tes peurs et tes besoins.
                </p>

                <div className="pt-4">
                  <h3 className="font-serif text-xl font-semibold text-foreground mb-3">
                    Mon objectif ?
                  </h3>
                  <p>
                    T'aider à te reconnecter à ta puissance intérieure, à créer ton village de soutien et à vivre une maternité empreinte de douceur, de sacré, de sérénité et de souveraineté.
                  </p>
                </div>

                <p className="text-foreground font-medium">
                  Avec moi, tu n'es jamais seule. Tu es au cœur de ton histoire, et je suis là pour t'aider à en faire une expérience unique et inoubliable.
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
                    <div className="w-12 h-12 rounded-full bg-chart-1/15 flex items-center justify-center border border-chart-1/20">
                      <milestone.icon className="w-6 h-6 text-chart-1" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-3 mb-1">
                      <span className="text-chart-1 font-semibold">{milestone.year}</span>
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

import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Video, Headphones, BookOpen } from 'lucide-react';
import motherBabyImage from '@assets/generated_images/Mother_baby_hands_detail_da4960c1.png';
import motherHomeImage from '@assets/generated_images/Mother_nursing_at_home_8cbcaf9b.png';

const resources = [
  {
    id: '1',
    title: 'Guide du Post-Partum',
    category: 'Guide',
    type: 'PDF',
    description: 'Un guide complet pour naviguer les premières semaines après la naissance',
    image: motherBabyImage,
    icon: FileText,
    color: 'bg-chart-1/10 text-chart-1',
  },
  {
    id: '2',
    title: 'Techniques de Relaxation',
    category: 'Audio',
    type: 'MP3',
    description: 'Exercices audio guidés pour retrouver la sérénité',
    image: motherHomeImage,
    icon: Headphones,
    color: 'bg-chart-2/10 text-chart-2',
  },
  {
    id: '3',
    title: 'Allaitement Serein',
    category: 'Vidéo',
    type: 'VIDEO',
    description: 'Conseils et démonstrations pour un allaitement réussi',
    image: motherBabyImage,
    icon: Video,
    color: 'bg-chart-3/10 text-chart-3',
  },
  {
    id: '4',
    title: 'Routines Apaisantes',
    category: 'Article',
    type: 'BLOG',
    description: 'Comment créer des routines qui favorisent le bien-être',
    image: motherHomeImage,
    icon: BookOpen,
    color: 'bg-chart-4/10 text-chart-4',
  },
  {
    id: '5',
    title: 'Soins du Bébé',
    category: 'Guide',
    type: 'PDF',
    description: 'Les gestes essentiels pour prendre soin de votre bébé',
    image: motherBabyImage,
    icon: FileText,
    color: 'bg-chart-1/10 text-chart-1',
  },
  {
    id: '6',
    title: 'Récupération Physique',
    category: 'Vidéo',
    type: 'VIDEO',
    description: 'Exercices doux pour retrouver votre corps en douceur',
    image: motherHomeImage,
    icon: Video,
    color: 'bg-chart-3/10 text-chart-3',
  },
];

export function Resources() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="resources" className="py-20 lg:py-32 bg-card/30" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Ressources Gratuites
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Des outils pratiques et inspirants pour vous accompagner au quotidien
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {resources.map((resource, index) => {
            const Icon = resource.icon;
            return (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                data-testid={`card-resource-${resource.id}`}
              >
                <Card className="h-full overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 group cursor-pointer">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={resource.image}
                      alt={resource.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                    <Badge
                      className={`absolute top-4 right-4 ${resource.color} border-0`}
                    >
                      {resource.category}
                    </Badge>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start gap-3 mb-3">
                      <div className={`w-10 h-10 rounded-lg ${resource.color} flex items-center justify-center flex-shrink-0`}>
                        <Icon className="w-5 h-5" data-testid={`icon-resource-${resource.id}`} />
                      </div>
                      <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-primary transition-colors" data-testid={`text-resource-title-${resource.id}`}>
                        {resource.title}
                      </h3>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed" data-testid={`text-resource-description-${resource.id}`}>
                      {resource.description}
                    </p>
                  </div>
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
          <p className="text-muted-foreground mb-4" data-testid="text-resources-cta">
            Découvrez encore plus de ressources en me contactant
          </p>
          <button
            onClick={() =>
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }
            className="text-primary font-medium hover:underline underline-offset-4"
            data-testid="link-resources-contact"
          >
            Accéder à toutes les ressources →
          </button>
        </motion.div>
      </div>
    </section>
  );
}

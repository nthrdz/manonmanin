import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Video, Headphones, BookOpen } from 'lucide-react';
import image2 from '@assets/generated_images/2.jpg';
import image3 from '@assets/generated_images/3.jpg';
import image4 from '@assets/generated_images/4.jpg';
import image5 from '@assets/generated_images/5.jpg';
import image6 from '@assets/generated_images/6.jpg';
import image7 from '@assets/generated_images/7.jpg';

const resources = [
  {
    id: '1',
    title: 'Walk\'n cause',
    category: 'Guide',
    type: 'PDF',
    description: 'Un savant mélange entre l\'atelier le cercle de femmes et le coaching, alliant la nature la sororité le mouvement et le partage',
    image: image2,
    icon: FileText,
    color: 'bg-chart-1/10 text-chart-1',
    link: 'https://manonmanin-mama-mia.systeme.io/atelier-walk-n',
  },
  {
    id: '2',
    title: 'Mama blessing',
    category: 'Audio',
    type: 'MP3',
    description: 'Un rituel de célébration, de soutien et de sororité pour honorer et entourer la future maman',
    image: image3,
    icon: Headphones,
    color: 'bg-chart-2/10 text-chart-2',
    link: 'https://manonmanin-mama-mia.systeme.io/mama-blessing',
  },
  {
    id: '3',
    title: 'Mois d\'or',
    category: 'Vidéo',
    type: 'VIDEO',
    description: 'Un cocon de soutien pour le début de ton post-partum. Soins, rituels, pratiques, transmission et présence bienveillante à distance ou chez toi pour t\'offrir écoute, douceur, soin et ancrage.',
    image: image4,
    icon: Video,
    color: 'bg-chart-3/10 text-chart-3',
    link: 'https://manonmanin-mama-mia.systeme.io/vivre-un-mois-dor',
  },
  {
    id: '4',
    title: 'Bilan de naissance',
    category: 'Article',
    type: 'BLOG',
    description: 'Un accompagnement personnalisé pour préparer et rédiger votre projet de naissance',
    image: image5,
    icon: BookOpen,
    color: 'bg-chart-4/10 text-chart-4',
    link: 'https://manonmanin-mama-mia.systeme.io/bilan',
  },
  {
    id: '5',
    title: 'Le panier post partum',
    category: 'Guide',
    type: 'PDF',
    description: 'Un cadeau simple et réconfortant qui fera plaisir à coup sûr en satisfaisant les sens. À offrir ou se faire offrir pour le retour de la maternité !',
    image: image6,
    icon: FileText,
    color: 'bg-chart-1/10 text-chart-1',
    link: 'https://manonmanin-mama-mia.systeme.io/panier-post-partum',
  },
  {
    id: '6',
    title: 'Accompagnement calendule',
    category: 'Vidéo',
    type: 'VIDEO',
    description: 'Un accompagnement global sur-mesure pour les femmes et les couples, du désir d\'enfant au post-partum, alliant science sacré soutien et connexion à soi',
    image: image7,
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
    <section id="resources" className="py-20 lg:py-32 bg-chart-2/3" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Ressources
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Des outils pratiques et inspirants pour vous accompagner au quotidien
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {resources.map((resource, index) => {
            const handleClick = () => {
              if (resource.link) {
                window.open(resource.link, '_blank', 'noopener,noreferrer');
              }
            };
            return (
              <motion.div
                key={resource.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                data-testid={`card-resource-${resource.id}`}
              >
                <Card 
                  className="h-full overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 group cursor-pointer"
                  onClick={handleClick}
                >
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
                    <h3 className="font-serif text-xl font-semibold text-foreground group-hover:text-chart-1 transition-colors mb-3" data-testid={`text-resource-title-${resource.id}`}>
                      {resource.title}
                    </h3>

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
            className="text-chart-1 font-medium hover:text-chart-2 hover:underline underline-offset-4 transition-colors"
            data-testid="link-resources-contact"
          >
            Accéder à toutes les ressources →
          </button>
        </motion.div>
      </div>
    </section>
  );
}

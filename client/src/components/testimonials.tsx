import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import type { Testimonial } from '@shared/schema';

const testimonials: Testimonial[] = [
  {
    id: '1',
    nom: 'Sophie M.',
    texte: 'Un accompagnement extraordinaire qui m\'a permis de traverser mon post-partum avec sérénité. L\'écoute, la bienveillance et les conseils pratiques ont fait toute la différence. Je ne peux que recommander !',
  },
  {
    id: '2',
    nom: 'Marie L.',
    texte: 'Grâce à cet accompagnement, j\'ai retrouvé confiance en moi en tant que maman. Les visites à domicile m\'ont vraiment aidée à m\'organiser et à profiter pleinement de mon bébé sans stress.',
  },
  {
    id: '3',
    nom: 'Camille D.',
    texte: 'Les cercles de mamans sont devenus un moment essentiel pour moi. Pouvoir échanger avec d\'autres mamans dans un cadre bienveillant m\'a permis de me sentir moins seule et mieux comprise.',
  },
  {
    id: '4',
    nom: 'Léa B.',
    texte: 'Un soutien précieux pendant une période difficile. L\'accompagnement émotionnel m\'a aidée à surmonter mon baby blues et à retrouver ma joie d\'être maman. Merci infiniment !',
  },
  {
    id: '5',
    nom: 'Emma R.',
    texte: 'Professionnelle, à l\'écoute et d\'une grande douceur. Chaque visite était un moment de réconfort et d\'apprentissage. Je recommande vivement cet accompagnement à toutes les mamans.',
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = testimonials.length - 1;
      if (nextIndex >= testimonials.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Témoignages
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Ce que les mamans disent de leur expérience
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative h-[400px] sm:h-[350px] flex items-center justify-center overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="absolute w-full"
                data-testid={`testimonial-${currentIndex}`}
              >
                <div className="bg-card border border-card-border rounded-lg p-8 sm:p-12 shadow-lg mx-4">
                  <Quote className="w-12 h-12 text-primary/30 mb-6" />
                  
                  <p className="text-lg sm:text-xl text-foreground leading-relaxed mb-8 min-h-[120px]">
                    {testimonials[currentIndex].texte}
                  </p>

                  <div className="flex items-center gap-4">
                    <Avatar className="w-14 h-14 border-2 border-primary/20">
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {getInitials(testimonials[currentIndex].nom)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold text-foreground">
                        {testimonials[currentIndex].nom}
                      </p>
                      <p className="text-sm text-muted-foreground">Maman accompagnée</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={() => paginate(-1)}
              className="rounded-full"
              data-testid="button-testimonial-prev"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 bg-primary'
                      : 'w-2 bg-primary/30 hover:bg-primary/50'
                  }`}
                  data-testid={`button-testimonial-dot-${index}`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={() => paginate(1)}
              className="rounded-full"
              data-testid="button-testimonial-next"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

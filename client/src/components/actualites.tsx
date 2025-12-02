import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Sparkles } from 'lucide-react';

export function Actualites() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const scrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="actualites" className="py-20 lg:py-32 bg-chart-2/5" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Actualités
          </h2>
          <div className="flex items-center justify-center gap-2 mb-6">
            <MapPin className="w-5 h-5 text-chart-1" />
            <p className="text-lg text-chart-1 font-medium">
              Saint-Herblain
            </p>
          </div>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Mes ateliers sont pensés pour t'offrir un soutien bienveillant et adapté, que tu sois en projet bébé, enceinte ou déjà dans ton aventure post-natale. C'est l'occasion parfaite pour te reconnecter à toi-même tout en échangeant avec d'autres mamans, dans un cadre serein et propice au bien-être.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Ateliers Walk'n cause */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="h-full p-8 border-card-border bg-card/50 hover:bg-card/80 transition-colors">
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">
                Les ateliers Walk'n cause
              </h3>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                Les ateliers en nature reviennent à la rentrée ! Que tu sois enceinte ou en post-partum, avec ou sans ton bébé, tu es la bienvenue.
              </p>

              <div className="bg-chart-5/10 rounded-xl p-6 mb-6 border border-chart-5/20">
                <div className="flex items-center gap-2 mb-4">
                  <Calendar className="w-5 h-5 text-chart-5" />
                  <span className="font-semibold text-foreground">Prochaines dates</span>
                </div>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-chart-1" />
                    <span className="text-foreground">
                      <strong>Jeudi 4 septembre</strong> à 13h — <span className="text-chart-1 font-medium">1ère rencontre gratuite !</span>
                    </span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-chart-2" />
                    <span className="text-foreground">Jeudi 18 septembre à 13h</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-chart-3" />
                    <span className="text-foreground">Jeudi 25 septembre à 13h</span>
                  </li>
                </ul>
              </div>

              <div className="flex items-center gap-2 mb-6 p-4 bg-chart-1/10 rounded-lg border border-chart-1/20">
                <MapPin className="w-5 h-5 text-chart-1 flex-shrink-0" />
                <span className="text-foreground font-medium">Parc de Chézine, Saint-Herblain</span>
              </div>

              <div className="bg-gradient-to-r from-chart-2/10 to-chart-5/10 rounded-lg p-4 mb-6 border border-chart-2/20">
                <p className="text-foreground flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-chart-5" />
                  <span>Viens avec une amie et recevez une <strong className="text-chart-1">surprise</strong> ! 🎁</span>
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={scrollToContact}
                  className="flex-1 bg-chart-1 hover:bg-chart-2"
                >
                  M'inscrire
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.open('https://manonmanin-mama-mia.systeme.io/atelier-walk-n', '_blank')}
                  className="flex-1 border-chart-1 text-chart-1 hover:bg-chart-1/10"
                >
                  En savoir plus
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Accompagnement Mois d'Or */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="h-full p-8 border-card-border bg-card/50 hover:bg-card/80 transition-colors">
              <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">
                Nouvelle formule d'accompagnement
              </h3>

              <div className="mb-6">
                <span className="inline-block px-4 py-1 bg-chart-5/15 text-chart-5 rounded-full text-sm font-medium border border-chart-5/20">
                  Accompagnement Mois d'Or sur Telegram
                </span>
              </div>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                Tu es enceinte et tu souhaites vivre une maternité qui te ressemble ? Tu cherches à te préparer pour le post-partum mais tu habites loin ?
              </p>

              <div className="bg-gradient-to-br from-chart-1/10 via-chart-2/10 to-chart-5/10 rounded-xl p-6 mb-6 border border-chart-1/20">
                <p className="text-foreground font-medium mb-4">
                  Pas de panique, j'ai la solution pour toi !
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-chart-1 mt-2" />
                    <span className="text-foreground">Soutien quotidien et intime</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-chart-2 mt-2" />
                    <span className="text-foreground">Dans le confort de ton cocon</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-chart-5 mt-2" />
                    <span className="text-foreground">Du dernier mois de grossesse jusqu'à la fin de ton mois d'or</span>
                  </li>
                </ul>
              </div>

              <div className="bg-chart-5/15 rounded-lg p-4 mb-6 border border-chart-5/20 text-center">
                <p className="text-foreground font-semibold text-lg">
                  À prix tout doux ! 💛
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={scrollToContact}
                  className="flex-1 bg-chart-5 hover:bg-chart-5/80 text-foreground"
                >
                  Me renseigner
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => window.open('https://manonmanin-mama-mia.systeme.io/vivre-un-mois-dor', '_blank')}
                  className="flex-1 border-chart-5 text-chart-5 hover:bg-chart-5/10"
                >
                  Découvrir le Mois d'Or
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}


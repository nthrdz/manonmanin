import { ParallaxProvider } from 'react-scroll-parallax';
import { Navigation } from '@/components/navigation';
import { Hero } from '@/components/hero';
import { Actualites } from '@/components/actualites';
import { Services } from '@/components/services';
import { About } from '@/components/about';
import { Testimonials } from '@/components/testimonials';
import { Resources } from '@/components/resources';
import { Contact } from '@/components/contact';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <ParallaxProvider>
      <div className="min-h-screen bg-background">
        <Navigation />
        <Hero />
        <Actualites />
        <Resources />
        <About />
        <Services />
        <Contact />
        <Footer />
      </div>
    </ParallaxProvider>
  );
}

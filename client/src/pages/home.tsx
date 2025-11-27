import { ParallaxProvider } from 'react-scroll-parallax';
import { Navigation } from '@/components/navigation';
import { Hero } from '@/components/hero';
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
        <Resources />
        <About />
        <Testimonials />
        <Services />
        <Contact />
        <Footer />
      </div>
    </ParallaxProvider>
  );
}

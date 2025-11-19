import { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { contactSchema, type ContactForm } from '@shared/schema';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const form = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      nom: '',
      email: '',
      telephone: '',
      message: '',
      typeAccompagnement: undefined,
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactForm) => {
      console.log('🔄 Submitting contact form...', data);
      const response = await apiRequest('POST', '/api/contact', data);
      console.log('✅ Response received:', response.status);
      const jsonData = await response.json();
      console.log('📦 Parsed JSON:', jsonData);
      return jsonData;
    },
    onSuccess: (result: any) => {
      console.log('🎉 onSuccess called with:', result);
      console.log('🔄 Setting isSubmitted to true');
      setIsSubmitted(true);
      form.reset();
      
      toast({
        title: 'Message envoyé !',
        description: result.message || 'Je vous répondrai dans les plus brefs délais.',
      });

      // If there's a preview URL (development mode), log it
      if (result.previewUrl) {
        console.log('📧 Email preview:', result.previewUrl);
      }

      setTimeout(() => {
        console.log('⏰ Auto-hiding success message');
        setIsSubmitted(false);
      }, 5000);
    },
    onError: (error: Error) => {
      console.error('❌ Contact form error:', error);
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: error.message || 'Une erreur est survenue. Veuillez réessayer.',
      });
    },
  });

  const onSubmit = async (data: ContactForm) => {
    console.log('📝 Form submitted with data:', data);
    contactMutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'contact@accompagnement-postpartum.fr',
      href: 'mailto:contact@accompagnement-postpartum.fr',
    },
    {
      icon: Phone,
      label: 'Téléphone',
      value: '+33 6 12 34 56 78',
      href: 'tel:+33612345678',
    },
    {
      icon: MapPin,
      label: 'Localisation',
      value: 'Paris et Île-de-France',
      href: null,
    },
  ];

  return (
    <section id="contact" className="py-20 lg:py-32 bg-background" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Prenons Contact
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Je serais ravie de discuter avec vous de vos besoins et de comment je peux vous accompagner
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="font-serif text-2xl font-semibold text-foreground mb-6">
              Informations de Contact
            </h3>
            <div className="space-y-6 mb-8">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={info.label}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  data-testid={`contact-info-${info.label.toLowerCase()}`}
                >
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{info.label}</p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-foreground font-medium hover:text-primary transition-colors"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-foreground font-medium">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="bg-card border border-card-border rounded-lg p-6">
              <h4 className="font-semibold text-foreground mb-3">
                Horaires de disponibilité
              </h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <p>Lundi - Vendredi: 9h00 - 18h00</p>
                <p>Samedi: 10h00 - 16h00</p>
                <p>Dimanche: Sur rendez-vous uniquement</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            key={isSubmitted ? 'success' : 'form'}
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {isSubmitted ? (
              <motion.div
                className="flex flex-col items-center justify-center h-full text-center p-8"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                data-testid="contact-success-message"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                >
                  <CheckCircle2 className="w-20 h-20 text-primary mb-6" data-testid="icon-success" />
                </motion.div>
                <h3 className="font-serif text-2xl font-semibold text-foreground mb-3" data-testid="text-success-title">
                  Message envoyé !
                </h3>
                <p className="text-muted-foreground mb-6" data-testid="text-success-description">
                  Merci pour votre message. Je vous répondrai dans les plus brefs délais.
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  data-testid="button-send-another"
                >
                  Envoyer un autre message
                </Button>
              </motion.div>
            ) : (
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="nom"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom *</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Votre nom"
                            {...field}
                            data-testid="input-nom"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email *</FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="votre.email@exemple.fr"
                            {...field}
                            data-testid="input-email"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="telephone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Téléphone</FormLabel>
                        <FormControl>
                          <Input
                            type="tel"
                            placeholder="+33 6 12 34 56 78"
                            {...field}
                            data-testid="input-telephone"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="typeAccompagnement"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type d'accompagnement</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-type">
                              <SelectValue placeholder="Sélectionnez un type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="post-partum">Post-partum</SelectItem>
                            <SelectItem value="grossesse">Grossesse</SelectItem>
                            <SelectItem value="autre">Autre</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message *</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Parlez-moi de votre situation..."
                            className="min-h-[120px] resize-none"
                            {...field}
                            data-testid="textarea-message"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full group"
                    disabled={contactMutation.isPending}
                    data-testid="button-submit"
                  >
                    <span className="flex items-center gap-2">
                      {contactMutation.isPending ? (
                        'Envoi en cours...'
                      ) : (
                        <>
                          Envoyer le message
                          <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </span>
                  </Button>
                </form>
              </Form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

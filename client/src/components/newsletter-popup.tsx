import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { newsletterSchema, type NewsletterForm } from '@shared/schema';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

const STORAGE_KEY = 'newsletter_popup_dismissed';

export function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Vérifier si l'utilisateur a déjà fermé le pop-up ou s'est inscrit
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      // Afficher le pop-up après 1 seconde pour une meilleure expérience
      const timer = setTimeout(() => {
        setOpen(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const form = useForm<NewsletterForm>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: {
      email: '',
    },
  });

  const newsletterMutation = useMutation({
    mutationFn: async (data: NewsletterForm) => {
      const response = await apiRequest('POST', '/api/newsletter', data);
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Une erreur est survenue');
      }
      return response.json();
    },
    onSuccess: (result: any) => {
      // Sauvegarder dans localStorage pour ne plus afficher le pop-up
      localStorage.setItem(STORAGE_KEY, 'subscribed');
      setOpen(false);
      
      toast({
        title: 'Inscription réussie !',
        description: result.message || 'Merci de vous être inscrit à notre newsletter.',
      });
      form.reset();
    },
    onError: (error: Error) => {
      toast({
        variant: 'destructive',
        title: 'Erreur',
        description: error.message || 'Une erreur est survenue. Veuillez réessayer.',
      });
    },
  });

  const onSubmit = async (data: NewsletterForm) => {
    newsletterMutation.mutate(data);
  };

  const handleClose = () => {
    // Sauvegarder que l'utilisateur a fermé le pop-up (mais pas forcément inscrit)
    localStorage.setItem(STORAGE_KEY, 'dismissed');
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <DialogTitle className="text-center font-serif text-2xl">
            Restez informée
          </DialogTitle>
          <DialogDescription className="text-center">
            Recevez nos conseils, astuces et actualités directement dans votre boîte mail
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Votre adresse email"
                className="pl-10"
                {...form.register('email')}
              />
            </div>
            {form.formState.errors.email && (
              <p className="text-sm text-destructive">
                {form.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Button
              type="submit"
              className="flex-1"
              disabled={newsletterMutation.isPending}
            >
              {newsletterMutation.isPending ? 'Inscription...' : "S'inscrire"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="flex-1"
            >
              Plus tard
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}


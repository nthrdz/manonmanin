import dotenv from 'dotenv';
import { resolve } from 'path';
import { Resend } from 'resend';
import type { ContactForm, NewsletterForm } from '@shared/schema';

// Charger les variables d'environnement si pas déjà chargées
if (!process.env.RESEND_API_KEY && !process.env.SMTP_HOST) {
  dotenv.config({ path: resolve(process.cwd(), '.env.local') });
  dotenv.config({ path: resolve(process.cwd(), '.env') });
}

export class EmailService {
  private resend: Resend | null = null;
  private isConfigured = false;
  private useResend = false;

  constructor() {
    this.initialize();
  }

  private async initialize() {
    try {
      // Priorité 1 : Resend (recommandé - plus fiable)
      if (process.env.RESEND_API_KEY) {
        this.resend = new Resend(process.env.RESEND_API_KEY);
        this.isConfigured = true;
        this.useResend = true;
        console.log('✅ Email service configured with Resend');
        console.log('📧 Using Resend API for email delivery');
        return;
      }

      // Priorité 2 : SMTP (fallback)
      const hasSmtpConfig =
        process.env.SMTP_HOST &&
        process.env.SMTP_PORT &&
        process.env.SMTP_USER &&
        process.env.SMTP_PASS;

      if (hasSmtpConfig) {
        console.log('⚠️  Using SMTP (Resend recommended for better reliability)');
        console.log('💡 To use Resend, add RESEND_API_KEY to Vercel environment variables');
        this.isConfigured = true;
        this.useResend = false;
        return;
      }

      // Development: No email service configured
      console.log('⚠️  No email service configured');
      console.log('💡 Add RESEND_API_KEY to Vercel for production email delivery');
      this.isConfigured = false;
    } catch (error) {
      console.error('❌ Failed to initialize email service:', error);
      this.isConfigured = false;
    }
  }

  private getEmailHtml(template: 'contact' | 'confirmation' | 'newsletter', data: any): string {
    const contactEmail = process.env.CONTACT_EMAIL || 'contact@manonmanin-mamamia.fr';
    
    if (template === 'contact') {
      const { contact, typeText } = data;
      return `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f5f0;">
          <div style="background-color: white; border-radius: 12px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <h1 style="color: #D4764B; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 28px; margin-bottom: 24px; border-bottom: 2px solid #D4764B; padding-bottom: 12px;">
              Nouveau Message de Contact
            </h1>
            
            <div style="margin-bottom: 24px;">
              <h2 style="color: #5C3D2E; font-size: 18px; margin-bottom: 8px;">Informations</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 8px 0; color: #8B4513; font-weight: 600;">Nom:</td>
                  <td style="padding: 8px 0; color: #333;">${contact.nom}</td>
                </tr>
                <tr>
                  <td style="padding: 8px 0; color: #8B4513; font-weight: 600;">Email:</td>
                  <td style="padding: 8px 0;"><a href="mailto:${contact.email}" style="color: #D4764B; text-decoration: none;">${contact.email}</a></td>
                </tr>
                ${contact.telephone ? `
                <tr>
                  <td style="padding: 8px 0; color: #8B4513; font-weight: 600;">Téléphone:</td>
                  <td style="padding: 8px 0; color: #333;">${contact.telephone}</td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 8px 0; color: #8B4513; font-weight: 600;">Type:</td>
                  <td style="padding: 8px 0; color: #333;">${typeText}</td>
                </tr>
              </table>
            </div>

            <div style="margin-bottom: 24px;">
              <h2 style="color: #5C3D2E; font-size: 18px; margin-bottom: 12px;">Message</h2>
              <div style="background-color: #f9f5f0; padding: 16px; border-radius: 8px; border-left: 4px solid #D4764B;">
                <p style="color: #333; line-height: 1.6; margin: 0; white-space: pre-wrap;">${contact.message}</p>
              </div>
            </div>

            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e5e5;">
              <a href="mailto:${contact.email}" style="display: inline-block; background-color: #D4764B; color: white; padding: 12px 32px; border-radius: 6px; text-decoration: none; font-weight: 600;">
                Répondre à ${contact.nom}
              </a>
            </div>
          </div>
        </div>
      `;
    }

    if (template === 'confirmation') {
      const { contact } = data;
      return `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f5f0;">
          <div style="background-color: white; border-radius: 12px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <h1 style="color: #D4764B; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 28px; margin-bottom: 16px;">
              Merci pour votre message !
            </h1>
            
            <p style="color: #333; line-height: 1.6; margin-bottom: 16px;">
              Bonjour ${contact.nom},
            </p>
            
            <p style="color: #333; line-height: 1.6; margin-bottom: 16px;">
              J'ai bien reçu votre message et je vous en remercie. Je m'engage à vous répondre dans les plus brefs délais, généralement sous 24 à 48 heures.
            </p>
            
            <p style="color: #333; line-height: 1.6; margin-bottom: 24px;">
              En attendant, n'hésitez pas à consulter mes ressources sur le site.
            </p>
            
            <div style="text-align: center; margin: 32px 0;">
              <div style="display: inline-block; background-color: #f9f5f0; padding: 20px; border-radius: 8px; border: 2px solid #D4764B;">
                <p style="color: #8B4513; font-weight: 600; margin: 0;">
                  💛 Prenez soin de vous 💛
                </p>
              </div>
            </div>
            
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e5e5; font-size: 14px; color: #666;">
              <p>Accompagnement Post-Partum</p>
              <p>Nantes</p>
            </div>
          </div>
        </div>
      `;
    }

    if (template === 'newsletter') {
      return `
        <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f5f0;">
          <div style="background-color: white; border-radius: 12px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <h1 style="color: #D4764B; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 28px; margin-bottom: 16px;">
              Bienvenue ! ✨
            </h1>
            
            <p style="color: #333; line-height: 1.6; margin-bottom: 16px;">
              Merci de vous être inscrit à notre newsletter !
            </p>
            
            <p style="color: #333; line-height: 1.6; margin-bottom: 16px;">
              Vous recevrez désormais nos conseils, astuces et actualités directement dans votre boîte mail. Nous partageons régulièrement des informations sur l'accompagnement post-partum, la parentalité bienveillante et le bien-être des mamans.
            </p>
            
            <div style="text-align: center; margin: 32px 0;">
              <div style="display: inline-block; background-color: #f9f5f0; padding: 20px; border-radius: 8px; border: 2px solid #D4764B;">
                <p style="color: #8B4513; font-weight: 600; margin: 0;">
                  💛 Prenez soin de vous 💛
                </p>
              </div>
            </div>
            
            <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e5e5; font-size: 14px; color: #666;">
              <p>Accompagnement Post-Partum</p>
              <p>Nantes</p>
            </div>
          </div>
        </div>
      `;
    }

    return '';
  }

  async sendContactEmail(contact: ContactForm): Promise<{ success: boolean; previewUrl?: string }> {
    console.log('========================================');
    console.log('📧 EMAIL SERVICE - sendContactEmail CALLED');
    console.log('========================================');
    
    if (!this.isConfigured) {
      console.error('❌ Email service not configured');
      return { success: false };
    }

    const contactEmail = process.env.CONTACT_EMAIL || 'contact@manonmanin-mamamia.fr';
    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev'; // Resend default
    
    const typeLabels = {
      'post-partum': 'Post-Partum',
      grossesse: 'Grossesse',
      autre: 'Autre',
    };

    const typeText = contact.typeAccompagnement
      ? typeLabels[contact.typeAccompagnement]
      : 'Non spécifié';

    try {
      if (this.useResend && this.resend) {
        console.log('📧 Using Resend API');
        console.log(`📧 Sending to: ${contactEmail}`);
        
        const { data, error } = await this.resend.emails.send({
          from: `Site Post-Partum <${fromEmail}>`,
          to: contactEmail,
          replyTo: contact.email,
          subject: `Nouveau message de ${contact.nom}`,
          html: this.getEmailHtml('contact', { contact, typeText }),
        });

        if (error) {
          console.error('❌ Resend error:', error);
          return { success: false };
        }

        console.log('✅ Email sent successfully via Resend!');
        console.log('📧 Email ID:', data?.id);
        return { success: true };
      } else {
        console.error('❌ SMTP not supported - please use Resend');
        console.error('💡 Add RESEND_API_KEY to Vercel environment variables');
        return { success: false };
      }
    } catch (error: any) {
      console.error('❌ Failed to send email:', error);
      return { success: false };
    }
  }

  async sendConfirmationEmail(contact: ContactForm): Promise<{ success: boolean }> {
    if (!this.isConfigured || !this.resend) {
      return { success: false };
    }

    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';

    try {
      if (this.useResend && this.resend) {
        const { error } = await this.resend.emails.send({
          from: `Accompagnement Post-Partum <${fromEmail}>`,
          to: contact.email,
          subject: 'Confirmation de votre message',
          html: this.getEmailHtml('confirmation', { contact }),
        });

        if (error) {
          console.error('❌ Failed to send confirmation email:', error);
          return { success: false };
        }

        console.log('✅ Confirmation email sent to:', contact.email);
        return { success: true };
      }
    } catch (error) {
      console.error('❌ Failed to send confirmation email:', error);
    }

    return { success: false };
  }

  async sendNewsletterConfirmationEmail(newsletter: NewsletterForm): Promise<{ success: boolean }> {
    if (!this.isConfigured || !this.resend) {
      return { success: false };
    }

    const fromEmail = process.env.FROM_EMAIL || 'onboarding@resend.dev';
    const contactEmail = process.env.CONTACT_EMAIL || 'contact@manonmanin-mamamia.fr';

    try {
      if (this.useResend && this.resend) {
        // Envoyer l'email de confirmation à l'utilisateur
        const { error: userError } = await this.resend.emails.send({
          from: `Accompagnement Post-Partum <${fromEmail}>`,
          to: newsletter.email,
          subject: 'Bienvenue dans notre newsletter !',
          html: this.getEmailHtml('newsletter', {}),
        });

        if (userError) {
          console.error('❌ Failed to send newsletter confirmation email:', userError);
          return { success: false };
        }

        console.log('✅ Newsletter confirmation email sent to:', newsletter.email);

        // Envoyer une notification à l'administrateur
        const { error: adminError } = await this.resend.emails.send({
          from: `Site Post-Partum <${fromEmail}>`,
          to: contactEmail,
          subject: `Nouvelle inscription à la newsletter : ${newsletter.email}`,
          html: `
            <div style="font-family: 'Inter', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f5f0;">
              <div style="background-color: white; border-radius: 12px; padding: 32px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
                <h1 style="color: #D4764B; font-family: 'Cormorant Garamond', Georgia, serif; font-size: 28px; margin-bottom: 24px; border-bottom: 2px solid #D4764B; padding-bottom: 12px;">
                  Nouvelle Inscription à la Newsletter
                </h1>
                
                <div style="margin-bottom: 24px;">
                  <h2 style="color: #5C3D2E; font-size: 18px; margin-bottom: 8px;">Informations</h2>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; color: #8B4513; font-weight: 600;">Email:</td>
                      <td style="padding: 8px 0;"><a href="mailto:${newsletter.email}" style="color: #D4764B; text-decoration: none;">${newsletter.email}</a></td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; color: #8B4513; font-weight: 600;">Date:</td>
                      <td style="padding: 8px 0; color: #333;">${new Date().toLocaleString('fr-FR')}</td>
                    </tr>
                  </table>
                </div>

                <div style="text-align: center; padding-top: 20px; border-top: 1px solid #e5e5e5;">
                  <p style="color: #666; font-size: 14px; margin: 0;">
                    Cette personne a été ajoutée à votre liste de newsletter.
                  </p>
                </div>
              </div>
            </div>
          `,
          text: `
Nouvelle inscription à la newsletter

Email: ${newsletter.email}
Date: ${new Date().toLocaleString('fr-FR')}

Cette personne a été ajoutée à votre liste de newsletter.
          `,
        });

        if (adminError) {
          console.error('❌ Failed to send newsletter notification to admin:', adminError);
          // On continue quand même, l'utilisateur a reçu sa confirmation
        } else {
          console.log('✅ Newsletter notification sent to admin:', contactEmail);
        }

        return { success: true };
      }
    } catch (error) {
      console.error('❌ Failed to send newsletter confirmation email:', error);
    }

    return { success: false };
  }
}

export const emailService = new EmailService();

import nodemailer from 'nodemailer';
import type { ContactForm } from '@shared/schema';

export class EmailService {
  private transporter: nodemailer.Transporter | null = null;
  private isConfigured = false;

  constructor() {
    this.initialize();
  }

  private async initialize() {
    try {
      // Check if SMTP credentials are available
      const hasSmtpConfig =
        process.env.SMTP_HOST &&
        process.env.SMTP_PORT &&
        process.env.SMTP_USER &&
        process.env.SMTP_PASS;

      if (hasSmtpConfig) {
        // Production: Use real SMTP
        this.transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: parseInt(process.env.SMTP_PORT || '587'),
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });
        this.isConfigured = true;
        console.log('✅ Email service configured with SMTP');
      } else {
        // Development: Use test account
        const testAccount = await nodemailer.createTestAccount();
        this.transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false,
          auth: {
            user: testAccount.user,
            pass: testAccount.pass,
          },
        });
        console.log('📧 Email service using Ethereal test account');
        console.log('   Preview emails at: https://ethereal.email');
      }
    } catch (error) {
      console.error('❌ Failed to initialize email service:', error);
      this.transporter = null;
    }
  }

  async sendContactEmail(contact: ContactForm): Promise<{ success: boolean; previewUrl?: string }> {
    if (!this.transporter) {
      console.warn('⚠️  Email not sent - transporter not initialized');
      return { success: false };
    }

    const typeLabels = {
      'post-partum': 'Post-Partum',
      grossesse: 'Grossesse',
      autre: 'Autre',
    };

    const typeText = contact.typeAccompagnement
      ? typeLabels[contact.typeAccompagnement]
      : 'Non spécifié';

    try {
      const info = await this.transporter.sendMail({
        from: `"Site Post-Partum" <${process.env.SMTP_FROM || 'noreply@accompagnement-postpartum.fr'}>`,
        to: process.env.CONTACT_EMAIL || 'contact@accompagnement-postpartum.fr',
        replyTo: contact.email,
        subject: `Nouveau message de ${contact.nom}`,
        html: `
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
                  ${
                    contact.telephone
                      ? `
                  <tr>
                    <td style="padding: 8px 0; color: #8B4513; font-weight: 600;">Téléphone:</td>
                    <td style="padding: 8px 0; color: #333;">${contact.telephone}</td>
                  </tr>
                  `
                      : ''
                  }
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
        `,
        text: `
Nouveau message de contact

Nom: ${contact.nom}
Email: ${contact.email}
${contact.telephone ? `Téléphone: ${contact.telephone}` : ''}
Type d'accompagnement: ${typeText}

Message:
${contact.message}
        `,
      });

      console.log('✅ Email sent:', info.messageId);

      // If using Ethereal, get preview URL
      if (!this.isConfigured) {
        const previewUrl = nodemailer.getTestMessageUrl(info);
        if (previewUrl) {
          console.log('📧 Preview URL:', previewUrl);
          return { success: true, previewUrl };
        }
      }

      return { success: true };
    } catch (error) {
      console.error('❌ Failed to send email:', error);
      return { success: false };
    }
  }

  async sendConfirmationEmail(contact: ContactForm): Promise<void> {
    if (!this.transporter) {
      return;
    }

    try {
      await this.transporter.sendMail({
        from: `"Accompagnement Post-Partum" <${process.env.SMTP_FROM || 'noreply@accompagnement-postpartum.fr'}>`,
        to: contact.email,
        subject: 'Confirmation de votre message',
        html: `
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
                En attendant, n'hésitez pas à consulter mes ressources gratuites sur le site.
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
                <p>Paris et Île-de-France</p>
              </div>
            </div>
          </div>
        `,
        text: `
Bonjour ${contact.nom},

J'ai bien reçu votre message et je vous en remercie. Je m'engage à vous répondre dans les plus brefs délais, généralement sous 24 à 48 heures.

En attendant, n'hésitez pas à consulter mes ressources gratuites sur le site.

Prenez soin de vous,

Accompagnement Post-Partum
Paris et Île-de-France
        `,
      });

      console.log('✅ Confirmation email sent to:', contact.email);
    } catch (error) {
      console.error('❌ Failed to send confirmation email:', error);
    }
  }
}

export const emailService = new EmailService();

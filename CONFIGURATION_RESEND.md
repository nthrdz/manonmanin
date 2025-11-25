# Configuration Resend - Solution définitive pour l'envoi d'emails

## ✅ Pourquoi Resend ?

Resend est **beaucoup plus fiable** que SMTP OVH :
- ✅ Pas de problèmes d'authentification
- ✅ Fonctionne parfaitement avec Vercel
- ✅ Gratuit jusqu'à 3000 emails/mois
- ✅ Configuration ultra-simple (juste une clé API)
- ✅ Délivrabilité excellente

## 🚀 Configuration en 3 étapes

### Étape 1 : Créer un compte Resend

1. Allez sur https://resend.com
2. Créez un compte gratuit
3. Vérifiez votre email

### Étape 2 : Obtenir votre clé API

1. Dans Resend, allez dans **API Keys**
2. Cliquez sur **Create API Key**
3. Donnez un nom (ex: "Vercel Production")
4. Copiez la clé API (elle commence par `re_`)

### Étape 3 : Configurer sur Vercel

1. Allez sur Vercel → Votre projet → **Settings** → **Environment Variables**
2. Ajoutez cette variable :

```
RESEND_API_KEY=re_VOTRE_CLE_API_ICI
```

3. Ajoutez aussi (optionnel, pour personnaliser l'expéditeur) :

```
FROM_EMAIL=noreply@votre-domaine.com
CONTACT_EMAIL=contact@manonmanin-mamamia.fr
```

**⚠️ IMPORTANT :**
- Remplacez `re_VOTRE_CLE_API_ICI` par votre vraie clé API Resend
- Pas d'espaces avant/après la valeur
- Pas de guillemets

### Étape 4 : Vérifier votre domaine (optionnel mais recommandé)

Pour envoyer depuis `noreply@manonmanin-mamamia.fr` :

1. Dans Resend, allez dans **Domains**
2. Cliquez sur **Add Domain**
3. Entrez `manonmanin-mamamia.fr`
4. Ajoutez les enregistrements DNS indiqués dans votre zone DNS OVH
5. Attendez la vérification (quelques minutes)

**Note :** Vous pouvez aussi utiliser l'email par défaut `onboarding@resend.dev` pour tester immédiatement, puis vérifier votre domaine plus tard.

## ✅ C'est tout !

Après avoir ajouté `RESEND_API_KEY` sur Vercel :
1. Vercel redéploie automatiquement
2. Les emails fonctionnent immédiatement
3. Plus de problèmes d'authentification !

## 📧 Test

1. Testez le formulaire de contact sur votre site
2. Vérifiez que vous recevez l'email dans `contact@manonmanin-mamamia.fr`
3. Vérifiez les logs Vercel - vous devriez voir :
   ```
   ✅ Email service configured with Resend
   📧 Using Resend API for email delivery
   ✅ Email sent successfully via Resend!
   ```

## 💰 Tarifs

- **Gratuit** : 3000 emails/mois
- **Payant** : À partir de $20/mois pour 50 000 emails

Pour un site comme le vôtre, le plan gratuit est largement suffisant !

## 🔗 Liens utiles

- Site Resend : https://resend.com
- Documentation : https://resend.com/docs
- Dashboard : https://resend.com/emails


# Configuration SMTP pour l'envoi d'emails

Pour que les emails du formulaire de contact arrivent réellement à **contact@manon-manin.fr**, vous devez configurer les variables d'environnement SMTP.

## 📋 Étapes de configuration

### 1. Créer un fichier `.env` à la racine du projet

Créez un fichier nommé `.env` à la racine du projet (même niveau que `package.json`).

### 2. Ajouter les variables d'environnement

Copiez le contenu suivant dans votre fichier `.env` et remplissez les valeurs selon votre fournisseur :

```env
# Adresse email de destination pour les messages de contact
CONTACT_EMAIL=contact@manon-manin.fr

# Adresse email expéditrice
SMTP_FROM=noreply@manon-manin.fr

# Configuration du serveur SMTP
SMTP_HOST=votre-serveur-smtp.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre-email@manon-manin.fr
SMTP_PASS=votre-mot-de-passe
```

## 🔧 Configuration selon votre fournisseur

### OVH (recommandé si vous hébergez chez OVH)

```env
CONTACT_EMAIL=contact@manon-manin.fr
SMTP_FROM=noreply@manon-manin.fr
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=contact@manon-manin.fr
SMTP_PASS=votre-mot-de-passe-email
```

**Comment obtenir ces informations :**
1. Connectez-vous à votre espace client OVH
2. Allez dans "Emails" → votre domaine
3. Les informations SMTP sont disponibles dans la section "Configuration serveur"

### Gmail (pour les tests)

```env
CONTACT_EMAIL=contact@manon-manin.fr
SMTP_FROM=votre-email@gmail.com
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=votre-email@gmail.com
SMTP_PASS=votre-mot-de-passe-app
```

**Important pour Gmail :**
- Vous devez activer "Accès moins sécurisé" ou créer un "Mot de passe d'application"
- Allez dans : Google Account → Sécurité → Validation en 2 étapes → Mots de passe des applications

### SendGrid

```env
CONTACT_EMAIL=contact@manon-manin.fr
SMTP_FROM=noreply@manon-manin.fr
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=apikey
SMTP_PASS=votre-api-key-sendgrid
```

### Mailgun

```env
CONTACT_EMAIL=contact@manon-manin.fr
SMTP_FROM=noreply@manon-manin.fr
SMTP_HOST=smtp.mailgun.org
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=postmaster@votre-domaine.mailgun.org
SMTP_PASS=votre-mot-de-passe-mailgun
```

## 🔒 Sécurité

⚠️ **Important :** Le fichier `.env` contient des informations sensibles. 

- **NE COMMITEZ JAMAIS** le fichier `.env` dans Git
- Le fichier `.env` est déjà dans `.gitignore` (ou devrait l'être)
- Ne partagez jamais vos identifiants SMTP

## ✅ Vérification

Une fois configuré, redémarrez votre serveur :

```bash
npm run dev
```

Vous devriez voir dans la console :
```
✅ Email service configured with SMTP
```

Au lieu de :
```
📧 Email service using Ethereal test account
```

## 🧪 Test

Pour tester l'envoi d'email :
1. Remplissez le formulaire de contact sur votre site
2. Vérifiez que l'email arrive bien à `contact@manon-manin.fr`
3. Vérifiez aussi que l'email de confirmation est envoyé à l'utilisateur

## ❓ Problèmes courants

### Les emails ne partent pas
- Vérifiez que toutes les variables sont correctement définies
- Vérifiez que le port et l'hôte sont corrects
- Vérifiez que le mot de passe est correct
- Vérifiez les logs du serveur pour voir les erreurs

### Erreur "Authentication failed"
- Vérifiez que `SMTP_USER` et `SMTP_PASS` sont corrects
- Pour Gmail, utilisez un "Mot de passe d'application" et non votre mot de passe normal

### Erreur "Connection timeout"
- Vérifiez que `SMTP_HOST` est correct
- Vérifiez que le port n'est pas bloqué par un firewall
- Essayez avec `SMTP_SECURE=true` et `SMTP_PORT=465`

## 📞 Support

Si vous avez des problèmes, contactez votre hébergeur (OVH, etc.) pour obtenir les informations SMTP exactes pour votre domaine.


# Configuration SMTP OVH - Guide de dépannage

## Problème : "Authentication failed" (535 5.7.1)

### 1. Vérifier les identifiants dans OVH

1. Connectez-vous à votre espace client OVH : https://www.ovh.com/manager/web/
2. Allez dans **Emails** → **Emails**
3. Vérifiez que `contact@manonmanin-mamamia.fr` existe bien
4. Si l'email n'existe pas, créez-le

### 2. Réinitialiser le mot de passe de l'email

1. Dans OVH → **Emails** → **Emails**
2. Cliquez sur `contact@manonmanin-mamamia.fr`
3. Cliquez sur **Modifier le mot de passe**
4. Créez un nouveau mot de passe **fort** (minimum 12 caractères, avec majuscules, minuscules, chiffres)
5. **Notez ce mot de passe** - vous en aurez besoin pour Vercel

### 3. Configuration sur Vercel

Allez sur Vercel → Votre projet → **Settings** → **Environment Variables**

Ajoutez/modifiez ces variables **EXACTEMENT** comme suit :

```
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=contact@manonmanin-mamamia.fr
SMTP_PASS=[LE NOUVEAU MOT DE PASSE - SANS ESPACES, SANS GUILLEMETS]
CONTACT_EMAIL=contact@manonmanin-mamamia.fr
```

**⚠️ IMPORTANT :**
- Pas d'espaces avant ou après les valeurs
- Pas de guillemets autour des valeurs
- `SMTP_USER` doit être l'adresse email complète
- `SMTP_PASS` doit être le mot de passe de l'email (pas celui du compte OVH)

### 4. Alternative : Port 465 (SSL)

Si le port 587 ne fonctionne pas, essayez avec le port 465 :

```
SMTP_HOST=ssl0.ovh.net
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=contact@manonmanin-mamamia.fr
SMTP_PASS=[LE MOT DE PASSE]
CONTACT_EMAIL=contact@manonmanin-mamamia.fr
```

### 5. Vérifier les restrictions OVH

OVH peut bloquer les connexions SMTP depuis certains serveurs. Vérifiez :

1. OVH → **Emails** → **Emails** → `contact@manonmanin-mamamia.fr`
2. Vérifiez s'il y a des restrictions d'accès SMTP
3. Si nécessaire, contactez le support OVH pour débloquer l'accès SMTP depuis Vercel

### 6. Tester avec un client email

Pour vérifier que les identifiants fonctionnent :

1. Configurez un client email (Thunderbird, Mail, Outlook) avec :
   - **Serveur SMTP** : `ssl0.ovh.net`
   - **Port** : `587`
   - **Sécurité** : `STARTTLS`
   - **Authentification** : `Oui`
   - **Utilisateur** : `contact@manonmanin-mamamia.fr`
   - **Mot de passe** : [votre mot de passe]

2. Essayez d'envoyer un email de test

3. Si ça fonctionne dans le client email, les identifiants sont corrects et le problème vient de la configuration Vercel

4. Si ça ne fonctionne pas dans le client email, le problème vient des identifiants OVH

### 7. Après modification sur Vercel

1. Modifiez les variables d'environnement sur Vercel
2. **Redéployez** le projet (ou attendez le redéploiement automatique)
3. Testez le formulaire de contact
4. Vérifiez les logs Vercel pour voir les détails de la configuration

### 8. Logs à vérifier

Dans les logs Vercel, vous devriez voir :

```
🔍 SMTP Configuration Details:
   Host: "ssl0.ovh.net"
   Port: 587
   Secure: false
   RequireTLS: true
   User: "contact@manonmanin-mamamia.fr" (length: XX)
   Pass: "********" (length: XX)
   User contains spaces: ✅ NO
   Pass contains spaces: ✅ NO
   User starts/ends with quotes: ✅ NO
   Pass starts/ends with quotes: ✅ NO
```

Si vous voyez des ⚠️, corrigez les variables sur Vercel.

## Support

Si le problème persiste après avoir suivi ces étapes :
1. Vérifiez que l'email existe bien dans OVH
2. Vérifiez que le mot de passe est correct
3. Contactez le support OVH si nécessaire


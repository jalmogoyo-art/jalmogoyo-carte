# Jalmogoyo – Menu

Menu numérique du restaurant coréen Jalmogoyo (Mulhouse) pour tablette Android — FR · EN · DE · 한국어.

## Liens

- **Installer sur une tablette** : https://jalmogoyo-art.github.io/jalmogoyo-carte/install.html
- **Mode kiosque (tablette bloquée sur le menu)** : https://jalmogoyo-art.github.io/jalmogoyo-carte/kiosque.html
- **Version en ligne** : https://jalmogoyo-art.github.io/jalmogoyo-carte/
- **APK** : https://github.com/jalmogoyo-art/jalmogoyo-carte/releases/latest/download/jalmogoyo-menu.apk

## Comment ça marche

L'application installée sur les tablettes affiche la **version en ligne** du menu et en garde une
copie complète pour fonctionner sans Wi-Fi. Modifier un prix ne demande donc **aucune
réinstallation** :

1. on modifie `www/js/menu-data.js` et on pousse ;
2. GitHub Actions vérifie le menu (`tools/check-menu.js`) — en cas d'erreur, rien n'est publié et
   les tablettes gardent la version précédente ;
3. la version en ligne est mise à jour ;
4. chaque tablette connectée détecte la nouvelle version en quelques minutes et se recharge
   lorsqu'elle est sur l'écran d'accueil (jamais pendant qu'un client lit le menu).

Le numéro de version est affiché tout en bas du menu (« v123 ») et sur la page d'installation.

> **Réglage GitHub Pages** : dans *Settings → Pages → Build and deployment*, la **Source** doit
> rester sur **GitHub Actions**. Avec « Deploy from a branch », GitHub publie la racine du dépôt
> (ce README) à la place du menu ; la publication le rattrape, mais affiche un avertissement.

## Menus du midi

La rubrique « Menus du midi » s'affiche toute seule **du mardi au vendredi jusqu'à 14h30**, et se
masque le soir, le samedi et les **jours fériés** (calendrier d'Alsace-Moselle, Pâques et Pentecôte
calculées chaque année — `www/js/schedule.js`). Pour une fermeture exceptionnelle ou un pont,
ajouter la date dans `closedDays` en haut de `www/js/menu-data.js` (ex. `closedDays: ['2026-12-24']`).

## Organisation

| Dossier | Contenu |
| --- | --- |
| `www/` | Le menu lui-même (HTML / CSS / JS / photos). |
| `www/js/menu-data.js` | Plats, prix, traductions, allergènes. **C'est le fichier à modifier.** |
| `www/img/dishes/` | Photos des plats : `nom.jpg` (800 px de large, vignettes) et `large/nom.jpg` (1800 px, fiche du plat). |
| `www/install.html` | Page d'installation pour les tablettes. |
| `www/kiosque.html` | Mise en place du mode kiosque (QR code à scanner au premier allumage de la tablette). |
| `android/` | Application Android plein écran (affiche la version en ligne, copie de secours incluse). |
| `tools/` | Vérification du menu et numérotation des versions, lancées automatiquement. |
| `.github/workflows/build.yml` | Vérifie, publie la version en ligne, construit l'APK. |
| `index.html` (racine) | Filet de sécurité : renvoie vers `www/` si GitHub Pages publie la racine du dépôt. Ce n'est pas le menu. |

Un nouvel APK n'est publié que si le dossier `android/` change : les tablettes n'ont alors pas
besoin d'être réinstallées pour un simple changement de menu.

## Tester en local

```sh
node tools/check-menu.js                # vérifie le menu
cd www && python3 -m http.server 8000   # puis ouvrir http://localhost:8000
```

## Mode kiosque

Sur une tablette mise en place avec le QR code de `www/kiosque.html` (tablette neuve ou réinitialisée),
l'application devient gestionnaire de l'appareil (« device owner ») : le menu est l'écran d'accueil,
il s'affiche à l'allumage et on ne peut pas en sortir. Le personnel en sort par 5 appuis rapides dans
le coin en haut à droite, puis un code choisi sur la tablette (jamais stocké en clair, absent du dépôt).
Sur une tablette où l'application est simplement installée, rien de tout cela n'est actif.

- Code : `android/app/src/main/java/com/jalmogoyo/menu/Kiosk.java` et `MainActivity.java`.
- Contenu du QR code : `tools/kiosk-qr.json` (adresse de l'APK + empreinte de la clé de signature).
  Le QR code ne change que si la clé de signature ou l'adresse de l'APK change.

## Signature de l'APK

La clé `android/keystore/jalmogoyo.jks` est volontairement dans le dépôt : toutes les versions ont
ainsi la même signature et s'installent par-dessus la précédente. L'application est distribuée
uniquement par installation directe (pas de Play Store).

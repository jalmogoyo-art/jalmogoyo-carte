# Jalmogoyo – Menu

Menu numérique du restaurant coréen Jalmogoyo (Mulhouse) pour tablette Android — FR · EN · DE · 한국어.

## Liens

- **Installer sur une tablette** : https://jalmogoyo-art.github.io/jalmogoyo-carte/install.html
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
| `android/` | Application Android plein écran (affiche la version en ligne, copie de secours incluse). |
| `tools/` | Vérification du menu et numérotation des versions, lancées automatiquement. |
| `.github/workflows/build.yml` | Vérifie, publie la version en ligne, construit l'APK. |

Un nouvel APK n'est publié que si le dossier `android/` change : les tablettes n'ont alors pas
besoin d'être réinstallées pour un simple changement de menu.

## Tester en local

```sh
node tools/check-menu.js                # vérifie le menu
cd www && python3 -m http.server 8000   # puis ouvrir http://localhost:8000
```

## Signature de l'APK

La clé `android/keystore/jalmogoyo.jks` est volontairement dans le dépôt : toutes les versions ont
ainsi la même signature et s'installent par-dessus la précédente. L'application est distribuée
uniquement par installation directe (pas de Play Store).

# Jalmogoyo – Menu

Menu numérique du restaurant coréen Jalmogoyo (Mulhouse) pour tablette Android — FR · EN · DE · 한국어.

## Liens

- **APK pour la tablette** : https://github.com/jalmogoyo-art/jalmogoyo-carte/releases/latest/download/jalmogoyo-menu.apk
- **Version en ligne** : https://jalmogoyo-art.github.io/jalmogoyo-carte/

## Organisation

| Dossier | Contenu |
| --- | --- |
| `www/` | Le menu lui-même (HTML / CSS / JS / photos). C'est ce dossier qu'on modifie. |
| `www/js/menu-data.js` | Plats, prix, traductions, allergènes. |
| `www/img/dishes/` | Photos des plats. |
| `android/` | Coquille Android plein écran qui affiche `www/` hors ligne. |
| `.github/workflows/build.yml` | À chaque modification : reconstruit l'APK, publie une release et met à jour la version en ligne. |

## Modifier le menu

Modifier `www/js/menu-data.js` (prix, plats, textes), puis pousser. GitHub Actions publie
automatiquement un nouvel APK et met à jour la version en ligne.

Si la liste des fichiers de `www/` change (nouvelle photo, etc.), ajouter le fichier à la liste
`FILES` de `www/sw.js` et augmenter le numéro de `CACHE`.

## Tester en local

```sh
cd www && python3 -m http.server 8000   # puis ouvrir http://localhost:8000
```

## Signature de l'APK

La clé `android/keystore/jalmogoyo.jks` est volontairement dans le dépôt : toutes les versions ont
ainsi la même signature et s'installent par-dessus la précédente. L'application est distribuée
uniquement par installation directe (pas de Play Store).

# SONGS FOR YOU

![logo vintage](./data/songs%20vintage.gif)

Application réalisée dans le cadre du concours #5 du Designer du Web
Objectif: "Intégrer une page avec un lecteur audio / vidéo."

- Le concours: [lien Youtube](https://youtu.be/x_qmglVkGMc)

## Table des matières

- [Consignes](#consignes)
- [Réalisation](#réalisation)
  - [Fonctionnalités du lecteur](fonctionnalités-du-lecteur)
  - [Technos](#technos)
  - [Outils](#outils)
  - [Pour fayotter](#pour-fayotter)
- [Screenshot](#screenshot)
- [Bilan](#bilan)
- [La voir en action](#la-voir-en-action)
- [Moi](#moi)

## Consignes

> Votre travail doit être ORIGINAL et UNIQUE, autant au niveau du DESIGN que du CODE.
> Aucune ressemblance avec quoique ce soit sur le web n'est tolérée, sous peine d'être exclu du concours.
> Partez d'une feuille blanche et tentez de tout créer de A à Z, on doit pouvoir sentir instantanément que tout vient de vous.
>
> Votre création doit également être faite spécialement pour le concours, dans le temps imparti.
> Il est interdit d'utiliser une création qu'on aurait déjà faite, et de participer à un concours avec.
> Ce serait injuste envers ceux qui participent dans le temps imparti.

## Réalisation

### Fonctionnalités du lecteur

- au chargement seule la playlist est visible, le lecteur est masqué et n'apparait que lorsque on lance une chanson
- possibilité de démarrer le lecteur en lançant un titre random ou en le choisissant dans la playlist
- playlist générée par js d'après le json
- injection en js des détails (titre, artiste, cover) dans le player d'après le titre joué
- fonction play, pause, next, previous et contrôles du volume (faut au moins ça non?)
- bouton close pour arrêter la musique ET fermer le lecteur
- mode random = lecture d'un titre aléatoire dans ceux de la playlist non encore joués durant cette session de lecture radom (se remet à 0 quand on quitte le mode random)
- possibilité de télécharger le titre joué
- équalizers (un fake en déco, un demandera l'autorisation d'accès au micro)
- "focus" sur le titre en cours de lecture dans la playlist (en mode desktop)

### Technos

- HTML
- CSS
- vanilla JS
- canva et d3

### Outils

- Thème géré par JS et CSS roots
- Localstorage enregistre le choix du théme vintage ou moderne
- Fetch pour obtenir les données (json local)

### Pour fayotter

- zolies musiques libres de droits
- dont surtout la première, grand coup de coeur du créateur du concours lors du concours précédent
- easter egg prévu si j'ai le temps parce que easter is coming

[UP](#table-des-matières)

## Screenshot

![sreen](./documents/songs%20for%20you.png)

## Bilan

- ai dû passer du temps sur le mode random (enfin surtout pour revenir du random à la lecture dans l'ordre)
- premiers essais d3 et canva (faut vraiment que je vois ça plus à fond)

> Spéciale dédicace à mon ado de bientôt 16 ans
> (c'est tellement bientôt que quand vous lirez cela ça sera probablement passé)
> alias P'tit con, mon conseiller personnel en expérience utilisateur
> qui sans vergogne m'a rajouté du travail!

## La voir en action

(enfin l'entendre surtout)

- Déploiement: [SONGS FOR YOU](https://songs-for-you.netlify.app/)

## Moi

- Website - [Bénédicte Hérault](https://lazez-bzh.netlify.app/)
- LinkedIn - [B. HÉRAULT](https://www.linkedin.com/in/benedicte-herault/)

[UP](#table-des-matières)
![logo moderne](./data/songs%20modern.gif)

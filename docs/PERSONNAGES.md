# La bande de Plumo : créer les images 3D

Le jeu affiche automatiquement les images ci-dessous dès qu'elles sont dans `img/bande/`.
Tant qu'elles n'y sont pas, il utilise des dessins simples. Rien d'autre à changer dans le code.

| Fichier | Personnage |
| --- | --- |
| `img/bande/pico.webp` | Pico le hérisson |
| `img/bande/zaza.webp` | Zaza la grenouille |
| `img/bande/rocket.webp` | Rocket le renard |

**Format :** fond transparent, environ 1000 × 1100 pixels, personnage entier et centré, en WebP
(un PNG converti suffit : `cwebp -q 85 pico.png -o pico.webp`). Moins de 150 Ko si possible.

**Pour garder le style de Plumo :** utilise le même outil que pour `img/ami-3d.webp`, et donne-lui
l'image de Plumo comme référence de style si l'outil le permet.

## Descriptions à copier

Base commune à ajouter à chaque description :

> 3D animated movie style, soft fluffy fur, big expressive glossy eyes, warm studio lighting,
> full body, standing, facing camera slightly turned, cute but cheeky, original character,
> transparent background, no text, no logo.

**Pico le hérisson**

> A small round hedgehog with soft brown spines and a cream-coloured face and belly,
> laughing out loud with his mouth wide open, one paw pointing to the side as if mocking a friend.

**Zaza la grenouille**

> A chubby bright green frog with a pale green belly and rosy cheeks, big laughing smile,
> one hand on her hip, the other hand covering her mouth as she giggles.

**Rocket le renard**

> A young orange fox with a white chest and tail tip, sly half-smile, one eyebrow raised,
> holding a smartphone as if taking a photo of something funny.

## Vérifier avant de mettre en ligne

- Le personnage ne ressemble pas à un personnage connu (dessin animé, jeu vidéo, marque).
- Pas de texte ni de logo dans l'image.
- Vérifie les conditions d'utilisation commerciale de l'outil utilisé.

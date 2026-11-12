# EchoPodz – Documentation du projet

Dernière mise à jour : 2026-11-12 · English version: [DOCUMENTATION.md](DOCUMENTATION.md)

## Ce qu'est EchoPodz

EchoPodz est une application mobile d'action climatique (iOS et Android) qui transforme les intentions durables en actions visibles, répétées et portées par une communauté. Source : le document « EchoPodz: Product & Feature Overview ».

Le mécanisme central est l'effet Echo : une personne réalise une action, une autre la découvre et la refait, et la chaîne transforme l'impact individuel en impact collectif. Chaque Echo est enregistré et relié à l'action d'origine.

1. Découvrir et apprendre : rendre les choix durables faciles à comprendre et à adopter.
2. Agir et faire écho : transformer l'information en actions simples et répétables grâce aux défis et au renforcement social.
3. Suivre et amplifier : rendre visible et mesurable l'impact individuel et collectif.

Signature : « Make your choices eco. Make them echo. »

## Périmètre du MVP (10 fonctionnalités)

| N° | Fonctionnalité | Rôle |
| --- | --- | --- |
| 1 | Profils utilisateurs | Identité de base et activité durable |
| 2 | Fil d'actions | Découvrir les actions de la communauté et d'EchoPodz |
| 3 | Créer une action | Partager ce que l'on a fait |
| 4 | Echo / Refaire | Reproduire l'action d'un autre membre |
| 5 | Défis | Rejoindre et terminer des défis structurés |
| 6 | Suivi d'impact | Suivre l'impact individuel et collectif |
| 7 | Événements | Découvrir et rejoindre des initiatives |
| 8 | Découverte durable | Explorer des alternatives et initiatives durables |
| 9 | Communauté | Interactions et engagement de base |
| 10 | Tableau de bord d'impact | Afficher la progression individuelle et collective |

Hors MVP : la couche B2B entreprises (défis d'entreprise, campagnes, reporting ESG, abonnements), les recommandations personnalisées, la gamification avancée et les intégrations API.

La méthodologie d'impact (facteurs CO₂ et déchets par action) n'est pas encore définie : l'application affiche donc des valeurs provisoires pour les chiffres d'impact jusqu'à sa validation.

## Décisions prises

| Domaine | Choix |
| --- | --- |
| Application | React Native + Expo, TypeScript, une seule base de code pour iOS et Android |
| Backend | Supabase (Postgres, Auth, Storage, Realtime) |
| Outil de design | Figma |
| CI/CD | GitHub Actions + EAS Build (pas encore en place) |
| Analytique, erreurs | PostHog + Sentry (pas encore en place) |
| Logo | Logo tortue provisoire, conservé pour l'instant |

### Design system v1

| Jeton | Valeur | Usage |
| --- | --- | --- |
| Forest | `#1B4338` | Navigation, en-têtes, cartes sombres |
| Echo Green | `#62C766` | Icônes, progression, graphiques (jamais pour le texte) |
| Lime | `#C8F169` | Bouton Echo et action principale uniquement |
| Mint | `#EAF6E3` | Fond de l'application |
| Ink | `#101510` | Texte courant |
| Grey | `#5E6B63` | Texte secondaire |
| Line | `#D5E3D0` | Bordures |

- Polices : Bricolage Grotesque (titres), DM Sans (texte).
- Formes : cartes à rayon de 28 px, boutons en pilule, barre de navigation flottante en pilule.
- Signature : l'onde Echo (trois anneaux qui s'étendent depuis le bouton Echo) et la chaîne Echo (avatars reliés).

### Navigation et parcours

- Cinq emplacements dans la barre : Fil, Découvrir, Créer (+), Défis, Moi. L'impact se trouve dans Moi.
- Onboarding : écran d'accueil, trois écrans de présentation, inscription, choix des centres d'intérêt, première action suggérée.
- Créer une action : choisir un modèle ou une action libre, photo et note facultatives, aperçu, publication.
- Echo : un appui sur une carte du fil, animation d'onde, puis vue de la chaîne.
- Rejoindre un défi : liste, détail, inscription, liste quotidienne, fin du défi.

### Modèle de données (Supabase)

| Table | Rôle |
| --- | --- |
| `profiles` | Une ligne par utilisateur |
| `action_templates` | Actions prêtes à l'emploi, avec un facteur d'impact laissé vide pour l'instant |
| `actions` | Toutes les actions ; `parent_action_id` indique un Echo, `root_action_id` pointe vers l'action d'origine |
| `challenges` | Titre, dates, partenaire, objectif |
| `challenge_participants` | Qui a rejoint quel défi |
| `events` | Initiatives locales |

Le nombre d'Echos d'une action est le nombre de lignes dont `root_action_id` vaut cette action.

## Où nous en sommes

- [x] Stack choisie
- [x] Inspirations, palette, logo provisoire
- [x] Parcours UX
- [x] Wireframes (8 écrans principaux)
- [x] Design system v1
- [x] Écrans haute fidélité (8)
- [x] Code de départ et script d'installation
- [x] Application créée et dépendances installées (`setup.cmd`), Expo SDK 58, 20/20 vérifications expo-doctor réussies
- [x] Premier lancement sur téléphone avec Expo Go (écran Fil vide et barre de navigation)
- [x] Dépôt GitHub créé (`Dhaker12/echopodz.app`), projet déplacé dans son dossier local
- [ ] Premier push avec GitHub Desktop
- [ ] Projet Supabase et schéma
- [ ] Développement du MVP : authentification, fil, Echo, défis, impact, événements
- [ ] Bêta fermée, puis soumission à l'App Store et au Play Store

## Étapes d'installation

1. Installer Node.js LTS depuis nodejs.org.
2. Lancer `setup.cmd` depuis le dossier `echopodz-src`. Le script crée l'application Expo (désormais dans `OneDrive\Desktop\echopodz-app\echopodz.app`), copie le code de départ, installe les dépendances et lance les vérifications.
3. Installer Expo Go sur le téléphone et se connecter à un compte Expo gratuit sur le téléphone et sur le PC (`npx expo login`). Double-cliquer sur `start.cmd` dans le dossier du projet (ou lancer `npx expo start`) et scanner le QR code.
4. Le dépôt GitHub est `Dhaker12/echopodz.app`. Valider et pousser avec GitHub Desktop.
5. Créer un projet sur supabase.com. Coller `supabase/schema.sql` dans le SQL Editor et l'exécuter.
6. Copier l'URL du projet Supabase et la clé anon dans le fichier `.env`. Ne jamais utiliser la clé `service_role` dans l'application.

## Plan du code

| Chemin | Contenu |
| --- | --- |
| `app/_layout.tsx` | Charge les polices, déclare les onglets et la feuille Créer |
| `app/(tabs)/` | Fil, Découvrir, Défis, Moi (écrans vides avec titre) |
| `app/create.tsx` | Feuille Créer (provisoire) |
| `src/theme/tokens.ts` | Couleurs, rayons, espacements, noms des polices |
| `src/components/NavPill.tsx` | Barre de navigation flottante avec le bouton + Lime |
| `src/lib/supabase.ts` | Client Supabase, utilisé à partir de l'étape d'authentification |
| `supabase/schema.sql` | Tables, déclencheur Echo, règles d'accès |

## Feuille de route (12 semaines, en solo)

| Semaines | Travail |
| --- | --- |
| 1 à 4 | Marque, UX, design UI, mise en place du projet |
| 5 | Authentification et profil |
| 6 à 7 | Fil d'actions, création d'action, Echo |
| 8 | Défis |
| 9 | Suivi d'impact et tableau de bord |
| 10 | Événements et découverte durable |
| 11 | Finitions, animations, tests internes |
| 12 | Bêta fermée avec environ 20 utilisateurs, soumission aux stores |

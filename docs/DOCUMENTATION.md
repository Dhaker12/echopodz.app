# EchoPodz – Project Documentation

Last updated: 2026-11-12 · Version française : [DOCUMENTATION.fr.md](DOCUMENTATION.fr.md)

## What EchoPodz is

EchoPodz is a climate-action mobile app (iOS and Android) that turns sustainable intentions into visible, repeated, community-powered action. Source: the "EchoPodz: Product & Feature Overview" document.

The core mechanism is the Echo Effect: one person takes an action, another person discovers it and redoes it, and the chain turns individual impact into collective impact. Each Echo is recorded and linked to the original action.

1. Discover & Learn: make sustainable choices easy to understand and access.
2. Act & Echo: turn information into simple, repeatable actions through challenges and social reinforcement.
3. Track & Amplify: make individual and collective impact visible and measurable.

Tagline: "Make your choices eco. Make them echo."

## MVP scope (10 features)

| # | Feature | What it does |
| --- | --- | --- |
| 1 | User profiles | Basic identity and sustainability activity |
| 2 | Action feed | Discover actions from the community and EchoPodz |
| 3 | Create an action | Share what you have done |
| 4 | Echo / Re-do | Replicate another member's action |
| 5 | Challenges | Join and complete structured challenges |
| 6 | Impact tracking | Track individual and collective impact |
| 7 | Events | Discover and join relevant initiatives |
| 8 | Sustainable discovery | Explore sustainable alternatives and initiatives |
| 9 | Community | Basic interaction and engagement |
| 10 | Impact dashboard | Show individual and collective progress |

Out of the MVP: the B2B corporate layer (corporate challenges, campaigns, ESG reporting, subscriptions), personalised recommendations, advanced gamification and API integrations.

The impact methodology (CO₂ and waste factors per action) is not defined yet, so the app shows placeholders for impact numbers until it is validated.

## Decisions so far

| Area | Choice |
| --- | --- |
| App | React Native + Expo, TypeScript, one codebase for iOS and Android |
| Backend | Supabase (Postgres, Auth, Storage, Realtime) |
| Design tool | Figma |
| CI/CD | GitHub Actions + EAS Build (not set up yet) |
| Analytics, errors | PostHog + Sentry (not set up yet) |
| Logo | Provisional turtle logo, kept for now |

### Design system v1

| Token | Value | Use |
| --- | --- | --- |
| Forest | `#1B4338` | Nav, headers, dark cards |
| Echo Green | `#62C766` | Icons, progress, charts (not for text) |
| Lime | `#C8F169` | Echo button and main call to action only |
| Mint | `#EAF6E3` | App background |
| Ink | `#101510` | Body text |
| Grey | `#5E6B63` | Secondary text |
| Line | `#D5E3D0` | Borders |

- Fonts: Bricolage Grotesque (headlines), DM Sans (body).
- Shapes: cards with 28 px radius, pill buttons, floating pill navigation bar.
- Signature: the Echo ripple (three rings expanding from the Echo button) and the Echo chain (linked avatars).

### Navigation and flows

- Five slots in the nav pill: Feed, Discover, Create (+), Challenges, Me. Impact lives inside Me.
- Onboarding: splash, three welcome slides, sign up, pick interests, first suggested action.
- Create an action: pick a template or custom, optional photo and note, preview, publish.
- Echo: one tap on a feed card, ripple animation, then the chain view.
- Join a challenge: list, detail, join, daily checklist, completion.

### Data model (Supabase)

| Table | Purpose |
| --- | --- |
| `profiles` | One row per user |
| `action_templates` | Ready-made actions, with an impact factor left empty for now |
| `actions` | Every action; `parent_action_id` marks an Echo, `root_action_id` points to the original |
| `challenges` | Title, dates, partner, target |
| `challenge_participants` | Who joined which challenge |
| `events` | Local initiatives |

The Echo count of an action is the number of rows whose `root_action_id` is that action.

## Where we are

- [x] Stack chosen
- [x] Inspirations, palette, provisional logo
- [x] UX flows
- [x] Wireframes (8 core screens)
- [x] Design system v1
- [x] Hi-fi screens (8)
- [x] Starter code and setup script
- [x] App created and dependencies installed (`setup.cmd`), Expo SDK 58, 20/20 expo-doctor checks passed
- [x] First launch on a phone with Expo Go (blank Feed screen and navigation pill)
- [x] GitHub repository created (`Dhaker12/echopodz.app`), project moved into its local folder
- [ ] First push with GitHub Desktop
- [ ] Supabase project and schema
- [ ] MVP build: auth, feed, Echo, challenges, impact, events
- [ ] Closed beta, then App Store and Play Store submission

## Setup steps

1. Install Node.js LTS from nodejs.org.
2. Run `setup.cmd` from the `echopodz-src` folder. It creates the Expo app (now kept in `OneDrive\Desktop\echopodz-app\echopodz.app`), copies the starter code, installs the dependencies and runs the checks.
3. Install Expo Go on your phone and sign in to a free Expo account on the phone and on the PC (`npx expo login`). Double-click `start.cmd` in the project folder (or run `npx expo start`) and scan the QR code.
4. The GitHub repository is `Dhaker12/echopodz.app`. Commit and push with GitHub Desktop.
5. Create a project on supabase.com. Paste `supabase/schema.sql` into the SQL Editor and run it.
6. Copy the Supabase Project URL and the anon key into the `.env` file. Never use the `service_role` key in the app.

## Code map

| Path | Content |
| --- | --- |
| `app/_layout.tsx` | Loads the fonts, declares the tabs and the Create sheet |
| `app/(tabs)/` | Feed, Discover, Challenges, Me (empty screens with titles) |
| `app/create.tsx` | Create sheet (placeholder) |
| `src/theme/tokens.ts` | Colors, radius, spacing, font names |
| `src/components/NavPill.tsx` | Floating navigation pill with the Lime + button |
| `src/lib/supabase.ts` | Supabase client, used from the auth step |
| `supabase/schema.sql` | Tables, Echo trigger, access policies |

## Roadmap (12 weeks, solo)

| Weeks | Work |
| --- | --- |
| 1 to 4 | Brand, UX, UI design, project setup |
| 5 | Auth and profile |
| 6 to 7 | Action feed, create an action, Echo |
| 8 | Challenges |
| 9 | Impact tracking and dashboard |
| 10 | Events and sustainable discovery |
| 11 | Polish, animations, internal testing |
| 12 | Closed beta with about 20 users, store submission |

import { GameInfo, Article, GuideSection, NavItem } from './types';

export const gameInfo: GameInfo = {
  title: 'Grand Theft Auto VI',
  titleEn: 'GTA VI',
  genre: 'Open World Action-Adventure',
  developer: 'Rockstar Games',
  publisher: 'Rockstar Games',
  platforms: ['PS5', 'Xbox Series X/S', 'PC'],
  releaseDate: '2026',
  description: 'Grand Theft Auto VI is an open-world action-adventure game developed by Rockstar Games, and the eighth main installment in the GTA series. Set in the fictional state of Leonida (inspired by Florida), it follows the story of Lucia and Jason, delivering the most immersive and realistic open-world experience in the franchise\'s history.',
  coverImage: '/images/gta6-cover.jpg',
  rating: 4.9,
};

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'News', href: '/news' },
  { label: 'Guides', href: '/guides' },
  { label: 'Walkthrough', href: '/walkthrough' },
  { label: 'Downloads', href: '/downloads' },
  { label: 'Database', href: '/database' },
];

export const guideSections: GuideSection[] = [
  { id: 'walkthrough', title: 'Main Story', description: 'Complete main mission walkthrough', icon: '🗺️', articleCount: 2 },
  { id: 'side-missions', title: 'Side Missions', description: 'All side mission guides', icon: '📋', articleCount: 1 },
  { id: 'collectibles', title: 'Collectibles', description: 'Hidden item collection guides', icon: '💎', articleCount: 1 },
  { id: 'vehicles', title: 'Vehicle Catalog', description: 'All vehicle stats & how to get', icon: '🚗', articleCount: 2 },
  { id: 'weapons', title: 'Weapon Catalog', description: 'All weapon stats & locations', icon: '🔫', articleCount: 1 },
  { id: 'properties', title: 'Properties', description: 'Real estate & business investments', icon: '🏠', articleCount: 1 },
  { id: 'achievements', title: 'Achievements', description: 'Full achievement unlock guide', icon: '🏆', articleCount: 1 },
  { id: 'online', title: 'Online Mode', description: 'GTA Online guides', icon: '🌐', articleCount: 2 },
];

export const sampleArticles: Article[] = [
  {
    slug: 'gta6-release-date-everything-we-know',
    title: 'GTA 6 Release Date: Everything We Know',
    excerpt: 'Rockstar has officially announced GTA 6 for a 2026 release. Here\'s a summary of all confirmed game information.',
    content: `# GTA 6 Release Date: Everything We Know

Rockstar Games released the first trailer for GTA 6 in December 2023, instantly breaking the internet. Here's everything we know so far about the most anticipated game of the decade.

## Release Date

GTA 6 is scheduled for release in Fall 2026, launching first on PS5 and Xbox Series X/S, with a PC release expected later.

## Game Setting

The game is set in the fictional state of Leonida, with the main city being Vice City, inspired by Florida and Miami.

## Dual Protagonist System

For the first time, the series introduces a female protagonist, Lucia, alongside a male protagonist, Jason, forming a dual-protagonist system.

## Open World

Rockstar promises the largest and most immersive open world in the series' history, featuring dynamic weather systems, realistic NPC behavior, and other innovations.
`,
    category: 'news',
    tags: ['Release Date', 'Trailer', 'Rockstar'],
    coverImage: '/images/articles/gta6-release.jpg',
    date: '2026-01-15',
    author: 'GTA6 Guide Team',
    readTime: 5,
    featured: true,
  },
  {
    slug: 'gta6-pre-order-guide',
    title: 'GTA 6 Pre-Order Guide: Edition Differences & Bonuses Explained',
    excerpt: 'A detailed breakdown of GTA 6 Standard, Deluxe, and Ultimate Editions, including platform pricing and pre-order bonus details.',
    content: `# GTA 6 Pre-Order Guide: Edition Differences & Bonuses Explained

Not sure which edition of GTA 6 to buy? Worried about missing out on exclusive content? This guide compares all three editions and their bonuses so you can make the right choice.

## Unlock Times

- **Standard/Deluxe Edition**: Official release date in Fall 2026
- **Ultimate Edition**: 4-day early access

## Platform Pricing Comparison

| Platform | Standard | Deluxe | Ultimate |
|----------|----------|--------|----------|
| PS5 | $69.99 | $89.99 | $109.99 |
| Xbox Series X/S | $69.99 | $89.99 | $109.99 |
| PC (Steam/Epic) | $69.99 | $89.99 | $109.99 |

## Edition Breakdown

### Standard Edition
- ✅ Full game
- ✅ Pre-order exclusive vehicle livery
- ✅ Online mode welcome pack

### Deluxe Edition
- ✅ Full game
- ✅ Pre-order exclusive vehicle livery
- ✅ Online mode welcome pack
- ✅ Online mode $2,000,000 in-game cash
- ✅ Exclusive vehicle pass

### Ultimate Edition
- ✅ Full game
- ✅ Pre-order exclusive vehicle livery
- ✅ Online mode welcome pack
- ✅ Online mode $5,000,000 in-game cash
- ✅ Exclusive vehicle pass
- ✅ 4-day early access
- ✅ VIP membership
- ✅ Vice City Elite car pack
- ✅ Major expansion DLC 1 & DLC 2 (post-release)

## Bonus Details

### Pre-Order Bonus
Pre-order any edition of GTA 6 now to unlock the exclusive vehicle livery — Vice City Classic. Redeemable at the in-game vehicle workshop after launch.

### Online Mode Welcome Pack
- 5 pre-tuned exclusive vehicles
- 1 vehicle voucher (redeemable for any car in the showroom)
- 3 weapon vouchers (redeemable for any standard or rare weapon)

### VIP Membership (Lifetime)
- Double in-game currency rewards for online missions
- 3 VIP-exclusive vehicles
- Extra weekly lucky spin opportunity
- Exclusive cosmetic items (crown badge, exclusive emotes & phone ringtone)
- Free Vice City beachfront luxury apartment

### Vehicle Pass
- 30 new vehicles
- 1 vehicle unlocked weekly from launch date
- All can be added to your garage for free

### Vice City Elite Car Pack (Ultimate Edition Exclusive)
- 8 legendary vehicles
- Unlocked at launch
- All can be added to your garage for free

### Major Expansion DLC 1 & DLC 2 (Ultimate Edition Exclusive, Post-Release)
- New exploration areas
- Massive collection of new vehicles and weapons
- All-new story missions
`,
    category: 'guide',
    tags: ['Pre-Order', 'Purchase', 'Editions'],
    coverImage: '/images/articles/gta6-preorder.jpg',
    date: '2026-02-20',
    author: 'GTA6 Guide Team',
    readTime: 8,
    featured: true,
  },
  {
    slug: 'gta6-online-modes-revealed',
    title: 'GTA 6 Online Modes Revealed! Six Gameplay Modes to Make Crime More Exciting',
    excerpt: 'Rockstar reveals six core gameplay modes for GTA 6\'s online component, "Vice City Online", including Classic Heists and Street Racing.',
    content: `# GTA 6 Online Modes Revealed! Six Gameplay Modes to Make Crime More Exciting

According to international media reports, Rockstar Games has recently unveiled the online mode for GTA 6, named "Vice City Online" (VCO).

The studio's social media posts indicate that Vice City Online will become "the premier platform for GTA 6's online gameplay." It will retain classic modes while adding entirely new gameplay types.

## Six Core Gameplay Modes

### 1. Classic Heists
The series' most popular heist mode returns fully upgraded, supporting 4-8 player co-op. A new planning system makes heist preparation more realistic, with finer role division and more diverse escape routes.

### 2. Street Racing
Engage in illegal street racing through Vice City. From oceanfront boulevards to downtown alleys, various tracks await your conquest. Supports custom vehicle modifications and betting systems.

### 3. Turf Wars
An all-new gang territory control mode. Work with your crew to capture and control various areas of Vice City, fighting for resources and influence.

### 4. Underground Economy
Build your criminal empire — from smuggling to money laundering, arms dealing to real estate development. Compete with other players in business and establish your underground supply chain.

### 5. Bounty Hunter
A new asymmetric versus mode. One side plays as fugitives, hiding in Vice City; the other side plays as bounty hunters, tracking targets and bringing them to justice.

### 6. Free Roam
The classic free roam mode returns, bigger and freer than ever. Freely interact, cooperate, or compete with other players in the complete Vice City open world.

## Release Information

GTA 6 Online will launch simultaneously with the base game. The official release date is Fall 2026. Ultimate Edition owners can access it 4 days early.
`,
    category: 'news',
    tags: ['Online Mode', 'GTA Online', 'Multiplayer', 'Gameplay'],
    coverImage: '/images/articles/gta6-online.jpg',
    date: '2026-05-02',
    author: 'GTA6 Guide Team',
    readTime: 10,
    featured: true,
  },
  {
    slug: 'gta6-launch-trailer-revealed',
    title: 'GTA 6 Launch Trailer Revealed! Confirmed for PS5 & Xbox, PC Coming Later',
    excerpt: 'Rockstar has officially released the GTA 6 launch trailer, confirming a Fall 2026 release on PS5 and Xbox Series X/S.',
    content: `# GTA 6 Launch Trailer Revealed! Confirmed for PS5 & Xbox, PC Coming Later

Rockstar Games has officially released the launch trailer for GTA 6. The game is set for a Fall 2026 release, launching on PS5 and Xbox Series X/S first, with the PC version coming later.

## Trailer Highlights

The launch trailer showcased extensive gameplay footage. Here are the most noteworthy aspects:

### Stunning Views of Vice City
The trailer reveals the reimagined Vice City, from the iconic white sand beaches to the bustling downtown streets — every frame is breathtaking. Rockstar claims this will feature the densest city map in the series' history.

### Dual Protagonists Debut
Lucia and Jason make their first appearance in gameplay footage. The duo's seamless cooperation in heist sequences, high-speed chases, and gunfights will get your adrenaline pumping.

### Massive New Vehicle Lineup
The trailer featured numerous new vehicles, including supercars, off-road vehicles, motorcycles, and speedboats. Reportedly, the game will feature over 400 drivable vehicles.

### Homage to Classics
The trailer hides multiple easter eggs paying tribute to iconic scenes and characters from previous GTA games, sparking heated discussions in the community.

## Game Features

- **Largest Open World in the Series**: Complete map of Vice City and Leonida, reportedly over 2x the size of GTA 5
- **Immersive Dual Protagonist Story**: Lucia and Jason's crime saga, where your choices affect the narrative
- **Revolutionary Online Mode**: All-new Vice City Online with six core gameplay modes
- **Stunning Visuals**: Fully leveraging next-gen console power, targeting 4K/60fps

## Platforms & Release Info

| Platform | Details |
|----------|---------|
| PS5 | Fall 2026 launch |
| Xbox Series X/S | Fall 2026 launch |
| PC | Coming later (estimated 2027) |
`,
    category: 'news',
    tags: ['Launch Trailer', 'Trailer', 'PS5', 'Xbox'],
    coverImage: '/images/articles/gta6-trailer.jpg',
    date: '2026-05-08',
    author: 'GTA6 Guide Team',
    readTime: 7,
    featured: true,
  },
  {
    slug: 'gta6-preload-file-size',
    title: 'GTA 6 Pre-Load Now Available! PC Version Requires 180GB, SSD Mandatory',
    excerpt: 'GTA 6 pre-load is now available on consoles. The PC version requires approximately 180GB, with SSD being a hard requirement.',
    content: `# GTA 6 Pre-Load Now Available! PC Version Requires 180GB, SSD Mandatory

GTA 6 pre-load is now available on PS5 and Xbox Series X/S, but its massive install size has quickly become a hot topic among players.

## Storage Requirements by Platform

| Platform | Install Size |
|----------|-------------|
| PS5 | ~150GB |
| Xbox Series X | ~155GB |
| Xbox Series S | ~140GB |
| PC | ~180GB (SSD required) |

## PC SSD Requirement

Rockstar officially requires the PC version to be installed on a solid-state drive (SSD). Given the game's massive open world and fast loading demands, traditional hard drives can no longer meet performance requirements.

Some players in the community noted: "I think when building a PC now, anything under 2TB SSD is obsolete." Others responded that even with a 2TB NVMe SSD, it feels barely adequate.

## PC System Requirements

### Minimum Requirements
| Component | Requirement |
|-----------|-------------|
| OS | Windows 10 22H2 or higher |
| Processor | Intel i5-11600K or AMD Ryzen 5 5600X |
| Memory | 16 GB RAM |
| Graphics | NVIDIA RTX 3060 or AMD RX 6600 XT |
| Storage | 180 GB SSD |

### Recommended Requirements
| Component | Requirement |
|-----------|-------------|
| OS | Windows 11 64-bit |
| Processor | Intel i7-12700K or AMD Ryzen 7 7800X3D |
| Memory | 32 GB RAM |
| Graphics | NVIDIA RTX 4070 or AMD RX 7800 XT |
| Storage | 180 GB NVMe SSD |

### 4K Ultra Requirements
| Component | Requirement |
|-----------|-------------|
| Processor | Intel i9-14900K or AMD Ryzen 9 7950X |
| Memory | 32 GB RAM |
| Graphics | NVIDIA RTX 4090 or AMD RX 7900 XTX |
| Storage | 180 GB NVMe SSD |
`,
    category: 'news',
    tags: ['Pre-Load', 'File Size', 'PC Requirements', 'SSD'],
    coverImage: '/images/articles/gta6-preload.jpg',
    date: '2026-05-10',
    author: 'GTA6 Guide Team',
    readTime: 8,
  },
  {
    slug: 'gta6-vice-city-map-overview',
    title: 'Vice City Map Overview: Districts, Landmarks & Hidden Locations',
    excerpt: 'An in-depth analysis of GTA 6\'s Vice City map, including district features, important landmarks, and hidden locations.',
    content: `# Vice City Map Overview

## Map Overview

Vice City is the main setting of GTA 6, with a map size reportedly over 2x that of GTA 5.

## Major Districts

### 1. Vice Beach
The iconic white sand beaches and Art Deco architecture.

### 2. Little Havana
A Cuban-American community full of Latin flair.

### 3. Starfish Island
The wealthy district, lined with luxury villas.

### 4. Port Gellhorn
Cargo docks and industrial zones.

### 5. The Everglades
Swamplands outside the city, full of danger and opportunity.

## Hidden Locations

The game features numerous hidden locations waiting to be discovered, including underground passages, secret rooms, and easter egg locations.
`,
    category: 'guide',
    tags: ['Map', 'Vice City', 'Exploration'],
    coverImage: '/images/articles/gta6-map.jpg',
    date: '2026-03-10',
    author: 'GTA6 Guide Team',
    readTime: 12,
  },
  {
    slug: 'gta6-characters-lucia-jason',
    title: 'GTA 6 Protagonists: The Story of Lucia & Jason',
    excerpt: 'Get to know GTA 6\'s dual protagonists — Lucia and Jason — their backgrounds, personalities, and abilities.',
    content: `# GTA 6 Protagonists: The Story of Lucia & Jason

## Lucia

The first female protagonist in the GTA series, a Latin American woman. Reports suggest she has a complex past deeply intertwined with the criminal underworld.

### Background
- From a low-income community in Leonida
- Possesses exceptional driving and shooting skills
- Her relationship with Jason is the core driving force of the story

## Jason

### Background
- A native-born resident of Leonida
- Has his own criminal network
- Forms complementary skill combinations with Lucia

## Dual Protagonist System

Players can switch between the two protagonists, each with unique ability trees and storylines.
`,
    category: 'guide',
    tags: ['Characters', 'Lucia', 'Jason', 'Protagonists'],
    coverImage: '/images/articles/gta6-characters.jpg',
    date: '2026-03-25',
    author: 'GTA6 Guide Team',
    readTime: 10,
  },
  {
    slug: 'gta6-vehicles-list',
    title: 'GTA 6 Vehicle Catalog: Supercars, Motorcycles, Boats & Aircraft',
    excerpt: 'A comprehensive list of all confirmed vehicles in GTA 6, including supercars, motorcycles, boats, and aircraft.',
    content: `# GTA 6 Vehicle Catalog

## Supercars
- Pegassi Zorrusso
- Grotti Itali RSX
- Overflod Autarch

## Sports Cars
- Annis Euros
- Dinka Jester RR
- Karin Calico GTF

## Motorcycles
- Western Powersurge
- Pegassi Toreador
- Shitzu Hakuchou

## Boats
- Shitzu Sunray
- Pegassi Speeder
- Nagasaki Dinghy

## Aircraft
- Various helicopters and small planes
`,
    category: 'guide',
    tags: ['Vehicles', 'Supercars', 'Motorcycles'],
    coverImage: '/images/articles/gta6-vehicles.jpg',
    date: '2026-04-05',
    author: 'GTA6 Guide Team',
    readTime: 15,
  },
  {
    slug: 'gta6-gone-gold-confirmed',
    title: 'GTA 6 Has Gone Gold! Pre-Load Coming Soon',
    excerpt: 'Rockstar officially confirms GTA 6 development is complete and the game has gone gold. Console pre-loading begins soon.',
    content: `# GTA 6 Has Gone Gold! Pre-Load Coming Soon

Rockstar Games has officially confirmed that GTA 6 development is complete and the game has gone gold, meaning it has entered the final production phase.

## What Does "Gone Gold" Mean?

In the gaming industry, "gone gold" means the final version of the game has been determined, and the master disc has been sent to factories for mass production. This is an important development milestone, signaling the game is ready for release.

## Pre-Load Information

With the gold announcement, console pre-load dates have also been confirmed:

- **PS5 Pre-Load**: Opens 7 days before launch
- **Xbox Series X/S Pre-Load**: Opens 7 days before launch
- **PC Pre-Load**: TBA

## Accessibility Features

Rockstar also announced a range of accessibility features to enhance the gaming experience for all players:

- **High Contrast Mode**: Helps visually impaired players better identify game elements
- **Aim Assist System**: Multi-level aiming assistance options
- **Subtitle Customization**: Full control over font size, color, background, and more
- **Control Customization**: Complete button mapping functionality

## Release Information

| Item | Details |
|------|---------|
| Release Date | Fall 2026 |
| Launch Platforms | PS5 / Xbox Series X/S |
| PC Version | Coming later |
`,
    category: 'news',
    tags: ['Gone Gold', 'Pre-Load', 'Release', 'Rockstar'],
    coverImage: '/images/articles/gta6-gold.jpg',
    date: '2026-05-05',
    author: 'GTA6 Guide Team',
    readTime: 6,
  },
  {
    slug: 'gta6-ps5-confirmed',
    title: 'GTA 6 Confirmed for PS5! Launch Platforms & PC Release Timeline',
    excerpt: 'Rockstar officially confirms GTA 6 for PS5 and Xbox Series X/S, with the PC version arriving after the console launch.',
    content: `# GTA 6 Confirmed for PS5! Launch Platforms & PC Release Timeline

GTA 6 is confirmed for simultaneous release on PS5 and Xbox Series X/S, debunking earlier rumors of an Xbox exclusive. The PC version will arrive after the console launch.

## Platform Release Schedule

| Platform | Release | Notes |
|----------|---------|-------|
| PS5 | Fall 2026 | Simultaneous launch |
| Xbox Series X/S | Fall 2026 | Simultaneous launch |
| PC | 2027 (estimated) | Coming later |

## GTA 5 PS5 Version Performance

It's worth noting that the PS5 enhanced version of GTA 5 performed exceptionally well on consoles, with cumulative sales exceeding 5.8 million copies. This demonstrates the massive enthusiasm PlayStation players have for the GTA series, explaining why Rockstar chose PS5 as one of the launch platforms.

## Xbox Game Pass

According to rumors, GTA 6 may join Xbox Game Pass sometime after launch, but Rockstar and Microsoft have not made any official confirmation.

## Console Performance Specs

GTA 6 will fully leverage next-gen console power:

- **PS5**: Supports 4K resolution/performance mode switching, utilizes DualSense haptic feedback
- **Xbox Series X**: 4K/60fps target, Quick Resume support
- **Xbox Series S**: 1080p/60fps, some visual effects simplified
`,
    category: 'news',
    tags: ['PS5', 'Xbox', 'Platforms', 'Release'],
    coverImage: '/images/articles/gta6-ps5.jpg',
    date: '2026-04-20',
    author: 'GTA6 Guide Team',
    readTime: 7,
  },
  {
    slug: 'gta6-launch-trailer-vehicles-list',
    title: 'GTA 6 Launch Trailer Vehicle Breakdown: Classic Homages & All-New Models Analyzed',
    excerpt: 'An in-depth analysis of every vehicle spotted in the GTA 6 launch trailer, from classic sports cars to off-road SUVs, with homage easter eggs revealed.',
    content: `# GTA 6 Launch Trailer Vehicle Breakdown: Classic Homages & All-New Models Analyzed

The GTA 6 launch trailer is packed with information, and the most exciting part for car enthusiasts is the fleet of vehicles that flash by in an instant. This article breaks down the trailer frame by frame, listing every confirmed and suspected vehicle.

![GTA 6 Launch Trailer Cover](/images/articles/fh6-launch-trailer.jpg)

[video:bilibili:BV1WUd3ByEmu]

## Homage Easter Eggs

The trailer hides two carefully crafted homage easter eggs that sparked widespread discussion in the player community:

### Tribute to Ken Block

At approximately 0:48 in the trailer, a vehicle performs a precision drift on the edge of a coastal highway — interpreted as a recreation of the iconic move from the late rally driver **Ken Block's** 2016 "Gymkhana Nine" video. Ken Block had deep ties with the Forza series, maintaining a close partnership since Forza Horizon 3.

### Tribute to Initial D

At approximately 0:58 in the trailer, two classic JDM vehicles appear side by side — recreating the iconic early rivalry between **Takumi Fujiwara and Keisuke Takahashi**, thrilling countless Initial D fans.

---

## Confirmed Vehicles

| Make & Model | Timestamp | Notes |
|-------------|-----------|-------|
| **Benefactor - Schafter V12** | ~12s / 46s / 82s | Rear styling, taillights and body proportions closely match Schafter, classic German sports sedan |
| **Ubermacht - Oracle XS** | ~14s | Gray coupe on the left at the gas station, Oracle XS side profile |
| **Grotti - Cheetah** | ~14s / 42s | Red mid-engine supercar, side intakes and proportions match Cheetah |
| **Karin - Futo GTX** | ~18s-24s / 46s / 70s | Yellow Futo is one of the most prominent shots in the trailer, classic JDM drift car |
| **Karin - Rebel** | ~24s / 30s | Blue boxy off-roader, front end and stance point to Rebel |
| **Dinka - Blista Kanjo** | ~24s | White wide-body hatchback, side profile similar to Blista Kanjo |
| **Canis - Freecrawler** | ~26s / 30s | Tube-frame off-roader appearing in snow off-road sequence |
| **Dinka - Jester RR** | ~34s | Silver four-door sports sedan style drift car |
| **Maxwell - Asbo** | ~38s | Green hot hatch, front end very distinct |
| **Benefactor - Pounder Custom** | ~58s | Green delivery box truck |
| **Annis - Elegy RH8** | ~46s / 76s / 82s | Black/silver Elegy in mountain and tunnel chase scenes, classic GTA JDM |
| **Karin - Sultan RS** | ~76s | Blue rally-style sedan, brief appearance |
| **Grotti - Turismo Omologata** | ~92s pre-order screen | Clearly shown in the pre-order bonus card at the end |

---

## Possible / Unconfirmed Vehicles

| Make & Model | Timestamp | Notes |
|-------------|-----------|-------|
| **Pegassi - Zorrusso / Tempesta class** | ~42s / 70s | Silver low supercar, high angle makes it hard to lock down exact model |
| **Pfister - Comet SR / 811 class** | ~46s / 76s | White wide-body sports car shots are fragmented, listed as unconfirmed |
| **Karin - Calico GTF / Futo GTX class** | ~70s | White car only shown in side-profile high-speed motion, low confidence |

---

## Trailer Screenshots

![GTA 6 Gameplay Screenshot - Vice City Views](/images/articles/fh6-screenshot-spring.jpg)

## Known Vehicle Features

- **Largest Vehicle Roster in the Series**: GTA 6 reportedly features over 400 drivable vehicles
- **JDM Classics Return**: Numerous iconic Japanese cars to satisfy drift enthusiasts
- **New Vehicle Categories**: Added "Aftermarket Cars" and special edition vehicles
- **Cover Car**: An all-new supercar serves as GTA 6's cover vehicle
- **Pre-Order Bonus**: Pre-order to get an exclusive Grotti Turismo Omologato special tuned edition

## Release Information

| Item | Details |
|------|---------|
| Release Date | Fall 2026 |
| Launch Platforms | PS5 / Xbox Series X/S |
| PC Version | Coming later |
| Pre-Order Bonus | Exclusive vehicle livery |
`,
    category: 'guide',
    tags: ['Vehicles', 'Trailer', 'Cars', 'JDM', 'Drift'],
    coverImage: '/images/articles/fh6-launch-trailer.jpg',
    date: '2026-05-09',
    author: 'GTA6 Guide Team',
    readTime: 12,
    featured: true,
  },
];

export function getArticlesByCategory(category: string): Article[] {
  if (category === 'all') return sampleArticles;
  return sampleArticles.filter((a) => a.category === category);
}

export function getArticleBySlug(slug: string): Article | undefined {
  return sampleArticles.find((a) => a.slug === slug);
}

export function getFeaturedArticles(): Article[] {
  return sampleArticles.filter((a) => a.featured);
}

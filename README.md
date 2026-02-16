# ScaleLink Technologies Website

Premium single-page website for **ScaleLink Technologies** — all-in-one tech solutions for salons.

Built with **Next.js 15** (App Router), vanilla CSS, scroll animations, and a client-side admin panel.

---

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

Visit **http://localhost:3000** to see the website.

---

## Admin Panel

The admin panel lets you manage all website content (services, portfolio, testimonials, company info, pillars) without touching any code.

### How to Access

1. Navigate to **http://localhost:3000/admin** (or `https://yourdomain.com/admin` in production)
2. Enter password: `scalelink2026`
3. You'll see the admin dashboard with sidebar navigation

### What You Can Edit

| Tab | What It Controls |
|-----|-----------------|
| **Company Info** | Tagline, hero text, about text, phone, location, social links, WhatsApp |
| **Services** | Add / edit / remove services (icon, title, description) |
| **Portfolio** | Add / edit / remove portfolio projects (title, category, description) |
| **Testimonials** | Add / edit / remove client testimonials |
| **Pillars** | Edit the 3 core value proposition cards |

### How It Works

- All changes are saved to the **browser's localStorage**
- Changes appear immediately on the main website
- Click **"Reset All"** in the sidebar to restore default content
- Data persists across page refreshes but is **browser-specific** (not shared across devices)

> **Note:** Since localStorage is browser-specific, changes made on one device won't appear on another. For multi-device content management, consider migrating to Firebase Firestore in the future.

---

## Deploying to Firebase

### Prerequisites

1. Install Firebase CLI globally:
   ```bash
   npm install -g firebase-tools
   ```

2. Log in to Firebase:
   ```bash
   firebase login
   ```

3. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com):
   - Click **"Add project"**
   - Name it `scalelink` (this gives you `scalelink.web.app`)
   - Disable Google Analytics (optional)
   - Click **"Create project"**

4. Enable Hosting in your Firebase project:
   - In the Firebase console, go to **Build → Hosting**
   - Click **"Get started"** and follow the prompts

### Deploy Steps

```bash
# 1. Build the static site
npm run build

# 2. Deploy to Firebase
firebase deploy
```

Your site will be live at: **https://scalelink.web.app**

### Switching to a Custom Domain Later

1. Go to Firebase Console → Hosting → **Custom domains**
2. Click **"Add custom domain"**
3. Enter your domain (e.g., `scalelinktechnologies.com`)
4. Follow the DNS verification steps Firebase provides
5. Both your custom domain and `scalelink.web.app` will work

---

## Project Structure

```
ScaleLink/
├── app/
│   ├── components/       # All UI sections (Navbar, Hero, About, etc.)
│   ├── contexts/         # ContentContext (state management)
│   ├── hooks/            # useScrollAnimation, useParallax
│   ├── admin/            # Admin panel (page.js + admin.module.css)
│   ├── globals.css       # Design system & animations
│   ├── layout.js         # Root layout with SEO metadata
│   └── page.js           # Main page assembling all sections
├── public/
│   └── LOGO.png          # Company logo
├── firebase.json         # Firebase Hosting config
├── .firebaserc           # Firebase project alias
└── next.config.mjs       # Next.js config (static export)
```

---

## Tech Stack

- **Next.js 15** — React framework with App Router
- **Vanilla CSS** — Custom design system with CSS modules
- **Intersection Observer** — Scroll-triggered animations
- **localStorage** — Client-side content persistence
- **Firebase Hosting** — Static site deployment

---

## Color Theme

| Color | Hex | Usage |
|-------|-----|-------|
| White | `#FFFFFF` | Primary background |
| Off-white | `#F7F8FA` | Alternate section bg |
| Navy | `#0F1B2D` | Headings, navbar, footer |
| Navy Light | `#1A2E4A` | Card hovers, accents |
| Gold | `#B8862D` | CTAs, highlights |
| Gold Light | `#D4A94A` | Hover states, gradients |

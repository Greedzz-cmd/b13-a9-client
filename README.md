# docAppoint — Doctor Appointment Manager

**docAppoint** is a full-stack doctor appointment booking platform where patients can browse verified specialists, view detailed doctor profiles, and book appointments securely. Built with Next.js 16, Better Auth, HeroUI, and MongoDB.

🌐 **Live Site:** [https://your-deployed-url.vercel.app](https://your-deployed-url.vercel.app)

---

## Features

- 🔍 **Browse & Search Doctors** — Explore all available doctors on the All Appointments page with real-time search by doctor name. Each card displays specialty, fee, hospital, location, experience, and next available slot.
- 📅 **Book Appointments** — View full doctor profiles and book appointments through a clean form that saves patient details, gender, phone number, preferred date, and time slot directly to MongoDB.
- 🔐 **Secure Authentication** — Email/password login and registration powered by Better Auth with JWT sessions. Includes Google OAuth social login, password validation (uppercase, lowercase, min 6 chars), and protected route redirects.
- 📋 **Personal Dashboard** — A private dashboard where logged-in users can view all their bookings, update appointment details via a modal form, or delete bookings instantly — all without page reloads.
- 👤 **Profile Management** — Update your display name and profile photo from the dashboard. Changes reflect instantly across the navbar and dashboard without refreshing.
- ⭐ **Top Rated Doctors** — The home page highlights the 3 highest-rated specialists dynamically, ranked by real patient ratings.
- 🗺️ **SEO & Metadata** — Every page includes meaningful metadata (title + description) including dynamic metadata on doctor detail pages for better discoverability.
- 📱 **Fully Responsive** — Optimized for mobile, tablet, and desktop with a consistent layout, loading skeletons, and a custom 404 page for invalid routes.

---

## Tech Stack

| Layer          | Technology                     |
| -------------- | ------------------------------ |
| Framework      | Next.js 16 (App Router)        |
| UI Library     | HeroUI + Tailwind CSS 4        |
| Authentication | Better Auth (JWT/session)      |
| Database       | MongoDB (via native driver)    |
| Animations     | Swiper.js (hero banner slider) |
| Deployment     | Vercel                         |

---

## Pages

| Route                | Description                                                        |
| -------------------- | ------------------------------------------------------------------ |
| `/`                  | Home — hero slider, top rated doctors, why choose us, how it works |
| `/all-appointments`  | All doctors with search functionality                              |
| `/doctors/[id]`      | Doctor detail page with booking button                             |
| `/doctors/[id]/book` | Appointment booking form                                           |
| `/login`             | Email + Google login                                               |
| `/register`          | Registration with password validation                              |
| `/dashboard`         | Private — bookings management + profile update                     |

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Environment Variables

Create a `.env` file in the root with the following:

```env
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-secret-key
MONGODB_URI=your-mongodb-connection-string
BACKEND_SERVER=http://localhost:4000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

> Google social login activates automatically when both `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET` are provided.

---

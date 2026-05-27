# docAppoint

Doctor appointment manager built with Next.js 16, Better Auth, HeroUI, and MongoDB.

Live Site: Add your deployed client URL here before submission.

## Features

- Browse all doctors with responsive cards, specialty details, fees, and availability.
- Open detailed doctor pages and book appointments through a MongoDB-backed booking flow.
- Search doctors by name on the All Appointments page.
- Manage personal bookings from a protected dashboard with instant update and delete actions.
- Update the logged-in user profile from the dashboard without reloading the page.
- Use email/password authentication with validation, toast feedback, and protected route redirects.
- Includes custom loading states, a custom 404 page, and page-level metadata across key routes.

## Tech Stack

- Next.js 16 App Router
- React 19
- Better Auth
- MongoDB
- HeroUI
- Tailwind CSS 4

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Environment Variables

Create an `.env` file with the following keys:

```env
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-secret
MONGODB_URI=your-mongodb-uri
BACKEND_SERVER=http://localhost:4000
GOOGLE_CLIENT_ID=optional-google-client-id
GOOGLE_CLIENT_SECRET=optional-google-client-secret
```

Google social login is enabled automatically when both Google credentials are provided.

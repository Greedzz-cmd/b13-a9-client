# docAppoint - Doctor Appointment Manager

docAppoint is a doctor appointment booking platform where patients can browse doctors, view specialist details, book appointments, and manage their own bookings through secure authentication.

Live site: `https://b13-a9-client-s6cj.vercel.app/`

## Features

- Browse all available doctors with specialty, hospital, location, fee, experience, rating, and availability details.
- Search doctors by name from the All Appointments page.
- View dynamic doctor details pages with protected access for logged-in users.
- Book appointments with patient name, gender, phone, date, time, and notes.
- Manage personal bookings from a private dashboard with update and delete actions.
- Update profile name and photo from the dashboard.
- Email/password authentication with Better Auth and JWT/session support.
- Google social login support.
- Login-required toast when users try to access protected routes without signing in.
- Responsive layout with custom loading states, metadata, and a custom not-found page.

## Tech Stack

| Area           | Technology             |
| -------------- | ---------------------- |
| Framework      | Next.js 16 App Router  |
| UI             | HeroUI, Tailwind CSS 4 |
| Authentication | Better Auth            |
| Database       | MongoDB                |
| Slider         | Swiper                 |
| Deployment     | Vercel                 |

## Main Routes

| Route                | Description                                                       |
| -------------------- | ----------------------------------------------------------------- |
| `/`                  | Home page with hero banner, top rated doctors, and extra sections |
| `/all-appointments`  | Doctor listing page with search                                   |
| `/doctors/[id]`      | Protected doctor details page                                     |
| `/doctors/[id]/book` | Protected appointment booking page                                |
| `/login`             | Login page with email/password and Google auth                    |
| `/register`          | Registration page with password validation                        |
| `/dashboard`         | Protected user dashboard for bookings and profile management      |

## Environment Variables

Create a `.env` file in the project root.

```env
BETTER_AUTH_URL=http://localhost:3000
BETTER_AUTH_SECRET=your-better-auth-secret
MONGODB_URI=your-mongodb-connection-string
NEXT_PUBLIC_BACKEND_SERVER=http://localhost:4000
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

For production, add the same variables in the Vercel project settings. Set `BETTER_AUTH_URL` to the deployed client URL and `NEXT_PUBLIC_BACKEND_SERVER` to the deployed server URL.

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` in your browser.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Authentication Flow

- Public users can visit the home page, login page, register page, and all appointments page.
- Doctor details, booking, and dashboard routes are protected.
- If a logged-out user tries to open a protected route, the app redirects to login with the original destination saved.
- After successful login, the user returns to the requested protected page.

## Booking Flow

1. User browses doctors from the home page or All Appointments page.
2. Logged-in user opens a doctor details page.
3. User clicks Book Appointment.
4. User fills out the booking form and submits it.
5. Appointment data is saved and a success toast is shown.
6. User can manage the booking from the dashboard.

## Deployment Notes

- Deploy the client to Vercel.
- Deploy the backend API separately and set its URL in `NEXT_PUBLIC_BACKEND_SERVER`.
- Make sure MongoDB access is allowed for the deployed environment.
- Configure Google OAuth redirect URLs for the production domain.

## Assignment Checklist

- Meaningful README with website name and live site URL.
- Minimum five website feature bullet points.
- Protected private routes.
- Toast messages for success and error states.
- No default browser alerts.
- Responsive design for mobile, tablet, and desktop.
- Custom 404 page.
- Metadata for important pages.

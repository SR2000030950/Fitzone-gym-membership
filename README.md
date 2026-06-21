# FitZone — Gym Membership Management System

A full-stack web application for managing gym operations including members, membership plans, attendance, workouts, sessions, payments, and analytics.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| UI | Tailwind CSS + shadcn/ui (Radix UI) |
| Charts | Recharts |
| Database | MongoDB (Mongoose ODM) |
| Auth | bcryptjs (password hashing) |
| Forms | React Hook Form + Zod |

## Features

- **Member Management** — Create, view, edit, and delete gym members with full profile info (personal details, emergency contact, assigned plan)
- **Membership Plans** — Define plans with name, description, cost, and duration
- **Attendance Tracking** — Log check-in and check-out times per member per visit
- **Workout & Sessions** — Track workouts (muscle group, difficulty, calories) and link them to attendance sessions
- **Payments** — Record payments by member and plan (Card, Cash, or Other)
- **Analytics Dashboard** — Visual breakdowns of member age distribution, revenue by plan, and top-10 attendance frequency
- **Authentication** — User registration and login with hashed passwords
- **Data Loader** — Seed the database with 30 sample members, 5 plans, workouts, attendance records, sessions, and payments in one click

## Project Structure

```
app/
  page.tsx              # Landing page
  about/                # About page
  contact/              # Contact page
  login/                # Login
  register/             # Register
  dashboard/            # Analytics dashboard (protected)
  members/              # Member list, create, detail, edit
  data-loader/          # Seed data UI
  api/
    auth/login          # POST — login
    auth/register       # POST — register
    members/            # GET, POST
    members/[id]/       # GET, PUT, DELETE
    plans/              # GET, POST
    plans/[id]/         # GET, PUT, DELETE
    analytics/          # GET — age distribution, payments by plan, attendance frequency
    load-data/          # POST — seed sample data

models/
  Member.js             # member_id, plan_id, name, email, phone, dob, gender, address, join_date, emergency_contact
  Plan.js               # plan_id, plan_name, description, cost, duration_days
  Attendance.js         # attendance_id, member_id, date, check_in, check_out
  Workout.js            # workout_id, workout_name, muscle_concentrated, calories_burned_avg, difficulty
  Session.js            # session_id, attendance_id, workout_id, duration
  Payment.js            # payment_id, member_id, plan_id, amount, payment_method, transaction_id
  User.js               # name, email, password (hashed), role

lib/
  mongodb.js            # Cached Mongoose connection
  data-loader.js        # Sample data and seed functions
```

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB (local instance or MongoDB Atlas)

### Installation

```bash
git clone https://github.com/SR2000030950/Fitzone-gym-membership.git
cd Fitzone-gym-membership
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
MONGODB_URI=mongodb://localhost:27017/fitzone
```

For MongoDB Atlas replace the value with your connection string.

### Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Seed Sample Data

1. Register an account at `/register`
2. Navigate to `/data-loader`
3. Click **Load Data** to populate the database with:
   - 5 membership plans
   - 30 members
   - 5 workouts
   - 66 attendance records
   - 20 sessions
   - 5 payment records

## Analytics Dashboard

The dashboard at `/dashboard` (requires login) displays three charts:

- **Age Distribution** — Histogram of members grouped by age bracket (Under 18, 18–24, 25–34, 35–44, 45–54, 55–64, 65+)
- **Payments & Plans** — Pie chart of total revenue broken down by membership plan
- **Attendance Frequency** — Horizontal bar chart of the top 10 most frequent gym visitors

## Scripts

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

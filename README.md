# TryAgainLater

A competitive programming progress tracker that syncs and aggregates your solved problems across Codeforces and LeetCode.

## Features

- **Multi-platform sync** - Connect your Codeforces and LeetCode accounts to automatically sync your solved problems
- **Progress tracking** - View total problems solved, current streak, and longest streak
- **Topic-based organization** - Browse solved problems by difficulty and topics
- **Dashboard** - Centralized view of all your competitive programming activity

## Tech Stack

- **Frontend**: Next.js 16 (React 19), Tailwind CSS, Framer Motion
- **Auth**: NextAuth.js
- **Database**: PostgreSQL with Prisma ORM

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database

### Environment Variables

Set up the following environment variables:

```
DATABASE_URL=postgresql://user:password@localhost:5432/tryagainlater
NEXTAUTH_SECRET=your-secret-key
NEXTAUTH_URL=http://localhost:3000
```

### Setup

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma migrate dev

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Database Schema

The app tracks:
- **Platforms** - Codeforces, LeetCode
- **Questions** - Problems synced from connected platforms with difficulty and topic tags
- **Users** - Accounts linked to platform handles (usernames)
- **Solved questions** - User-question relationships with solve date

## Project Structure

```
app/
├── api/                    # API routes
│   ├── auth/              # NextAuth authentication
│   ├── codeforces/        # Codeforces sync endpoints
│   ├── leetcode/          # LeetCode sync endpoints
│   └── signup/            # User registration
├── dashboard/             # Protected dashboard pages
├── _components/           # Shared React components
└── page.tsx               # Landing page
```
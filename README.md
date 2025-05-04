E-Commerce Platform
====================

A modern, responsive full-stack e-commerce platform developed using React, Express, and PostgreSQL. This platform delivers a seamless online shopping experience optimized for both desktop and mobile devices.

Features
--------

- **Responsive Design: Optimized for mobile, tablet, and desktop views.
- **Product Catalog: Browse products by categories with search and filter options.
- **Product Details: View detailed product information, including image galleries.
- Shopping Cart: Add and manage products in a real-time updating cart.
- **User Authentication:** Secure user account creation and login system (currently in development).
- **Database Integration:** Persistent data storage using PostgreSQL and Drizzle ORM.

Tech Stack
----------

**Frontend:**
- React with Vite for fast development and optimized builds.
- Tailwind CSS for modern, responsive styling.
- React Context API for global state management.
- FontAwesome for UI icons.
- React Router for smooth page navigation.

**Backend:**
- Express.js for creating a RESTful API.
- PostgreSQL for data storage and management.
- Drizzle ORM for type-safe database queries.
- JSON Web Tokens (JWT) for secure authentication (in development).

Prerequisites
-------------

Before running this project, ensure you have:
- Node.js (version 16 or higher)
- npm or Yarn
- PostgreSQL database installed and running

Setup & Installation
--------------------

1. **Clone the Repository**
   ```
   git clone https://github.com/yourusername/e-commerce-platform.git
   cd e-commerce-platform
   ```

2. **Install Dependencies**
   ```
   npm install
   // or
   yarn install
   ```

3. **Configure Environment Variables**
   - Create a `.env` file in the root directory and add:
     ```
     DATABASE_URL=postgresql://username:password@localhost:5432/ecommerce
     PORT=5000
     NODE_ENV=development
     ```

4. **Set Up the Database**
   - Push the schema to your PostgreSQL database:
     ```
     npm run db:push
     ```

5. **Start the Development Server**
   ```
   npm run dev
   ```
   This will run both the frontend and backend servers.
   Visit: http://localhost:5000

Project Structure
-----------------

├── client/                  # React frontend
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── hooks/           # Custom React hooks
│   │   ├── lib/             # API clients and utilities
│   │   ├── pages/           # Page components
│   │   ├── providers/       # React context providers
│   │   ├── App.tsx          # Root application component
│   │   └── main.tsx         # Entry point
│   └── index.html           # Base HTML template
├── server/                  # Express backend
│   ├── db.ts                # Database connection config
│   ├── index.ts             # Server entry point
│   ├── routes.ts            # API route definitions
│   ├── storage.ts           # Data storage logic
│   ├── seed.ts              # Database seeding script
│   └── vite.ts              # Dev configuration
├── shared/                  # Shared resources
│   └── schema.ts            # Drizzle ORM schema definitions
├── drizzle.config.ts        # Drizzle ORM config
├── tailwind.config.ts       # Tailwind CSS config
├── vite.config.ts           # Vite build config
├── tsconfig.json            # TypeScript settings
└── package.json             # Project scripts and dependencies

Running in Development Mode
----------------------------

To run the application locally:
1. Ensure your PostgreSQL database is running.
2. Verify your `.env` file is properly set.
3. Run:
   ```
   npm run dev
   ```
This will start:
- The Express API server.
- The Vite development server with hot module replacement.

Running in Production
----------------------

1. Build the application:
   ```
   npm run build
   ```

2. Start the production server:
   ```
   npm start
   ```

Database Management Commands
----------------------------

This project uses Drizzle ORM for managing database schema and migrations.

- Push schema changes:
  ```
  npm run db:push
  ```

- Generate migration files:
  ```
  npm run db:generate
  ```

- Apply pending migrations:
  ```
  npm run db:migrate
  ```

API Documentation
------------------

**Products**
- GET `/api/products` — Fetch all products
- GET `/api/products/:id` — Get a product by ID
- GET `/api/products/category/:category` — Fetch products by category
- GET `/api/products/search?q=query` — Search products by name or description
- POST `/api/products` — Add a new product *(authentication required)*
- PUT `/api/products/:id` — Update a product *(authentication required)*
- DELETE `/api/products/:id` — Delete a product *(authentication required)*

**Categories**
- GET `/api/categories` — Fetch all categories
- GET `/api/categories/:id` — Get category by ID
- POST `/api/categories` — Add a new category *(authentication required)*

**Cart**
- GET `/api/cart/:userId` — Get user’s cart items
- POST `/api/cart` — Add an item to the cart
- PUT `/api/cart/:id/quantity` — Update item quantity in cart
- DELETE `/api/cart/:id` — Remove an item from the cart
- DELETE `/api/cart/user/:userId` — Clear all cart items for a user

Deployment Options
-------------------

This application can be deployed to any Node.js-supported platform. Recommended options include:
- Heroku
- Vercel
- Netlify (frontend) + Railway (backend)
- AWS Elastic Beanstalk
- DigitalOcean App Platform

Make sure to properly configure environment variables on your chosen hosting platform.

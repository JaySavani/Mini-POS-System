# ✨ Mini POS System

A modern, fast, and feature-rich **Point of Sale (POS)** system built with **Next.js 16**, React 19, and Tailwind CSS 4. Optimized for performance and developer experience.

![Mini POS Banner](https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=1200&auto=format&fit=crop)

## 🚀 Key Features

- 📦 **Inventory Management**: Effortlessly add, edit, and search through your products in a clean, grid-based interface.
- 🛒 **Intuitive Cart System**: Real-time cart updates with support for quantity adjustments and easy removal.
- 🔐 **Role-based Authentication**: Secure access for both admins and general users with specialized permissions.
- 🌓 **Dynamic Theme System**: Fully integrated dark and light modes using `next-themes` and polished Radix UI primitives.
- 📱 **Mobile-First Design**: A responsive layout that works perfectly on tablets, smartphones, and desktop displays.
- 📊 **Dashboard & Analytics**: Ready-to-use Recharts integration for visualizing sales performance and stock levels.

## 🛠️ Built With

### Core

- **Framework**: [Next.js (App Router)](https://nextjs.org/)
- **UI Library**: [shadcn/ui](https://ui.shadcn.com/) based on [Radix UI](https://www.radix-ui.com/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Forms**: [React Hook Form](https://react-hook-form.com/) & [Zod Validation](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

### Tooling

- **Formatting**: Prettier with `prettier-plugin-tailwindcss` and import sorting.
- **Linting**: ESLint with `eslint-config-next`.
- **Pre-commit**: Husky & lint-staged for code quality preservation.

## 📦 Getting Started

### Prerequisites

- [Bun](https://bun.sh/) or [Node.js](https://nodejs.org/) (Standard installation)

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/JaySavani/Mini-POS-System.git
   cd Mini-POS-System
   ```

2. **Install dependencies**:

   ```bash
   bun install
   # or
   npm install
   ```

3. **Run the development server**:
   ```bash
   bun dev
   # or
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the dashboard.

## 📁 Project Structure

```bash
src/
├── app/          # App router pages (Home, Auth, Cart)
├── components/   # Reusable UI, Product, and Layout components
├── hooks/        # Custom React hooks (Debounce, etc.)
├── stores/       # Zustand state (Auth, Cart, Product)
├── types/        # TypeScript interfaces and schemas
└── schemas/      # Zod validation schemas
```

# InviteKaro Card Builder

InviteKaro Card Builder is a modern, interactive, and premium web application designed to customize and design invitation cards dynamically. Built with a highly responsive React frontend and a robust Express backend, this project allows users to customize typography, positions, templates, and styles to create beautiful cards.

## 🚀 Features

- **Interactive Card Editor**: Dynamic preview with drag-and-drop or customizable text overlays.
- **Template Selector**: Choose from various beautiful design themes.
- **Rich Typography Tools**: Change fonts, sizes, colors, alignment, and other styling attributes.
- **Premium Aesthetics**: Styled with TailwindCSS and powered by Framer Motion for smooth transitions and interactive micro-animations.
- **Fast Build Times & Dev Server**: Powered by Vite.

## 🛠️ Tech Stack

- **Frontend**:
  - React (TypeScript)
  - Vite (Fast development & Bundling)
  - TailwindCSS & Shadcn UI (Styling & Theme tokens)
  - Framer Motion (Animations)
  - Lucide React (Icons)
  - React Query / Wouter (Data fetching & Routing)

- **Backend & Database**:
  - Express.js (REST APIs)
  - Drizzle ORM (Database query building)
  - Neon Database / PostgreSQL (Relational storage)

---

## 💻 Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed.

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/barthna/invitekaro_card.git
   cd invitekaro_card
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables (if any) or run DB migrations:
   ```bash
   npm run db:push
   ```

### Running the Application

To start the development server for both frontend and backend:
```bash
npm run dev
```

The application will run locally, and you can access the interface through the dev server URL.

### Building for Production

To build the static frontend assets and bundle the server:
```bash
npm run build
```

To run the production build:
```bash
npm run start
```

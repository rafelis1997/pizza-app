## Project

A small demo pizza ordering app. The API exposes endpoints to list available pizza sizes and ingredients, create orders and fetch orders; the frontend is a simple React app that consumes those endpoints to place and view orders.

**API Endpoints**:

- **GET /sizes** — returns available pizza sizes (id, name, basePrice).
- **GET /ingredients** — returns available ingredients (id, name, extraPrice).
- **POST /pizza-orders/create** — creates a new order. Body: `{ customerName: string, sizeId: string, ingredientIds: string[] }`. Returns the created order `{ id, customerName, size, ingredients, finalPrice, createdAt }`.
- **GET /pizza-orders** — returns all orders.
- **GET /pizza-orders/:id** — returns a single order by id.

**Tech stack**:

- `pizza-test-api`: Node.js + TypeScript, Fastify, Zod, Dotenv; tests with Vitest; built with `tsup`.
- `pizza-test-front`: React + TypeScript, Vite, Tailwind CSS, TanStack Router + React Query; tests with Vitest.

### Running the projects

This repository contains two services: the API server (in `pizza-test-api`) and the frontend app (in `pizza-test-front`). You can run them individually in development, build them for production, or run both together with Docker Compose.

- **Run API locally (development)**:

```bash
cd pizza-test-api
npm install
npm run start:dev
# API runs on http://localhost:4000 by default (see pizza-test-api/.env)
```

- **Build and run API (production)**:

```bash
cd pizza-test-api
npm install
npm run build
npm start
```

- **Run Frontend locally (development)**:

```bash
cd pizza-test-front
npm install
npm run dev
# Open http://localhost:3000
```

- **Build and preview Frontend (production)**:

```bash
cd pizza-test-front
npm install
npm run build
npm run preview
# Preview served on http://localhost:3000
```

- **Environment variables**:

- API: `pizza-test-api/.env` contains `PORT` (defaults to `4000`). The API also reads `NODE_ENV`.
- Frontend: set `VITE_API_URL` to point to the running API (for example `http://localhost:4000`). You can create a `.env` file in `pizza-test-front` or set the variable in your shell before running `npm run dev`.

- **Run both with Docker Compose**:

```bash
# from repository root
docker compose up --build
# or: docker-compose up --build

# After startup:
# - Frontend: http://localhost:3000
# - API: http://localhost:4000
```

The included `docker-compose.yaml` builds both services and sets `VITE_API_URL` for the frontend to `http://pizza-test-api:4000` so the containers talk to each other on the Docker network.

- **Running tests**:

```bash
# API tests
cd pizza-test-api && npm test
```


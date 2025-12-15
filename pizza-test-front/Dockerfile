# -------- Build stage --------
FROM node:22-alpine AS build

WORKDIR /app

# Copy only dependency files first (better cache)
COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the app
RUN npm run build


# -------- Runtime stage --------
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Copy built files and needed assets
COPY --from=build /app/.output ./.output
COPY package.json ./

# Install only production dependencies
RUN npm install --omit=dev

EXPOSE 3000

# Serve the built app
CMD ["npm", "run", "preview"]

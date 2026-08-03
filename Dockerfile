# syntax=docker/dockerfile:1

# ---- Stage "base" : installe les dépendances communes à dev et prod ----
FROM node:22-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# ---- Stage "dev" : serveur de développement Nuxt avec rechargement à chaud ----
FROM base AS dev
COPY . .
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "3000"]

# ---- Stage "build" : compile l'application pour la production ----
FROM base AS build
COPY . .
RUN npm run build

# ---- Stage "prod" : image finale légère, sans code source ni dépendances de dev ----
FROM node:22-alpine AS prod
WORKDIR /app
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000
COPY --from=build /app/.output ./.output
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]

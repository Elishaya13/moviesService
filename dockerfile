# --- ÉTAPE 1 : Build ---
FROM node:20-alpine AS builder
WORKDIR /app

COPY package*.json ./
# On respecte ton architecture dès le début
COPY src/infrastructure/database/prisma ./src/infrastructure/database/prisma/

RUN npm install
COPY . .

# On génère le client en utilisant le fichier de config
RUN npx prisma generate
RUN npm run build
RUN npm prune --production

# --- ÉTAPE 2 : Exécution ---
# --- ÉTAPE 2 : Exécution ---
FROM node:20-alpine
WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/src/infrastructure/database/prisma ./src/infrastructure/database/prisma
# Copie du fichier de configuration Prisma pour la prod
COPY --from=builder /app/prisma.config.ts ./

# Installation de Prisma en global pour pouvoir lancer les migrations et seeds en prod 
RUN npm install -g prisma

EXPOSE 3001

# Lancement des migrations, des seeds et de l'app
CMD prisma migrate deploy && npx tsx src/infrastructure/database/prisma/seed.ts && node dist/src/main
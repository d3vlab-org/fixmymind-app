# 🐳 Dockerfile
FROM node:18-alpine AS build

WORKDIR /app

COPY . .

RUN npm install
RUN npx expo export:web

# --- Serwujemy z pomocą "serve" ---
FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist /app/dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]
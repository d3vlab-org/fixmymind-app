# 🐳 Dockerfile
FROM node:18-alpine AS build

WORKDIR /app

# Accept build arguments for environment variables
ARG EXPO_PUBLIC_SUPABASE_URL
ARG EXPO_PUBLIC_SUPABASE_KEY
ARG API_URL

# Set environment variables from build arguments
ENV EXPO_PUBLIC_SUPABASE_URL=$EXPO_PUBLIC_SUPABASE_URL
ENV EXPO_PUBLIC_SUPABASE_KEY=$EXPO_PUBLIC_SUPABASE_KEY
ENV API_URL=$API_URL

COPY . .

RUN npm install
RUN npx expo export --platform web

# --- Serwujemy z pomocą "serve" ---
FROM node:18-alpine

WORKDIR /app

RUN npm install -g serve

COPY --from=build /app/dist /app/dist

EXPOSE 3000

CMD ["serve", "-s", "dist", "-l", "3000"]

FROM node:24-alpine3.21 AS base 
ENV NEXT_PRIVATE_STANDALONE=true
WORKDIR /src

# Copy both package.json and package-lock.json (if available)
COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

EXPOSE 3000

RUN npx prisma generate

# Wait for database and run migrations at runtime
CMD ["sh", "-c", "sleep 5 && npx prisma migrate deploy && npm run dev"]

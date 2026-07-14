FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .

FROM node:20-alpine
RUN apk add --no-cache tzdata
ENV TZ=Asia/Ho_Chi_Minh
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
EXPOSE 5002
CMD ["npm", "start"]
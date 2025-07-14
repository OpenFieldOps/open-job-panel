FROM oven/bun:latest AS builder


RUN apt-get update && apt-get install -y git

RUN git clone https://github.com/OpenFieldOps/open-job-api /backend

WORKDIR /backend
RUN bun install --frozen-lockfile

WORKDIR /app
COPY . .
RUN bun install --frozen-lockfile
RUN bunx @chakra-ui/cli snippet add

RUN bun run build

FROM nginx:stable-alpine AS production

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

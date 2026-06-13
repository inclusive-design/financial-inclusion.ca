FROM denoland/deno:2.8.3 AS builder

WORKDIR /app

COPY . ./

RUN deno task build

FROM nginx:1.30.0-alpine

COPY --from=builder /app/_site /usr/share/nginx/html

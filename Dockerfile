FROM denoland/deno:2.7.13 AS builder

WORKDIR /app

COPY . ./

RUN deno task build

FROM nginx:1.31.2-alpine

COPY --from=builder /app/_site /usr/share/nginx/html

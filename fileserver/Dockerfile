FROM alpine:3.19 AS builder
WORKDIR /app

RUN apk add --no-cache git && \
    git clone --depth 1 https://olverarcedev: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@github.com/olverarcedev/file_server.git .

FROM node:20-alpine3.19
WORKDIR /app
COPY --from=builder /app .

RUN npm install
RUN npm install pm2 -g
EXPOSE 5002
CMD ["pm2-runtime", "src/index.js"]
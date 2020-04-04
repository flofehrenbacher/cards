FROM node:12.13.1-alpine

ENV NODE_ENV=production

WORKDIR /app
COPY build /app

EXPOSE 3000
CMD ["node", "index"]
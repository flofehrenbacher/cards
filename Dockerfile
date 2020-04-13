FROM node:12.13.1-alpine

ENV NODE_ENV=production

WORKDIR /app
COPY build /app
COPY assets /app/assets
COPY public /app/public

EXPOSE 3000
CMD ["node", "index"]
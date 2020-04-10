FROM node:12.13.1-alpine

ENV NODE_ENV=production

WORKDIR /app
COPY build /app
COPY assets /app/assets

EXPOSE 3000
CMD ["node", "index"]
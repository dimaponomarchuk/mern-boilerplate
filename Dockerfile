FROM node:14-alpine as builder
WORKDIR /app
COPY . .
RUN yarn install --frozen-lockfile
RUN yarn lerna run build --stream --parallel

### SERVER IMAGE ###
FROM node:14-alpine as server
WORKDIR /app
COPY --from=builder /app .
WORKDIR /app/packages/api
EXPOSE 3000
CMD [ "node", "./dist/index.cjs.js" ]

### CLIENT IMAGE ###
# FROM nginx as client
# COPY --from=builder /app/packages/client/dist /usr/share/nginx/html
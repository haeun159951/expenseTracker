FROM node:16-alpine3.11
WORKDIR /API
COPY . .
RUN yarn install --production
EXPOSE 8080
CMD ["yarn", "start"]
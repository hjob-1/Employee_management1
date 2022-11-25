
FROM node:19-alpine3.15
WORKDIR /api
COPY ./package*.json .
RUN yarn install 
COPY . .
EXPOSE 4000
CMD ["yarn", "start"]
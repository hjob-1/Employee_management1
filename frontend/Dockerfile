FROM node:19-alpine3.15
WORKDIR /client
COPY ./package*.json .
COPY ./tsconfig.json .
RUN yarn install 
COPY . .
EXPOSE 3000
CMD ["yarn", "start"]

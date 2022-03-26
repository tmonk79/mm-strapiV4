FROM node:14-alpine as base
WORKDIR /app
COPY . .
COPY package* .
RUN npm i --production
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]

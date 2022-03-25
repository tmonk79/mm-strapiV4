FROM node:14-alpine as base
WORKDIR /app
COPY package*.json .
RUN npm i
EXPOSE 3000
CMD ["npm", "run", "dev"]

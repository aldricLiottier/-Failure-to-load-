FROM node:13.12.0-alpine

WORKDIR /app

ENV PATH /node_modules/.bin:$PATH

COPY package.json /app
COPY package-lock.json /app

RUN npm install

COPY . /app

CMD ["npm", "start"]
 
EXPOSE 3000
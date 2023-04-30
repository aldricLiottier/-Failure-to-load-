FROM node:18.15.0-alpine

WORKDIR /app

ENV PATH /node_modules/.bin:$PATH

# COPY package.json /app
# COPY package-lock.json /app
COPY . /app

# RUN npm install

RUN npm install -g serve

RUN npm run build

CMD ["serve", "-s", "build"]
 
EXPOSE 3000
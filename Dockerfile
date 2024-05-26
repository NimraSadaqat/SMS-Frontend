FROM node:22-bullseye

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 4173

CMD [ "npm", "run", "preview" ]
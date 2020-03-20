FROM node:13.10-alpine3.11

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .
EXPOSE 3000

CMD ["npm", "run", "start"]

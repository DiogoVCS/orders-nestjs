FROM node:alpine As development

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install pnpm -g

RUN pnpm install

COPY . .

RUN pnpm build

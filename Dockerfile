FROM node:25-slim

ENV NODE_ENV production

WORKDIR /home/node

COPY --chown=node:node package*.json ./
RUN npm ci

COPY --chown=node:node . .
RUN npm run build

RUN npm ci --omit=dev

CMD ["npm", "run", "start"]

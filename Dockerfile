FROM node:18-alpine
WORKDIR /opt/app
ADD package.json package.json
ADD npm install
ADD . .
RUN npm run build
RUN npm prune --production
CMD ["node", "./dist/main.js"]
FROM node AS builder


WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install

COPY . .
RUN yarn build && yarn cache clean


FROM node:alpine

WORKDIR /app
COPY package.json yarn.lock ./
COPY --from=builder /app/.next ./.next
RUN yarn install --production && yarn cache clean
EXPOSE 3000
CMD ["yarn", "start"]

# docker build -t regelearn.com .
# docker run -itd -p 8080:3000 regelearn.com 

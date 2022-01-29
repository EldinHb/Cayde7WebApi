FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and yarn.lock for dependencies
COPY package.json ./
COPY yarn.lock ./

# Install app dependencies
RUN yarn

# Copy build
COPY ./build .

EXPOSE 3000
ENV NODE_ENV=production
CMD ["node", "index.js"]

FROM node:12

# Create app directory
WORKDIR /

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package.json package.json
COPY package-lock.json package-lock.json
COPY src ./src
COPY public ./public

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source


EXPOSE 8080
CMD [ "node", "src/app.js" ]

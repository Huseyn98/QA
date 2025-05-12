# 1. Use a base image (Node.js + Alpine Linux for small size)
FROM node:20-alpine

# 2. Set the working directory *inside* the container
WORKDIR /app

# 3. Copy package.json and package-lock.json into the container
COPY package*.json ./

# 4. Install dependencies inside the container
RUN npm install

# 5. Copy the rest of your app code into the container
COPY . .

# 6. Expose the port your server runs on (3000)
EXPOSE 3000

# 7. Run the app
CMD ["node", "server.js"]

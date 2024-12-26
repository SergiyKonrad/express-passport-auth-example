# Use the official Node.js LTS image as the base image
FROM node:lts

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files into the container
COPY . .

# Expose the port that the application runs on
EXPOSE 3000

# Command to run the application
CMD ["node", "app.js"]

# CMD ["npx", "nodemon", "app.js"] 
# enables hot reloading for a better developer experience or use command: npm run dev in docker-compose.yml (not both).






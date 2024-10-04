# Use Node.js 16
FROM node:16-alpine

WORKDIR /app

# Copy the package files first to take advantage of Docker cache
COPY package.json ./
COPY package-lock.json ./

# Install dependencies with the --legacy-peer-deps flag to resolve peer dependency conflicts
RUN npm install --legacy-peer-deps

# Copy the rest of the app files
COPY ./ ./

# Expose the application port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]

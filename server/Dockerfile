# Use official Node.js LTS image
FROM node:24-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files and install dependencies first (for caching)
COPY package*.json ./
RUN npm install --production

# Copy the rest of the source code
COPY . .

# Expose backend port (adjust if your backend uses a different port)
EXPOSE 3000

# Run the Express app
CMD ["node", "index.js"]

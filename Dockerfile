# Use the latest LTS version of Node.js
FROM node:lts

# Set the working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build step - uncomment if you want to build for production
# RUN npm run build

# Expose the port the app runs on
EXPOSE 8080

# Use an explicit network interface binding
ENV HOST=0.0.0.0
ENV VITE_PORT=8080

# Start the development server with specific host binding
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"] 
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

# Expose the default Vite development server port
EXPOSE 5173

# Use an explicit network interface binding
ENV HOST=0.0.0.0
ENV VITE_PORT=5173

# Start the development server with specific host binding
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"] 
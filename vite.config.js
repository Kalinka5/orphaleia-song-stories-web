import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		host: "0.0.0.0",
		port: 8080,
		allowedHosts: [
			"localhost",
			"orphaleia.com",
			"www.orphaleia.com",
			// Add your EC2 IP address if needed
			// 'your-ec2-ip'
		],
		cors: true,
		hmr: {
			host: "orphaleia.com",
			protocol: "ws",
		},
	},
})

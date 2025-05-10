import react from "@vitejs/plugin-react-swc"
import path from "path"
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
			"16.16.187.205",
		],
		cors: true,
		hmr: {
			host: "orphaleia.com",
			protocol: "ws",
		},
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
})

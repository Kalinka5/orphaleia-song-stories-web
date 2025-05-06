import { Book } from "@/types/book"
import { WishlistItem } from "@/types/wishlist"
import axios from "axios"

// Set up API base URL from environment or use default
const API_BASE_URL =
	import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1"

// Create axios instance with base configuration
const api = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
	withCredentials: true,
})

// Add request interceptor for authentication
api.interceptors.request.use(config => {
	const token = localStorage.getItem("token")
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

// Books API
export const booksApi = {
	// Get all books with optional filtering
	getBooks: async (params?: {
		skip?: number
		limit?: number
		category?: string
		search?: string
		sort?: string
		featured?: boolean
	}) => {
		const response = await api.get<Book[]>("/books", { params })
		return response.data
	},

	// Get a single book by ID
	getBook: async (id: string) => {
		const response = await api.get<Book>(`/books/${id}`)
		return response.data
	},

	// Get featured books
	getFeaturedBooks: async (limit: number = 8) => {
		const response = await api.get<Book[]>("/books/featured", {
			params: { limit },
		})
		return response.data
	},

	// Get books by category
	getBooksByCategory: async (
		category: string,
		skip: number = 0,
		limit: number = 100
	) => {
		const response = await api.get<Book[]>(`/books/category/${category}`, {
			params: { skip, limit },
		})
		return response.data
	},
}

// Auth API
export const authApi = {
	login: async (email: string, password: string) => {
		const response = await api.post("/auth/login", { email, password })
		return response.data
	},

	register: async (email: string, password: string, fullName: string) => {
		const response = await api.post("/auth/register", {
			email,
			password,
			full_name: fullName,
		})
		return response.data
	},
}

// Orders API
export const ordersApi = {
	createOrder: async (orderData: any) => {
		const response = await api.post("/orders", orderData)
		return response.data
	},

	getUserOrders: async () => {
		const response = await api.get("/orders/user")
		return response.data
	},
}

// Users API
export const usersApi = {
	getCurrentUser: async () => {
		const response = await api.get("/users/me")
		return response.data
	},

	updateUser: async (userData: any) => {
		const response = await api.put("/users/me", userData)
		return response.data
	},
}

// Shipping Address API
export const shippingAddressApi = {
	getShippingAddress: async () => {
		const response = await api.get("/shipping-addresses/me")
		return response.data
	},

	createShippingAddress: async (addressData: {
		street_address: string
		city: string
		state: string
		postal_code: string
		country: string
	}) => {
		const response = await api.post("/shipping-addresses/me", addressData)
		return response.data
	},

	updateShippingAddress: async (addressData: {
		street_address?: string
		city?: string
		state?: string
		postal_code?: string
		country?: string
	}) => {
		const response = await api.put("/shipping-addresses/me", addressData)
		return response.data
	},

	deleteShippingAddress: async () => {
		const response = await api.delete("/shipping-addresses/me")
		return response.data
	},
}

// Wishlist API
export const wishlistApi = {
	// Get all wishlist items for current user
	getWishlist: async () => {
		const response = await api.get<WishlistItem[]>("/wishlist")
		return response.data
	},

	// Add a book to wishlist
	addToWishlist: async (bookId: string) => {
		const response = await api.post<WishlistItem>("/wishlist", {
			book_id: bookId,
		})
		return response.data
	},

	// Remove a book from wishlist
	removeFromWishlist: async (bookId: string) => {
		const response = await api.delete(`/wishlist/${bookId}`)
		return response.data
	},

	// Check if a book is in the wishlist
	isInWishlist: async (bookId: string) => {
		try {
			const response = await api.get<{ exists: boolean }>(
				`/wishlist/check/${bookId}`
			)
			return response.data.exists
		} catch (error) {
			return false
		}
	},
}

export default api

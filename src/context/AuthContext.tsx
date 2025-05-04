import axios from "axios"
import React, {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react"

// Types
type User = {
	id: string
	email: string
	full_name: string
	is_admin: boolean
}

type AuthContextType = {
	isAuthenticated: boolean
	user: User | null
	loading: boolean
	login: (email: string, password: string) => Promise<void>
	register: (userData: RegisterData) => Promise<void>
	logout: () => void
}

type RegisterData = {
	email: string
	password: string
	full_name: string
}

type AuthProviderProps = {
	children: ReactNode
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined)

// API Base URL
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api/v1"

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null)
	const [loading, setLoading] = useState(true)

	// Initialize auth state from localStorage
	useEffect(() => {
		const checkAuth = async () => {
			const token = localStorage.getItem("token")
			if (token) {
				try {
					// Set default authorization header for all requests
					axios.defaults.headers.common["Authorization"] = `Bearer ${token}`

					// Get user profile
					const response = await axios.get(`${API_URL}/users/me`)
					setUser(response.data)
				} catch (error) {
					console.error("Auth token validation failed", error)
					localStorage.removeItem("token")
					delete axios.defaults.headers.common["Authorization"]
				}
			}
			setLoading(false)
		}

		checkAuth()
	}, [])

	// Login function
	const login = async (email: string, password: string) => {
		setLoading(true)
		try {
			// Get token
			const formData = new FormData()
			formData.append("username", email)
			formData.append("password", password)

			const response = await axios.post(`${API_URL}/auth/login`, formData)
			const { access_token } = response.data

			// Save token to localStorage
			localStorage.setItem("token", access_token)

			// Set default authorization header
			axios.defaults.headers.common["Authorization"] = `Bearer ${access_token}`

			// Get user profile
			const userResponse = await axios.get(`${API_URL}/users/me`)
			setUser(userResponse.data)
		} catch (error) {
			console.error("Login failed", error)
			throw error
		} finally {
			setLoading(false)
		}
	}

	// Register function
	const register = async (userData: RegisterData) => {
		setLoading(true)
		try {
			await axios.post(`${API_URL}/auth/register`, {
				email: userData.email,
				password: userData.password,
				full_name: userData.full_name,
				is_admin: false,
			})
		} catch (error) {
			console.error("Registration failed", error)
			throw error
		} finally {
			setLoading(false)
		}
	}

	// Logout function
	const logout = () => {
		localStorage.removeItem("token")
		delete axios.defaults.headers.common["Authorization"]
		setUser(null)
	}

	const value = {
		isAuthenticated: !!user,
		user,
		loading,
		login,
		register,
		logout,
	}

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// Hook for using auth context
export const useAuth = () => {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider")
	}
	return context
}

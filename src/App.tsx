import ProtectedRoute from "@/components/ProtectedRoute"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { Toaster } from "@/components/ui/toaster"
import { TooltipProvider } from "@/components/ui/tooltip"
import { AuthProvider } from "@/context/AuthContext"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import About from "./pages/About"
import Account from "./pages/Account"
import BookDetail from "./pages/BookDetail"
import Books from "./pages/Books"
import Cart from "./pages/Cart"
import Contact from "./pages/Contact"
import Index from "./pages/Index"
import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import PrivacyPolicy from "./pages/PrivacyPolicy"
import Register from "./pages/Register"
import TermsOfService from "./pages/TermsOfService"

const queryClient = new QueryClient()

const App = () => (
	<QueryClientProvider client={queryClient}>
		<AuthProvider>
			<TooltipProvider>
				<Toaster />
				<Sonner />
				<BrowserRouter>
					<Routes>
						{/* Public routes */}
						<Route path="/" element={<Index />} />
						<Route path="/books" element={<Books />} />
						<Route path="/books/:id" element={<BookDetail />} />
						<Route path="/about" element={<About />} />
						<Route path="/contact" element={<Contact />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
						<Route path="/privacy-policy" element={<PrivacyPolicy />} />
						<Route path="/terms-of-service" element={<TermsOfService />} />

						{/* Protected routes */}
						<Route element={<ProtectedRoute />}>
							<Route path="/account" element={<Account />} />
							<Route path="/cart" element={<Cart />} />
						</Route>

						<Route path="*" element={<NotFound />} />
					</Routes>
				</BrowserRouter>
			</TooltipProvider>
		</AuthProvider>
	</QueryClientProvider>
)

export default App

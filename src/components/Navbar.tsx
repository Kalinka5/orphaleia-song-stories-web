import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import { LogOut, Menu, Search, ShoppingCart, User, X } from "lucide-react"
import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Logo from "./Logo"

const Navbar: React.FC = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [searchQuery, setSearchQuery] = useState("")
	const { isAuthenticated, user, logout } = useAuth()
	const navigate = useNavigate()

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

	const handleSearch = (e: React.FormEvent) => {
		e.preventDefault()
		console.log("Searching for:", searchQuery)
		// Implement search functionality
	}

	const handleLogout = () => {
		logout()
		navigate("/")
	}

	return (
		<header className="border-b border-border">
			<div className="container mx-auto px-4 py-4">
				<div className="flex items-center justify-between">
					<Logo />

					{/* Desktop Navigation */}
					<nav className="hidden md:flex items-center space-x-8">
						<Link to="/" className="nav-link font-medium">
							Home
						</Link>
						<Link to="/books" className="nav-link font-medium">
							Books
						</Link>
						<Link to="/about" className="nav-link font-medium">
							About Us
						</Link>
						<Link to="/contact" className="nav-link font-medium">
							Contact
						</Link>
					</nav>

					{/* Desktop Search & Actions */}
					<div className="hidden md:flex items-center space-x-4">
						<form onSubmit={handleSearch} className="relative">
							<input
								type="text"
								placeholder="Search books..."
								className="px-4 py-2 rounded-full bg-muted focus:outline-none focus:ring-1 focus:ring-gold w-48"
								value={searchQuery}
								onChange={e => setSearchQuery(e.target.value)}
							/>
							<button
								type="submit"
								className="absolute right-3 top-2.5 text-muted-foreground"
							>
								<Search size={18} />
							</button>
						</form>

						{isAuthenticated ? (
							<div className="flex items-center space-x-4">
								<Link to="/account" className="nav-link flex items-center">
									<User size={20} className="mr-1" />
									<span className="text-sm">
										{user?.full_name.split(" ")[0]}
									</span>
								</Link>
								<button onClick={handleLogout} className="nav-link">
									<LogOut size={20} />
								</button>
							</div>
						) : (
							<Link to="/login" className="nav-link">
								<User size={20} />
							</Link>
						)}

						<Link to="/cart" className="nav-link relative">
							<ShoppingCart size={20} />
							<span className="absolute -top-2 -right-2 bg-gold text-deepblue rounded-full text-xs w-5 h-5 flex items-center justify-center">
								0
							</span>
						</Link>
					</div>

					{/* Mobile Menu Button */}
					<div className="md:hidden flex items-center">
						<Link to="/cart" className="nav-link relative mr-4">
							<ShoppingCart size={20} />
							<span className="absolute -top-2 -right-2 bg-gold text-deepblue rounded-full text-xs w-5 h-5 flex items-center justify-center">
								0
							</span>
						</Link>
						<Button
							variant="ghost"
							size="icon"
							onClick={toggleMenu}
							aria-label="Toggle menu"
						>
							{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
						</Button>
					</div>
				</div>

				{/* Mobile Menu */}
				{isMenuOpen && (
					<div className="md:hidden py-4 animate-fade-in">
						<form onSubmit={handleSearch} className="relative mb-4">
							<input
								type="text"
								placeholder="Search books..."
								className="w-full px-4 py-2 rounded-full bg-muted focus:outline-none focus:ring-1 focus:ring-gold"
								value={searchQuery}
								onChange={e => setSearchQuery(e.target.value)}
							/>
							<button
								type="submit"
								className="absolute right-3 top-2.5 text-muted-foreground"
							>
								<Search size={18} />
							</button>
						</form>
						<nav className="flex flex-col space-y-4">
							<Link
								to="/"
								className="nav-link font-medium"
								onClick={toggleMenu}
							>
								Home
							</Link>
							<Link
								to="/books"
								className="nav-link font-medium"
								onClick={toggleMenu}
							>
								Books
							</Link>
							<Link
								to="/about"
								className="nav-link font-medium"
								onClick={toggleMenu}
							>
								About Us
							</Link>
							<Link
								to="/contact"
								className="nav-link font-medium"
								onClick={toggleMenu}
							>
								Contact
							</Link>

							{isAuthenticated ? (
								<>
									<Link
										to="/account"
										className="nav-link font-medium"
										onClick={toggleMenu}
									>
										My Account
									</Link>
									<button
										onClick={() => {
											handleLogout()
											toggleMenu()
										}}
										className="nav-link font-medium text-left flex items-center"
									>
										<LogOut size={18} className="mr-2" /> Sign Out
									</button>
								</>
							) : (
								<Link
									to="/login"
									className="nav-link font-medium"
									onClick={toggleMenu}
								>
									Sign In
								</Link>
							)}
						</nav>
					</div>
				)}
			</div>
		</header>
	)
}

export default Navbar

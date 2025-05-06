import Layout from "@/components/Layout"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { ordersApi, shippingAddressApi, usersApi } from "@/lib/api"
import { Order } from "@/types/order"
import { ShippingAddress } from "@/types/user"
import { Heart, Key, LogOut, Mail, Package, Settings, User } from "lucide-react"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const Account: React.FC = () => {
	const [activeTab, setActiveTab] = useState("profile")
	const { toast } = useToast()
	const [isLoggedIn, setIsLoggedIn] = useState(true)
	const [isLoading, setIsLoading] = useState(false)
	const [userData, setUserData] = useState({
		full_name: "",
		email: "",
		created_at: "",
		id: "",
		is_admin: false,
	})
	const [loginForm, setLoginForm] = useState({
		email: "",
		password: "",
	})
	const [orders, setOrders] = useState<Order[]>([])

	// Form states
	const [isEditingProfile, setIsEditingProfile] = useState(false)
	const [profileForm, setProfileForm] = useState({
		full_name: "",
		email: "",
	})

	const [isEditingAddress, setIsEditingAddress] = useState(false)
	const [addressForm, setAddressForm] = useState<ShippingAddress>({
		id: "",
		user_id: "",
		street_address: "",
		city: "",
		state: "",
		postal_code: "",
		country: "",
	})

	const [userShippingAddress, setUserShippingAddress] =
		useState<ShippingAddress | null>(null)

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				setIsLoading(true)
				const data = await usersApi.getCurrentUser()
				setUserData(data)
				setProfileForm({
					full_name: data.full_name,
					email: data.email,
				})

				// If the user has a shipping address, fetch it
				if (data.shipping_address) {
					setUserShippingAddress(data.shipping_address)
					setAddressForm(data.shipping_address)
				}

				setIsLoggedIn(true)

				// Fetch user orders
				const userOrders = await ordersApi.getUserOrders()
				setOrders(userOrders)
			} catch (error) {
				console.error("Error fetching user data:", error)
				setIsLoggedIn(false)
				toast({
					title: "Authentication error",
					description: "Please sign in to view your account.",
					variant: "destructive",
				})
			} finally {
				setIsLoading(false)
			}
		}

		fetchUserData()
	}, [toast])

	const handleLoginFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setLoginForm({
			...loginForm,
			[e.target.name]: e.target.value,
		})
	}

	const handleLoginSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		// Mock login functionality
		toast({
			title: "Logged in successfully",
			description: "Welcome back to Orphaleia!",
		})
		setIsLoggedIn(true)
	}

	const handleLogout = () => {
		setIsLoggedIn(false)
		// Clear token
		localStorage.removeItem("token")
		toast({
			title: "Logged out",
			description: "You have been logged out successfully.",
		})
	}

	const handleProfileFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setProfileForm({
			...profileForm,
			[e.target.name]: e.target.value,
		})
	}

	const handleAddressFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setAddressForm({
			...addressForm,
			[e.target.name]: e.target.value,
		})
	}

	const handleProfileSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			setIsLoading(true)

			// Update the user profile
			const updatedUser = await usersApi.updateUser({
				full_name: profileForm.full_name,
				email: profileForm.email,
			})

			setUserData(updatedUser)
			setIsEditingProfile(false)

			toast({
				title: "Profile updated",
				description: "Your profile information has been updated successfully.",
			})
		} catch (error) {
			console.error("Error updating profile:", error)
			toast({
				title: "Update failed",
				description:
					"There was an error updating your profile. Please try again.",
				variant: "destructive",
			})
		} finally {
			setIsLoading(false)
		}
	}

	const handleAddressSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		try {
			setIsLoading(true)

			let updatedAddress

			// If user already has an address, update it. Otherwise, create a new one.
			if (userShippingAddress) {
				updatedAddress = await shippingAddressApi.updateShippingAddress(
					addressForm
				)
			} else {
				updatedAddress = await shippingAddressApi.createShippingAddress(
					addressForm as Required<ShippingAddress>
				)
			}

			setUserShippingAddress(updatedAddress)
			setIsEditingAddress(false)

			// Refresh user data to include updated shipping address
			const updatedUser = await usersApi.getCurrentUser()
			setUserData(updatedUser)

			toast({
				title: "Address updated",
				description: "Your shipping address has been updated successfully.",
			})
		} catch (error) {
			console.error("Error updating address:", error)
			toast({
				title: "Update failed",
				description:
					"There was an error updating your shipping address. Please try again.",
				variant: "destructive",
			})
		} finally {
			setIsLoading(false)
		}
	}

	const handleDeleteAddress = async () => {
		if (
			!window.confirm("Are you sure you want to delete your shipping address?")
		) {
			return
		}

		try {
			setIsLoading(true)
			await shippingAddressApi.deleteShippingAddress()
			setUserShippingAddress(null)
			setAddressForm({
				id: "",
				user_id: "",
				street_address: "",
				city: "",
				state: "",
				postal_code: "",
				country: "",
			})

			// Refresh user data to remove shipping address
			const updatedUser = await usersApi.getCurrentUser()
			setUserData(updatedUser)

			toast({
				title: "Address deleted",
				description: "Your shipping address has been deleted successfully.",
			})
		} catch (error) {
			console.error("Error deleting address:", error)
			toast({
				title: "Delete failed",
				description:
					"There was an error deleting your shipping address. Please try again.",
				variant: "destructive",
			})
		} finally {
			setIsLoading(false)
		}
	}

	// Format the status for display
	const formatStatus = (status: string) => {
		return status.charAt(0).toUpperCase() + status.slice(1)
	}

	// Get appropriate status style
	const getStatusStyle = (status: string) => {
		switch (status) {
			case "delivered":
				return "bg-green-100 text-green-800"
			case "shipped":
				return "bg-blue-100 text-blue-800"
			case "processing":
				return "bg-yellow-100 text-yellow-800"
			case "cancelled":
				return "bg-red-100 text-red-800"
			default:
				return "bg-gray-100 text-gray-800"
		}
	}

	if (isLoading) {
		return (
			<Layout>
				<div className="container mx-auto px-4 py-12 text-center">
					<p>Loading your account information...</p>
				</div>
			</Layout>
		)
	}

	if (!isLoggedIn) {
		return (
			<Layout>
				<div className="container mx-auto px-4 py-12">
					<div className="max-w-md mx-auto">
						<h1 className="text-3xl font-playfair font-bold mb-6 text-center">
							Sign In
						</h1>
						<div className="decorative-line mx-auto mb-6"></div>

						<div className="bg-white rounded-lg shadow-md p-8">
							<form onSubmit={handleLoginSubmit} className="space-y-6">
								<div>
									<label htmlFor="email" className="block mb-2 font-medium">
										Email
									</label>
									<div className="relative">
										<Mail
											className="absolute left-3 top-3 text-muted-foreground"
											size={18}
										/>
										<input
											type="email"
											id="email"
											name="email"
											required
											className="w-full pl-10 pr-4 py-3 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
											value={loginForm.email}
											onChange={handleLoginFormChange}
										/>
									</div>
								</div>

								<div>
									<label htmlFor="password" className="block mb-2 font-medium">
										Password
									</label>
									<div className="relative">
										<Key
											className="absolute left-3 top-3 text-muted-foreground"
											size={18}
										/>
										<input
											type="password"
											id="password"
											name="password"
											required
											className="w-full pl-10 pr-4 py-3 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
											value={loginForm.password}
											onChange={handleLoginFormChange}
										/>
									</div>
								</div>

								<div className="flex justify-between items-center">
									<label className="flex items-center">
										<input
											type="checkbox"
											className="mr-2 rounded border-border"
										/>
										<span className="text-sm">Remember me</span>
									</label>
									<Link
										to="/forgot-password"
										className="text-sm text-deepblue hover:underline"
									>
										Forgot password?
									</Link>
								</div>

								<Button type="submit" className="w-full py-3">
									Sign In
								</Button>
							</form>

							<div className="mt-6 text-center">
								<p className="text-muted-foreground">
									Don't have an account?{" "}
									<Link
										to="/register"
										className="text-deepblue hover:underline"
									>
										Create account
									</Link>
								</p>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		)
	}

	return (
		<Layout>
			<div className="bg-deepblue text-white py-12">
				<div className="container mx-auto px-4">
					<h1 className="text-3xl md:text-4xl font-playfair font-bold">
						My Account
					</h1>
					<div className="decorative-line"></div>
				</div>
			</div>

			<div className="container mx-auto px-4 py-12">
				<div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
					<div className="lg:col-span-1">
						<div className="bg-white rounded-lg shadow-md overflow-hidden sticky top-6">
							<div className="p-6 border-b border-border">
								<div className="flex items-center gap-4">
									<div className="w-12 h-12 bg-deepblue/10 rounded-full flex items-center justify-center">
										<User size={24} className="text-deepblue" />
									</div>
									<div>
										<h2 className="font-medium">{userData.full_name}</h2>
										<p className="text-sm text-muted-foreground">
											{userData.email}
										</p>
									</div>
								</div>
							</div>

							<nav className="p-2">
								<button
									onClick={() => setActiveTab("profile")}
									className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
										activeTab === "profile"
											? "bg-gold/20 text-deepblue"
											: "hover:bg-muted"
									}`}
								>
									<User size={18} />
									<span>Profile</span>
								</button>
								<button
									onClick={() => setActiveTab("orders")}
									className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
										activeTab === "orders"
											? "bg-gold/20 text-deepblue"
											: "hover:bg-muted"
									}`}
								>
									<Package size={18} />
									<span>Orders</span>
								</button>
								<button
									onClick={() => setActiveTab("wishlist")}
									className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
										activeTab === "wishlist"
											? "bg-gold/20 text-deepblue"
											: "hover:bg-muted"
									}`}
								>
									<Heart size={18} />
									<span>Wishlist</span>
								</button>
								<button
									onClick={() => setActiveTab("settings")}
									className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
										activeTab === "settings"
											? "bg-gold/20 text-deepblue"
											: "hover:bg-muted"
									}`}
								>
									<Settings size={18} />
									<span>Settings</span>
								</button>

								<div className="px-2 pt-3 mt-2 border-t border-border">
									<Button
										variant="outline"
										className="w-full justify-start gap-2"
										onClick={handleLogout}
									>
										<LogOut size={18} />
										<span>Logout</span>
									</Button>
								</div>
							</nav>
						</div>
					</div>

					<div className="lg:col-span-3">
						{activeTab === "profile" && (
							<div className="bg-white rounded-lg shadow-md p-6">
								<h2 className="text-2xl font-playfair font-semibold mb-6">
									Profile Information
								</h2>

								{isEditingProfile ? (
									<form onSubmit={handleProfileSubmit}>
										<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
											<div>
												<label
													htmlFor="full_name"
													className="block mb-2 font-medium"
												>
													Full Name
												</label>
												<input
													type="text"
													id="full_name"
													name="full_name"
													value={profileForm.full_name}
													onChange={handleProfileFormChange}
													className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
													required
												/>
											</div>

											<div>
												<label
													htmlFor="email"
													className="block mb-2 font-medium"
												>
													Email
												</label>
												<input
													type="email"
													id="email"
													name="email"
													value={profileForm.email}
													onChange={handleProfileFormChange}
													className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
													required
												/>
											</div>
										</div>
										<div className="mt-6 flex space-x-4">
											<Button type="submit" disabled={isLoading}>
												Save Changes
											</Button>
											<Button
												type="button"
												variant="outline"
												onClick={() => {
													setIsEditingProfile(false)
													setProfileForm({
														full_name: userData.full_name,
														email: userData.email,
													})
												}}
											>
												Cancel
											</Button>
										</div>
									</form>
								) : (
									<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
										<div>
											<label htmlFor="name" className="block mb-2 font-medium">
												Full Name
											</label>
											<input
												type="text"
												id="name"
												value={userData.full_name}
												className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
												readOnly
											/>
										</div>

										<div>
											<label htmlFor="email" className="block mb-2 font-medium">
												Email
											</label>
											<input
												type="email"
												id="email"
												value={userData.email}
												className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
												readOnly
											/>
										</div>

										<div>
											<label
												htmlFor="join-date"
												className="block mb-2 font-medium"
											>
												Member Since
											</label>
											<input
												type="text"
												id="join-date"
												value={
													userData.created_at
														? new Date(userData.created_at).toLocaleDateString(
																"en-US",
																{
																	year: "numeric",
																	month: "long",
																	day: "numeric",
																}
														  )
														: ""
												}
												className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
												readOnly
											/>
										</div>

										{userData.is_admin && (
											<div>
												<label
													htmlFor="role"
													className="block mb-2 font-medium"
												>
													Role
												</label>
												<input
													type="text"
													id="role"
													value="Administrator"
													className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-gold bg-gold/10"
													readOnly
												/>
											</div>
										)}

										<div className="md:col-span-2 mt-4">
											<Button onClick={() => setIsEditingProfile(true)}>
												Edit Profile
											</Button>
										</div>
									</div>
								)}

								<div className="mt-8">
									<h3 className="text-xl font-playfair font-semibold mb-4">
										Shipping Address
									</h3>
									{isEditingAddress ? (
										<form onSubmit={handleAddressSubmit} className="space-y-4">
											<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
												<div className="md:col-span-2">
													<label
														htmlFor="street_address"
														className="block mb-2 font-medium"
													>
														Street Address
													</label>
													<input
														type="text"
														id="street_address"
														name="street_address"
														value={addressForm.street_address}
														onChange={handleAddressFormChange}
														className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
														required
													/>
												</div>

												<div>
													<label
														htmlFor="city"
														className="block mb-2 font-medium"
													>
														City
													</label>
													<input
														type="text"
														id="city"
														name="city"
														value={addressForm.city}
														onChange={handleAddressFormChange}
														className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
														required
													/>
												</div>

												<div>
													<label
														htmlFor="state"
														className="block mb-2 font-medium"
													>
														State/Province
													</label>
													<input
														type="text"
														id="state"
														name="state"
														value={addressForm.state}
														onChange={handleAddressFormChange}
														className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
														required
													/>
												</div>

												<div>
													<label
														htmlFor="postal_code"
														className="block mb-2 font-medium"
													>
														Postal Code
													</label>
													<input
														type="text"
														id="postal_code"
														name="postal_code"
														value={addressForm.postal_code}
														onChange={handleAddressFormChange}
														className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
														required
													/>
												</div>

												<div>
													<label
														htmlFor="country"
														className="block mb-2 font-medium"
													>
														Country
													</label>
													<input
														type="text"
														id="country"
														name="country"
														value={addressForm.country}
														onChange={handleAddressFormChange}
														className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
														required
													/>
												</div>
											</div>

											<div className="flex space-x-4 mt-6">
												<Button type="submit" disabled={isLoading}>
													Save Address
												</Button>
												<Button
													type="button"
													variant="outline"
													onClick={() => {
														setIsEditingAddress(false)
														if (userShippingAddress) {
															setAddressForm(userShippingAddress)
														}
													}}
												>
													Cancel
												</Button>
											</div>
										</form>
									) : (
										<div>
											{userShippingAddress ? (
												<div className="p-4 border border-border rounded-md">
													<p className="mb-1">
														{userShippingAddress.street_address}
													</p>
													<p className="mb-1">
														{userShippingAddress.city},{" "}
														{userShippingAddress.state}{" "}
														{userShippingAddress.postal_code}
													</p>
													<p>{userShippingAddress.country}</p>

													<div className="mt-4 flex space-x-4">
														<Button onClick={() => setIsEditingAddress(true)}>
															Edit Address
														</Button>
														<Button
															variant="outline"
															onClick={handleDeleteAddress}
														>
															Delete
														</Button>
													</div>
												</div>
											) : (
												<div>
													<div className="p-4 border border-border rounded-md bg-muted/30">
														<p className="text-muted-foreground italic">
															No shipping address on file.
														</p>
													</div>
													<Button
														className="mt-4"
														onClick={() => setIsEditingAddress(true)}
													>
														Add Shipping Address
													</Button>
												</div>
											)}
										</div>
									)}
								</div>

								<div className="mt-8">
									<h3 className="text-xl font-playfair font-semibold mb-4">
										Change Password
									</h3>
									<Button variant="outline">Update Password</Button>
								</div>
							</div>
						)}

						{activeTab === "orders" && (
							<div className="bg-white rounded-lg shadow-md p-6">
								<h2 className="text-2xl font-playfair font-semibold mb-6">
									Order History
								</h2>

								{orders.length > 0 ? (
									<div className="overflow-x-auto">
										<table className="w-full">
											<thead>
												<tr className="border-b border-border">
													<th className="text-left pb-3">Order</th>
													<th className="text-left pb-3">Date</th>
													<th className="text-left pb-3">Status</th>
													<th className="text-left pb-3">Total</th>
													<th className="text-left pb-3">Items</th>
													<th className="text-left pb-3"></th>
												</tr>
											</thead>
											<tbody>
												{orders.map(order => (
													<tr key={order.id} className="border-b border-border">
														<td className="py-4">{order.id.slice(0, 8)}</td>
														<td className="py-4">
															{new Date(order.created_at).toLocaleDateString()}
														</td>
														<td className="py-4">
															<span
																className={`px-2 py-1 rounded-full text-xs ${getStatusStyle(
																	order.status
																)}`}
															>
																{formatStatus(order.status)}
															</span>
														</td>
														<td className="py-4">
															${order.total_amount.toFixed(2)}
														</td>
														<td className="py-4">{order.item_count}</td>
														<td className="py-4">
															<button className="text-deepblue hover:underline text-sm">
																Details
															</button>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								) : (
									<div className="text-center py-8">
										<p className="text-muted-foreground mb-4">
											You haven't placed any orders yet.
										</p>
										<Button asChild>
											<Link to="/books">Start Shopping</Link>
										</Button>
									</div>
								)}
							</div>
						)}

						{activeTab === "wishlist" && (
							<div className="bg-white rounded-lg shadow-md p-6">
								<h2 className="text-2xl font-playfair font-semibold mb-6">
									My Wishlist
								</h2>
								<div className="text-center py-8">
									<p className="text-muted-foreground mb-4">
										Your wishlist is empty.
									</p>
									<Button asChild>
										<Link to="/books">Discover Books</Link>
									</Button>
								</div>
							</div>
						)}

						{activeTab === "settings" && (
							<div className="bg-white rounded-lg shadow-md p-6">
								<h2 className="text-2xl font-playfair font-semibold mb-6">
									Account Settings
								</h2>

								<div className="space-y-6">
									<div>
										<h3 className="text-lg font-medium mb-4">
											Email Preferences
										</h3>
										<div className="space-y-3">
											<div className="flex items-center">
												<input
													type="checkbox"
													id="newsletter"
													checked
													className="mr-3 rounded border-border"
													onChange={() => {}}
												/>
												<label htmlFor="newsletter">Newsletter</label>
											</div>
											<div className="flex items-center">
												<input
													type="checkbox"
													id="order-updates"
													checked
													className="mr-3 rounded border-border"
													onChange={() => {}}
												/>
												<label htmlFor="order-updates">Order updates</label>
											</div>
											<div className="flex items-center">
												<input
													type="checkbox"
													id="promotions"
													className="mr-3 rounded border-border"
													onChange={() => {}}
												/>
												<label htmlFor="promotions">
													Promotions and discounts
												</label>
											</div>
										</div>
									</div>

									<div>
										<h3 className="text-lg font-medium mb-4">
											Account Management
										</h3>
										<Button
											variant="outline"
											className="mr-4"
											onClick={() => {
												setActiveTab("profile")
												setIsEditingProfile(true)
											}}
										>
											Update Profile
										</Button>
										<Button variant="destructive">Delete Account</Button>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
			</div>
		</Layout>
	)
}

export default Account

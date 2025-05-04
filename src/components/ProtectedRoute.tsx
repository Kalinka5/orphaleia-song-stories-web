import { useAuth } from "@/context/AuthContext"
import { Loader2 } from "lucide-react"
import React from "react"
import { Navigate, Outlet } from "react-router-dom"

const ProtectedRoute: React.FC = () => {
	const { isAuthenticated, loading } = useAuth()

	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
				<Loader2 className="h-8 w-8 animate-spin text-gold" />
			</div>
		)
	}

	if (!isAuthenticated) {
		return <Navigate to="/login" replace />
	}

	return <Outlet />
}

export default ProtectedRoute

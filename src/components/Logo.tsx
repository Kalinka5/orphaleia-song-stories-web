import React from "react"
import { Link } from "react-router-dom"
import logoImage from "../assets/orphaleia_logo_transparent.png"

interface LogoProps {
	variant?: "default" | "footer"
}

const Logo: React.FC<LogoProps> = ({ variant = "default" }) => {
	return (
		<Link
			to="/"
			className={`flex items-center gap-2 ${
				variant === "footer" ? "text-white" : "text-deepblue"
			}`}
		>
			<img
				src={logoImage}
				alt="Orphaleia Logo"
				className={`h-10 w-auto ${
					variant === "footer" ? "brightness-100" : ""
				}`}
			/>
			<span className="font-playfair text-2xl font-semibold tracking-tight">
				Orphaleia
			</span>
		</Link>
	)
}

export default Logo

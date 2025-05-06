import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { wishlistApi } from "@/lib/api"
import { Heart } from "lucide-react"
import { useEffect, useState } from "react"

interface WishlistButtonProps {
	bookId: string
	variant?:
		| "default"
		| "outline"
		| "ghost"
		| "link"
		| "destructive"
		| "secondary"
	size?: "default" | "sm" | "lg" | "icon"
	className?: string
}

const WishlistButton = ({
	bookId,
	variant = "ghost",
	size = "icon",
	className = "",
}: WishlistButtonProps) => {
	const [isInWishlist, setIsInWishlist] = useState(false)
	const [isLoading, setIsLoading] = useState(false)
	const { toast } = useToast()

	useEffect(() => {
		const checkWishlistStatus = async () => {
			try {
				const status = await wishlistApi.isInWishlist(bookId)
				setIsInWishlist(status)
			} catch (error) {
				console.error("Error checking wishlist status:", error)
			}
		}

		checkWishlistStatus()
	}, [bookId])

	const toggleWishlist = async () => {
		try {
			setIsLoading(true)

			if (isInWishlist) {
				await wishlistApi.removeFromWishlist(bookId)
				setIsInWishlist(false)
				toast({
					title: "Removed from wishlist",
					description: "The book has been removed from your wishlist.",
				})
			} else {
				await wishlistApi.addToWishlist(bookId)
				setIsInWishlist(true)
				toast({
					title: "Added to wishlist",
					description: "The book has been added to your wishlist.",
				})
			}
		} catch (error) {
			console.error("Error updating wishlist:", error)
			toast({
				title: "Error",
				description: "Could not update your wishlist. Please try again.",
				variant: "destructive",
			})
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<Button
			variant={variant}
			size={size}
			onClick={toggleWishlist}
			disabled={isLoading}
			aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
			className={className}
		>
			<Heart
				className={`${isInWishlist ? "fill-red-500 text-red-500" : ""}`}
				size={size === "icon" ? 20 : 16}
			/>
		</Button>
	)
}

export default WishlistButton

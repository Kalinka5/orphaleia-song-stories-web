import BookCard from "@/components/BookCard"
import Layout from "@/components/Layout"
import WishlistButton from "@/components/WishlistButton"
import { Button } from "@/components/ui/button"
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { booksApi } from "@/lib/api"
import { Book } from "@/types/book"
import { Play, Share, ShoppingCart } from "lucide-react"
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"

const BookDetail: React.FC = () => {
	const { id } = useParams<{ id: string }>()
	const [book, setBook] = useState<Book | null>(null)
	const [relatedBooks, setRelatedBooks] = useState<Book[]>([])
	const { toast } = useToast()
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [showPreview, setShowPreview] = useState(false)

	useEffect(() => {
		const fetchBookDetail = async () => {
			try {
				setIsLoading(true)
				setError(null)

				if (!id) {
					setError("Book ID is missing")
					return
				}

				// Fetch book details
				const bookData = await booksApi.getBook(id)
				setBook(bookData)

				// Fetch related books from the same category
				if (bookData?.category) {
					const relatedData = await booksApi.getBooksByCategory(
						bookData.category
					)
					// Filter out the current book and limit to 3 related books
					setRelatedBooks(relatedData.filter(b => b.id !== id).slice(0, 3))
				}
			} catch (err) {
				console.error("Error fetching book details:", err)
				setError("Failed to load book details")
			} finally {
				setIsLoading(false)
			}
		}

		fetchBookDetail()
	}, [id])

	const addToCart = () => {
		toast({
			title: "Added to cart",
			description: `${book?.title} has been added to your cart.`,
		})
	}

	if (isLoading) {
		return (
			<Layout>
				<div className="container mx-auto px-4 py-12">
					<div className="text-center">
						<div className="w-12 h-12 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto"></div>
						<p className="mt-4 text-muted-foreground">
							Loading book details...
						</p>
					</div>
				</div>
			</Layout>
		)
	}

	if (error || !book) {
		return (
			<Layout>
				<div className="container mx-auto px-4 py-12 text-center">
					<h1 className="text-3xl font-playfair font-bold mb-4">
						Book Not Found
					</h1>
					<p className="text-muted-foreground mb-8">
						{error || "The book you're looking for doesn't exist."}
					</p>
					<Button asChild>
						<Link to="/books">Browse All Books</Link>
					</Button>
				</div>
			</Layout>
		)
	}

	return (
		<Layout>
			<div className="container mx-auto px-4 py-12">
				<nav className="flex mb-8 text-sm">
					<ol className="flex items-center space-x-2">
						<li>
							<Link
								to="/"
								className="text-muted-foreground hover:text-deepblue"
							>
								Home
							</Link>
						</li>
						<li className="text-muted-foreground">/</li>
						<li>
							<Link
								to="/books"
								className="text-muted-foreground hover:text-deepblue"
							>
								Books
							</Link>
						</li>
						<li className="text-muted-foreground">/</li>
						<li className="text-deepblue font-medium">{book.title}</li>
					</ol>
				</nav>

				<div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
					<div className="flex justify-center">
						<div className="relative max-w-md">
							<img
								src={book.cover}
								alt={book.title}
								className="w-full h-auto rounded-lg shadow-lg"
							/>
							<div className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md">
								<WishlistButton
									bookId={book.id}
									variant="ghost"
									size="icon"
									className="text-muted-foreground hover:text-red-500"
								/>
							</div>
						</div>
					</div>

					<div>
						<div className="mb-6">
							<div className="inline-block px-3 py-1 bg-gold/20 text-deepblue text-sm rounded-full mb-4">
								{book.category.charAt(0).toUpperCase() + book.category.slice(1)}
							</div>
							<h1 className="text-3xl md:text-4xl font-playfair font-bold mb-2">
								{book.title}
							</h1>
							<p className="text-xl text-muted-foreground">by {book.author}</p>
						</div>

						<div className="decorative-line"></div>

						<div className="my-6">
							<p className="text-lg mb-4">${book.price.toFixed(2)}</p>
							<div className="flex flex-wrap gap-4">
								<Button className="flex items-center gap-2" onClick={addToCart}>
									<ShoppingCart size={18} />
									Add to Cart
								</Button>
								<Dialog open={showPreview} onOpenChange={setShowPreview}>
									<DialogTrigger asChild>
										<Button
											variant="outline"
											className="flex items-center gap-2"
										>
											<Play size={18} />
											Preview
										</Button>
									</DialogTrigger>
									<DialogContent className="sm:max-w-[700px]">
										<DialogHeader>
											<DialogTitle>{book.title} - Book Preview</DialogTitle>
										</DialogHeader>
										<div className="mt-4">
											<video
												controls
												width="100%"
												className="rounded-md"
												autoPlay
											>
												<source
													src="https://kalinanews-bucket.s3.eu-north-1.amazonaws.com/invideo-ai-1080+The+Iliad_+Epic+Tale+of+War+and+Heroism+2025-05-06.mp4"
													type="video/mp4"
												/>
												Your browser does not support the video tag.
											</video>
										</div>
									</DialogContent>
								</Dialog>
								<div className="hidden">
									<WishlistButton
										bookId={book.id}
										className={`wishlist-btn-${book.id}`}
									/>
								</div>
							</div>
						</div>

						<div className="mt-8">
							<h2 className="text-xl font-playfair font-semibold mb-4">
								Description
							</h2>
							<p className="text-muted-foreground">{book.description}</p>
						</div>

						<div className="mt-8">
							<h2 className="text-xl font-playfair font-semibold mb-4">
								Book Details
							</h2>
							<div className="grid grid-cols-2 gap-4 text-sm">
								<div>
									<p className="font-medium">Publisher</p>
									<p className="text-muted-foreground">{book.publisher}</p>
								</div>
								<div>
									<p className="font-medium">Publication Date</p>
									<p className="text-muted-foreground">
										{new Date(book.publicationDate).toLocaleDateString(
											"en-US",
											{ year: "numeric", month: "long", day: "numeric" }
										)}
									</p>
								</div>
								<div>
									<p className="font-medium">ISBN</p>
									<p className="text-muted-foreground">{book.isbn}</p>
								</div>
								<div>
									<p className="font-medium">Pages</p>
									<p className="text-muted-foreground">{book.pages}</p>
								</div>
								<div>
									<p className="font-medium">Format</p>
									<p className="text-muted-foreground">{book.format}</p>
								</div>
							</div>
						</div>

						<div className="mt-8 flex items-center gap-4">
							<span className="font-medium">Share:</span>
							<div className="flex gap-2">
								<button className="p-2 rounded-full bg-muted hover:bg-muted/80">
									<Share size={16} />
								</button>
							</div>
						</div>
					</div>
				</div>

				{relatedBooks.length > 0 && (
					<div className="mt-16">
						<h2 className="text-2xl font-playfair font-bold mb-6">
							You Might Also Like
						</h2>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
							{relatedBooks.map(book => (
								<BookCard key={book.id} book={book} />
							))}
						</div>
					</div>
				)}
			</div>
		</Layout>
	)
}

export default BookDetail

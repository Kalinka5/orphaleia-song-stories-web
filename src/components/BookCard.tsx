import WishlistButton from "@/components/WishlistButton"
import { Book } from "@/types/book"
import React from "react"
import { Link } from "react-router-dom"

interface BookCardProps {
	book: Book
}

const BookCard: React.FC<BookCardProps> = ({ book }) => {
	return (
		<div className="book-card group">
			<div className="relative overflow-hidden">
				<img
					src={book.cover}
					alt={`${book.title} by ${book.author}`}
					className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
				/>
				<div className="absolute top-2 right-2 z-10">
					<WishlistButton
						bookId={book.id}
						variant="secondary"
						size="icon"
						className="bg-white/90 hover:bg-white shadow-sm"
					/>
				</div>
				<div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center p-4">
					<Link
						to={`/books/${book.id}`}
						className="bg-gold text-deepblue px-4 py-2 rounded-md text-sm font-medium hover:bg-opacity-90 transition-colors"
					>
						View Details
					</Link>
				</div>
			</div>
			<div className="p-4">
				<Link to={`/books/${book.id}`} className="book-link">
					<h3 className="font-playfair font-medium text-lg">{book.title}</h3>
				</Link>
				<p className="text-sm text-muted-foreground mt-1">{book.author}</p>
				<div className="mt-2 flex justify-between items-center">
					<span className="font-medium">${book.price.toFixed(2)}</span>
					<div className="text-xs px-2 py-1 bg-muted rounded-full">
						{book.category}
					</div>
				</div>
			</div>
		</div>
	)
}

export default BookCard

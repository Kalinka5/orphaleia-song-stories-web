import { Book } from "./book"

export interface WishlistItem {
	id: string
	user_id: string
	book_id: string
	book?: Book
	added_at: string
}

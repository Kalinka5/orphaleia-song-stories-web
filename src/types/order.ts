export interface OrderItem {
	id: string
	book_id: string
	quantity: number
	unit_price: number
	created_at: string
	order_id: string
}

export interface Order {
	id: string
	user_id: string
	status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
	total_amount: number
	shipping_address: string
	payment_id?: string
	created_at: string
	updated_at: string
	items: OrderItem[]
	item_count: number
}

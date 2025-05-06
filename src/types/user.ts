export interface User {
	id: string
	email: string
	full_name: string
	is_active: boolean
	is_admin: boolean
	created_at: string
	updated_at: string
	shipping_address?: ShippingAddress
}

export interface ShippingAddress {
	id: string
	user_id: string
	street_address: string
	city: string
	state: string
	postal_code: string
	country: string
}


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { books } from '@/data/books';
import { Book } from '@/types/book';
import { Minus, Plus, X } from 'lucide-react';

// Mock initial cart data
const initialCartItems: {book: Book, quantity: number}[] = [
  { book: books[0], quantity: 1 },
  { book: books[2], quantity: 1 }
];

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const { toast } = useToast();

  const updateQuantity = (bookId: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(items => 
      items.map(item => 
        item.book.id === bookId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeFromCart = (bookId: string) => {
    setCartItems(items => items.filter(item => item.book.id !== bookId));
    toast({
      title: "Item removed",
      description: "The item has been removed from your cart.",
    });
  };

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + item.book.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    toast({
      title: "Proceeding to checkout",
      description: "This feature will be implemented soon!",
    });
  };

  return (
    <Layout>
      <div className="bg-deepblue text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold">Your Cart</h1>
          <div className="decorative-line"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 border-b border-border">
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-playfair font-semibold">Shopping Cart</h2>
                    <p className="text-muted-foreground">{cartItems.length} Items</p>
                  </div>
                </div>
                
                {cartItems.map((item) => (
                  <div key={item.book.id} className="p-6 border-b border-border flex flex-col sm:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <img 
                        src={item.book.cover} 
                        alt={item.book.title} 
                        className="w-24 h-36 object-cover rounded-md"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <div className="flex justify-between items-start">
                        <div>
                          <Link to={`/books/${item.book.id}`} className="book-link">
                            <h3 className="font-playfair font-medium text-lg">{item.book.title}</h3>
                          </Link>
                          <p className="text-sm text-muted-foreground">{item.book.author}</p>
                          <p className="text-sm mt-1">Format: {item.book.format}</p>
                        </div>
                        
                        <button 
                          onClick={() => removeFromCart(item.book.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors"
                          aria-label="Remove item"
                        >
                          <X size={18} />
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-end mt-4">
                        <div className="flex items-center border border-border rounded-md">
                          <button 
                            onClick={() => updateQuantity(item.book.id, item.quantity - 1)}
                            className="px-3 py-1 text-muted-foreground hover:text-foreground transition-colors"
                            disabled={item.quantity <= 1}
                            aria-label="Decrease quantity"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="px-3 py-1">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.book.id, item.quantity + 1)}
                            className="px-3 py-1 text-muted-foreground hover:text-foreground transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="font-medium">${(item.book.price * item.quantity).toFixed(2)}</p>
                          <p className="text-sm text-muted-foreground">${item.book.price.toFixed(2)} each</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-6">
                <h2 className="text-xl font-playfair font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${getSubtotal().toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="border-t border-border my-4 pt-4 flex justify-between font-medium">
                    <span>Total</span>
                    <span>${getSubtotal().toFixed(2)}</span>
                  </div>
                </div>
                
                <Button 
                  onClick={handleCheckout}
                  className="w-full mt-4 py-3"
                >
                  Proceed to Checkout
                </Button>
                
                <div className="mt-6">
                  <h3 className="font-medium mb-3">Discount Code</h3>
                  <div className="flex">
                    <input 
                      type="text" 
                      placeholder="Enter code" 
                      className="flex-grow px-3 py-2 border border-border rounded-l-md focus:outline-none focus:ring-1 focus:ring-gold"
                    />
                    <button className="bg-muted text-muted-foreground px-4 py-2 rounded-r-md hover:bg-muted/80 transition-colors">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h2 className="text-2xl font-playfair font-semibold mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">
                Looks like you haven't added any books to your cart yet. 
                Discover our collection and find your next favorite read.
              </p>
              <Button asChild>
                <Link to="/books">Browse Books</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;

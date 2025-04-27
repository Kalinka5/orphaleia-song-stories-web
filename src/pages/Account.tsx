
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { User, Package, Heart, LogOut, Settings, Mail, Key } from 'lucide-react';

// Mock user data
const userData = {
  name: 'Jane Smith',
  email: 'jane.smith@example.com',
  joinDate: '2023-01-15'
};

// Mock order data
const orderData = [
  {
    id: 'ORD-1234',
    date: '2023-09-15',
    status: 'Delivered',
    total: 53.97,
    items: 3
  },
  {
    id: 'ORD-5678',
    date: '2023-10-28',
    status: 'Processing',
    total: 29.99,
    items: 1
  }
];

const Account: React.FC = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { toast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });

  const handleLoginFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value
    });
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login functionality
    toast({
      title: "Logged in successfully",
      description: "Welcome back to Orphaleia!",
    });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  if (!isLoggedIn) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-playfair font-bold mb-6 text-center">Sign In</h1>
            <div className="decorative-line mx-auto mb-6"></div>
            
            <div className="bg-white rounded-lg shadow-md p-8">
              <form onSubmit={handleLoginSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-muted-foreground" size={18} />
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
                  <label htmlFor="password" className="block mb-2 font-medium">Password</label>
                  <div className="relative">
                    <Key className="absolute left-3 top-3 text-muted-foreground" size={18} />
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
                    <input type="checkbox" className="mr-2 rounded border-border" />
                    <span className="text-sm">Remember me</span>
                  </label>
                  <Link to="/forgot-password" className="text-sm text-deepblue hover:underline">
                    Forgot password?
                  </Link>
                </div>
                
                <Button type="submit" className="w-full py-3">
                  Sign In
                </Button>
              </form>
              
              <div className="mt-6 text-center">
                <p className="text-muted-foreground">
                  Don't have an account?{' '}
                  <Link to="/register" className="text-deepblue hover:underline">
                    Create account
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-deepblue text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-playfair font-bold">My Account</h1>
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
                    <h2 className="font-medium">{userData.name}</h2>
                    <p className="text-sm text-muted-foreground">{userData.email}</p>
                  </div>
                </div>
              </div>
              
              <nav className="p-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                    activeTab === 'profile' ? 'bg-gold/20 text-deepblue' : 'hover:bg-muted'
                  }`}
                >
                  <User size={18} />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                    activeTab === 'orders' ? 'bg-gold/20 text-deepblue' : 'hover:bg-muted'
                  }`}
                >
                  <Package size={18} />
                  <span>Orders</span>
                </button>
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                    activeTab === 'wishlist' ? 'bg-gold/20 text-deepblue' : 'hover:bg-muted'
                  }`}
                >
                  <Heart size={18} />
                  <span>Wishlist</span>
                </button>
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${
                    activeTab === 'settings' ? 'bg-gold/20 text-deepblue' : 'hover:bg-muted'
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
            {activeTab === 'profile' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-playfair font-semibold mb-6">Profile Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block mb-2 font-medium">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      value={userData.name}
                      className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                    <input
                      type="email"
                      id="email"
                      value={userData.email}
                      className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                      readOnly
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="join-date" className="block mb-2 font-medium">Member Since</label>
                    <input
                      type="text"
                      id="join-date"
                      value={new Date(userData.joinDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      className="w-full px-4 py-3 border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-gold"
                      readOnly
                    />
                  </div>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-playfair font-semibold mb-4">Shipping Address</h3>
                  <div className="p-4 border border-border rounded-md bg-muted/30">
                    <p className="text-muted-foreground italic">No shipping address on file.</p>
                  </div>
                  
                  <Button className="mt-4">
                    Add Shipping Address
                  </Button>
                </div>
                
                <div className="mt-8">
                  <h3 className="text-xl font-playfair font-semibold mb-4">Change Password</h3>
                  <Button variant="outline">
                    Update Password
                  </Button>
                </div>
              </div>
            )}
            
            {activeTab === 'orders' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-playfair font-semibold mb-6">Order History</h2>
                
                {orderData.length > 0 ? (
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
                        {orderData.map(order => (
                          <tr key={order.id} className="border-b border-border">
                            <td className="py-4">{order.id}</td>
                            <td className="py-4">{new Date(order.date).toLocaleDateString()}</td>
                            <td className="py-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-4">${order.total.toFixed(2)}</td>
                            <td className="py-4">{order.items}</td>
                            <td className="py-4">
                              <button className="text-deepblue hover:underline text-sm">Details</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
                    <Button asChild>
                      <Link to="/books">Start Shopping</Link>
                    </Button>
                  </div>
                )}
              </div>
            )}
            
            {activeTab === 'wishlist' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-playfair font-semibold mb-6">My Wishlist</h2>
                <div className="text-center py-8">
                  <p className="text-muted-foreground mb-4">Your wishlist is empty.</p>
                  <Button asChild>
                    <Link to="/books">Discover Books</Link>
                  </Button>
                </div>
              </div>
            )}
            
            {activeTab === 'settings' && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-2xl font-playfair font-semibold mb-6">Account Settings</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Email Preferences</h3>
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
                        <label htmlFor="promotions">Promotions and discounts</label>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Account Management</h3>
                    <Button variant="outline" className="mr-4">
                      Update Profile
                    </Button>
                    <Button variant="destructive">
                      Delete Account
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;

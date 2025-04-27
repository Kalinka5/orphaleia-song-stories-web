
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Key, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    // Implement registration logic here
    toast({
      title: "Registration Successful",
      description: "Welcome to Orphaleia!",
    });
    navigate('/login');
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-playfair font-bold mb-6 text-center">Create Account</h1>
          <div className="decorative-line mx-auto mb-6"></div>
          
          <div className="bg-white rounded-lg shadow-md p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block mb-2 font-medium">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 text-muted-foreground" size={18} />
                  <Input
                    type="text"
                    id="name"
                    required
                    className="pl-10"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block mb-2 font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 text-muted-foreground" size={18} />
                  <Input
                    type="email"
                    id="email"
                    required
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block mb-2 font-medium">Password</label>
                <div className="relative">
                  <Key className="absolute left-3 top-3 text-muted-foreground" size={18} />
                  <Input
                    type="password"
                    id="password"
                    required
                    className="pl-10"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block mb-2 font-medium">Confirm Password</label>
                <div className="relative">
                  <Key className="absolute left-3 top-3 text-muted-foreground" size={18} />
                  <Input
                    type="password"
                    id="confirmPassword"
                    required
                    className="pl-10"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                </div>
              </div>
              
              <div className="flex items-start">
                <input type="checkbox" required className="mt-1 mr-2 rounded border-border" />
                <span className="text-sm">
                  I agree to the{' '}
                  <Link to="/terms-of-service" className="text-deepblue hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link to="/privacy-policy" className="text-deepblue hover:underline">Privacy Policy</Link>
                </span>
              </div>
              
              <Button type="submit" className="w-full py-3 bg-gold text-deepblue hover:bg-gold/90">
                Create Account
              </Button>
            </form>
            
            <div className="mt-6 text-center">
              <p className="text-muted-foreground">
                Already have an account?{' '}
                <Link to="/login" className="text-deepblue hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;

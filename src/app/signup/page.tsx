"use client"
import { useState } from "react";
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { prisma } from "@/lib/db";
import axios from "axios"
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const router=useRouter();

  const handleSubmit = async(e: React.FormEvent) => {
  e.preventDefault();
  
  // Validate passwords match
  if (formData.password !== formData.confirmPassword) {
    alert('Passwords do not match');
    return;
  }

  try {
    const response = await axios.post('/api/registration', {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    });

    // Axios automatically parses JSON response
    if (response.status === 201) {
      alert('Account created successfully! You can now sign in.');
      router.push('/signin');
    }
  } catch (error) {
    console.error('Registration error:', error);
    
    // Handle Axios error responses
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.error || 'Registration failed';
      alert(errorMessage); 
    } else {
      alert('Something went wrong during registration');
    }
  }
};

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="text-4xl font-extralight tracking-widest text-slate-900 mb-4 block">
            SOLESTYLE
          </Link>
          <h1 className="text-2xl font-light tracking-wide text-slate-900 mb-3">Create Account</h1>
          <p className="text-slate-600 font-light">Join our community today</p>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg rounded-3xl">
          <CardContent className="p-10">            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    type="text"
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                    className="pl-12 py-4 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-2xl bg-white/80"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={(e) => handleChange("email", e.target.value)}
                    className="pl-12 py-4 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-2xl bg-white/80"
                    required
                  />
                </div>
              </div>              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={(e) => handleChange("password", e.target.value)}
                    className="pl-12 pr-12 py-4 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-2xl bg-white/80"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </Button>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={(e) => handleChange("confirmPassword", e.target.value)}
                    className="pl-12 pr-12 py-4 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-2xl bg-white/80"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-start space-x-3 pt-2">
                <input type="checkbox" required className="mt-1 rounded border-slate-300" />
                <span className="text-sm text-slate-600 font-light">
                  I agree to the{" "}
                  <Link href="#" className="text-slate-900 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="text-slate-900 hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </div>              <Button
                type="submit"
                className="w-full bg-slate-700 hover:bg-slate-800 text-white py-4 font-light tracking-wide rounded-2xl transform transition-all duration-200 hover:scale-105 shadow-lg"
              >
                CREATE ACCOUNT
              </Button>
            </form>

            <div className="mt-10 pt-8 border-t border-slate-200">
              <div className="text-center text-sm text-slate-600">
                Already have an account?{" "}
                <Link href="/signin" className="text-slate-900 hover:underline font-medium">
                  Sign in
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;

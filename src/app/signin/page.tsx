"use client"
import { useState } from "react";
import Link from "next/link"
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
    const res = await signIn('credentials', {
      email: email,
      password: password,
      redirect: false, // Changed to false to handle manually
      callbackUrl: "/"
    });
    
    if (res?.ok && !res?.error) {
      router.push("/");
    } else {
      if (res?.status === 401) {
        alert('Invalid Credentials, try again!');
      } else if (res?.status === 400) {
        alert('Missing Credentials!');
      } else if (res?.status === 404) {
        alert('Account not found!');
      } else if (res?.status === 403) {
        alert('Forbidden!');
      } else {
        alert('oops something went wrong..!');
      }
    }
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-light tracking-wider text-stone-900 mb-2">Welcome Back</h1>
          <p className="text-stone-600">Sign in to your account</p>
        </div>

        <Card className="bg-white border-stone-200 shadow-sm">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-stone-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 border-stone-200 focus:border-stone-400 focus:ring-stone-400"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-stone-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 border-stone-200 focus:border-stone-400 focus:ring-stone-400"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 text-sm text-stone-600">
                  <input type="checkbox" className="rounded border-stone-300" />
                  <span>Remember me</span>
                </label>
                <Link href="#" className="text-sm text-stone-900 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="w-full bg-stone-900 hover:bg-stone-800 text-white py-3 font-medium tracking-wide"
              >
                SIGN IN
              </Button>
            </form>

            <div className="mt-8 pt-6 border-t border-stone-200">
              <div className="text-center text-sm text-stone-600">
                Don't have an account?{" "}
                <Link href="/signup" className="text-stone-900 hover:underline font-medium">
                  Create one
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
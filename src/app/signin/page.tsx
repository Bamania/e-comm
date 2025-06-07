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
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="text-4xl font-extralight tracking-widest text-slate-900 mb-4 block">
            SOLESTYLE
          </Link>
          <h1 className="text-2xl font-light tracking-wide text-slate-900 mb-3">Welcome Back</h1>
          <p className="text-slate-600 font-light">Sign in to your account</p>
        </div>

        <Card className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-lg rounded-3xl">
          <CardContent className="p-10">            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-12 py-4 border-slate-200 focus:border-slate-400 focus:ring-slate-400 rounded-2xl bg-white/80"
                    required
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-sm font-medium text-slate-700">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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

              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-3 text-sm text-slate-600">
                  <input type="checkbox" className="rounded border-slate-300" />
                  <span>Remember me</span>
                </label>
                <Link href="#" className="text-sm text-slate-900 hover:underline">
                  Forgot password?
                </Link>
              </div>              <Button
                type="submit"
                className="w-full bg-slate-700 hover:bg-slate-800 text-white py-4 font-light tracking-wide rounded-2xl transform transition-all duration-200 hover:scale-105 shadow-lg"
              >
                SIGN IN
              </Button>
            </form>

            <div className="mt-10 pt-8 border-t border-slate-200">
              <div className="text-center text-sm text-slate-600">
                Don't have an account?{" "}
                <Link href="/signup" className="text-slate-900 hover:underline font-medium">
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
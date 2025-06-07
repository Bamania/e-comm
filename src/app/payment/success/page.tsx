"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Package, Home, ShoppingBag } from "lucide-react"

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg text-center bg-white/90 backdrop-blur-sm border-slate-200 shadow-xl rounded-3xl">
        <CardContent className="p-12 space-y-8">
          <div>
            <Link href="/" className="text-2xl font-extralight tracking-widest text-slate-900 mb-8 block">
              SOLESTYLE
            </Link>
          </div>
          
          <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-10 h-10 text-emerald-600" />
          </div>
          
          <div>
            <h1 className="text-3xl font-light text-slate-900 mb-4 tracking-wide">
              Payment Successful!
            </h1>
            <p className="text-slate-600 font-light leading-relaxed">
              Your order has been placed successfully. You will receive a confirmation email shortly.
            </p>
          </div>

          <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
            <div className="flex items-center justify-center gap-3 text-slate-600">
              <Package className="w-5 h-5" />
              <span className="font-light">Expected delivery: 3-5 business days</span>
            </div>
          </div>

          <div className="space-y-4">
            <Link href="/products" className="block">
              <Button className="w-full bg-slate-700 hover:bg-slate-800 py-4 rounded-2xl font-light tracking-wide transform transition-all duration-200 hover:scale-105 shadow-lg">
                <ShoppingBag className="w-5 h-5 mr-2" />
                Continue Shopping
              </Button>
            </Link>
            
            <Link href="/" className="block">
              <Button variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 py-4 rounded-2xl font-light">
                <Home className="w-5 h-5 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

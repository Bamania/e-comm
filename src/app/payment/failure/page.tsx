"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { XCircle, RefreshCw, ArrowLeft, Home } from "lucide-react"

export default function PaymentFailurePage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg text-center bg-white/90 backdrop-blur-sm border-slate-200 shadow-xl rounded-3xl">
        <CardContent className="p-12 space-y-8">
          <div>
            <Link href="/" className="text-2xl font-extralight tracking-widest text-slate-900 mb-8 block">
              SOLESTYLE
            </Link>
          </div>
          
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto">
            <XCircle className="w-10 h-10 text-red-500" />
          </div>
          
          <div>
            <h1 className="text-3xl font-light text-slate-900 mb-4 tracking-wide">
              Payment Failed
            </h1>
            <p className="text-slate-600 font-light leading-relaxed">
              Unfortunately, your payment could not be processed. Please try again or contact support.
            </p>
          </div>

          <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 text-slate-600">
            <p className="font-medium mb-3">Common reasons for payment failure:</p>
            <ul className="text-left space-y-2 font-light">
              <li>• Insufficient funds</li>
              <li>• Network connectivity issues</li>
              <li>• Bank server downtime</li>
            </ul>
          </div>

          <div className="space-y-4">
            <Link href="/cart" className="block">
              <Button className="w-full bg-slate-700 hover:bg-slate-800 py-4 rounded-2xl font-light tracking-wide transform transition-all duration-200 hover:scale-105 shadow-lg">
                <RefreshCw className="w-5 h-5 mr-2" />
                Try Again
              </Button>
            </Link>
            
            <Link href="/products" className="block">
              <Button variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 py-4 rounded-2xl font-light">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Back to Products
              </Button>
            </Link>
            
            <Link href="/" className="block">
              <Button variant="ghost" className="w-full text-slate-600 hover:bg-slate-50 py-4 rounded-2xl font-light">
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

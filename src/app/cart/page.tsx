"use client"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Trash2, Plus, Minus, ShoppingCart, ArrowLeft } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, getTotalItems, clearCart } = useCart()
  const session = useSession()
  const router = useRouter()

  if (!session.data) {
    router.push("/signin")
    return <div className="text-4xl flex justify-center items-center text-emerald-400">
      Please Log in to view this page
    </div>
  }

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`
  }
  return (
    <div className="min-h-screen bg-slate-50/30">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-slate-100">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-light tracking-[0.2em] text-slate-900">
              SOLESTYLE
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-slate-600 hover:text-slate-900 transition-colors">
                Products
              </Link>
              <Link href="/cart" className="text-slate-900 font-medium">
                Cart ({getTotalItems()})
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center gap-6 mb-12">
          <Button 
            variant="outline" 
            onClick={() => router.back()}
            className="flex items-center gap-2 border-slate-200 text-slate-600 hover:bg-slate-50"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
          <h1 className="text-4xl font-extralight text-slate-900 tracking-wide">Shopping Cart</h1>
        </div>        {cartItems.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white rounded-3xl p-12 shadow-sm border border-slate-100 max-w-md mx-auto">
              <ShoppingCart className="w-20 h-20 mx-auto text-slate-400 mb-6" />
              <h2 className="text-2xl font-semibold text-slate-900 mb-3">Your cart is empty</h2>
              <p className="text-slate-600 mb-8">Add some products to get started!</p>
              <Link href="/products">
                <Button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-xl">
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-slate-900">Cart Items ({getTotalItems()})</h2>
                <Button 
                  variant="outline" 
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
                >
                  Clear Cart
                </Button>
              </div>
              
              {cartItems.map((item) => (
                <Card key={item.id} className="p-6 border border-slate-100 shadow-sm rounded-2xl bg-white">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-32 h-32 relative">
                      <Image
                        src={item.image_url}
                        alt={item.title}
                        fill
                        className="object-cover rounded-xl"
                        unoptimized
                      />
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <h3 className="font-semibold text-lg text-slate-900">{item.title}</h3>
                      <p className="text-slate-600">{item.brand}</p>
                      <p className="text-sm text-slate-500">Color: {item.color}</p>
                      <p className="text-lg font-bold text-slate-900">{formatPrice(item.price)}</p>
                    </div>
                    
                    <div className="flex flex-col items-end gap-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                          className="w-16 text-center"
                          min="1"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <p className="font-semibold">
                        Total: {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="p-6 sticky top-8">
                <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span>{formatPrice(getTotalPrice())}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>{formatPrice(getTotalPrice() * 0.18)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>{formatPrice(getTotalPrice() + (getTotalPrice() * 0.18))}</span>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full bg-slate-900 hover:bg-slate-800 mb-4">
                  <Link href="/payment" className="flex items-center justify-center w-full">
                    Proceed to Checkout
                  </Link>
                </Button>
                
                <Link href="/products">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

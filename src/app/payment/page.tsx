"use client"
import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ArrowLeft, CreditCard, Wallet, Building2, CheckCircle, AlertCircle } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import { useSession } from "next-auth/react"
import Script from "next/script"
import { log } from "console"

declare global {
  interface Window {
    Razorpay: any;
  }
}

export default function PaymentPage() {
  const { cartItems, getTotalPrice, getTotalItems, clearCart } = useCart()
  const session = useSession()
  const router = useRouter()
  const [paymentMethod, setPaymentMethod] = useState("razorpay")
  const [isProcessing, setIsProcessing] = useState(false)
  const [billingInfo, setBillingInfo] = useState({
    firstName: "",
    lastName: "",
    email: session.data?.user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  })
  const [orderId,setOrderid]=useState()

//   useEffect(() => {
//     // Load Razorpay script
//     const script = document.createElement('script')
//     script.src = 'https://checkout.razorpay.com/v1/checkout.js'
//     script.async = true
//     document.body.appendChild(script)

//     return () => {
//       document.body.removeChild(script)
//     }
//   }, [])
  

  if (!session.data) {
    router.push("/signin")
    return <div className="text-4xl flex justify-center items-center text-emerald-400">
      Please Log in to view this page
    </div>
  }

  if (cartItems.length === 0) {
    router.push("/products")
    return <div className="text-center py-16">
      <p className="text-xl">Your cart is empty. Redirecting to products...</p>
    </div>
  }

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`
  }

  const subtotal = getTotalPrice()
  const tax = subtotal * 0.18
  const shipping = subtotal > 1000 ? 0 : 100
  const total = subtotal + tax + shipping

  const handleInputChange = (field: string, value: string) => {
    setBillingInfo(prev => ({ ...prev, [field]: value }))
  }

  const validateForm = () => {
    const required = ['firstName', 'lastName', 'phone', 'address', 'city', 'state', 'pincode']
    return required.every(field => billingInfo[field as keyof typeof billingInfo].trim() !== '')
  }

  const createRazorpayOrder = async () => {
    try {
    const axios = (await import('axios')).default
    const response = await axios.post('/api/payment/create-order', {
      amount: total * 100, // Razorpay expects amount in paise

    })


    console.log("order creation ->",response.data)
    return response.data
    } catch (error) {
      console.error('Error creating order:', error)
      throw error
    }
  }

  const handleRazorpayPayment = async () => {
    if (!validateForm()) {
      alert('Please fill in all required fields')
      return
    }

    setIsProcessing(true)

    try {
      const orderData = await createRazorpayOrder()
        
      const options = {
        key:process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: orderData.amount,
    
      
        order_id: orderData.id,
        
        handler: async function (response: any) {
          try {
            // Verify payment on server,razor pay executes this only after the payment is done!
            const verifyResponse = await fetch('/api/payment/verify', {
              method: 'POST',
            
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
               
              }),
            })
            const data=await verifyResponse.json()
            console.log("verify response ! ",data)
            if (data.isOk) {
           
              router.push('/payment/success')
            } else {
              throw new Error('Payment verification failed')
            }
          } catch (error) {
            console.error('Payment verification error:', error)
            router.push('/payment/failure')
          }
        },
        modal: {
          ondismiss: function() {
            setIsProcessing(false)
          }
        }
      } 
 
      const rzp = new window.Razorpay(options)
      rzp.open()
    } catch (error) {
      console.error('Payment error:', error)
      alert('Payment failed. Please try again.')
      setIsProcessing(false)
    }
  }

  const handleCODPayment = async () => {
    if (!validateForm()) {
      alert('Please fill in all required fields')
      return
    }

    setIsProcessing(true)

    try {
      const response = await fetch('/api/payment/cod', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          billingInfo,
          cartItems,
          total,
        }),
      })

      if (response.ok) {
        clearCart()
        router.push('/payment/success')
      } else {
        throw new Error('COD order failed')
      }
    } catch (error) {
      console.error('COD error:', error)
      alert('Order failed. Please try again.')
    } finally {
      setIsProcessing(false)
    }
  }

  const handlePayment = () => {
    if (paymentMethod === 'razorpay') {
      handleRazorpayPayment()
    } else if (paymentMethod === 'cod') {
      handleCODPayment()
    }
  }

  return (

    <div className="min-h-screen bg-gray-50">
         <Script
        type="text/javascript"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              SoleStyle
            </Link>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => router.back()}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Cart
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Billing Information */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={billingInfo.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={billingInfo.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={billingInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    disabled
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={billingInfo.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    value={billingInfo.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    required
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={billingInfo.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="state">State *</Label>
                    <Input
                      id="state"
                      value={billingInfo.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="pincode">Pincode *</Label>
                    <Input
                      id="pincode"
                      value={billingInfo.pincode}
                      onChange={(e) => handleInputChange('pincode', e.target.value)}
                      required
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="razorpay" id="razorpay" />
                    <Label htmlFor="razorpay" className="flex items-center gap-2 cursor-pointer">
                      <CreditCard className="w-5 h-5" />
                      <div>
                        <p className="font-medium">Online Payment</p>
                        <p className="text-sm text-gray-500">Credit/Debit Card, UPI, Net Banking</p>
                      </div>
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-2 p-4 border rounded-lg">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer">
                      <Building2 className="w-5 h-5" />
                      <div>
                        <p className="font-medium">Cash on Delivery</p>
                        <p className="text-sm text-gray-500">Pay when you receive your order</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 border rounded-lg">
                      <Image
                        src={item.image_url}
                        alt={item.title}
                        width={60}
                        height={60}
                        className="rounded object-cover"
                        unoptimized
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.title}</h4>
                        <p className="text-xs text-gray-500">{item.brand} • {item.color}</p>
                        <p className="text-sm">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <div className="flex justify-between">
                    <span>Subtotal ({getTotalItems()} items)</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className={shipping === 0 ? "text-green-600" : ""}>
                      {shipping === 0 ? "Free" : formatPrice(shipping)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax (18%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>

                <Button 
                  onClick={handlePayment}
                  disabled={isProcessing}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                >
                  {isProcessing ? (
                    "Processing..."
                  ) : (
                    <>
                      {paymentMethod === 'razorpay' ? (
                        <>
                          <CreditCard className="w-4 h-4 mr-2" />
                          Pay {formatPrice(total)}
                        </>
                      ) : (
                        <>
                          <Building2 className="w-4 h-4 mr-2" />
                          Place Order
                        </>
                      )}
                    </>
                  )}
                </Button>

                {shipping > 0 && (
                  <p className="text-sm text-gray-500 text-center">
                    Add ₹{(1000 - subtotal).toLocaleString()} more for free shipping
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

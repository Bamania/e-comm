import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_ID!,
})

export async function POST(request: NextRequest) {
  try {
    const { amount  } = await request.json()

    const order = await razorpay.orders.create({
      amount,
      currency : 'INR'

    })
    //need to save this order id in the db to invoke which customer has purchased!
    return NextResponse.json(order)
  } catch (error) {
    console.error('Error creating Razorpay order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

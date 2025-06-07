import { NextRequest, NextResponse } from 'next/server'
import Razorpay from 'razorpay'
import nodemailer from 'nodemailer'

const razorpay = new Razorpay({
  key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET_ID!,
})

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your preferred email service
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD, // Use app password for Gmail
  },
})

// Email template function
const generateOrderEmailTemplate = (orderDetails: any) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #333;">Order Confirmation - SOLESTYLE</h2>
      <p>Thank you for your order! Here are your order details:</p>
      
      <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
        <h3>Order Details</h3>
        <p><strong>Order ID:</strong> ${orderDetails.id}</p>
        <p><strong>Amount:</strong> ₹${(orderDetails.amount / 100).toFixed(2)}</p>
        <p><strong>Currency:</strong> ${orderDetails.currency}</p>
        <p><strong>Status:</strong> ${orderDetails.status}</p>
        <p><strong>Created At:</strong> ${new Date(orderDetails.created_at * 1000).toLocaleString()}</p>
      </div>
      
      <p style="margin-top: 20px;">You will receive another email once your payment is confirmed.</p>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
        <p style="color: #666; font-size: 12px;">
          This is an automated email. Please do not reply to this email.
          <br>
          For any queries, contact us at support@solestyle.com
        </p>
      </div>
    </div>
  `
}

export async function POST(request: NextRequest) {
  try {
    const { amount, customerEmail, customerName } = await request.json()

    const order = await razorpay.orders.create({
      amount,
      currency: 'INR'
    })

    // Send confirmation email if customer email is provided
    if (customerEmail) {
      try {
        await transporter.sendMail({
          from: process.env.SMTP_EMAIL,
          to: customerEmail,
          subject: `Order Confirmation - ${order.id} | SOLESTYLE`,
          html: generateOrderEmailTemplate(order),
        })
        
        console.log('Order confirmation email sent to:', customerEmail)
      } catch (emailError) {
        console.error('Error sending email:', emailError)
        // Don't fail the order creation if email fails
      }
    }

    //need to save this order id in the db to invoke which customer has purchased!
    return NextResponse.json({
      ...order,
      emailSent: !!customerEmail
    })
  } catch (error) {
    console.error('Error creating Razorpay order:', error)
    return NextResponse.json(
      { error: 'Failed to create order' },
      { status: 500 }
    )
  }
}

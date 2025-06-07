



import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASSWORD,
  },
});

const generatePaymentSuccessTemplate = (paymentDetails: any) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #28a745;">Payment Successful - SOLESTYLE</h2>
      <p>Great news! Your payment has been successfully processed.</p>
      
      <div style="background-color: #d4edda; padding: 20px; border-radius: 8px; border-left: 4px solid #28a745;">
        <h3>Payment Details</h3>
        <p><strong>Payment ID:</strong> ${paymentDetails.razorpay_payment_id}</p>
        <p><strong>Order ID:</strong> ${paymentDetails.razorpay_order_id}</p>
        <p><strong>Amount:</strong> ₹${(paymentDetails.amount / 100).toFixed(2)}</p>
      </div>
      
      <p style="margin-top: 20px;">Your order is now being processed and you will receive shipping updates soon.</p>
      
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd;">
        <p style="color: #666; font-size: 12px;">
          Thank you for shopping with SOLESTYLE!
          <br>
          For any queries, contact us at support@solestyle.com
        </p>
      </div>
    </div>
  `;
};



export async function POST(request: NextRequest) {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      customerEmail,
      amount,
    } = await request.json();

    // Verify payment signature
    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac("sha256", process.env.RAZORPAY_SECRET_ID!)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature === expectedSign) {
      // Payment is verified
      
      // Send payment success email
      if (customerEmail) {
        try {
          await transporter.sendMail({
            from: process.env.SMTP_EMAIL,
            to: customerEmail,
            subject: `Payment Successful - ${razorpay_order_id} | SOLESTYLE`,
            html: generatePaymentSuccessTemplate({
              razorpay_payment_id,
              razorpay_order_id,
              amount
            }),
          });
          
          console.log('Payment success email sent to:', customerEmail)
        } catch (emailError) {
          console.error('Error sending payment success email:', emailError)
        }
      }

      return NextResponse.json({ 
        message: "Payment verified successfully",
        verified: true 
      })
    } else {
      return NextResponse.json(
        { error: "Invalid payment signature" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error('Error verifying payment:', error)
    return NextResponse.json(
      { error: 'Payment verification failed' },
      { status: 500 }
    )
  }
}
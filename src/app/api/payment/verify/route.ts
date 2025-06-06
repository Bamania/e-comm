// import { NextRequest, NextResponse } from 'next/server'
// import crypto from 'crypto'

// export async function POST(request: NextRequest) {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//       billingInfo,
//       cartItems,
//       total,
//     } = await request.json()

//     const sign = razorpay_order_id + '|' + razorpay_payment_id
//     const expectedSign = crypto
//       .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET!)
//       .update(sign.toString())
//       .digest('hex')

//     if (razorpay_signature === expectedSign) {
//       // Payment is verified - save order to database here
//       console.log('Payment verified successfully')
//       console.log('Order details:', { billingInfo, cartItems, total })
      
//       return NextResponse.json({ success: true })
//     } else {
//       return NextResponse.json(
//         { error: 'Payment verification failed' },
//         { status: 400 }
//       )
//     }
//   } catch (error) {
//     console.error('Error verifying payment:', error)
//     return NextResponse.json(
//       { error: 'Payment verification failed' },
//       { status: 500 }
//     )
//   }
// }




import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const generatedSignature = (
  razorpayOrderId: string,
  razorpayPaymentId: string
) => {
  const keySecret = process.env.RAZORPAY_SECRET_ID as string;

  const sig = crypto
    .createHmac("sha256", keySecret)
    .update(razorpayOrderId + "|" + razorpayPaymentId)
    .digest("hex");
  return sig;
};

export async function POST(request: NextRequest) {
  const {  razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature, } =
    await request.json();

  const signature = generatedSignature(razorpay_order_id, razorpay_payment_id);
  if (signature !== razorpay_signature) {
    return NextResponse.json(
      { message: "payment verification failed", isOk: false },
      { status: 400 }
    );
  }

  // Probably some database calls here to update order or add premium status to user
  return NextResponse.json(
    { message: "payment verified successfully", isOk: true },
    { status: 200 }
  );
}
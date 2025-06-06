import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json()
    if(!name || !email|| !password){
              return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    //check whether the user exists or not !
    const existingUser= await prisma.user.findFirst({
        
            where:{
                name:name,
                email:email
            }
      
    })
    
     if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists with this email' },
        { status: 409 }
      )
    }

    const hashedPassword=await bcrypt.hash(password,12);

    const user=await prisma.user.create({
        data:{
            name:name,
            email:email,
            password:hashedPassword
        },
    })



    return NextResponse.json(
      { message: 'User created successfully', user },
      { status: 201 }
    )

  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
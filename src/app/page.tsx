"use client"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';
export default function Home() {
  const  router=useRouter()
  const session = useSession();
  return (

    <div className="min-h-screen bg-white">
      <h2 className="text-4xl ">{session.data?.user?.email}</h2>
      {/* Header/Navigation */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-semibold uppercase tracking-wider">
                Elegance
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link href="#" className="text-sm uppercase tracking-wider hover:text-gray-600">
                New In
              </Link>
              <Link href="#" className="text-sm uppercase tracking-wider hover:text-gray-600">
                Clothing
              </Link>
              <Link href="#" className="text-sm uppercase tracking-wider hover:text-gray-600">
                Dresses
              </Link>
              <Link href="/products" className="text-sm uppercase tracking-wider hover:text-gray-600">
                Shoes
              </Link>
              <Link href="#" className="text-sm uppercase tracking-wider hover:text-gray-600">
                Accessories
              </Link>
              {session.status}
              {session.data  ?  <Button onClick={()=>{
                signOut()
              }} className="text-sm uppercase tracking-wider hover:text-gray-600">
                Sign Out
              </Button> :   
              <Button onClick={()=>{
                signIn("credentials")
              }} className="text-sm uppercase tracking-wider hover:text-gray-600">
                Sign IN
              </Button>}
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-600 hover:text-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-search"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-user"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>
              <button className="text-gray-600 hover:text-gray-900">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-shopping-bag"
                >
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <path d="M3 6h18" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* Hero Banner */}
        <section className="relative">
          <div className="relative h-[500px] w-full">
            <Image
              src="/placeholder.svg?height=500&width=1920"
              alt="Fashion models in elegant clothing"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
              <h1 className="text-4xl font-light tracking-wider mb-4">LIMITED TIME ONLY</h1>
              <p className="text-5xl font-semibold mb-6">25% OFF DRESSES</p>
              <p className="text-lg mb-8">WHEN YOU SPEND £150 OR MORE</p>
              <Button onClick={()=>router.push("/products")} className="bg-emerald-800 hover:bg-emerald-900 text-white rounded-none px-8 py-6 text-sm uppercase tracking-wider">
                Shop Dresses
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Products Grid */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="relative h-[350px] mb-3">
                  <Image
                    src={`/placeholder.svg?height=350&width=280`}
                    alt="Fashion model"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-sm uppercase tracking-wider">Category {item}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Limited Edition */}
        <section className="container mx-auto px-4 py-8">
          <div className="text-center mb-6">
            <h2 className="text-xl uppercase tracking-wider mb-2">Limited Edition</h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Discover our exclusive collection of limited edition pieces, designed with premium fabrics and exceptional
              craftsmanship.
            </p>
          </div>
          <div className="flex justify-center">
            <Button className="bg-emerald-800 hover:bg-emerald-900 text-white rounded-none px-8 py-6 text-sm uppercase tracking-wider">
              Shop The Collection
            </Button>
          </div>
        </section>

        {/* Summer Whites */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="col-span-2">
              <div className="relative h-[500px]">
                <Image
                  src="/placeholder.svg?height=500&width=800"
                  alt="Model in white outfit"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-xl uppercase tracking-wider mb-2">Summer Whites</h2>
              <p className="text-sm text-gray-600 mb-6">
                Embrace the season with our collection of crisp white pieces, perfect for warm summer days and balmy
                evenings.
              </p>
              <Button className="bg-emerald-800 hover:bg-emerald-900 text-white rounded-none px-8 py-6 text-sm uppercase tracking-wider">
                Shop New In
              </Button>
            </div>
          </div>
        </section>

        {/* Wedding Guest Season */}
        <section className="container mx-auto px-4 py-12 bg-gray-50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center">
              <h2 className="text-xl uppercase tracking-wider mb-2">Wedding Guest Season</h2>
              <p className="text-sm text-gray-600 mb-6">
                Find the perfect outfit for every celebration with our curated collection of elegant dresses and
                sophisticated separates.
              </p>
              <div>
                <Button className="bg-emerald-800 hover:bg-emerald-900 text-white rounded-none px-8 py-6 text-sm uppercase tracking-wider">
                  Shop Wedding Guest
                </Button>
              </div>
            </div>
            <div className="relative h-[400px]">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Models in wedding guest attire"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Mother's Day */}
        <section className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative h-[400px]">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Model in elegant outfit"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-xl uppercase tracking-wider mb-2">In The Diary: Mother's Day</h2>
              <p className="text-sm text-gray-600 mb-6">
                Celebrate the special women in your life with thoughtfully selected gifts that show your appreciation.
              </p>
              <div>
                <Button className="bg-emerald-800 hover:bg-emerald-900 text-white rounded-none px-8 py-6 text-sm uppercase tracking-wider">
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Cool Coordinates */}
        <section className="container mx-auto px-4 py-12 bg-gray-50">
          <div className="text-center mb-6">
            <h2 className="text-xl uppercase tracking-wider mb-2">Cool Coordinates</h2>
            <p className="text-sm text-gray-600 max-w-2xl mx-auto">
              Effortlessly stylish separates designed to be mixed and matched for versatile, polished looks.
            </p>
          </div>
          <div className="flex justify-center">
            <Button className="bg-emerald-800 hover:bg-emerald-900 text-white rounded-none px-8 py-6 text-sm uppercase tracking-wider">
              Shop The Edit
            </Button>
          </div>
        </section>

        {/* Limited Edition Banner */}
        <section className="relative h-[400px] w-full">
          <Image
            src="/placeholder.svg?height=400&width=1920"
            alt="Model in blue outfit"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
            <h2 className="text-3xl font-light tracking-wider mb-6">LIMITED EDITION</h2>
            <Button className="bg-emerald-800 hover:bg-emerald-900 text-white rounded-none px-8 py-6 text-sm uppercase tracking-wider">
              Shop The Limited
            </Button>
          </div>
        </section>

        {/* Social Media */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-xl uppercase tracking-wider mb-2">Share With Us #EleganceStyle</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="relative h-[200px] cursor-pointer">
                <Image
                  src={`/placeholder.svg?height=200&width=200`}
                  alt={`Social media image ${item}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Most Loved Styles */}
        <section className="container mx-auto px-4 py-12">
          <div className="text-center mb-8">
            <h2 className="text-xl uppercase tracking-wider mb-2">Most Loved Styles</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="group cursor-pointer">
                <div className="relative h-[300px] mb-3">
                  <Image
                    src={`/placeholder.svg?height=300&width=240`}
                    alt={`Product ${item}`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-medium">Product Name {item}</h3>
                  <p className="text-sm text-gray-600">£199.00</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-gray-100 py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="text-xl uppercase tracking-wider mb-2">Sign Up For 15% Off</h2>
              <p className="text-sm text-gray-600 mb-6">
                Subscribe to receive updates, access to exclusive deals, and more.
              </p>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="rounded-none border-gray-300 focus:border-emerald-800 focus:ring-emerald-800"
                />
                <Button className="bg-emerald-800 hover:bg-emerald-900 text-white rounded-none">Sign Up</Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-50 py-12 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Customer Care</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Delivery & Returns
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Size Guide
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Shopping With Us</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Store Locator
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Gift Cards
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Student Discount
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Refer a Friend
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">About</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-wider mb-4">Connect</h3>
              <div className="flex space-x-4 mb-4">
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-instagram"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-facebook"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-twitter"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                  </svg>
                </Link>
                <Link href="#" className="text-gray-600 hover:text-gray-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-youtube"
                  >
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                    <path d="m10 15 5-3-5-3z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-200 text-center">
            <p className="text-xs text-gray-600">© 2025 Elegance. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

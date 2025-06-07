"use client"
import Image from "next/image"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter()
  const session = useSession();

  const handleShopClick = () => {
    router.push("/products")
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header/Navigation */}
      <header className="border-b border-slate-100 bg-white/98 backdrop-blur-xl sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-2xl font-light tracking-[0.2em] text-slate-900 hover:text-slate-700 transition-colors">
                SOLESTYLE
              </Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors tracking-wide">
                New In
              </Link>
              <Link href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors tracking-wide">
                Clothing
              </Link>
              <Link href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors tracking-wide">
                Dresses
              </Link>
              <Link href="/products" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors tracking-wide">
                Shoes
              </Link>
              <Link href="#" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors tracking-wide">
                Accessories
              </Link>
              {session.data ? (
                <Button 
                  onClick={() => signOut()} 
                  variant="outline"
                  className="text-sm font-medium tracking-wide border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900"
                >
                  Sign Out
                </Button>
              ) : (
                <Button 
                  onClick={() => signIn("credentials")} 
                  variant="outline"
                  className="text-sm font-medium tracking-wide border-slate-200 hover:bg-slate-50 text-slate-600 hover:text-slate-900"
                >
                  Sign In
                </Button>
              )}
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-slate-500 hover:text-slate-900 transition-colors p-2 hover:bg-slate-50 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-search"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.3-4.3" />
                </svg>
              </button>
              <button className="text-slate-500 hover:text-slate-900 transition-colors p-2 hover:bg-slate-50 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-user"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </button>
              <button className="text-slate-500 hover:text-slate-900 transition-colors p-2 hover:bg-slate-50 rounded-xl">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
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
        <section className="relative bg-gradient-to-br from-slate-50 to-white">
          <div className="container mx-auto px-4 py-32">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-6">
                <span className="inline-block px-6 py-3 bg-white/90 text-slate-600 text-sm font-medium rounded-full tracking-wide shadow-lg backdrop-blur-sm border border-slate-100">
                  LIMITED TIME ONLY
                </span>
              </div>
              <h1 className="text-6xl md:text-8xl font-extralight text-slate-900 mb-8 tracking-tight">
                30% OFF
                <span className="block font-extralight text-slate-600 text-5xl md:text-7xl mt-2">Premium Collection</span>
              </h1>
              <p className="text-xl text-slate-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Discover our exclusive range of premium footwear and accessories crafted with precision and elegance for the modern lifestyle
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button 
                  onClick={handleShopClick}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-10 py-5 text-lg font-medium rounded-xl transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5"
                >
                  Shop Collection
                </Button>
                <Button 
                  onClick={handleShopClick}
                  variant="outline" 
                  className="border-slate-300 text-slate-700 hover:bg-slate-50 px-10 py-5 text-lg font-medium rounded-xl"
                >
                  View Lookbook
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Products Grid */}
        <section className="container mx-auto px-4 py-24">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extralight text-slate-900 mb-6 tracking-wide">Featured Categories</h2>
            <p className="text-slate-600 max-w-3xl mx-auto text-lg leading-relaxed">
              Explore our carefully curated selection of premium footwear designed for the modern lifestyle, crafted with attention to detail and comfort
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { name: "Casual Sneakers", image: "https://images.puma.com/image/upload/f_auto,q_auto,b_rgb:fafafa,w_600,h_600/global/192593/01/sv01/fnd/IND/fmt/png/Enzo-Sport-Men's-Running-Shoes" },
              { name: "Formal Shoes", image: "https://d2lo0tepqt73yr.cloudfront.net/migProductImages/RC3808%20003-2.JPG" },
              { name: "Athletic Wear", image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/247616b5-1d3b-4777-abbb-d5e08a924b78/NIKE+GO+FLYEASE.png" },
              { name: "Luxury Collection", image: "https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/d4032a69-781f-4d21-80a6-f1604b6bea91/W+NIKE+AIR+MAX+SNDR+CAMO.png" }
            ].map((category, index) => (
              <div key={index} className="group cursor-pointer" onClick={handleShopClick}>
                <div className="relative h-[350px] mb-6 rounded-3xl overflow-hidden bg-slate-50 shadow-lg">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-4 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-lg font-medium text-slate-900 tracking-wide text-center">{category.name}</h3>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Limited Edition */}
        <section className="bg-slate-50/50 py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-extralight text-slate-900 mb-6 tracking-wide">Limited Edition</h2>
              <p className="text-slate-600 max-w-4xl mx-auto leading-relaxed text-lg">
                Discover our exclusive collection of limited edition pieces, designed with premium materials and exceptional 
                craftsmanship for the discerning individual who appreciates quality and uniqueness.
              </p>
            </div>
            <div className="flex justify-center">
              <Button onClick={handleShopClick} className="bg-slate-900 hover:bg-slate-800 text-white px-10 py-5 text-lg font-medium rounded-xl transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5">
                Explore Collection
              </Button>
            </div>
          </div>
        </section>

        {/* Summer Whites */}
        <section className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
            <div className="col-span-2">
              <div className="relative h-[550px] rounded-3xl overflow-hidden shadow-xl">
                <Image
                  src="https://static.nike.com/a/images/q_auto:eco/t_product_v1/f_auto/dpr_1.3/h_600,c_limit/fdbe1608-f6f1-4451-9025-adb6197dd010/jordan-air-rev-golf-shoes-jgWN39.png"
                  alt="Model in white outfit"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h2 className="text-3xl font-extralight tracking-wider mb-4 text-slate-900">Summer Whites</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Embrace the season with our collection of crisp white pieces, perfect for warm summer days and balmy
                evenings.
              </p>
              <Button onClick={handleShopClick} className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-10 py-5 text-sm uppercase tracking-wider font-medium transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5">
                Shop New In
              </Button>
            </div>
          </div>
        </section>

        {/* Wedding Guest Season */}
        <section className="container mx-auto px-4 py-20 bg-slate-50/30">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-extralight tracking-wider mb-4 text-slate-900">Wedding Guest Season</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Find the perfect outfit for every celebration with our curated collection of elegant dresses and
                sophisticated separates.
              </p>
              <div>
                <Button onClick={handleShopClick} className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-10 py-5 text-sm uppercase tracking-wider font-medium transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5">
                  Shop Wedding Guest
                </Button>
              </div>
            </div>
            <div className="relative h-[600px] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="https://drxkxj0en8oot.cloudfront.net/984/zapatos-invitadas-boda-dia-1.webp"
                alt="Models in wedding guest attire"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </section>

        {/* Mother's Day */}
        <section className="container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="relative h-[500px] rounded-3xl overflow-hidden shadow-xl">
              <Image
                src="https://www.skechers.in/on/demandware.static/-/Sites-skechers_india/default/dwa447c7de/images/large/197627667652-1.jpg"
                alt="Model in elegant outfit"
                fill
                className="object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="text-3xl font-extralight tracking-wider mb-4 text-slate-900">In The Diary: Mother's Day</h2>
              <p className="text-slate-600 mb-8 leading-relaxed">
                Celebrate the special women in your life with thoughtfully selected gifts that show your appreciation.
              </p>
              <div>
                <Button onClick={handleShopClick} className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-10 py-5 text-sm uppercase tracking-wider font-medium transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5">
                  Shop Now
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Cool Coordinates */}
        <section className="container mx-auto px-4 py-20 bg-slate-50/30">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extralight tracking-wider mb-4 text-slate-900">Cool Coordinates</h2>
            <p className="text-slate-600 max-w-2xl mx-auto leading-relaxed">
              Effortlessly stylish separates designed to be mixed and matched for versatile, polished looks.
            </p>
          </div>
          <div className="flex justify-center">
            <Button onClick={handleShopClick} className="bg-slate-900 hover:bg-slate-800 text-white rounded-xl px-10 py-5 text-sm uppercase tracking-wider font-medium transition-all duration-300 hover:shadow-xl transform hover:-translate-y-0.5">
              Shop The Edit
            </Button>
          </div>
        </section>

        {/* Limited Edition Banner */}
        <section className="relative h-[400px] w-full overflow-hidden">
          <Image
            src="/api/placeholder/1920/400"
            alt="Limited Edition Collection"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-slate-800/60" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
            <h2 className="text-5xl font-extralight tracking-widest mb-8">LIMITED EDITION</h2>
            <Button onClick={handleShopClick} className="bg-white/10 backdrop-blur-md hover:bg-white/20 text-white rounded-xl px-12 py-6 text-sm uppercase tracking-wider font-medium transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 border border-white/20">
              Shop The Limited
            </Button>
          </div>
        </section>

        {/* Social Media */}
        <section className="container mx-auto px-4 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extralight tracking-wider mb-4 text-slate-900">Share With Us #SOLESTYLELife</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="relative h-[200px] cursor-pointer rounded-2xl overflow-hidden group shadow-lg hover:shadow-xl transition-all duration-300">
                <Image
                  src={`/api/placeholder/200/200`}
                  alt={`Social media image ${item}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </section>

        {/* Most Loved Styles */}
        <section className="container mx-auto px-4 py-20 bg-slate-50/30">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extralight tracking-wider mb-4 text-slate-900">Most Loved Styles</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="group cursor-pointer" onClick={handleShopClick}>
                <div className="relative h-[300px] mb-4 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                  <Image
                    src={`/api/placeholder/240/300`}
                    alt={`Product ${item}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-sm font-medium text-slate-900 mb-1">Product Name {item}</h3>
                  <p className="text-sm text-slate-600">£199.00</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section className="bg-slate-900 py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="text-3xl font-extralight tracking-wider mb-4 text-white">Sign Up For 15% Off</h2>
              <p className="text-slate-300 mb-8 leading-relaxed">
                Subscribe to receive updates, access to exclusive deals, and more.
              </p>
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder="Your email address"
                  className="rounded-xl border-slate-600 bg-slate-800/50 backdrop-blur-sm text-white placeholder:text-slate-400 focus:border-slate-400 focus:ring-slate-400 flex-1"
                />
                <Button className="bg-white text-slate-900 hover:bg-slate-100 rounded-xl px-8 py-2 font-medium transition-all duration-300 hover:shadow-lg">
                  Sign Up
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white py-16 border-t border-slate-200">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider mb-6 text-slate-900">Customer Care</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200">
                    Delivery & Returns
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200">
                    FAQs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200">
                    Size Guide
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider mb-6 text-slate-900">Shopping With Us</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200">
                    Store Locator
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200">
                    Gift Cards
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200">
                    Student Discount
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200">
                    Refer a Friend
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider mb-6 text-slate-900">About</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200">
                    Our Story
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200">
                    Sustainability
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-sm text-slate-600 hover:text-slate-900 transition-colors duration-200">
                    Press
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-medium uppercase tracking-wider mb-6 text-slate-900">Connect</h3>
              <div className="flex space-x-4 mb-6">
                <Link href="#" className="text-slate-600 hover:text-slate-900 transition-colors duration-200 p-2 rounded-lg hover:bg-slate-100">
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
                <Link href="#" className="text-slate-600 hover:text-slate-900 transition-colors duration-200 p-2 rounded-lg hover:bg-slate-100">
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
                <Link href="#" className="text-slate-600 hover:text-slate-900 transition-colors duration-200 p-2 rounded-lg hover:bg-slate-100">
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
                <Link href="#" className="text-slate-600 hover:text-slate-900 transition-colors duration-200 p-2 rounded-lg hover:bg-slate-100">
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
          <div className="mt-16 pt-8 border-t border-slate-200 text-center">
            <p className="text-xs text-slate-600">© 2025 SOLESTYLE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

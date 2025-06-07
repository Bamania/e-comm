"use client"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Filter, Search, Heart, ShoppingCart, Star } from "lucide-react"
import shoeData from "@/metaData/data"
import { useSession } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { useCart } from "@/contexts/CartContext"

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [priceRange, setPriceRange] = useState({ min: 0, max: 10000 })
  const [sortBy, setSortBy] = useState("featured")

  const router = useRouter()
  const { addToCart, getTotalItems } = useCart()
  const session = useSession()
    if (!session.data) {
    router.push("/signin")
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center p-8 bg-white rounded-2xl shadow-sm">
        <h2 className="text-2xl font-light text-gray-900 mb-2">Authentication Required</h2>
        <p className="text-gray-600">Please log in to view this page</p>
      </div>
    </div>
  }

  const categories = ["All", ...new Set(shoeData.map(shoe => shoe.category))]

  // Filter and sort products
  const filteredProducts = shoeData
    .filter(shoe => {
      const matchesSearch = shoe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           shoe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           shoe.brand.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "All" || shoe.category === selectedCategory
      const matchesPrice = shoe.price >= priceRange.min && shoe.price <= priceRange.max
      return matchesSearch && matchesCategory && matchesPrice
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name":
          return a.title.localeCompare(b.title)
        default:
          return 0
      }
    })

  const formatPrice = (price: number) => {
    return `₹${price.toLocaleString()}`
  }

  const handleAddToCart = (shoe: any) => {
    addToCart({
      id: shoe.id,
      title: shoe.title,
      price: shoe.price,
      image_url: shoe.image_url,
      brand: shoe.brand,
      color: shoe.color
    })
    router.push('/cart')
  }
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-sm shadow-sm border-b border-slate-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-3xl font-extralight tracking-wide text-slate-900">
              SOLESTYLE
            </Link>            <nav className="hidden md:flex items-center space-x-10">
              <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors font-light">
                Home
              </Link>
              <Link href="/products" className="text-slate-900 font-medium">
                Products
              </Link>
              <Link href="#" className="text-slate-600 hover:text-slate-900 transition-colors font-light">
                About
              </Link>
              <Link href="#" className="text-slate-600 hover:text-slate-900 transition-colors font-light">
                Contact
              </Link>
            </nav>
            <div className="flex items-center space-x-5">
              <button className="p-2 text-slate-600 hover:text-slate-900 transition-colors">
                <Heart className="w-6 h-6" />
              </button>              <Link href="/cart">
                <button className="p-2 text-slate-600 hover:text-slate-900 transition-colors relative">
                  <ShoppingCart className="w-6 h-6" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-slate-700 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>      {/* Hero Section */}
      <section className="bg-gradient-to-r from-slate-700 via-slate-600 to-slate-500 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-7xl font-extralight mb-6 tracking-wide">
            Premium Footwear Collection
          </h1>
          <p className="text-xl md:text-2xl mb-10 opacity-90 font-light">
            Discover comfort, style, and quality in every step
          </p>
          <div className="max-w-lg mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search shoes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-6 py-4 rounded-2xl border-0 bg-white/95 backdrop-blur-sm text-slate-900 placeholder-slate-500"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">          {/* Filters Sidebar */}
          <aside className="lg:w-64 space-y-6">
            <Card className="p-6 bg-white/80 backdrop-blur-sm border-slate-200 rounded-2xl shadow-lg">
              <h3 className="font-medium text-xl mb-6 flex items-center gap-3 text-slate-900">
                <Filter className="w-5 h-5" />
                Filters
              </h3>
                {/* Categories */}
              <div className="space-y-3">
                <h4 className="font-medium text-slate-900">Categories</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-4 py-3 rounded-xl text-sm transition-all duration-200 ${
                        selectedCategory === category
                          ? "bg-slate-100 text-slate-900 font-medium shadow-sm"
                          : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-3 pt-6 border-t border-slate-200">
                <h4 className="font-medium text-slate-900">Price Range</h4>                <div className="space-y-3">
                  <Input
                    type="number"
                    placeholder="Min price"
                    value={priceRange.min || ""}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) || 0 }))}
                    className="text-sm border-slate-200 rounded-xl"
                  />
                  <Input
                    type="number"
                    placeholder="Max price"
                    value={priceRange.max || ""}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) || 10000 }))}
                    className="text-sm border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              {/* Sort By */}
              <div className="space-y-3 pt-6 border-t border-slate-200">
                <h4 className="font-medium text-slate-900">Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-3 border border-slate-200 rounded-xl text-sm bg-white focus:ring-2 focus:ring-slate-200 focus:border-slate-300"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </Card>
          </aside>          {/* Products Grid */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-extralight text-slate-900 tracking-wide">
                All Products ({filteredProducts.length})
              </h2>
            </div>            {filteredProducts.length === 0 ? (
              <div className="text-center py-20">
                <div className="text-slate-300 mb-6">
                  <Search className="w-20 h-20 mx-auto" />
                </div>
                <h3 className="text-2xl font-light text-slate-900 mb-3">No products found</h3>
                <p className="text-slate-600">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map((shoe) => (
                  <Card key={shoe.id} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 bg-white/90 backdrop-blur-sm border-slate-200 rounded-3xl overflow-hidden">
                    <div className="relative overflow-hidden">
                      <Image
                        src={shoe.image_url}
                        alt={shoe.title}
                        width={400}
                        height={300}
                        className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                        unoptimized
                      />
                      <div className="absolute top-6 right-6">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white/90 backdrop-blur-sm hover:bg-white border-slate-200 rounded-2xl shadow-lg"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="absolute bottom-6 left-6">
                        <span className="bg-slate-700/90 backdrop-blur-sm text-white px-4 py-2 rounded-2xl text-sm font-light">
                          {shoe.brand}
                        </span>
                      </div>
                    </div>                    
                    <CardContent className="p-8">
                      <div className="space-y-4">
                        <div>
                          <h3 className="font-medium text-xl text-slate-900 group-hover:text-slate-700 transition-colors">
                            {shoe.title}
                          </h3>
                          <p className="text-sm text-slate-500 font-light">{shoe.category}</p>
                        </div>
                        
                        <p className="text-slate-600 text-sm line-clamp-2 font-light">
                          {shoe.description}
                        </p>
                        
                        <div className="flex items-center gap-2">
                          <div className="flex items-center text-amber-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                          <span className="text-sm text-slate-500">(4.8)</span>
                        </div>
                        
                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <div>
                            <span className="text-2xl font-light text-slate-900">
                              {formatPrice(shoe.price)}
                            </span>
                            <p className="text-sm text-slate-500">Color: {shoe.color}</p>
                          </div>
                          <Button 
                            onClick={() => handleAddToCart(shoe)}
                            className="bg-slate-700 hover:bg-slate-800 text-white rounded-2xl px-6 py-3 transform transition-all duration-200 hover:scale-105 shadow-lg"
                          >
                            <ShoppingCart className="w-4 h-4 mr-2" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </main>
        </div>
      </div>      {/* Footer */}
      <footer className="bg-slate-900 text-white py-16 mt-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div>
              <h3 className="text-2xl font-extralight mb-6 tracking-wide">SOLESTYLE</h3>
              <p className="text-slate-400 font-light leading-relaxed">
                Premium footwear for every occasion. Quality, comfort, and style in every step.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-6">Quick Links</h4>
              <ul className="space-y-3 text-slate-400">
                <li><Link href="/" className="hover:text-white transition-colors font-light">Home</Link></li>
                <li><Link href="/products" className="hover:text-white transition-colors font-light">Products</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors font-light">About</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors font-light">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-6">Customer Service</h4>
              <ul className="space-y-3 text-slate-400">
                <li><Link href="#" className="hover:text-white transition-colors font-light">Shipping Info</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors font-light">Returns</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors font-light">Size Guide</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors font-light">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-6">Connect</h4>
              <p className="text-slate-400 mb-6 font-light">
                Stay updated with our latest releases and offers.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" className="text-slate-400 border-slate-700 hover:text-white hover:border-white rounded-xl">
                  Facebook
                </Button>
                <Button variant="outline" size="sm" className="text-slate-400 border-slate-700 hover:text-white hover:border-white rounded-xl">
                  Instagram
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2025 SOLESTYLE. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

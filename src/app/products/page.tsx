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
    return <div className="text-4xl flex justify-center items-center text-emerald-400">
      Please Log in to view this page
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              SoleStyle
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">
                Home
              </Link>
              <Link href="/products" className="text-gray-900 font-medium">
                Products
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </Link>
              <Link href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                Contact
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors">
                <Heart className="w-6 h-6" />
              </button>
              <Link href="/cart">
                <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors relative">
                  <ShoppingCart className="w-6 h-6" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Premium Footwear Collection
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            Discover comfort, style, and quality in every step
          </p>
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search shoes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-3 rounded-full border-0 bg-white/90 backdrop-blur-sm"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className="lg:w-64 space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </h3>
              
              {/* Categories */}
              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Categories</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedCategory === category
                          ? "bg-blue-100 text-blue-800 font-medium"
                          : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="space-y-3 pt-6 border-t">
                <h4 className="font-medium text-gray-900">Price Range</h4>
                <div className="space-y-2">
                  <Input
                    type="number"
                    placeholder="Min price"
                    value={priceRange.min || ""}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) || 0 }))}
                    className="text-sm"
                  />
                  <Input
                    type="number"
                    placeholder="Max price"
                    value={priceRange.max || ""}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) || 10000 }))}
                    className="text-sm"
                  />
                </div>
              </div>

              {/* Sort By */}
              <div className="space-y-3 pt-6 border-t">
                <h4 className="font-medium text-gray-900">Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </Card>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                All Products ({filteredProducts.length})
              </h2>
            </div>

            {filteredProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-xl font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((shoe) => (
                  <Card key={shoe.id} className="group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                    <div className="relative overflow-hidden rounded-t-lg">
                      <Image
                        src={shoe.image_url}
                        alt={shoe.title}
                        width={400}
                        height={300}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                      <div className="absolute top-4 right-4">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-white/90 backdrop-blur-sm hover:bg-white"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {shoe.brand}
                        </span>
                      </div>
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="space-y-3">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition-colors">
                            {shoe.title}
                          </h3>
                          <p className="text-sm text-gray-500">{shoe.category}</p>
                        </div>
                        
                        <p className="text-gray-600 text-sm line-clamp-2">
                          {shoe.description}
                        </p>
                        
                        <div className="flex items-center gap-2">
                          <div className="flex items-center text-yellow-400">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                          <span className="text-sm text-gray-500">(4.8)</span>
                        </div>
                        
                        <div className="flex items-center justify-between pt-2 border-t">
                          <div>
                            <span className="text-2xl font-bold text-gray-900">
                              {formatPrice(shoe.price)}
                            </span>
                            <p className="text-sm text-gray-500">Color: {shoe.color}</p>
                          </div>
                          <Button 
                            onClick={() => handleAddToCart(shoe)}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
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
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 mt-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SoleStyle</h3>
              <p className="text-gray-400">
                Premium footwear for every occasion. Quality, comfort, and style in every step.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
                <li><Link href="/products" className="hover:text-white transition-colors">Products</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">About</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Customer Service</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="#" className="hover:text-white transition-colors">Shipping Info</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Returns</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Size Guide</Link></li>
                <li><Link href="#" className="hover:text-white transition-colors">Support</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Connect</h4>
              <p className="text-gray-400 mb-4">
                Stay updated with our latest releases and offers.
              </p>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm" className="text-gray-400 border-gray-700 hover:text-white hover:border-white">
                  Facebook
                </Button>
                <Button variant="outline" size="sm" className="text-gray-400 border-gray-700 hover:text-white hover:border-white">
                  Instagram
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 SoleStyle. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

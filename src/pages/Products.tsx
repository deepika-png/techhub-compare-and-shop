import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { 
  ArrowLeft, 
  Search, 
  Star,
  Heart,
  Filter,
  Smartphone,
  Laptop,
  Headphones,
  Watch
} from "lucide-react";
import iphone15Pro from "@/assets/iphone-15-pro.jpg";
import samsungS24 from "@/assets/samsung-galaxy-s24.jpg";
import macbookPro from "@/assets/macbook-pro-m3.jpg";
import dellXps from "@/assets/dell-xps-15.jpg";
import sonyHeadphones from "@/assets/sony-wh1000xm5.jpg";
import airpodsPro from "@/assets/airpods-pro-2.jpg";
import appleWatch from "@/assets/apple-watch-9.jpg";
import samsungWatch from "@/assets/samsung-watch-6.jpg";

// Mock product data (Prices in INR)
const products = [
  { id: 1, name: "iPhone 15 Pro", price: 82900, category: "Smartphones", rating: 4.8, reviews: 1234, image: iphone15Pro },
  { id: 2, name: "Samsung Galaxy S24", price: 74600, category: "Smartphones", rating: 4.7, reviews: 987, image: samsungS24 },
  { id: 3, name: "MacBook Pro M3", price: 165900, category: "Laptops", rating: 4.9, reviews: 2341, image: macbookPro },
  { id: 4, name: "Dell XPS 15", price: 132700, category: "Laptops", rating: 4.6, reviews: 876, image: dellXps },
  { id: 5, name: "Sony WH-1000XM5", price: 33100, category: "Audio", rating: 4.8, reviews: 3421, image: sonyHeadphones },
  { id: 6, name: "AirPods Pro 2", price: 20700, category: "Audio", rating: 4.7, reviews: 5632, image: airpodsPro },
  { id: 7, name: "Apple Watch Series 9", price: 33100, category: "Wearables", rating: 4.8, reviews: 2109, image: appleWatch },
  { id: 8, name: "Samsung Galaxy Watch 6", price: 24800, category: "Wearables", rating: 4.6, reviews: 1543, image: samsungWatch },
];

const categories = [
  { icon: Smartphone, name: "Smartphones", count: 150 },
  { icon: Laptop, name: "Laptops", count: 89 },
  { icon: Headphones, name: "Audio", count: 234 },
  { icon: Watch, name: "Wearables", count: 67 },
];

const Products = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, 170000]);
  const [favorites, setFavorites] = useState<number[]>(() => {
    const stored = localStorage.getItem('favorites');
    return stored ? JSON.parse(stored) : [];
  });
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    product.price >= priceRange[0] &&
    product.price <= priceRange[1] &&
    (selectedCategory === "All" || 
     selectedCategory === "Favorites" ? favorites.includes(product.id) : product.category === selectedCategory)
  );

  const toggleFavorite = (id: number) => {
    setFavorites(prev => {
      const newFavorites = prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id];
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
      return newFavorites;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/home')}
              className="text-primary-foreground hover:bg-white/20"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-2xl font-bold">Products</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Filters */}
        <div className="mb-8 space-y-6">
          <Card className="gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Filter className="w-5 h-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Categories */}
              <div className="space-y-3">
                <label className="text-sm font-medium">Categories</label>
                <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
                  <Button
                    variant={selectedCategory === "All" ? "default" : "outline"}
                    onClick={() => setSelectedCategory("All")}
                    className="h-auto py-3 flex flex-col gap-2"
                  >
                    <Filter className="w-5 h-5" />
                    <span className="text-xs">All</span>
                  </Button>
                  <Button
                    variant={selectedCategory === "Favorites" ? "default" : "outline"}
                    onClick={() => setSelectedCategory("Favorites")}
                    className="h-auto py-3 flex flex-col gap-2"
                  >
                    <Heart className="w-5 h-5" />
                    <span className="text-xs">Favorites ({favorites.length})</span>
                  </Button>
                  {categories.map((category) => {
                    const Icon = category.icon;
                    return (
                      <Button
                        key={category.name}
                        variant={selectedCategory === category.name ? "default" : "outline"}
                        onClick={() => setSelectedCategory(category.name)}
                        className="h-auto py-3 flex flex-col gap-2"
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-xs">{category.name}</span>
                      </Button>
                    );
                  })}
                </div>
              </div>

              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Price Range */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Price Range</label>
                  <span className="text-sm text-muted-foreground">
                    ₹{priceRange[0].toLocaleString('en-IN')} - ₹{priceRange[1].toLocaleString('en-IN')}
                  </span>
                </div>
                <Slider
                  min={0}
                  max={170000}
                  step={5000}
                  value={priceRange}
                  onValueChange={setPriceRange}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Products Grid */}
        <div className="mb-6">
          <p className="text-muted-foreground">
            Showing {filteredProducts.length} products
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card 
              key={product.id} 
              className="gradient-card shadow-card hover:shadow-hover transition-smooth group cursor-pointer"
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <Badge variant="secondary">{product.category}</Badge>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(product.id);
                    }}
                    className="h-8 w-8"
                  >
                    <Heart 
                      className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-destructive text-destructive' : ''}`} 
                    />
                  </Button>
                </div>
              </CardHeader>
              <CardContent 
                className="space-y-4"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <div className="aspect-square overflow-hidden rounded-lg bg-muted">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
                  />
                </div>
                <CardTitle className="text-lg group-hover:text-primary transition-smooth">
                  {product.name}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 fill-secondary text-secondary" />
                    <span className="ml-1 font-semibold">{product.rating}</span>
                  </div>
                  <span className="text-sm text-muted-foreground">
                    ({product.reviews} reviews)
                  </span>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span className="text-2xl font-bold text-primary">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <Button 
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/product/${product.id}`);
                  }}
                >
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;

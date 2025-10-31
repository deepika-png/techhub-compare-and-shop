import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { 
  ArrowLeft, 
  Star,
  Heart,
  TrendingDown,
  ExternalLink,
  ThumbsUp,
  RefreshCw
} from "lucide-react";
import iphone15Pro from "@/assets/iphone-15-pro.jpg";
import samsungS24 from "@/assets/samsung-galaxy-s24.jpg";
import macbookPro from "@/assets/macbook-pro-m3.jpg";
import dellXps from "@/assets/dell-xps-15.jpg";
import sonyHeadphones from "@/assets/sony-wh1000xm5.jpg";
import airpodsPro from "@/assets/airpods-pro-2.jpg";
import appleWatch from "@/assets/apple-watch-9.jpg";
import samsungWatch from "@/assets/samsung-watch-6.jpg";

// Mock data (Prices in INR)
const productDetails: Record<number, any> = {
  1: {
    name: "iPhone 15 Pro",
    category: "Smartphones",
    image: iphone15Pro,
    description: "The most powerful iPhone ever with titanium design, A17 Pro chip, and advanced camera system.",
    specs: ["6.1-inch display", "A17 Pro chip", "48MP camera", "Titanium design"],
    rating: 4.8,
    totalReviews: 1234,
    prices: [
      { retailer: "Apple Store", price: 82900, rating: 4.9, shipping: "Free" },
      { retailer: "Amazon", price: 81500, rating: 4.8, shipping: "Free Prime" },
      { retailer: "Flipkart", price: 82900, rating: 4.7, shipping: "₹99" },
    ],
    reviews: [
      { id: 1, author: "Rajesh K.", rating: 5, comment: "Amazing phone! The camera quality is incredible.", date: "2 days ago", helpful: 45 },
      { id: 2, author: "Priya S.", rating: 4, comment: "Great performance but expensive.", date: "1 week ago", helpful: 32 },
      { id: 3, author: "Arjun M.", rating: 5, comment: "Best iPhone I've ever owned.", date: "2 weeks ago", helpful: 28 },
    ],
    ratingBreakdown: [
      { stars: 5, percentage: 70 },
      { stars: 4, percentage: 20 },
      { stars: 3, percentage: 7 },
      { stars: 2, percentage: 2 },
      { stars: 1, percentage: 1 },
    ]
  },
  2: {
    name: "Samsung Galaxy S24",
    category: "Smartphones",
    image: samsungS24,
    description: "Flagship Android experience with AI features and stunning display.",
    specs: ["6.2-inch AMOLED", "Snapdragon 8 Gen 3", "50MP camera", "Galaxy AI"],
    rating: 4.7,
    totalReviews: 987,
    prices: [
      { retailer: "Samsung Store", price: 74600, rating: 4.8, shipping: "Free" },
      { retailer: "Amazon", price: 72900, rating: 4.7, shipping: "Free Prime" },
      { retailer: "Flipkart", price: 74000, rating: 4.6, shipping: "Free" },
    ],
    reviews: [
      { id: 1, author: "Amit P.", rating: 5, comment: "Love the AI features!", date: "3 days ago", helpful: 38 },
      { id: 2, author: "Neha R.", rating: 4, comment: "Great display and battery life.", date: "1 week ago", helpful: 25 },
    ],
    ratingBreakdown: [
      { stars: 5, percentage: 65 },
      { stars: 4, percentage: 25 },
      { stars: 3, percentage: 8 },
      { stars: 2, percentage: 1 },
      { stars: 1, percentage: 1 },
    ]
  },
  3: {
    name: "MacBook Pro M3",
    category: "Laptops",
    image: macbookPro,
    description: "Professional laptop with M3 chip for ultimate performance.",
    specs: ["14-inch Liquid Retina", "M3 chip", "18-hour battery", "16GB RAM"],
    rating: 4.9,
    totalReviews: 2341,
    prices: [
      { retailer: "Apple Store", price: 165900, rating: 4.9, shipping: "Free" },
      { retailer: "Amazon", price: 164500, rating: 4.9, shipping: "Free" },
      { retailer: "Croma", price: 165900, rating: 4.8, shipping: "₹500" },
    ],
    reviews: [
      { id: 1, author: "Vikram S.", rating: 5, comment: "Best laptop for developers!", date: "1 day ago", helpful: 67 },
      { id: 2, author: "Ananya M.", rating: 5, comment: "Perfect for video editing.", date: "5 days ago", helpful: 54 },
    ],
    ratingBreakdown: [
      { stars: 5, percentage: 85 },
      { stars: 4, percentage: 12 },
      { stars: 3, percentage: 2 },
      { stars: 2, percentage: 1 },
      { stars: 1, percentage: 0 },
    ]
  },
  4: {
    name: "Dell XPS 15",
    category: "Laptops",
    image: dellXps,
    description: "Premium Windows laptop with stunning InfinityEdge display.",
    specs: ["15.6-inch 4K OLED", "Intel i7-13700H", "32GB RAM", "1TB SSD"],
    rating: 4.6,
    totalReviews: 876,
    prices: [
      { retailer: "Dell Store", price: 132700, rating: 4.7, shipping: "Free" },
      { retailer: "Amazon", price: 131200, rating: 4.6, shipping: "Free" },
      { retailer: "Flipkart", price: 132700, rating: 4.5, shipping: "₹200" },
    ],
    reviews: [
      { id: 1, author: "Karthik N.", rating: 5, comment: "Excellent build quality!", date: "4 days ago", helpful: 42 },
      { id: 2, author: "Sneha J.", rating: 4, comment: "Great for productivity.", date: "1 week ago", helpful: 31 },
    ],
    ratingBreakdown: [
      { stars: 5, percentage: 60 },
      { stars: 4, percentage: 30 },
      { stars: 3, percentage: 7 },
      { stars: 2, percentage: 2 },
      { stars: 1, percentage: 1 },
    ]
  },
  5: {
    name: "Sony WH-1000XM5",
    category: "Audio",
    image: sonyHeadphones,
    description: "Industry-leading noise cancellation with premium sound quality.",
    specs: ["30-hour battery", "Hi-Res Audio", "8 microphones", "Multipoint connection"],
    rating: 4.8,
    totalReviews: 3421,
    prices: [
      { retailer: "Sony Store", price: 33100, rating: 4.8, shipping: "Free" },
      { retailer: "Amazon", price: 32400, rating: 4.8, shipping: "Free Prime" },
      { retailer: "Flipkart", price: 32900, rating: 4.7, shipping: "Free" },
    ],
    reviews: [
      { id: 1, author: "Rohit B.", rating: 5, comment: "Best noise cancellation ever!", date: "2 days ago", helpful: 89 },
      { id: 2, author: "Meera K.", rating: 5, comment: "Perfect for travel.", date: "1 week ago", helpful: 76 },
    ],
    ratingBreakdown: [
      { stars: 5, percentage: 75 },
      { stars: 4, percentage: 20 },
      { stars: 3, percentage: 3 },
      { stars: 2, percentage: 1 },
      { stars: 1, percentage: 1 },
    ]
  },
  6: {
    name: "AirPods Pro 2",
    category: "Audio",
    image: airpodsPro,
    description: "Premium wireless earbuds with adaptive audio and USB-C.",
    specs: ["Adaptive Audio", "6-hour battery", "IP54 rated", "Spatial Audio"],
    rating: 4.7,
    totalReviews: 5632,
    prices: [
      { retailer: "Apple Store", price: 20700, rating: 4.8, shipping: "Free" },
      { retailer: "Amazon", price: 20300, rating: 4.7, shipping: "Free Prime" },
      { retailer: "Flipkart", price: 20700, rating: 4.6, shipping: "Free" },
    ],
    reviews: [
      { id: 1, author: "Aditya R.", rating: 5, comment: "Great sound quality!", date: "1 day ago", helpful: 112 },
      { id: 2, author: "Divya S.", rating: 4, comment: "Good but pricey.", date: "4 days ago", helpful: 87 },
    ],
    ratingBreakdown: [
      { stars: 5, percentage: 68 },
      { stars: 4, percentage: 24 },
      { stars: 3, percentage: 6 },
      { stars: 2, percentage: 1 },
      { stars: 1, percentage: 1 },
    ]
  },
  7: {
    name: "Apple Watch Series 9",
    category: "Wearables",
    image: appleWatch,
    description: "Most advanced Apple Watch with double tap gesture and new S9 chip.",
    specs: ["Always-On display", "ECG + Blood O2", "Water resistant", "18-hour battery"],
    rating: 4.8,
    totalReviews: 2109,
    prices: [
      { retailer: "Apple Store", price: 33100, rating: 4.9, shipping: "Free" },
      { retailer: "Amazon", price: 32400, rating: 4.8, shipping: "Free Prime" },
      { retailer: "Croma", price: 33100, rating: 4.7, shipping: "₹100" },
    ],
    reviews: [
      { id: 1, author: "Suresh M.", rating: 5, comment: "Perfect fitness companion!", date: "2 days ago", helpful: 56 },
      { id: 2, author: "Kavya P.", rating: 5, comment: "Love the double tap feature.", date: "1 week ago", helpful: 44 },
    ],
    ratingBreakdown: [
      { stars: 5, percentage: 72 },
      { stars: 4, percentage: 22 },
      { stars: 3, percentage: 4 },
      { stars: 2, percentage: 1 },
      { stars: 1, percentage: 1 },
    ]
  },
  8: {
    name: "Samsung Galaxy Watch 6",
    category: "Wearables",
    image: samsungWatch,
    description: "Feature-rich smartwatch with comprehensive health tracking.",
    specs: ["AMOLED display", "Body composition", "Sleep tracking", "40-hour battery"],
    rating: 4.6,
    totalReviews: 1543,
    prices: [
      { retailer: "Samsung Store", price: 24800, rating: 4.7, shipping: "Free" },
      { retailer: "Amazon", price: 24100, rating: 4.6, shipping: "Free Prime" },
      { retailer: "Flipkart", price: 24500, rating: 4.5, shipping: "Free" },
    ],
    reviews: [
      { id: 1, author: "Rahul T.", rating: 5, comment: "Great value for money!", date: "3 days ago", helpful: 39 },
      { id: 2, author: "Lakshmi N.", rating: 4, comment: "Good fitness tracking.", date: "1 week ago", helpful: 28 },
    ],
    ratingBreakdown: [
      { stars: 5, percentage: 58 },
      { stars: 4, percentage: 32 },
      { stars: 3, percentage: 8 },
      { stars: 2, percentage: 1 },
      { stars: 1, percentage: 1 },
    ]
  },
};

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isFavorite, setIsFavorite] = useState(false);
  const [livePrices, setLivePrices] = useState<any[]>([]);
  const [isLoadingPrices, setIsLoadingPrices] = useState(false);
  const [priceAnalysis, setPriceAnalysis] = useState<any>(null);
  
  const productId = parseInt(id || "1");
  const product = productDetails[productId] || productDetails[1];

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      const favorites = JSON.parse(storedFavorites);
      setIsFavorite(favorites.includes(productId));
    }
    // Fetch live prices on component mount
    fetchLivePrices();
  }, [productId]);

  const fetchLivePrices = async () => {
    setIsLoadingPrices(true);
    try {
      const { data, error } = await supabase.functions.invoke('compare-prices', {
        body: { 
          productName: product.name,
          category: product.category 
        }
      });

      if (error) throw error;

      if (data.success) {
        setLivePrices(data.prices);
        setPriceAnalysis(data.analysis);
        toast.success(`Found ${data.prices.length} prices - Save up to ${data.analysis.savingsPercentage}%!`);
      }
    } catch (error) {
      console.error('Error fetching prices:', error);
      toast.error('Failed to fetch live prices. Showing default prices.');
      setLivePrices(product.prices); // Fallback to mock data
    } finally {
      setIsLoadingPrices(false);
    }
  };

  const toggleFavorite = () => {
    const storedFavorites = localStorage.getItem('favorites');
    const favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
    
    const newFavorites = favorites.includes(productId)
      ? favorites.filter((fav: number) => fav !== productId)
      : [...favorites, productId];
    
    localStorage.setItem('favorites', JSON.stringify(newFavorites));
    setIsFavorite(!isFavorite);
  };

  const displayPrices = livePrices.length > 0 ? livePrices : product.prices;
  const bestPrice = Math.min(...displayPrices.map((p: any) => p.price));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => navigate('/products')}
              className="text-primary-foreground hover:bg-white/20"
            >
              <ArrowLeft className="w-6 h-6" />
            </Button>
            <h1 className="text-2xl font-bold">Product Details</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Product Overview */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Product Image & Info */}
          <Card className="gradient-card shadow-card">
            <CardContent className="p-8">
              <div className="aspect-square overflow-hidden rounded-lg bg-muted mb-6">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <Badge className="mb-4">{product.category}</Badge>
              <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
              <p className="text-muted-foreground mb-6">{product.description}</p>
              
              <div className="space-y-2 mb-6">
                <h3 className="font-semibold">Key Features:</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  {product.specs.map((spec, index) => (
                    <li key={index}>{spec}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <Star className="w-5 h-5 fill-secondary text-secondary" />
                  <span className="ml-2 text-xl font-semibold">{product.rating}</span>
                  <span className="ml-2 text-muted-foreground">
                    ({product.totalReviews} reviews)
                  </span>
                </div>
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={toggleFavorite}
                >
                  <Heart className={`w-5 h-5 ${isFavorite ? 'fill-destructive text-destructive' : ''}`} />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Price Comparison */}
          <Card className="gradient-card shadow-card">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <TrendingDown className="w-6 h-6 text-accent" />
                  Live Price Comparison
                </CardTitle>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={fetchLivePrices}
                  disabled={isLoadingPrices}
                  className="gap-2"
                >
                  <RefreshCw className={`w-4 h-4 ${isLoadingPrices ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
              </div>
              {priceAnalysis && (
                <p className="text-sm text-muted-foreground mt-2">
                  Save up to ₹{priceAnalysis.savings.toLocaleString('en-IN')} ({priceAnalysis.savingsPercentage}%) 
                  by choosing {priceAnalysis.bestRetailer}
                </p>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              {isLoadingPrices && (
                <div className="text-center py-8 text-muted-foreground">
                  <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-2" />
                  <p>Fetching live prices...</p>
                </div>
              )}
              {!isLoadingPrices && displayPrices.map((price, index) => (
                <Card 
                  key={index}
                  className={`border-2 transition-smooth ${
                    price.price === bestPrice 
                      ? 'border-accent shadow-hover' 
                      : 'border-border hover:border-primary'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{price.retailer}</h4>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="w-3 h-3 fill-secondary text-secondary" />
                          <span>{price.rating}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary">₹{price.price.toLocaleString('en-IN')}</div>
                        {price.price === bestPrice && (
                          <Badge variant="secondary" className="mt-1">Best Price</Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        Shipping: {price.shipping}
                      </span>
                      <Button size="sm" className="gap-2">
                        View Deal
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Reviews Section */}
        <Card className="gradient-card shadow-card">
          <CardHeader>
            <CardTitle>Ratings & Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="reviews">All Reviews</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <div className="grid md:grid-cols-2 gap-8">
                  {/* Rating Summary */}
                  <div>
                    <div className="text-center mb-6">
                      <div className="text-5xl font-bold mb-2">{product.rating}</div>
                      <div className="flex justify-center mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star 
                            key={star} 
                            className="w-5 h-5 fill-secondary text-secondary" 
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground">
                        Based on {product.totalReviews} reviews
                      </p>
                    </div>
                  </div>

                  {/* Rating Breakdown */}
                  <div className="space-y-3">
                    {product.ratingBreakdown.map((item) => (
                      <div key={item.stars} className="flex items-center gap-3">
                        <span className="text-sm w-8">{item.stars}★</span>
                        <Progress value={item.percentage} className="flex-1" />
                        <span className="text-sm text-muted-foreground w-12">
                          {item.percentage}%
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                {product.reviews.map((review) => (
                  <Card key={review.id} className="border">
                    <CardContent className="pt-6">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold">{review.author}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="w-4 h-4 fill-secondary text-secondary" />
                              ))}
                            </div>
                            <span className="text-sm text-muted-foreground">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-muted-foreground mb-3">{review.comment}</p>
                      <Button variant="ghost" size="sm" className="gap-2">
                        <ThumbsUp className="w-4 h-4" />
                        Helpful ({review.helpful})
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetail;

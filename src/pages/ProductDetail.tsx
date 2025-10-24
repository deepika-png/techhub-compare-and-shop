import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft, 
  Star,
  Heart,
  TrendingDown,
  ExternalLink,
  ThumbsUp
} from "lucide-react";

// Mock data
const productDetails = {
  1: {
    name: "iPhone 15 Pro",
    category: "Smartphones",
    image: "📱",
    description: "The most powerful iPhone ever with titanium design, A17 Pro chip, and advanced camera system.",
    specs: ["6.1-inch display", "A17 Pro chip", "48MP camera", "Titanium design"],
    rating: 4.8,
    totalReviews: 1234,
    prices: [
      { retailer: "Apple Store", price: 999, rating: 4.9, shipping: "Free" },
      { retailer: "Amazon", price: 979, rating: 4.8, shipping: "Free Prime" },
      { retailer: "Best Buy", price: 999, rating: 4.7, shipping: "$5.99" },
    ],
    reviews: [
      { id: 1, author: "John D.", rating: 5, comment: "Amazing phone! The camera quality is incredible.", date: "2 days ago", helpful: 45 },
      { id: 2, author: "Sarah M.", rating: 4, comment: "Great performance but expensive.", date: "1 week ago", helpful: 32 },
      { id: 3, author: "Mike R.", rating: 5, comment: "Best iPhone I've ever owned.", date: "2 weeks ago", helpful: 28 },
    ],
    ratingBreakdown: [
      { stars: 5, percentage: 70 },
      { stars: 4, percentage: 20 },
      { stars: 3, percentage: 7 },
      { stars: 2, percentage: 2 },
      { stars: 1, percentage: 1 },
    ]
  }
};

const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const product = productDetails[1]; // Using mock data

  const bestPrice = Math.min(...product.prices.map(p => p.price));

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
              <div className="text-9xl text-center mb-6">{product.image}</div>
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
                <Button variant="ghost" size="icon">
                  <Heart className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Price Comparison */}
          <Card className="gradient-card shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="w-6 h-6 text-accent" />
                Price Comparison
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {product.prices.map((price, index) => (
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
                        <div className="text-2xl font-bold text-primary">${price.price}</div>
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

import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  ShoppingBag, 
  TrendingDown, 
  Heart, 
  Star,
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  ArrowRight
} from "lucide-react";

const Home = () => {
  const navigate = useNavigate();

  const categories = [
    { icon: Smartphone, name: "Smartphones", count: 150 },
    { icon: Laptop, name: "Laptops", count: 89 },
    { icon: Headphones, name: "Audio", count: 234 },
    { icon: Watch, name: "Wearables", count: 67 },
  ];

  const sections = [
    {
      title: "Products",
      description: "Browse our extensive collection of electronics",
      icon: ShoppingBag,
      path: "/products",
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Price Comparison",
      description: "Compare prices across top retailers",
      icon: TrendingDown,
      path: "/price-comparison",
      color: "text-accent",
      bgColor: "bg-accent/10",
    },
    {
      title: "Favourites",
      description: "Your saved and wishlist items",
      icon: Heart,
      path: "/favourites",
      color: "text-destructive",
      bgColor: "bg-destructive/10",
    },
    {
      title: "Ratings & Reviews",
      description: "See what others are saying",
      icon: Star,
      path: "/reviews",
      color: "text-secondary",
      bgColor: "bg-secondary/10",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="gradient-primary text-primary-foreground shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Smartphone className="w-8 h-8" />
              <h1 className="text-3xl font-bold">TechHub</h1>
            </div>
            <Button variant="ghost" className="text-primary-foreground hover:bg-white/20">
              Profile
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to TechHub</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Your one-stop destination for finding the best deals on electronics
          </p>
        </div>

        {/* Categories */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold mb-6">Popular Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Card 
                  key={category.name} 
                  className="gradient-card shadow-card hover:shadow-hover transition-smooth cursor-pointer"
                  onClick={() => navigate('/products')}
                >
                  <CardContent className="pt-6 text-center">
                    <Icon className="w-12 h-12 mx-auto mb-3 text-primary" />
                    <h4 className="font-semibold mb-1">{category.name}</h4>
                    <p className="text-sm text-muted-foreground">{category.count} items</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Main Sections */}
        <div className="grid md:grid-cols-2 gap-6">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Card 
                key={section.title} 
                className="gradient-card shadow-card hover:shadow-hover transition-smooth cursor-pointer group"
                onClick={() => navigate(section.path)}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-lg ${section.bgColor} mb-4`}>
                      <Icon className={`w-8 h-8 ${section.color}`} />
                    </div>
                    <ArrowRight className="w-6 h-6 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-smooth" />
                  </div>
                  <CardTitle className="text-2xl">{section.title}</CardTitle>
                  <CardDescription className="text-base">
                    {section.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Home;

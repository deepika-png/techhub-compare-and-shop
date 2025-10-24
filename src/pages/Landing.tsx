import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-tech.jpg";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen gradient-hero flex items-center justify-center p-4 overflow-hidden relative">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        {/* Hero Image */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          <img 
            src={heroImage} 
            alt="Premium Electronics Collection" 
            className="rounded-2xl shadow-glow mx-auto max-w-4xl w-full h-auto"
          />
        </div>

        {/* Title with gradient */}
        <div className="mb-6">
          <h1 className="text-7xl md:text-8xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-secondary to-accent animate-in fade-in slide-in-from-bottom-4 duration-700">
            TechHub
          </h1>
          <div className="flex items-center justify-center gap-2 text-muted-foreground animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150">
            <Sparkles className="w-5 h-5 text-accent" />
            <p className="text-xl md:text-2xl italic font-light">
              "Where Innovation Meets Affordability"
            </p>
            <Sparkles className="w-5 h-5 text-accent" />
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300">
          Discover the best deals on cutting-edge electronics with real-time price comparison across top retailers
        </p>

        {/* CTA Button */}
        <Button 
          variant="hero" 
          size="xl"
          onClick={() => navigate('/auth')}
          className="animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500"
        >
          Tap to Enter
        </Button>
      </div>
    </div>
  );
};

export default Landing;

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface PriceData {
  retailer: string;
  price: number;
  rating: number;
  shipping: string;
  url?: string;
}

// Mock function to simulate fetching prices from different retailers
// In production, these would be actual API calls to Amazon, Flipkart, etc.
async function fetchAmazonPrice(productName: string): Promise<PriceData | null> {
  console.log(`Fetching Amazon price for: ${productName}`);
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Mock price data - in production, this would be an actual API call
  const basePrice = Math.floor(Math.random() * 50000) + 20000;
  return {
    retailer: "Amazon",
    price: basePrice - Math.floor(Math.random() * 2000),
    rating: 4.5 + Math.random() * 0.4,
    shipping: "Free Prime",
    url: `https://amazon.in/search?k=${encodeURIComponent(productName)}`
  };
}

async function fetchFlipkartPrice(productName: string): Promise<PriceData | null> {
  console.log(`Fetching Flipkart price for: ${productName}`);
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const basePrice = Math.floor(Math.random() * 50000) + 20000;
  return {
    retailer: "Flipkart",
    price: basePrice,
    rating: 4.4 + Math.random() * 0.4,
    shipping: Math.random() > 0.5 ? "Free" : "₹99",
    url: `https://flipkart.com/search?q=${encodeURIComponent(productName)}`
  };
}

async function fetchBrandStorePrice(productName: string, category: string): Promise<PriceData | null> {
  console.log(`Fetching brand store price for: ${productName}`);
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Determine brand based on product name
  let retailer = "Brand Store";
  if (productName.toLowerCase().includes("iphone") || productName.toLowerCase().includes("macbook") || 
      productName.toLowerCase().includes("airpods") || productName.toLowerCase().includes("apple watch")) {
    retailer = "Apple Store";
  } else if (productName.toLowerCase().includes("samsung")) {
    retailer = "Samsung Store";
  } else if (productName.toLowerCase().includes("dell")) {
    retailer = "Dell Store";
  } else if (productName.toLowerCase().includes("sony")) {
    retailer = "Sony Store";
  }
  
  const basePrice = Math.floor(Math.random() * 50000) + 20000;
  return {
    retailer,
    price: basePrice + Math.floor(Math.random() * 1000),
    rating: 4.8 + Math.random() * 0.2,
    shipping: "Free",
    url: `https://${retailer.toLowerCase().replace(' ', '')}.com`
  };
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { productName, category } = await req.json();
    
    if (!productName) {
      return new Response(
        JSON.stringify({ error: 'Product name is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`Comparing prices for: ${productName} (${category})`);

    // Fetch prices from all retailers in parallel
    const [amazonPrice, flipkartPrice, brandPrice] = await Promise.all([
      fetchAmazonPrice(productName),
      fetchFlipkartPrice(productName),
      fetchBrandStorePrice(productName, category)
    ]);

    const prices: PriceData[] = [amazonPrice, flipkartPrice, brandPrice].filter(p => p !== null) as PriceData[];
    
    // Sort by price (lowest first)
    prices.sort((a, b) => a.price - b.price);
    
    // Calculate savings
    const lowestPrice = prices[0].price;
    const highestPrice = prices[prices.length - 1].price;
    const savings = highestPrice - lowestPrice;
    const savingsPercentage = ((savings / highestPrice) * 100).toFixed(1);

    return new Response(
      JSON.stringify({
        success: true,
        prices,
        analysis: {
          lowestPrice,
          highestPrice,
          savings,
          savingsPercentage,
          bestRetailer: prices[0].retailer,
          timestamp: new Date().toISOString()
        }
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in compare-prices function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

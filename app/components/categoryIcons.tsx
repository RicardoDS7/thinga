// utils/categoryIcons.tsx
import { 
  Laptop, 
  Camera, 
  Sofa, 
  Bike, 
  Car, 
  Music, 
  Gamepad2, 
  Dumbbell, 
  Hammer, 
  BookOpen, 
  Shirt, 
  Home, 
  Package,
  Coffee,
  Plane,
  Baby,
  PaintBucket,
  Tent,
  Users
} from "lucide-react";

export const getCategoryIcon = (category: string) => {
  const categoryLower = category.toLowerCase();
  
  // Electronics & Technology
  if (categoryLower.includes('electronics') || categoryLower.includes('electronic') || 
      categoryLower.includes('laptop') || categoryLower.includes('computer') || categoryLower.includes('pc')) {
    return <Laptop className="w-5 h-5" />;
  }
  if (categoryLower.includes('camera') || categoryLower.includes('photography')) {
    return <Camera className="w-5 h-5" />;
  }
  if (categoryLower.includes('gaming') || categoryLower.includes('console') || 
      categoryLower.includes('xbox') || categoryLower.includes('playstation')) {
    return <Gamepad2 className="w-5 h-5" />;
  }
  
  // Furniture & Home
  if (categoryLower.includes('furniture') || categoryLower.includes('sofa') || 
      categoryLower.includes('chair') || categoryLower.includes('table')) {
    return <Sofa className="w-5 h-5" />;
  }
  if (categoryLower.includes('home') || categoryLower.includes('house') || categoryLower.includes('property')) {
    return <Home className="w-5 h-5" />;
  }
  
  // Transportation
  if (categoryLower.includes('car') || categoryLower.includes('vehicle') || categoryLower.includes('auto')) {
    return <Car className="w-5 h-5" />;
  }
  if (categoryLower.includes('bike') || categoryLower.includes('bicycle') || categoryLower.includes('cycling')) {
    return <Bike className="w-5 h-5" />;
  }
  if (categoryLower.includes('travel') || categoryLower.includes('flight') || categoryLower.includes('trip')) {
    return <Plane className="w-5 h-5" />;
  }
  
  // Sports & Fitness
  if (categoryLower.includes('sports') || categoryLower.includes('sport') || 
      categoryLower.includes('fitness') || categoryLower.includes('gym')) {
    return <Dumbbell className="w-5 h-5" />;
  }
  if (categoryLower.includes('camping') || categoryLower.includes('outdoor') || categoryLower.includes('adventure')) {
    return <Tent className="w-5 h-5" />;
  }
  
  // Tools & Equipment
  if (categoryLower.includes('tools') || categoryLower.includes('equipment') || 
      categoryLower.includes('hardware') || categoryLower.includes('construction') || categoryLower.includes('building')) {
    return <Hammer className="w-5 h-5" />;
  }
  
  // Entertainment & Media
  if (categoryLower.includes('music') || categoryLower.includes('audio') || 
      categoryLower.includes('speaker') || categoryLower.includes('instrument')) {
    return <Music className="w-5 h-5" />;
  }
  if (categoryLower.includes('books') || categoryLower.includes('book') || categoryLower.includes('education')) {
    return <BookOpen className="w-5 h-5" />;
  }
  
  // Fashion & Clothing
  if (categoryLower.includes('clothing') || categoryLower.includes('fashion') || 
      categoryLower.includes('apparel') || categoryLower.includes('clothes')) {
    return <Shirt className="w-5 h-5" />;
  }
  
  // Events & Parties
  if (categoryLower.includes('party') || categoryLower.includes('event') || categoryLower.includes('celebration')) {
    return <Users className="w-5 h-5" />;
  }
  
  // Baby & Kids
  if (categoryLower.includes('baby') || categoryLower.includes('kids') || 
      categoryLower.includes('children') || categoryLower.includes('toy')) {
    return <Baby className="w-5 h-5" />;
  }
  
  // Art & Creative
  if (categoryLower.includes('art') || categoryLower.includes('craft') || 
      categoryLower.includes('paint') || categoryLower.includes('creative')) {
    return <PaintBucket className="w-5 h-5" />;
  }
  
  // Food & Kitchen
  if (categoryLower.includes('kitchen') || categoryLower.includes('cooking') || 
      categoryLower.includes('food') || categoryLower.includes('appliance')) {
    return <Coffee className="w-5 h-5" />;
  }
  
  // Default fallback icon
  return <Package className="w-5 h-5" />;
};
// types/listing.ts

// types/listing.ts
export type Listing = {
  id: string;
  title: string;
  price: number;
  photos: string[];
  category: string;
  city: string;
  province: string;
  depositAmount?: number; // Optional deposit amount
  firstName: string;
  lastName: string;
  description: string;
  timestamp: string;
};


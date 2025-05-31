// data/mockListings.ts
// types/index.ts or types/listing.ts
export type Listing = {
  id: string;
  title: string;
  price: number;
  image: string;
  category: string;
  location: string;
};


export const mockListings: Listing[] = [
  {
    id: "1",
    title: "GoPro Hero 11",
    price: 200,
    image: "/mock/gopro.png",
    category: "Media Equipment",
    location: "Cape Town",
  },
  {
    id: "2",
    title: "4-Person Camping Tent",
    price: 150,
    image: "/mock/tent.png",
    category: "Outdoor Gear",
    location: "Johannesburg",
  },
  {
    id: "3",
    title: "Evening Dress – Emerald Green",
    price: 250,
    image: "/mock/dress.png",
    category: "Clothing",
    location: "Durban",
  },
  // Add 10–20 more
];

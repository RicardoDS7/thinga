// app/lib/getListings.ts
import { db } from "./firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { Listing } from "@/app/types/listings";

// Get all approved listings
export async function getListings(): Promise<Listing[]> {
  try {
    console.log("🔍 Fetching listings...");
    
    const q = query(
      collection(db, "listings"),
      where("approved", "==", true),
      orderBy("timestamp", "desc"),
    );

    const snapshot = await getDocs(q);
    
    console.log(`📊 Found ${snapshot.docs.length} approved listings`);
    
    // Debug: Log the first few documents
    snapshot.docs.slice(0, 3).forEach((doc, index) => {
      const data = doc.data();
      console.log(`📝 Listing ${index + 1}:`, {
        id: doc.id,
        approved: data.approved,
        timestamp: data.timestamp?.toDate?.() || data.timestamp,
        title: data.title
      });
    });

    const listings = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Ensure timestamp is properly converted
        timestamp: data.timestamp?.toDate?.() || data.timestamp,
      };
    }) as Listing[];

    console.log("✅ Listings fetched successfully");
    return listings;
    
  } catch (error) {
    console.error("❌ Error fetching listings:", error);
    throw error;
  }
}

// Get the 10 newest approved listings
export async function getNewListings(): Promise<Listing[]> {
  try {
    console.log("🔍 Fetching new listings (limit 10)...");
    
    const q = query(
      collection(db, "listings"),
      where("approved", "==", true),
      orderBy("timestamp", "desc"),
      limit(10)
    );

    const snapshot = await getDocs(q);
    
    console.log(`📊 Found ${snapshot.docs.length} new approved listings`);
    
    // Debug: Log the first few documents
    snapshot.docs.slice(0, 3).forEach((doc, index) => {
      const data = doc.data();
      console.log(`📝 New Listing ${index + 1}:`, {
        id: doc.id,
        approved: data.approved,
        timestamp: data.timestamp?.toDate?.() || data.timestamp,
        title: data.title
      });
    });

    const listings = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        // Ensure timestamp is properly converted
        timestamp: data.timestamp?.toDate?.() || data.timestamp,
      };
    }) as Listing[];

    console.log("✅ New listings fetched successfully");
    return listings;
    
  } catch (error) {
    console.error("❌ Error fetching new listings:", error);
    throw error;
  }
}

export async function getListingById(id: string): Promise<Listing | null> {
  const docRef = doc(db, "listings", id);
  const docSnap = await getDoc(docRef);

  if (!docSnap.exists()) return null;

  const data = docSnap.data();

  return {
    id: docSnap.id,
    ...data,
  } as Listing;
}
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

export async function getListings(): Promise<Listing[]> {
  const q = query(
    collection(db, "listings"),
    where("approved", "==", true),             // ✅ Only get approved listings
    orderBy("timestamp", "desc"),
    limit(10)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Listing[];
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

// lib/saveSearch.ts
import { db } from "./firebase"; // Adjust the import path as needed
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function saveSearchTerm(term: string, userId?: string, location?: string) {
  if (!term.trim()) return;

  try {
    await addDoc(collection(db, "search_queries"), {
      term: term.trim().toLowerCase(),
      timestamp: serverTimestamp(),
      userId: userId || "anonymous",
      location: location || null,
    });
  } catch (error) {
    console.error("Error saving search term:", error);
  }
}

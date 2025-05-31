// app/listings/page.tsx
import { Suspense } from "react";
import ListingsGrid from "../components/ListingGrid";

export default function ListingsPage() {
  return (
    <Suspense fallback={<div>Loading listings...</div>}>
      <ListingsGrid />
    </Suspense>
  );
}

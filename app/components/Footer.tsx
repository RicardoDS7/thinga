import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-150 text-gray-800 px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Branding */}
        <div>
          <h2 className="text-3xl">thingo<span className="text-[var(--color-accent)]">.</span></h2>
          <p className="text-sm mt-2 text-gray-600">
            Rent anything, from anyone. Secure, simple, and insured.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide text-gray-700">
            Explore
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/browse" className="hover:underline">Browse Items</Link></li>
            <li><Link href="/rent" className="hover:underline">List an Item</Link></li>
            <li><Link href="/categories" className="hover:underline">Categories</Link></li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide text-gray-700">
            Help
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/faq" className="hover:underline">FAQs</Link></li>
            <li><Link href="/support" className="hover:underline">Contact Support</Link></li>
            <li><Link href="/insurance" className="hover:underline">thingoProtect</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-sm font-semibold mb-3 uppercase tracking-wide text-gray-700">
            Legal
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/terms" className="hover:underline">Terms of Service</Link></li>
            <li><Link href="/privacy" className="hover:underline">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t mt-10 pt-6 text-xs text-center text-gray-500">
        &copy; {new Date().getFullYear()} thingo. All rights reserved.
      </div>
    </footer>
  );
}

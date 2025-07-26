import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-150 text-gray-800 px-6 py-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Branding */}
        <div>
          <h2 className="text-3xl">LENDABA</h2>
          <p className="text-sm mt-2 text-gray-600">
            Rent anything, anywhere, anytime.
          </p>
        </div>

        {/* Explore */}
        <div>
          <h3 className="text-base font-semibold mb-3 uppercase tracking-wide text-gray-700">
            Explore
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/listings" className="hover:underline">Browse Items</Link></li>
            <li><Link href="/lend-registration" className="hover:underline">List an Item</Link></li>
            <li><Link href="#categories" className="hover:underline">Categories</Link></li>
          </ul>
        </div>

        {/* Help */}
        <div>
          <h3 className="text-bse font-semibold mb-3 uppercase tracking-wide text-gray-700">
            Help
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#FAQ" className="hover:underline">FAQs</Link></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h3 className="text-base font-semibold mb-3 uppercase tracking-wide text-gray-700">
            Legal
          </h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="#" className="hover:underline">Terms of Service</Link></li>
            <li><Link href="#" className="hover:underline">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t mt-10 pt-6 text-xs text-center text-gray-500">
        &copy; {new Date().getFullYear()} lendaba. All rights reserved.
      </div>
    </footer>
  );
}

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-50 text-gray-800 px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Branding */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex flex-col items-start mb-6">
              <div className="flex items-center mb-4">
                {/* <Image 
                  src="/LENDABA_logo.png"
                  alt="Lendaba Logo"
                  width={48}
                  height={48}
                  className="mr-3"
                /> */}
                <h2 className="text-2xl font-bold text-gray-900">LENDABA</h2>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed max-w-xs">
                Rent anything, anywhere, anytime. Connect with your community and discover endless possibilities through peer-to-peer rentals.
              </p>
              {/* Social Media Links */}
              <div className="flex space-x-4 mt-4">
                <Link href="#" className="text-gray-400 hover:text-gray-600 transition-colors">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </Link>
              </div>
            </div>
          </div>

          {/* Explore */}
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider text-gray-900">
              Explore
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/listings" className="text-gray-600 hover:text-gray-900 transition-colors">Browse Items</Link></li>
              <li><Link href="/lender-registration" className="text-gray-600 hover:text-gray-900 transition-colors">List an Item</Link></li>
              <li><Link href="#categories" className="text-gray-600 hover:text-gray-900 transition-colors">Categories</Link></li>
              <li><Link href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">How It Works</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider text-gray-900">
              Support
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="#FAQ" className="text-gray-600 hover:text-gray-900 transition-colors">FAQs</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Help Center</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Contact Us</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Safety Guidelines</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Report an Issue</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold mb-4 uppercase tracking-wider text-gray-900">
              Company
            </h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">About Us</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Careers</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Press</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Blog</Link></li>
              <li><Link href="/" className="text-gray-600 hover:text-gray-900 transition-colors">Partnerships</Link></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} Lendaba. All rights reserved.
          </div>
          <div className="flex space-x-6 text-xs">
            <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">Terms of Service</Link>
            <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">Privacy Policy</Link>
            <Link href="/" className="text-gray-500 hover:text-gray-700 transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
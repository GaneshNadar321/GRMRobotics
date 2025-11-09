'use client';

import Link from 'next/link';
import { Facebook, Twitter, Instagram, Youtube, Mail, Send } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      toast.success('Thanks for subscribing! Check your email for confirmation.');
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-white text-center md:text-left">
              <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                <Mail className="w-8 h-8" />
                <h3 className="text-2xl font-bold">Subscribe to Our Newsletter</h3>
              </div>
              <p className="text-primary-100">
                Get the latest updates on new products, tutorials, and exclusive offers!
              </p>
            </div>
            <form onSubmit={handleNewsletterSubmit} className="w-full md:w-auto">
              <div className="flex gap-2 max-w-md">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="input flex-1 bg-white"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn bg-white text-primary-600 hover:bg-gray-100 flex items-center gap-2 whitespace-nowrap"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Subscribe</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">GRM Robotics</h3>
            <p className="text-sm mb-4">
              Empowering students with hands-on robotics education through
              innovative LEGO-style kits and comprehensive tutorials.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-400" />
                <a href="mailto:grmrobotic@gmail.com" className="hover:text-white">
                  grmrobotic@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary-400" />
                <a href="mailto:infogrmrobotics@gmail.com" className="hover:text-white">
                  infogrmrobotics@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+919307720916" className="hover:text-white">
                  +91 9307720916
                </a>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-white">Products</Link></li>
              <li><Link href="/categories" className="hover:text-white">Categories</Link></li>
              <li><Link href="/tutorials" className="hover:text-white">Tutorials</Link></li>
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
              <li><Link href="/faq" className="hover:text-white">FAQ</Link></li>
              <li><Link href="/track-order" className="hover:text-white">Track Order</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms & Conditions</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white">Terms & Conditions</Link></li>
              <li><Link href="/terms-of-service" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="/replacement-policy" className="hover:text-white">Replacement Policy</Link></li>
              <li><Link href="/payment-terms" className="hover:text-white">Payment Terms</Link></li>
              <li><Link href="/shipping-policy" className="hover:text-white">Shipping Policy</Link></li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-center md:text-left">
              <p>&copy; {new Date().getFullYear()} GRM Robotics. All rights reserved.</p>
              <p className="text-gray-500 mt-1">Made with ❤️ in India</p>
            </div>

            {/* Social Links */}
            <div>
              <h4 className="text-white font-semibold mb-3 text-center">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-400 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                  <Youtube className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">We Accept</p>
              <div className="flex gap-2">
                <div className="px-3 py-1 bg-gray-800 rounded text-xs">💳 Cards</div>
                <div className="px-3 py-1 bg-gray-800 rounded text-xs">📱 UPI</div>
                <div className="px-3 py-1 bg-gray-800 rounded text-xs">🏦 Net Banking</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

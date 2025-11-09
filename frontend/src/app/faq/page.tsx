'use client';

import { useState } from 'react';
import { ChevronDown, Search, HelpCircle } from 'lucide-react';

const faqs = [
  {
    category: 'Orders & Shipping',
    questions: [
      {
        q: 'How long does shipping take?',
        a: 'Standard shipping takes 3-7 business days. Express shipping takes 1-3 business days. We ship within 1-2 business days of order confirmation.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'Currently, we only ship within India. International shipping will be available soon. Stay tuned!',
      },
      {
        q: 'How can I track my order?',
        a: 'You can track your order using the tracking link sent to your email, or visit our Track Order page and enter your order number and email.',
      },
      {
        q: 'What if my order is delayed?',
        a: 'If your order is delayed beyond the estimated delivery date, please contact our support team. We\'ll investigate and provide an update within 24 hours.',
      },
    ],
  },
  {
    category: 'Replacements & Warranty',
    questions: [
      {
        q: 'Do you offer returns or refunds?',
        a: 'No, we do not offer general returns or refunds. We only provide replacements for products that are damaged during shipping or if you receive an incorrect item. Please inspect your order immediately upon delivery.',
      },
      {
        q: 'What if my product arrives damaged?',
        a: 'If your product arrives damaged or you receive the wrong item, contact us within 7 days with photos. We\'ll provide a free replacement and handle all shipping costs.',
      },
      {
        q: 'How long does the replacement process take?',
        a: 'Replacement requests are reviewed within 2-3 business days. Once approved, your replacement will be shipped and typically arrives within 3-5 business days.',
      },
      {
        q: 'What if I change my mind about my purchase?',
        a: 'We do not accept returns for change of mind. Please review product details carefully before ordering. Our replacement policy only covers damaged or incorrect items.',
      },
      {
        q: 'Are there any costs for replacements?',
        a: 'No, replacements for damaged or incorrect items are completely free, including shipping. We cover all costs when the issue is on our end.',
      },
      {
        q: 'Can I exchange a product?',
        a: 'Yes! Contact us within 30 days of delivery to arrange an exchange. We\'ll ship the replacement once we receive the original product.',
      },
    ],
  },
  {
    category: 'Products',
    questions: [
      {
        q: 'Are the robotics kits suitable for beginners?',
        a: 'Yes! We have kits for all skill levels - Beginner, Intermediate, and Advanced. Each product page shows the difficulty level and recommended age group.',
      },
      {
        q: 'Do the kits come with instructions?',
        a: 'Absolutely! Every kit includes detailed user manuals and access to video tutorials. Some kits also include online learning resources.',
      },
      {
        q: 'What\'s included in the kit?',
        a: 'Each kit includes all necessary components, sensors, motors, and building blocks. Batteries may be required separately (check product description).',
      },
      {
        q: 'Can I buy individual components?',
        a: 'Yes! We sell individual sensors, motors, and components in our "Sensors & Components" category.',
      },
    ],
  },
  {
    category: 'Payment',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept Credit/Debit Cards, UPI, Net Banking, and Digital Wallets (Paytm, PhonePe, Google Pay) through Razorpay.',
      },
      {
        q: 'Is my payment information secure?',
        a: 'Yes! All payments are processed through Razorpay with bank-level encryption. We never store your card details.',
      },
      {
        q: 'Can I pay cash on delivery?',
        a: 'Cash on Delivery is available for orders below ₹5000 in select locations. This option will be shown at checkout if available.',
      },
      {
        q: 'Do you offer EMI options?',
        a: 'Yes! EMI options are available for orders above ₹3000 through select credit cards and payment partners.',
      },
    ],
  },
  {
    category: 'Account & Support',
    questions: [
      {
        q: 'How do I create an account?',
        a: 'Click on "Sign Up" in the top right corner, fill in your details, and verify your email. You can also sign up using Google or Facebook.',
      },
      {
        q: 'I forgot my password. What should I do?',
        a: 'Click on "Forgot Password" on the login page. Enter your email and we\'ll send you a password reset link.',
      },
      {
        q: 'How can I contact customer support?',
        a: 'You can reach us via email at support@grmrobotics.com, call us at +91-XXXX-XXXXXX, or use the contact form on our Contact Us page.',
      },
      {
        q: 'Do you offer technical support?',
        a: 'Yes! We provide free technical support for all our products via email and phone. Our team is available Mon-Sat, 9 AM - 6 PM.',
      },
    ],
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (id: string) => {
    setOpenItems(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = faqs.map(category => ({
    ...category,
    questions: category.questions.filter(
      q =>
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        q.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <HelpCircle className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-primary-100">
            Find answers to common questions about our products and services
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Search */}
        <div className="mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for answers..."
              className="input pl-12 text-lg"
            />
          </div>
        </div>

        {/* FAQ Categories */}
        {filteredFaqs.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No results found. Try a different search term.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredFaqs.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-2xl font-bold mb-4 text-primary-600">
                  {category.category}
                </h2>
                <div className="space-y-3">
                  {category.questions.map((faq, faqIndex) => {
                    const id = `${categoryIndex}-${faqIndex}`;
                    const isOpen = openItems.includes(id);

                    return (
                      <div key={id} className="card">
                        <button
                          onClick={() => toggleItem(id)}
                          className="w-full flex items-center justify-between text-left"
                        >
                          <h3 className="font-semibold text-lg pr-4">{faq.q}</h3>
                          <ChevronDown
                            className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${isOpen ? 'transform rotate-180' : ''
                              }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="mt-4 pt-4 border-t border-gray-100">
                            <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Still Have Questions */}
        <div className="mt-12 card bg-gradient-to-r from-primary-50 to-blue-50 border-2 border-primary-200">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
            <p className="text-gray-700 mb-6">
              Can't find the answer you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="btn btn-primary">
                Contact Support
              </a>
              <a href="mailto:support@grmrobotics.com" className="btn btn-secondary">
                Email Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

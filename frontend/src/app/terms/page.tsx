import { Shield, CreditCard, Package, AlertTriangle, CheckCircle, Clock, Scale, FileText, Users, Globe, Lock, Eye, Phone, Mail } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Scale className="w-16 h-16 mx-auto mb-6 text-blue-200" />
          <h1 className="text-4xl font-bold mb-4">Terms and Conditions</h1>
          <p className="text-xl text-blue-100">
            Please read these terms carefully before using our services
          </p>
          <p className="text-sm text-blue-200 mt-4">
            Last updated: {new Date().toLocaleDateString('en-IN', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Important Notice */}
        <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8">
          <div className="flex items-start">
            <AlertTriangle className="w-6 h-6 text-amber-600 mt-1 mr-3 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-amber-800 mb-2">Important Policy Notice</h3>
              <p className="text-amber-700">
                <strong>GRM Robotics operates on a replacement-only policy.</strong> We do not offer refunds or returns 
                for change of mind. All sales are final except for damaged or incorrect items.
              </p>
            </div>
          </div>
        </div>

        {/* 1. Agreement to Terms */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <FileText className="w-7 h-7 text-blue-600" />
            1. Agreement to Terms
          </h2>
          
          <div className="space-y-4 text-gray-700">
            <p>
              By accessing and using the GRM Robotics website (www.grmrobotics.com) and purchasing our products, 
              you agree to be bound by these Terms and Conditions. If you do not agree to these terms, 
              please do not use our website or purchase our products.
            </p>
            <p>
              These terms constitute a legally binding agreement between you and GRM Robotics. 
              We reserve the right to modify these terms at any time without prior notice.
            </p>
          </div>
        </div>

        {/* 2. Company Information */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">2. Company Information</h2>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-3">GRM Robotics</h4>
            <div className="space-y-2 text-gray-700">
              <p><strong>Business Type:</strong> Educational Robotics Kits Manufacturer & Retailer</p>
              <p><strong>Contact Email:</strong> support@grmrobotics.com</p>
              <p><strong>Phone:</strong> +91-9307720916</p>
              <p><strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM IST</p>
            </div>
          </div>
        </div>

        {/* 3. Products and Services */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Package className="w-7 h-7 text-green-600" />
            3. Products and Services
          </h2>
          
          <div className="space-y-4 text-gray-700">
            <p>
              GRM Robotics specializes in educational robotics kits designed for students and educators. 
              Our products include:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>LEGO-compatible robotics kits</li>
              <li>Educational components and sensors</li>
              <li>Programming tutorials and manuals</li>
              <li>Technical support and guidance</li>
            </ul>
            <p>
              All product descriptions, specifications, and pricing are subject to change without notice. 
              We strive to ensure accuracy but cannot guarantee that all information is error-free.
            </p>
          </div>
        </div>

        {/* 4. Payment Terms */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <CreditCard className="w-7 h-7 text-purple-600" />
            4. Payment Terms & Conditions
          </h2>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">4.1 Payment Processing</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>All payments are processed securely through Razorpay</li>
                <li>We accept credit cards, debit cards, UPI, and net banking</li>
                <li>Payment must be completed before order processing begins</li>
                <li>All prices are in Indian Rupees (INR) and include applicable taxes</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">4.2 Payment Security</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>We do not store your payment information on our servers</li>
                <li>All transactions are encrypted and secure</li>
                <li>Payment data is handled exclusively by Razorpay (PCI DSS compliant)</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">4.3 Failed Payments</h4>
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                <li>Orders with failed payments will be automatically cancelled</li>
                <li>You may retry payment or contact support for assistance</li>
                <li>No products will be shipped until payment is successfully processed</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 5. No Refund Policy */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-red-900 mb-6 flex items-center gap-3">
            <AlertTriangle className="w-7 h-7 text-red-600" />
            5. No Refund Policy - Important
          </h2>
          
          <div className="space-y-4">
            <div className="bg-red-100 border border-red-300 rounded-lg p-4">
              <h4 className="font-bold text-red-900 mb-2">⚠️ ALL SALES ARE FINAL</h4>
              <p className="text-red-800">
                GRM Robotics does NOT offer refunds under any circumstances. Once payment is processed, 
                it cannot be reversed or refunded.
              </p>
            </div>

            <div className="space-y-4 text-red-800">
              <div>
                <h4 className="font-semibold mb-2">5.1 What We Do NOT Refund:</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Change of mind purchases</li>
                  <li>Buyer's remorse</li>
                  <li>Incorrect product selection by customer</li>
                  <li>Products that don't meet expectations</li>
                  <li>Digital content (tutorials, manuals)</li>
                  <li>Used or opened products (unless defective)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold mb-2">5.2 Alternative: Replacement Policy</h4>
                <p>
                  Instead of refunds, we offer replacements ONLY for:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>Products damaged during shipping</li>
                  <li>Wrong items sent by our error</li>
                  <li>Missing components in kits</li>
                  <li>Manufacturing defects</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* 6. Shipping and Delivery */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Package className="w-7 h-7 text-blue-600" />
            6. Shipping and Delivery
          </h2>
          
          <div className="space-y-4 text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">6.1 Shipping Policy</h4>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>We ship within India only</li>
                <li>Processing time: 1-2 business days</li>
                <li>Delivery time: 3-7 business days (depending on location)</li>
                <li>Free shipping on orders above ₹1,000</li>
                <li>Shipping charges: ₹50 for orders below ₹1,000</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">6.2 Delivery Terms</h4>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Delivery address cannot be changed after order confirmation</li>
                <li>Someone must be available to receive the package</li>
                <li>We are not responsible for delays caused by courier services</li>
                <li>Risk of loss passes to buyer upon delivery</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 7. Replacement Policy */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Shield className="w-7 h-7 text-green-600" />
            7. Replacement Policy
          </h2>
          
          <div className="space-y-4 text-gray-700">
            <p>
              Our replacement policy covers only specific situations where the fault lies with us or shipping damage.
            </p>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">7.1 Eligible for Replacement:</h4>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Products damaged during shipping (with photo evidence)</li>
                <li>Wrong product sent due to our error</li>
                <li>Missing essential components from kits</li>
                <li>Manufacturing defects reported within 7 days</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">7.2 Replacement Process:</h4>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Report issue within 7 days of delivery</li>
                <li>Provide photos and detailed description</li>
                <li>Our team reviews within 2-3 business days</li>
                <li>Approved replacements shipped within 3-5 days</li>
                <li>Return shipping (if required) is free for valid claims</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 8. User Responsibilities */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">8. User Responsibilities</h2>
          
          <div className="space-y-4 text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">8.1 Account Information</h4>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate and complete information</li>
                <li>Keep account credentials secure</li>
                <li>Notify us immediately of unauthorized access</li>
                <li>You are responsible for all activities under your account</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2">8.2 Product Usage</h4>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use products only for intended educational purposes</li>
                <li>Follow all safety guidelines and instructions</li>
                <li>Supervise children when using robotics kits</li>
                <li>Do not modify or reverse engineer products</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 9. Intellectual Property */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">9. Intellectual Property</h2>
          
          <div className="space-y-4 text-gray-700">
            <p>
              All content on this website, including but not limited to text, graphics, logos, images, 
              tutorials, and software, is the property of GRM Robotics and is protected by copyright laws.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>You may not reproduce, distribute, or modify our content without permission</li>
              <li>Educational use of tutorials is permitted for purchased products</li>
              <li>Commercial use of our materials is strictly prohibited</li>
              <li>All trademarks and brand names are property of their respective owners</li>
            </ul>
          </div>
        </div>

        {/* 10. Limitation of Liability */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">10. Limitation of Liability</h2>
          
          <div className="space-y-4 text-gray-700">
            <p>
              GRM Robotics shall not be liable for any indirect, incidental, special, or consequential damages 
              arising from the use of our products or services.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Our liability is limited to the purchase price of the product</li>
              <li>We are not responsible for educational outcomes or learning results</li>
              <li>Products are provided "as is" without warranties beyond replacement policy</li>
              <li>We are not liable for damages caused by misuse or accidents</li>
            </ul>
          </div>
        </div>

        {/* 11. Privacy and Data Protection */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">11. Privacy and Data Protection</h2>
          
          <div className="space-y-4 text-gray-700">
            <p>
              We respect your privacy and are committed to protecting your personal information. 
              Please refer to our Privacy Policy for detailed information about data collection and usage.
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>We collect only necessary information for order processing</li>
              <li>Payment information is handled securely by Razorpay</li>
              <li>We do not sell or share personal data with third parties</li>
              <li>You can request data deletion by contacting support</li>
            </ul>
          </div>
        </div>

        {/* 12. Governing Law */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">12. Governing Law and Jurisdiction</h2>
          
          <div className="space-y-4 text-gray-700">
            <p>
              These Terms and Conditions are governed by the laws of India. Any disputes arising from 
              these terms or your use of our services shall be subject to the exclusive jurisdiction 
              of the courts in India.
            </p>
          </div>
        </div>

        {/* 13. Contact Information */}
        <div className="bg-blue-50 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">13. Contact Information</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-900 mb-3">General Support</h4>
              <div className="space-y-2 text-blue-800">
                <p><strong>Email:</strong> support@grmrobotics.com</p>
                <p><strong>Phone:</strong> +91-9307720916</p>
                <p><strong>Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM IST</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-blue-900 mb-3">Legal Inquiries</h4>
              <div className="space-y-2 text-blue-800">
                <p><strong>Email:</strong> legal@grmrobotics.com</p>
                <p><strong>Response Time:</strong> Within 48 hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Website Usage Terms */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Globe className="w-7 h-7 text-blue-600" />
            14. Website Usage and Acceptable Use Policy
          </h2>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">14.1 Permitted Uses</h4>
              <ul className="text-gray-700 space-y-2 ml-4">
                <li>• Browse and purchase products for personal or educational use</li>
                <li>• Create and maintain a user account</li>
                <li>• Access educational content and tutorials</li>
                <li>• Contact customer support for assistance</li>
                <li>• Leave honest reviews and feedback</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">14.2 Prohibited Activities</h4>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 mb-3 font-medium">You may NOT:</p>
                <ul className="text-red-700 space-y-2">
                  <li>• Use the website for any illegal or unauthorized purpose</li>
                  <li>• Attempt to gain unauthorized access to our systems</li>
                  <li>• Upload malicious code, viruses, or harmful content</li>
                  <li>• Scrape, crawl, or harvest data from our website</li>
                  <li>• Impersonate others or provide false information</li>
                  <li>• Interfere with website functionality or security</li>
                  <li>• Use automated tools to access our services</li>
                  <li>• Resell or redistribute our products without permission</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">14.3 Account Security</h4>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <ul className="text-blue-800 space-y-2">
                  <li>• You are responsible for maintaining account security</li>
                  <li>• Use strong passwords and keep them confidential</li>
                  <li>• Notify us immediately of any unauthorized access</li>
                  <li>• We may suspend accounts for security reasons</li>
                  <li>• Multiple failed login attempts may trigger security measures</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Educational Content Terms */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">15. Educational Content and Tutorials</h2>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">15.1 Content License</h4>
              <div className="space-y-3 text-gray-700">
                <p>
                  Our educational content, including tutorials, manuals, and guides, is provided 
                  under a limited license for personal and educational use only.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h5 className="font-medium text-green-900 mb-2">You MAY:</h5>
                  <ul className="text-green-800 space-y-1">
                    <li>• Use content for learning and educational purposes</li>
                    <li>• Share content in classroom settings</li>
                    <li>• Reference content in academic work (with attribution)</li>
                  </ul>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h5 className="font-medium text-red-900 mb-2">You MAY NOT:</h5>
                  <ul className="text-red-800 space-y-1">
                    <li>• Redistribute content commercially</li>
                    <li>• Modify or create derivative works</li>
                    <li>• Remove copyright or attribution notices</li>
                    <li>• Use content to compete with our business</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">15.2 Educational Outcomes</h4>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800">
                  While our educational content is designed to facilitate learning, we cannot 
                  guarantee specific educational outcomes or learning results. Success depends 
                  on individual effort, prior knowledge, and learning environment.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Product Warranty */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">16. Product Warranty and Quality Assurance</h2>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">16.1 Limited Warranty</h4>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h5 className="font-medium text-blue-900 mb-2">What We Warrant:</h5>
                  <ul className="text-blue-800 space-y-1">
                    <li>• Products are free from manufacturing defects</li>
                    <li>• Components function as described</li>
                    <li>• Kits include all listed components</li>
                    <li>• Educational materials are accurate and complete</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">Warranty Period:</h5>
                  <ul className="text-gray-700 space-y-1">
                    <li>• Electronic components: 6 months from purchase</li>
                    <li>• Mechanical parts: 12 months from purchase</li>
                    <li>• Software and digital content: 30 days from purchase</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">16.2 Warranty Exclusions</h4>
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-800 mb-3 font-medium">Warranty does NOT cover:</p>
                <ul className="text-red-700 space-y-1">
                  <li>• Damage from misuse, abuse, or accidents</li>
                  <li>• Normal wear and tear</li>
                  <li>• Damage from unauthorized modifications</li>
                  <li>• Issues caused by incompatible components</li>
                  <li>• Damage from environmental factors</li>
                  <li>• Loss of data or educational progress</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Dispute Resolution */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">17. Dispute Resolution and Legal Procedures</h2>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">17.1 Initial Resolution Process</h4>
              <div className="space-y-3">
                <p className="text-gray-700">
                  Before pursuing legal action, we encourage resolving disputes through our 
                  customer service process:
                </p>
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <ol className="text-blue-800 space-y-2">
                    <li>1. Contact our support team with detailed information</li>
                    <li>2. Allow 48 hours for initial response</li>
                    <li>3. Work with our team to find a mutually acceptable solution</li>
                    <li>4. Escalate to management if needed</li>
                    <li>5. Consider mediation for complex disputes</li>
                  </ol>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">17.2 Legal Jurisdiction</h4>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <ul className="text-gray-700 space-y-2">
                  <li>• All disputes subject to Indian law and jurisdiction</li>
                  <li>• Courts in India have exclusive jurisdiction</li>
                  <li>• English language governs all proceedings</li>
                  <li>• Indian Rupee is the currency for any damages</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">17.3 Class Action Waiver</h4>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800">
                  You agree to resolve disputes individually and waive the right to participate 
                  in class action lawsuits or collective proceedings against GRM Robotics.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Force Majeure */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">18. Force Majeure and Unforeseen Circumstances</h2>
          
          <div className="space-y-4 text-gray-700">
            <p>
              GRM Robotics shall not be liable for any failure or delay in performance under 
              these Terms due to unforeseen circumstances beyond our reasonable control, including:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-medium text-gray-900 mb-2">Natural Events:</h5>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Natural disasters and weather events</li>
                  <li>• Earthquakes, floods, fires</li>
                  <li>• Pandemics and health emergencies</li>
                </ul>
              </div>
              <div className="bg-gray-50 rounded-lg p-4">
                <h5 className="font-medium text-gray-900 mb-2">Human Events:</h5>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Government actions and regulations</li>
                  <li>• Labor strikes and disputes</li>
                  <li>• War, terrorism, civil unrest</li>
                </ul>
              </div>
            </div>
            <p>
              During such events, we will make reasonable efforts to minimize disruption and 
              communicate with affected customers about alternative arrangements.
            </p>
          </div>
        </div>

        {/* Acknowledgment */}
        <div className="bg-gray-900 text-white rounded-lg p-8">
          <h3 className="text-xl font-bold mb-4">Acknowledgment and Agreement</h3>
          <div className="space-y-4">
            <p className="text-gray-300">
              By using our website and purchasing our products, you acknowledge that you have read, 
              understood, and agree to be bound by these Terms and Conditions in their entirety. 
              If you do not agree to these terms, please discontinue use of our services immediately.
            </p>
            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-white mb-2">Legal Effect:</h4>
              <p className="text-gray-300 text-sm">
                These Terms constitute a legally binding agreement between you and GRM Robotics. 
                Your continued use of our services constitutes acceptance of any updates to these terms.
              </p>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-gray-700">
              <div>
                <p className="text-gray-400 text-sm">
                  Last updated: {new Date().toLocaleDateString('en-IN', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </p>
                <p className="text-gray-400 text-sm">Version 2.1</p>
              </div>
              <div className="text-right">
                <p className="text-gray-300 font-medium">GRM Robotics</p>
                <p className="text-gray-400 text-sm">Educational Technology Solutions</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
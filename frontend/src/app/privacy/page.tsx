import { Shield, Eye, Lock, Database, Users, Globe, FileText, AlertTriangle, CheckCircle, Phone, Mail } from 'lucide-react';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-16 h-16 mx-auto mb-6 text-purple-200" />
          <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-xl text-purple-100">
            Your privacy is our priority. Learn how we protect your personal information.
          </p>
          <p className="text-sm text-purple-200 mt-4">
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
        
        {/* Introduction */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <FileText className="w-7 h-7 text-blue-600" />
            Introduction
          </h2>
          
          <div className="space-y-4 text-gray-700">
            <p className="text-lg">
              At GRM Robotics, we are committed to protecting your privacy and ensuring the security 
              of your personal information. This Privacy Policy explains how we collect, use, disclose, 
              and safeguard your information when you visit our website or purchase our products.
            </p>
            <p>
              This policy applies to all users of our website, customers, and anyone who interacts 
              with our services. By using our website or services, you consent to the data practices 
              described in this policy.
            </p>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">Key Principles</h4>
              <ul className="text-blue-800 space-y-1">
                <li>• We collect only necessary information</li>
                <li>• We never sell your personal data</li>
                <li>• We use industry-standard security measures</li>
                <li>• You have control over your information</li>
              </ul>
            </div>
          </div>
        </div>  
      {/* Information We Collect */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Database className="w-7 h-7 text-green-600" />
            Information We Collect
          </h2>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">1. Personal Information You Provide</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 mb-3">
                  We collect information you voluntarily provide when you:
                </p>
                <ul className="text-gray-600 space-y-2 ml-4">
                  <li>• Create an account on our website</li>
                  <li>• Place an order for our products</li>
                  <li>• Subscribe to our newsletter</li>
                  <li>• Contact our customer support</li>
                  <li>• Participate in surveys or promotions</li>
                  <li>• Leave reviews or feedback</li>
                </ul>
                
                <div className="mt-4 space-y-3">
                  <div>
                    <h5 className="font-medium text-gray-900">Account Information:</h5>
                    <p className="text-gray-600 text-sm">Name, email address, phone number, password</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">Billing Information:</h5>
                    <p className="text-gray-600 text-sm">Billing address, shipping address (payment details handled by Razorpay)</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">Communication Data:</h5>
                    <p className="text-gray-600 text-sm">Messages, support tickets, feedback, reviews</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">2. Information Automatically Collected</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-gray-700 mb-3">
                  When you visit our website, we automatically collect certain information:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Technical Information:</h5>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• IP address and location data</li>
                      <li>• Browser type and version</li>
                      <li>• Operating system</li>
                      <li>• Device information</li>
                      <li>• Screen resolution</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Usage Information:</h5>
                    <ul className="text-gray-600 text-sm space-y-1">
                      <li>• Pages visited and time spent</li>
                      <li>• Click patterns and navigation</li>
                      <li>• Search queries</li>
                      <li>• Referral sources</li>
                      <li>• Exit pages</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">3. Cookies and Tracking Technologies</h4>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 mb-3">
                  We use cookies and similar technologies to enhance your experience:
                </p>
                <div className="space-y-3">
                  <div>
                    <h5 className="font-medium text-yellow-900">Essential Cookies:</h5>
                    <p className="text-yellow-700 text-sm">Required for website functionality, shopping cart, user authentication</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-yellow-900">Analytics Cookies:</h5>
                    <p className="text-yellow-700 text-sm">Help us understand website usage and improve user experience</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-yellow-900">Marketing Cookies:</h5>
                    <p className="text-yellow-700 text-sm">Used to deliver relevant advertisements and track campaign effectiveness</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> 
       {/* How We Use Information */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Eye className="w-7 h-7 text-purple-600" />
            How We Use Your Information
          </h2>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-3">🛒 Order Processing</h4>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• Process and fulfill your orders</li>
                    <li>• Send order confirmations and updates</li>
                    <li>• Arrange shipping and delivery</li>
                    <li>• Handle returns and replacements</li>
                    <li>• Process payments securely</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-3">📞 Customer Service</h4>
                  <ul className="text-green-800 text-sm space-y-1">
                    <li>• Respond to your inquiries</li>
                    <li>• Provide technical support</li>
                    <li>• Resolve issues and complaints</li>
                    <li>• Offer product guidance</li>
                    <li>• Improve our services</li>
                  </ul>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-3">📧 Communication</h4>
                  <ul className="text-purple-800 text-sm space-y-1">
                    <li>• Send newsletters and updates</li>
                    <li>• Notify about new products</li>
                    <li>• Share educational content</li>
                    <li>• Conduct surveys and research</li>
                    <li>• Marketing communications</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-900 mb-3">📊 Analytics & Improvement</h4>
                  <ul className="text-orange-800 text-sm space-y-1">
                    <li>• Analyze website usage patterns</li>
                    <li>• Improve user experience</li>
                    <li>• Develop new features</li>
                    <li>• Optimize product offerings</li>
                    <li>• Prevent fraud and abuse</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Legal and Security Purposes
              </h4>
              <div className="text-red-800 space-y-2">
                <p>We may also use your information to:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Comply with legal obligations and regulations</li>
                  <li>• Protect our rights and property</li>
                  <li>• Prevent fraud and unauthorized access</li>
                  <li>• Enforce our terms and conditions</li>
                  <li>• Respond to legal requests and court orders</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Information Sharing */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Users className="w-7 h-7 text-red-600" />
            Information Sharing and Disclosure
          </h2>
          
          <div className="space-y-6">
            <div className="bg-green-50 border-l-4 border-green-500 p-6">
              <h4 className="font-bold text-green-900 mb-3">✅ We DO NOT Sell Your Personal Information</h4>
              <p className="text-green-800">
                GRM Robotics does not sell, rent, or trade your personal information to third parties 
                for their marketing purposes. Your privacy is not for sale.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-4">We May Share Information With:</h4>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">🏦 Payment Processors</h5>
                  <p className="text-gray-600 text-sm mb-2">
                    We share necessary payment information with Razorpay to process transactions securely.
                  </p>
                  <ul className="text-gray-500 text-xs space-y-1">
                    <li>• Order amount and currency</li>
                    <li>• Customer name and contact details</li>
                    <li>• Billing address information</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">🚚 Shipping Partners</h5>
                  <p className="text-gray-600 text-sm mb-2">
                    We share delivery information with courier services to fulfill your orders.
                  </p>
                  <ul className="text-gray-500 text-xs space-y-1">
                    <li>• Name and delivery address</li>
                    <li>• Phone number for delivery coordination</li>
                    <li>• Order details and tracking information</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">🔧 Service Providers</h5>
                  <p className="text-gray-600 text-sm mb-2">
                    We work with trusted service providers who help us operate our business.
                  </p>
                  <ul className="text-gray-500 text-xs space-y-1">
                    <li>• Web hosting and cloud storage providers</li>
                    <li>• Email marketing platforms</li>
                    <li>• Analytics and monitoring services</li>
                    <li>• Customer support tools</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">⚖️ Legal Requirements</h5>
                  <p className="text-gray-600 text-sm mb-2">
                    We may disclose information when required by law or to protect our rights.
                  </p>
                  <ul className="text-gray-500 text-xs space-y-1">
                    <li>• Government agencies and law enforcement</li>
                    <li>• Courts and legal proceedings</li>
                    <li>• Regulatory authorities</li>
                    <li>• Tax and financial authorities</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div> 
       {/* Data Security */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Lock className="w-7 h-7 text-green-600" />
            Data Security and Protection
          </h2>
          
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="font-semibold text-green-900 mb-3">🔒 Security Measures We Implement</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-green-800 mb-2">Technical Safeguards:</h5>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• SSL/TLS encryption for data transmission</li>
                    <li>• Secure server infrastructure</li>
                    <li>• Regular security updates and patches</li>
                    <li>• Firewall protection</li>
                    <li>• Intrusion detection systems</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-green-800 mb-2">Administrative Safeguards:</h5>
                  <ul className="text-green-700 text-sm space-y-1">
                    <li>• Access controls and user permissions</li>
                    <li>• Employee training on data protection</li>
                    <li>• Regular security audits</li>
                    <li>• Incident response procedures</li>
                    <li>• Data backup and recovery plans</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-3">💳 Payment Security</h4>
              <p className="text-blue-800 mb-3">
                We use Razorpay, a PCI DSS Level 1 compliant payment gateway, to process all transactions:
              </p>
              <ul className="text-blue-700 space-y-2">
                <li>• We never store your credit card information</li>
                <li>• All payment data is encrypted and tokenized</li>
                <li>• Transactions are monitored for fraud</li>
                <li>• Secure payment processing infrastructure</li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h4 className="font-semibold text-yellow-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Important Security Notice
              </h4>
              <div className="text-yellow-800 space-y-2">
                <p>
                  While we implement industry-standard security measures, no method of transmission 
                  over the internet is 100% secure. We cannot guarantee absolute security.
                </p>
                <p className="font-medium">
                  You can help protect your account by:
                </p>
                <ul className="space-y-1 ml-4">
                  <li>• Using a strong, unique password</li>
                  <li>• Logging out after each session</li>
                  <li>• Not sharing your account credentials</li>
                  <li>• Reporting suspicious activity immediately</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Your Rights */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <CheckCircle className="w-7 h-7 text-purple-600" />
            Your Privacy Rights and Choices
          </h2>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h4 className="font-semibold text-purple-900 mb-3">📋 Access Your Data</h4>
                  <p className="text-purple-800 text-sm mb-2">
                    You have the right to request a copy of the personal information we hold about you.
                  </p>
                  <ul className="text-purple-700 text-xs space-y-1">
                    <li>• Account information and profile data</li>
                    <li>• Order history and transaction records</li>
                    <li>• Communication history</li>
                  </ul>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-3">✏️ Correct Your Data</h4>
                  <p className="text-blue-800 text-sm mb-2">
                    You can update or correct your personal information at any time.
                  </p>
                  <ul className="text-blue-700 text-xs space-y-1">
                    <li>• Update your profile information</li>
                    <li>• Change your email preferences</li>
                    <li>• Modify shipping addresses</li>
                  </ul>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="font-semibold text-red-900 mb-3">🗑️ Delete Your Data</h4>
                  <p className="text-red-800 text-sm mb-2">
                    You can request deletion of your personal information, subject to legal requirements.
                  </p>
                  <ul className="text-red-700 text-xs space-y-1">
                    <li>• Account closure and data deletion</li>
                    <li>• Removal from marketing lists</li>
                    <li>• Data retention for legal compliance</li>
                  </ul>
                </div>

                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-900 mb-3">📤 Data Portability</h4>
                  <p className="text-green-800 text-sm mb-2">
                    You can request your data in a portable format for transfer to another service.
                  </p>
                  <ul className="text-green-700 text-xs space-y-1">
                    <li>• Export your account data</li>
                    <li>• Download order history</li>
                    <li>• Structured data formats (JSON, CSV)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">📧 Marketing Communications</h4>
              <div className="space-y-3">
                <p className="text-gray-700">
                  You have full control over marketing communications:
                </p>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <h5 className="font-medium text-gray-800">Email Marketing:</h5>
                    <p className="text-gray-600 text-sm">Unsubscribe links in every email</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-800">SMS Marketing:</h5>
                    <p className="text-gray-600 text-sm">Reply STOP to opt out</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-800">Account Settings:</h5>
                    <p className="text-gray-600 text-sm">Manage preferences in your account</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>  
      {/* Data Retention */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Data Retention and Storage</h2>
          
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-3">📅 How Long We Keep Your Data</h4>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-blue-800 mb-2">Account Information:</h5>
                    <p className="text-blue-700 text-sm">Retained while your account is active, plus 3 years after closure for legal compliance</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-800 mb-2">Order Records:</h5>
                    <p className="text-blue-700 text-sm">Kept for 7 years for tax, warranty, and legal purposes</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-800 mb-2">Marketing Data:</h5>
                    <p className="text-blue-700 text-sm">Deleted immediately upon unsubscribe request</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-800 mb-2">Website Analytics:</h5>
                    <p className="text-blue-700 text-sm">Anonymized data retained for 26 months</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">🌍 International Data Transfers</h4>
              <div className="space-y-3">
                <p className="text-gray-700">
                  Your data is primarily stored and processed in India. However, some of our service 
                  providers may be located in other countries:
                </p>
                <ul className="text-gray-600 space-y-2">
                  <li>• Cloud hosting services (AWS, Google Cloud)</li>
                  <li>• Email marketing platforms</li>
                  <li>• Analytics and monitoring tools</li>
                  <li>• Customer support systems</li>
                </ul>
                <p className="text-gray-700 font-medium">
                  We ensure all international transfers comply with applicable data protection laws 
                  and include appropriate safeguards.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Children's Privacy */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Children's Privacy Protection</h2>
          
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h4 className="font-semibold text-orange-900 mb-3">👶 Age Restrictions</h4>
            <div className="space-y-3 text-orange-800">
              <p>
                Our website and services are not intended for children under 13 years of age. 
                We do not knowingly collect personal information from children under 13.
              </p>
              <div className="space-y-2">
                <p className="font-medium">If you are a parent or guardian and believe your child has provided us with personal information:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Contact us immediately at privacy@grmrobotics.com</li>
                  <li>• We will delete the information promptly</li>
                  <li>• We will take steps to prevent future collection</li>
                </ul>
              </div>
              <p className="font-medium">
                For children aged 13-18, parental consent may be required for certain activities.
              </p>
            </div>
          </div>
        </div>

        {/* Third-Party Services */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Third-Party Services and Links</h2>
          
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h4 className="font-semibold text-yellow-900 mb-3">🔗 External Links</h4>
              <p className="text-yellow-800 mb-3">
                Our website may contain links to third-party websites, including:
              </p>
              <ul className="text-yellow-700 space-y-1">
                <li>• Social media platforms (Facebook, Twitter, Instagram)</li>
                <li>• Educational resources and tutorials</li>
                <li>• Partner websites and suppliers</li>
                <li>• Payment gateway (Razorpay)</li>
              </ul>
              <p className="text-yellow-800 font-medium mt-3">
                We are not responsible for the privacy practices of these third-party sites. 
                Please review their privacy policies before providing any information.
              </p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h4 className="font-semibold text-purple-900 mb-3">🔌 Integrated Services</h4>
              <div className="space-y-3">
                <p className="text-purple-800">
                  We integrate with various third-party services to enhance your experience:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-purple-800">Analytics Services:</h5>
                    <ul className="text-purple-700 text-sm space-y-1">
                      <li>• Google Analytics</li>
                      <li>• Website performance monitoring</li>
                      <li>• User behavior analysis</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-purple-800">Communication Tools:</h5>
                    <ul className="text-purple-700 text-sm space-y-1">
                      <li>• Email marketing platforms</li>
                      <li>• Customer support chat</li>
                      <li>• SMS notification services</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Contact Us About Privacy</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-900 mb-3">Privacy Officer</h4>
              <div className="space-y-2 text-blue-800">
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <strong>Email:</strong> privacy@grmrobotics.com
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <strong>Phone:</strong> +91-9307720916
                </p>
                <p><strong>Response Time:</strong> Within 48 hours</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-blue-900 mb-3">Data Protection Requests</h4>
              <div className="space-y-2 text-blue-800 text-sm">
                <p>For data access, correction, or deletion requests:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Include your full name and email address</li>
                  <li>• Specify the type of request</li>
                  <li>• Provide verification of identity</li>
                  <li>• Allow up to 30 days for processing</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-100 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Policy Updates</h4>
            <p className="text-blue-800 text-sm">
              We may update this Privacy Policy from time to time. We will notify you of any 
              material changes by email or through a prominent notice on our website. 
              Your continued use of our services after such modifications constitutes acceptance 
              of the updated policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
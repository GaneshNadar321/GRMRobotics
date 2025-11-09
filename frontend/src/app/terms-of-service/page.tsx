import { Scale, Shield, Users, Globe, Lock, AlertTriangle, CheckCircle, FileText, CreditCard, Package } from 'lucide-react';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Scale className="w-16 h-16 mx-auto mb-6 text-indigo-200" />
          <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
          <p className="text-xl text-indigo-100">
            Service agreement governing your use of GRM Robotics platform
          </p>
          <p className="text-sm text-indigo-200 mt-4">
            Effective Date: {new Date().toLocaleDateString('en-IN', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Service Overview */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <FileText className="w-7 h-7 text-blue-600" />
            Service Overview and Scope
          </h2>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">1.1 Our Services</h4>
              <p className="text-gray-700 mb-4">
                GRM Robotics provides educational robotics solutions including:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h5 className="font-medium text-blue-900 mb-2">Physical Products:</h5>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• LEGO-compatible robotics kits</li>
                    <li>• Electronic components and sensors</li>
                    <li>• Educational building materials</li>
                    <li>• Replacement parts and accessories</li>
                  </ul>
                </div>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h5 className="font-medium text-green-900 mb-2">Digital Services:</h5>
                  <ul className="text-green-800 text-sm space-y-1">
                    <li>• Online tutorials and guides</li>
                    <li>• Educational content library</li>
                    <li>• Customer support platform</li>
                    <li>• User account management</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">1.2 Service Availability</h4>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <ul className="text-yellow-800 space-y-2">
                  <li>• Services available 24/7 with scheduled maintenance windows</li>
                  <li>• Customer support: Monday-Friday, 9 AM-6 PM IST</li>
                  <li>• Order processing: Business days only</li>
                  <li>• We reserve the right to modify service availability</li>
                </ul>
              </div>
            </div>
          </div>
        </div>        {
/* User Obligations */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Users className="w-7 h-7 text-purple-600" />
            User Obligations and Responsibilities
          </h2>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">2.1 Account Registration</h4>
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h5 className="font-medium text-green-900 mb-2">✅ Required Information:</h5>
                  <ul className="text-green-800 space-y-1">
                    <li>• Accurate personal information (name, email, phone)</li>
                    <li>• Valid shipping address for orders</li>
                    <li>• Age verification (13+ years required)</li>
                    <li>• Acceptance of these Terms of Service</li>
                  </ul>
                </div>
                
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h5 className="font-medium text-red-900 mb-2">❌ Prohibited Actions:</h5>
                  <ul className="text-red-800 space-y-1">
                    <li>• Creating multiple accounts to circumvent restrictions</li>
                    <li>• Providing false or misleading information</li>
                    <li>• Sharing account credentials with others</li>
                    <li>• Using accounts for commercial resale without permission</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">2.2 Acceptable Use Standards</h4>
              <div className="space-y-4">
                <p className="text-gray-700">
                  You agree to use our services in compliance with all applicable laws and regulations:
                </p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-medium text-blue-900 mb-2">Legal Compliance:</h5>
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>• Follow all local laws</li>
                      <li>• Respect intellectual property</li>
                      <li>• No fraudulent activities</li>
                    </ul>
                  </div>
                  
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                    <h5 className="font-medium text-purple-900 mb-2">Respectful Conduct:</h5>
                    <ul className="text-purple-800 text-sm space-y-1">
                      <li>• No harassment or abuse</li>
                      <li>• Honest reviews and feedback</li>
                      <li>• Professional communication</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h5 className="font-medium text-orange-900 mb-2">Security Awareness:</h5>
                    <ul className="text-orange-800 text-sm space-y-1">
                      <li>• Protect account credentials</li>
                      <li>• Report security issues</li>
                      <li>• No malicious activities</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Level Agreements */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <CheckCircle className="w-7 h-7 text-green-600" />
            Service Level Agreements (SLA)
          </h2>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">3.1 Website Availability</h4>
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-green-900 mb-3">Uptime Commitment:</h5>
                    <ul className="text-green-800 space-y-2">
                      <li>• 99.5% uptime target (excluding maintenance)</li>
                      <li>• Scheduled maintenance: 2-4 hours monthly</li>
                      <li>• Emergency maintenance: As needed</li>
                      <li>• Advance notice for planned downtime</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-green-900 mb-3">Performance Standards:</h5>
                    <ul className="text-green-800 space-y-2">
                      <li>• Page load time: Under 3 seconds</li>
                      <li>• Search response: Under 2 seconds</li>
                      <li>• Checkout process: Under 30 seconds</li>
                      <li>• Mobile optimization maintained</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">3.2 Customer Support SLA</h4>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse border border-gray-300">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Support Channel</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Response Time</th>
                      <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Resolution Target</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">Email Support</td>
                      <td className="border border-gray-300 px-4 py-3">Within 4 hours</td>
                      <td className="border border-gray-300 px-4 py-3">24-48 hours</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">Phone Support</td>
                      <td className="border border-gray-300 px-4 py-3">Immediate</td>
                      <td className="border border-gray-300 px-4 py-3">Same call or callback</td>
                    </tr>
                    <tr>
                      <td className="border border-gray-300 px-4 py-3">Technical Issues</td>
                      <td className="border border-gray-300 px-4 py-3">Within 2 hours</td>
                      <td className="border border-gray-300 px-4 py-3">4-8 hours</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-gray-300 px-4 py-3">Order Issues</td>
                      <td className="border border-gray-300 px-4 py-3">Within 1 hour</td>
                      <td className="border border-gray-300 px-4 py-3">Same day</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">3.3 Order Processing SLA</h4>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-blue-900">Payment Confirmation:</span>
                    <span className="text-blue-800">Within 5 minutes</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-blue-900">Order Processing:</span>
                    <span className="text-blue-800">1-2 business days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-blue-900">Shipping Notification:</span>
                    <span className="text-blue-800">Within 24 hours of dispatch</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-blue-900">Delivery (Standard):</span>
                    <span className="text-blue-800">3-7 business days</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Protection */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Lock className="w-7 h-7 text-red-600" />
            Data Protection and Privacy Commitment
          </h2>
          
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-3">4.1 Data Collection Principles</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-blue-800 mb-2">Minimal Collection:</h5>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Only necessary information collected</li>
                    <li>• Clear purpose for each data point</li>
                    <li>• No excessive or irrelevant data</li>
                  </ul>
                </div>
                <div>
                  <h5 className="font-medium text-blue-800 mb-2">Transparent Usage:</h5>
                  <ul className="text-blue-700 text-sm space-y-1">
                    <li>• Clear privacy policy disclosure</li>
                    <li>• User consent for data processing</li>
                    <li>• Regular privacy policy updates</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">4.2 Security Measures</h4>
              <div className="space-y-4">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h5 className="font-medium text-green-900 mb-2">Technical Security:</h5>
                  <ul className="text-green-800 space-y-1">
                    <li>• End-to-end encryption for sensitive data</li>
                    <li>• Regular security audits and penetration testing</li>
                    <li>• Multi-factor authentication options</li>
                    <li>• Secure cloud infrastructure (AWS/Google Cloud)</li>
                  </ul>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h5 className="font-medium text-purple-900 mb-2">Operational Security:</h5>
                  <ul className="text-purple-800 space-y-1">
                    <li>• Employee background checks and training</li>
                    <li>• Access controls and permission management</li>
                    <li>• Incident response and breach notification procedures</li>
                    <li>• Regular backup and disaster recovery testing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>     
   {/* Service Modifications */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">5. Service Modifications and Updates</h2>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">5.1 Right to Modify Services</h4>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <p className="text-yellow-800 mb-3">
                  We reserve the right to modify, update, or discontinue any aspect of our services:
                </p>
                <ul className="text-yellow-700 space-y-2">
                  <li>• Website features and functionality</li>
                  <li>• Product offerings and specifications</li>
                  <li>• Pricing and promotional terms</li>
                  <li>• Educational content and tutorials</li>
                  <li>• Terms of Service and policies</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">5.2 Notification Process</h4>
              <div className="space-y-4">
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h5 className="font-medium text-blue-900 mb-2">Minor Changes:</h5>
                    <ul className="text-blue-800 text-sm space-y-1">
                      <li>• Website updates</li>
                      <li>• Bug fixes</li>
                      <li>• Performance improvements</li>
                      <li>• No advance notice required</li>
                    </ul>
                  </div>
                  
                  <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                    <h5 className="font-medium text-orange-900 mb-2">Major Changes:</h5>
                    <ul className="text-orange-800 text-sm space-y-1">
                      <li>• Policy updates</li>
                      <li>• Service modifications</li>
                      <li>• Feature changes</li>
                      <li>• 30 days advance notice</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h5 className="font-medium text-red-900 mb-2">Service Discontinuation:</h5>
                    <ul className="text-red-800 text-sm space-y-1">
                      <li>• Product discontinuation</li>
                      <li>• Service termination</li>
                      <li>• Platform shutdown</li>
                      <li>• 90 days advance notice</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Termination Conditions */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">6. Account Termination and Service Suspension</h2>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">6.1 User-Initiated Termination</h4>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 mb-3">You may terminate your account at any time:</p>
                <ul className="text-green-700 space-y-2">
                  <li>• Contact customer support for account closure</li>
                  <li>• Complete any pending orders before termination</li>
                  <li>• Download any important data or content</li>
                  <li>• Account data deleted within 30 days of request</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">6.2 Company-Initiated Termination</h4>
              <div className="bg-red-50 border border-red-200 rounded-lg p-6">
                <p className="text-red-800 mb-3 font-medium">
                  We may suspend or terminate accounts for:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-red-900 mb-2">Immediate Termination:</h5>
                    <ul className="text-red-700 text-sm space-y-1">
                      <li>• Fraudulent activities</li>
                      <li>• Security breaches</li>
                      <li>• Illegal activities</li>
                      <li>• Severe policy violations</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-red-900 mb-2">Warning-Based Termination:</h5>
                    <ul className="text-red-700 text-sm space-y-1">
                      <li>• Repeated policy violations</li>
                      <li>• Abusive behavior</li>
                      <li>• Account misuse</li>
                      <li>• Non-payment issues</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">6.3 Post-Termination Effects</h4>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <ul className="text-gray-700 space-y-2">
                  <li>• Loss of access to account and digital content</li>
                  <li>• Pending orders may be cancelled (with refund where applicable)</li>
                  <li>• Personal data deleted according to retention policy</li>
                  <li>• Outstanding obligations remain in effect</li>
                  <li>• Warranty and support services may be affected</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Compliance and Legal */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Scale className="w-7 h-7 text-purple-600" />
            Legal Compliance and Regulatory Framework
          </h2>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">7.1 Applicable Laws and Regulations</h4>
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h5 className="font-medium text-blue-900 mb-2">Indian Legal Framework:</h5>
                  <ul className="text-blue-800 space-y-1">
                    <li>• Information Technology Act, 2000</li>
                    <li>• Consumer Protection Act, 2019</li>
                    <li>• Goods and Services Tax (GST) regulations</li>
                    <li>• Foreign Exchange Management Act (FEMA)</li>
                    <li>• Personal Data Protection Bill (when enacted)</li>
                  </ul>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h5 className="font-medium text-green-900 mb-2">Industry Standards:</h5>
                  <ul className="text-green-800 space-y-1">
                    <li>• ISO 27001 (Information Security Management)</li>
                    <li>• PCI DSS (Payment Card Industry Data Security)</li>
                    <li>• Educational content safety standards</li>
                    <li>• Product safety and quality certifications</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">7.2 Regulatory Compliance Measures</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                  <h5 className="font-medium text-purple-900 mb-2">Data Protection:</h5>
                  <ul className="text-purple-800 text-sm space-y-1">
                    <li>• Regular privacy impact assessments</li>
                    <li>• Data processing agreements with vendors</li>
                    <li>• User consent management systems</li>
                    <li>• Cross-border data transfer safeguards</li>
                  </ul>
                </div>
                
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h5 className="font-medium text-orange-900 mb-2">Financial Compliance:</h5>
                  <ul className="text-orange-800 text-sm space-y-1">
                    <li>• GST registration and compliance</li>
                    <li>• Anti-money laundering (AML) procedures</li>
                    <li>• Know Your Customer (KYC) requirements</li>
                    <li>• Financial reporting and auditing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact and Support */}
        <div className="bg-indigo-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-indigo-900 mb-6">Contact Information and Support</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-indigo-900 mb-3">General Support</h4>
              <div className="space-y-2 text-indigo-800">
                <p><strong>Email:</strong> support@grmrobotics.com</p>
                <p><strong>Phone:</strong> +91-9307720916</p>
                <p><strong>Hours:</strong> Mon-Fri, 9 AM-6 PM IST</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-indigo-900 mb-3">Legal Inquiries</h4>
              <div className="space-y-2 text-indigo-800">
                <p><strong>Email:</strong> legal@grmrobotics.com</p>
                <p><strong>Response:</strong> Within 48 hours</p>
                <p><strong>Address:</strong> Available upon request</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-indigo-900 mb-3">Emergency Contact</h4>
              <div className="space-y-2 text-indigo-800">
                <p><strong>Security Issues:</strong> security@grmrobotics.com</p>
                <p><strong>Data Breaches:</strong> Immediate response</p>
                <p><strong>Critical Bugs:</strong> 24/7 monitoring</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-indigo-100 rounded-lg">
            <h4 className="font-semibold text-indigo-900 mb-2">Terms Updates</h4>
            <p className="text-indigo-800 text-sm">
              These Terms of Service may be updated periodically. Material changes will be 
              communicated via email and website notification. Continued use of our services 
              constitutes acceptance of updated terms.
            </p>
            <p className="text-indigo-700 text-xs mt-2">
              Last Updated: {new Date().toLocaleDateString('en-IN')} | Version 3.0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
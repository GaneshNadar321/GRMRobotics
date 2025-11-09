import { CreditCard, Shield, AlertTriangle, CheckCircle, Clock, FileText, Lock } from 'lucide-react';

export default function PaymentTermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CreditCard className="w-16 h-16 mx-auto mb-6 text-green-200" />
          <h1 className="text-4xl font-bold mb-4">Payment Terms & Conditions</h1>
          <p className="text-xl text-green-100">
            Secure payment processing with no refund policy
          </p>
          <p className="text-sm text-green-200 mt-4">
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
        
        {/* Critical Notice */}
        <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
          <div className="flex items-start">
            <AlertTriangle className="w-8 h-8 text-red-600 mt-1 mr-4 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-red-900 mb-3">⚠️ CRITICAL PAYMENT POLICY</h3>
              <div className="space-y-2 text-red-800">
                <p className="font-semibold text-lg">ALL SALES ARE FINAL - NO REFUNDS</p>
                <p>
                  GRM Robotics operates a <strong>STRICT NO REFUND POLICY</strong>. Once payment is processed, 
                  it cannot be reversed, cancelled, or refunded under any circumstances.
                </p>
                <p className="font-medium">
                  By proceeding with payment, you acknowledge and accept this no-refund policy.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Processing */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Lock className="w-7 h-7 text-green-600" />
            Payment Processing & Security
          </h2>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Secure Payment Gateway</h4>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">Powered by Razorpay</span>
                </div>
                <ul className="text-green-700 text-sm space-y-1">
                  <li>• PCI DSS Level 1 compliant</li>
                  <li>• 256-bit SSL encryption</li>
                  <li>• RBI approved payment gateway</li>
                  <li>• Your card details are never stored on our servers</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Accepted Payment Methods</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="font-medium text-gray-800">Credit & Debit Cards:</p>
                  <ul className="text-gray-600 text-sm space-y-1 ml-4">
                    <li>• Visa, Mastercard, RuPay</li>
                    <li>• American Express</li>
                    <li>• All major Indian banks</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <p className="font-medium text-gray-800">Digital Payments:</p>
                  <ul className="text-gray-600 text-sm space-y-1 ml-4">
                    <li>• UPI (Google Pay, PhonePe, Paytm)</li>
                    <li>• Net Banking</li>
                    <li>• Digital wallets</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* No Refund Policy - Detailed */}
        <div className="bg-red-50 border-2 border-red-200 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-red-900 mb-6 flex items-center gap-3">
            <AlertTriangle className="w-7 h-7 text-red-600" />
            NO REFUND POLICY - READ CAREFULLY
          </h2>
          
          <div className="space-y-6">
            <div className="bg-red-100 border border-red-300 rounded-lg p-6">
              <h3 className="text-xl font-bold text-red-900 mb-4">🚫 ABSOLUTELY NO REFUNDS</h3>
              <div className="space-y-3 text-red-800">
                <p className="font-semibold">
                  We do NOT provide refunds for ANY reason including but not limited to:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="space-y-2">
                    <li>• Change of mind</li>
                    <li>• Buyer's remorse</li>
                    <li>• Wrong product selection</li>
                    <li>• Unmet expectations</li>
                    <li>• Financial difficulties</li>
                  </ul>
                  <ul className="space-y-2">
                    <li>• Technical issues on buyer's end</li>
                    <li>• Compatibility concerns</li>
                    <li>• Educational outcomes</li>
                    <li>• Delivery delays</li>
                    <li>• Any other reason</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-red-900 mb-3">Why No Refunds?</h4>
              <div className="text-red-800 space-y-2">
                <p>
                  Our educational robotics kits are specialized products with detailed descriptions, 
                  specifications, and educational content. We provide:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Comprehensive product information before purchase</li>
                  <li>Detailed specifications and compatibility details</li>
                  <li>Educational objectives and learning outcomes</li>
                  <li>Customer support for pre-purchase queries</li>
                </ul>
                <p className="font-medium mt-3">
                  By purchasing, you confirm you have reviewed all information and accept the no-refund policy.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* What We Offer Instead */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <CheckCircle className="w-7 h-7 text-green-600" />
            What We Offer Instead of Refunds
          </h2>
          
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="font-semibold text-green-900 mb-3">✅ FREE Replacement Policy</h4>
              <p className="text-green-800 mb-3">
                While we don't offer refunds, we provide FREE replacements for legitimate issues:
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="text-green-700 space-y-2">
                  <li>• Products damaged during shipping</li>
                  <li>• Wrong items sent by our mistake</li>
                  <li>• Missing components in kits</li>
                  <li>• Manufacturing defects</li>
                </ul>
                <ul className="text-green-700 space-y-2">
                  <li>• Faulty electronic components</li>
                  <li>• Incomplete kit contents</li>
                  <li>• Quality issues (within 7 days)</li>
                  <li>• Packaging errors</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">📞 Pre-Purchase Support</h4>
              <p className="text-gray-700 mb-3">
                To avoid purchase regrets, we offer comprehensive pre-purchase support:
              </p>
              <ul className="text-gray-600 space-y-2 ml-4">
                <li>• Detailed product consultations</li>
                <li>• Age and skill level recommendations</li>
                <li>• Compatibility guidance</li>
                <li>• Educational objective alignment</li>
                <li>• Technical specifications clarification</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Payment Process */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Clock className="w-7 h-7 text-blue-600" />
            Payment Process & Timeline
          </h2>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h4 className="font-semibold mb-2">Order Review</h4>
                <p className="text-sm text-gray-600">Review cart, shipping details, and total amount</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <h4 className="font-semibold mb-2">Secure Payment</h4>
                <p className="text-sm text-gray-600">Complete payment through Razorpay gateway</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <h4 className="font-semibold mb-2">Order Confirmation</h4>
                <p className="text-sm text-gray-600">Receive confirmation and tracking details</p>
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h4 className="font-semibold text-blue-900 mb-3">Important Payment Notes:</h4>
              <ul className="text-blue-800 space-y-2">
                <li>• Payment is processed immediately upon confirmation</li>
                <li>• Orders are processed within 1-2 business days after payment</li>
                <li>• Failed payments will automatically cancel the order</li>
                <li>• Payment confirmation email is sent within 5 minutes</li>
                <li>• All prices include applicable GST (18%)</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Failed Payments */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Failed Payments & Issues</h2>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Common Payment Issues:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="text-gray-600 space-y-2">
                  <li>• Insufficient funds</li>
                  <li>• Card limit exceeded</li>
                  <li>• Network connectivity issues</li>
                  <li>• Bank server downtime</li>
                </ul>
                <ul className="text-gray-600 space-y-2">
                  <li>• Incorrect card details</li>
                  <li>• OTP timeout</li>
                  <li>• International card restrictions</li>
                  <li>• Browser/app issues</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-900 mb-2">If Payment Fails:</h4>
              <ul className="text-yellow-800 space-y-1">
                <li>• Your order will be automatically cancelled</li>
                <li>• No amount will be charged to your account</li>
                <li>• You can retry payment immediately</li>
                <li>• Contact support if issues persist</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Legal Compliance */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <FileText className="w-7 h-7 text-purple-600" />
            Legal Compliance & Consumer Rights
          </h2>
          
          <div className="space-y-4 text-gray-700">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Regulatory Compliance:</h4>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>All transactions comply with RBI guidelines</li>
                <li>GST is calculated and remitted as per Indian tax laws</li>
                <li>Payment processing follows PCI DSS standards</li>
                <li>Consumer protection laws are respected within our policy framework</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Consumer Rights Disclosure:</h4>
              <p className="text-gray-700 text-sm">
                While consumer protection laws provide certain rights, our no-refund policy is clearly 
                disclosed before purchase. By proceeding with payment, customers acknowledge they have 
                read and accepted this policy. Our replacement policy for defective products ensures 
                consumer protection for quality issues.
              </p>
            </div>
          </div>
        </div>

        {/* International Payments */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">International Payment Considerations</h2>
          
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <h4 className="font-semibold text-yellow-900 mb-3">Currency and Exchange Rates</h4>
              <div className="space-y-3 text-yellow-800">
                <p>
                  All prices are displayed and charged in Indian Rupees (INR). For international customers:
                </p>
                <ul className="space-y-2 ml-4">
                  <li>• Your bank may charge currency conversion fees</li>
                  <li>• Exchange rates are determined by your card issuer</li>
                  <li>• We are not responsible for currency fluctuations</li>
                  <li>• International transaction fees may apply</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h4 className="font-semibold text-red-900 mb-3">Geographic Restrictions</h4>
              <div className="space-y-3 text-red-800">
                <p className="font-medium">Currently, we only ship within India and accept payments from:</p>
                <ul className="space-y-1 ml-4">
                  <li>• Indian-issued credit and debit cards</li>
                  <li>• Indian bank accounts (UPI, Net Banking)</li>
                  <li>• Indian digital wallets</li>
                </ul>
                <p className="mt-3">
                  International shipping and payment options may be added in the future. 
                  Contact us for updates on international availability.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Taxation and Billing */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Taxation and Billing Information</h2>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Goods and Services Tax (GST)</h4>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="font-medium text-blue-900 mb-2">GST Registration:</h5>
                      <ul className="text-blue-800 text-sm space-y-1">
                        <li>• GRM Robotics is GST registered</li>
                        <li>• GST number provided on all invoices</li>
                        <li>• Compliant with Indian tax regulations</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-blue-900 mb-2">Tax Calculation:</h5>
                      <ul className="text-blue-800 text-sm space-y-1">
                        <li>• 18% GST applied to all products</li>
                        <li>• Tax calculated on product price + shipping</li>
                        <li>• Displayed separately in cart and invoice</li>
                      </ul>
                    </div>
                  </div>
                  
                  <div className="bg-blue-100 rounded-lg p-4">
                    <h5 className="font-medium text-blue-900 mb-2">Invoice Details:</h5>
                    <p className="text-blue-800 text-sm">
                      All purchases include detailed GST invoices with proper tax breakdowns, 
                      HSN codes, and compliance information required for business purchases and tax filing.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Business Purchases</h4>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-green-800 mb-3">
                  For business purchases and bulk orders:
                </p>
                <ul className="text-green-700 space-y-2">
                  <li>• Provide GST number during checkout for input tax credit</li>
                  <li>• Business invoices available with complete tax details</li>
                  <li>• Purchase orders accepted for institutional buyers</li>
                  <li>• Credit terms available for verified businesses</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Disputes */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Disputes and Chargebacks</h2>
          
          <div className="space-y-6">
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
              <h4 className="font-semibold text-orange-900 mb-3">Dispute Resolution Process</h4>
              <div className="space-y-4">
                <p className="text-orange-800">
                  Before initiating a chargeback with your bank, please contact us directly:
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-orange-900 mb-2">Step 1: Contact Us First</h5>
                    <ul className="text-orange-800 text-sm space-y-1">
                      <li>• Email: payments@grmrobotics.com</li>
                      <li>• Phone: +91-9307720916</li>
                      <li>• Response within 2 hours</li>
                      <li>• Most issues resolved same day</li>
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-orange-900 mb-2">Step 2: Provide Information</h5>
                    <ul className="text-orange-800 text-sm space-y-1">
                      <li>• Order number and transaction ID</li>
                      <li>• Nature of the dispute</li>
                      <li>• Supporting documentation</li>
                      <li>• Preferred resolution method</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h4 className="font-semibold text-red-900 mb-3">Chargeback Policy</h4>
              <div className="space-y-3 text-red-800">
                <p className="font-medium">
                  Important: Chargebacks should be a last resort due to our NO REFUND policy.
                </p>
                <ul className="space-y-2">
                  <li>• We will contest invalid chargebacks with evidence</li>
                  <li>• Chargeback fees may be passed to customers for frivolous claims</li>
                  <li>• Accounts may be suspended for repeated chargeback abuse</li>
                  <li>• Valid chargebacks for fraud or unauthorized transactions are supported</li>
                </ul>
                <div className="bg-red-100 rounded-lg p-3 mt-3">
                  <p className="text-red-900 text-sm font-medium">
                    Remember: We offer FREE replacements for damaged or incorrect items. 
                    Contact us first before involving your bank.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact for Payment Issues */}
        <div className="bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Payment Support & Contact</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-900 mb-3">Payment Issues Support</h4>
              <div className="space-y-2 text-blue-800">
                <p><strong>Email:</strong> payments@grmrobotics.com</p>
                <p><strong>Phone:</strong> +91-9307720916</p>
                <p><strong>Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM IST</p>
                <p><strong>Response Time:</strong> Within 2 hours during business hours</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-blue-900 mb-3">What to Include in Support Requests:</h4>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• Order number (if available)</li>
                <li>• Payment method used</li>
                <li>• Error message received</li>
                <li>• Transaction reference number</li>
                <li>• Screenshot of the issue</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-100 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Payment Security Guarantee</h4>
            <p className="text-blue-800 text-sm">
              Your payment information is protected by industry-leading security measures. 
              We use Razorpay's PCI DSS Level 1 compliant infrastructure to ensure your 
              financial data remains secure throughout the transaction process.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
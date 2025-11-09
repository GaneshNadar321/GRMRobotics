import { Truck, Package, Clock, MapPin, Shield, AlertTriangle, CheckCircle, Phone } from 'lucide-react';

export default function ShippingPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Truck className="w-16 h-16 mx-auto mb-6 text-blue-200" />
          <h1 className="text-4xl font-bold mb-4">Shipping Policy</h1>
          <p className="text-xl text-blue-100">
            Fast, secure delivery across India
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
        
        {/* Shipping Overview */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Package className="w-7 h-7 text-blue-600" />
            Shipping Overview
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="font-semibold mb-2">Processing Time</h4>
              <p className="text-gray-600">1-2 Business Days</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="font-semibold mb-2">Delivery Time</h4>
              <p className="text-gray-600">3-7 Business Days</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="font-semibold mb-2">Coverage</h4>
              <p className="text-gray-600">All India</p>
            </div>
          </div>

          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <h4 className="font-semibold text-green-900">Free Shipping Available!</h4>
            </div>
            <p className="text-green-800">
              Enjoy free shipping on all orders above ₹1,000. Orders below ₹1,000 have a flat shipping charge of ₹50.
            </p>
          </div>
        </div>

        {/* Shipping Charges */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Charges</h2>
          
          <div className="space-y-6">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Order Value</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Shipping Charge</th>
                    <th className="border border-gray-300 px-4 py-3 text-left font-semibold">Delivery Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 px-4 py-3">Above ₹1,000</td>
                    <td className="border border-gray-300 px-4 py-3 text-green-600 font-semibold">FREE</td>
                    <td className="border border-gray-300 px-4 py-3">3-7 business days</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3">Below ₹1,000</td>
                    <td className="border border-gray-300 px-4 py-3">₹50</td>
                    <td className="border border-gray-300 px-4 py-3">3-7 business days</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">💡 Pro Tip</h4>
              <p className="text-blue-800 text-sm">
                Add items worth ₹1,000 or more to your cart to qualify for free shipping and save ₹50!
              </p>
            </div>
          </div>
        </div>

        {/* Delivery Areas */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <MapPin className="w-7 h-7 text-green-600" />
            Delivery Areas
          </h2>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">We Ship Across India</h4>
              <p className="text-gray-700 mb-4">
                GRM Robotics delivers to all states and union territories in India, including remote areas. 
                However, delivery times may vary based on location accessibility.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-900 mb-3">✅ Standard Delivery (3-5 days)</h4>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Major cities (Mumbai, Delhi, Bangalore, Chennai, etc.)</li>
                  <li>• State capitals</li>
                  <li>• Tier 1 & Tier 2 cities</li>
                  <li>• Well-connected towns</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-orange-900 mb-3">⏰ Extended Delivery (5-7 days)</h4>
                <ul className="text-gray-600 space-y-1 text-sm">
                  <li>• Remote areas</li>
                  <li>• Hill stations</li>
                  <li>• Island territories</li>
                  <li>• Areas with limited connectivity</li>
                </ul>
              </div>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 mt-1 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-yellow-900 mb-2">Special Delivery Areas</h4>
                  <p className="text-yellow-800 text-sm">
                    Some remote locations may require additional 1-2 days for delivery. We'll notify you 
                    if your area falls under this category during order confirmation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Processing & Packaging */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Processing & Packaging</h2>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Order Processing Timeline</h4>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">Payment Confirmation</h5>
                    <p className="text-gray-600 text-sm">Order processing begins immediately after successful payment</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">Quality Check & Packaging</h5>
                    <p className="text-gray-600 text-sm">Each kit is inspected and securely packaged (1-2 business days)</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900">Dispatch & Tracking</h5>
                    <p className="text-gray-600 text-sm">Package is dispatched with tracking number sent via email/SMS</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Secure Packaging</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                <ul className="text-gray-700 space-y-2">
                  <li>• Bubble wrap protection for delicate components</li>
                  <li>• Sturdy cardboard boxes to prevent damage</li>
                  <li>• Tamper-evident packaging</li>
                  <li>• Proper labeling and handling instructions</li>
                  <li>• Eco-friendly packaging materials where possible</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Tracking & Delivery */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Shield className="w-7 h-7 text-purple-600" />
            Tracking & Delivery
          </h2>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Order Tracking</h4>
              <div className="space-y-3">
                <p className="text-gray-700">
                  Once your order is dispatched, you'll receive:
                </p>
                <ul className="text-gray-600 space-y-2 ml-4">
                  <li>• SMS with tracking number and courier partner details</li>
                  <li>• Email with tracking link and estimated delivery date</li>
                  <li>• Real-time updates on package movement</li>
                  <li>• Delivery confirmation notification</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Delivery Process</h4>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <ul className="text-blue-800 space-y-2">
                  <li>• Delivery attempted during business hours (9 AM - 7 PM)</li>
                  <li>• Someone must be available to receive the package</li>
                  <li>• Valid ID required for delivery confirmation</li>
                  <li>• Package cannot be left unattended</li>
                  <li>• Re-delivery attempted if first attempt fails</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Failed Delivery</h4>
              <div className="space-y-3">
                <p className="text-gray-700">
                  If delivery fails due to recipient unavailability:
                </p>
                <ul className="text-gray-600 space-y-2 ml-4">
                  <li>• Up to 3 delivery attempts will be made</li>
                  <li>• Package held at local courier office for 7 days</li>
                  <li>• Customer can arrange pickup from courier office</li>
                  <li>• After 7 days, package returns to us</li>
                  <li>• Re-shipping charges apply for returned packages</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Important Policies */}
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-red-900 mb-6 flex items-center gap-3">
            <AlertTriangle className="w-7 h-7 text-red-600" />
            Important Shipping Policies
          </h2>
          
          <div className="space-y-4">
            <div>
              <h4 className="font-semibold text-red-900 mb-2">Address Changes</h4>
              <p className="text-red-800">
                Shipping address <strong>CANNOT be changed</strong> after order confirmation. 
                Please verify your address carefully before placing the order.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-red-900 mb-2">Delivery Delays</h4>
              <p className="text-red-800">
                We are not responsible for delays caused by:
              </p>
              <ul className="text-red-700 space-y-1 ml-4 mt-2">
                <li>• Courier service delays</li>
                <li>• Natural disasters or weather conditions</li>
                <li>• Government restrictions or lockdowns</li>
                <li>• Incorrect or incomplete address provided</li>
                <li>• Recipient unavailability</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-red-900 mb-2">Risk Transfer</h4>
              <p className="text-red-800">
                Risk of loss or damage passes to the buyer upon delivery. Please inspect 
                packages immediately and report any damage within 24 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Damaged Packages */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Damaged or Lost Packages</h2>
          
          <div className="space-y-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Package Damage During Transit</h4>
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <p className="text-orange-800 mb-3">
                  If your package arrives damaged:
                </p>
                <ul className="text-orange-700 space-y-2">
                  <li>• Do not accept the delivery if outer packaging is severely damaged</li>
                  <li>• If accepted, take photos immediately before opening</li>
                  <li>• Contact us within 24 hours with photos</li>
                  <li>• We'll arrange free replacement for damaged items</li>
                </ul>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Lost Packages</h4>
              <div className="space-y-3">
                <p className="text-gray-700">
                  If your package is lost in transit:
                </p>
                <ul className="text-gray-600 space-y-2 ml-4">
                  <li>• We'll track the package with courier partner</li>
                  <li>• Investigation period: 7-10 business days</li>
                  <li>• If confirmed lost, we'll send replacement at no cost</li>
                  <li>• Insurance claims handled by us, not customer</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Contact for Shipping Issues */}
        <div className="bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-blue-900 mb-6">Shipping Support</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-blue-900 mb-3">Shipping Inquiries</h4>
              <div className="space-y-2 text-blue-800">
                <p><strong>Email:</strong> shipping@grmrobotics.com</p>
                <p><strong>Phone:</strong> +91-9307720916</p>
                <p><strong>Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM IST</p>
                <p><strong>Response Time:</strong> Within 4 hours during business hours</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-blue-900 mb-3">Track Your Order</h4>
              <div className="space-y-2 text-blue-800">
                <p>• Use tracking number from SMS/email</p>
                <p>• Check courier partner website</p>
                <p>• Contact us for tracking assistance</p>
                <p>• Get delivery updates via notifications</p>
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-100 rounded-lg">
            <h4 className="font-semibold text-blue-900 mb-2">Need Help?</h4>
            <p className="text-blue-800 text-sm">
              For any shipping-related queries, concerns, or issues, don't hesitate to contact our 
              support team. We're here to ensure your robotics kits reach you safely and on time!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
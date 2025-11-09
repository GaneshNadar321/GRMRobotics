import { Shield, Package, AlertTriangle, CheckCircle, Clock, Phone, Mail } from 'lucide-react';

export default function ReplacementPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-16 h-16 mx-auto mb-6 text-blue-200" />
          <h1 className="text-4xl font-bold mb-4">Replacement Policy</h1>
          <p className="text-xl text-blue-100">
            We stand behind the quality of our robotics kits with our comprehensive replacement guarantee
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
                <strong>GRM Robotics does not offer general returns or refunds.</strong> We only provide replacements 
                for products that are damaged during shipping or if you receive an incorrect item.
              </p>
            </div>
          </div>
        </div>

        {/* Replacement Coverage */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <CheckCircle className="w-7 h-7 text-green-600" />
            What We Replace
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Package className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Damaged Products</h4>
                  <p className="text-gray-600 text-sm">Items damaged during shipping or manufacturing defects</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <AlertTriangle className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Wrong Items</h4>
                  <p className="text-gray-600 text-sm">If you receive a different product than what you ordered</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Package className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Missing Components</h4>
                  <p className="text-gray-600 text-sm">If your kit is missing essential parts or components</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">Quality Guarantee</h4>
              <p className="text-gray-600 text-sm mb-4">
                Every GRM Robotics kit undergoes rigorous quality testing. If you receive a defective product, 
                we'll replace it at no cost to you.
              </p>
              <div className="flex items-center gap-2 text-sm text-green-700">
                <Shield className="w-4 h-4" />
                <span className="font-medium">100% Quality Assured</span>
              </div>
            </div>
          </div>
        </div>

        {/* What We Don't Replace */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <AlertTriangle className="w-7 h-7 text-red-600" />
            What We Don't Replace
          </h2>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-gray-900">Change of Mind</h4>
                <p className="text-gray-600">We do not accept returns simply because you changed your mind about the purchase</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-gray-900">User Damage</h4>
                <p className="text-gray-600">Products damaged due to misuse, accidents, or normal wear and tear</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-gray-900">Opened Educational Kits</h4>
                <p className="text-gray-600">Once opened and used, kits cannot be returned unless defective</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
              <div>
                <h4 className="font-semibold text-gray-900">Digital Content</h4>
                <p className="text-gray-600">Downloaded tutorials, manuals, or software cannot be returned</p>
              </div>
            </div>
          </div>
        </div>

        {/* Replacement Process */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Clock className="w-7 h-7 text-blue-600" />
            Replacement Process
          </h2>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                1
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Contact Us Immediately</h4>
                <p className="text-gray-600">
                  Report damaged or incorrect items within <strong>7 days</strong> of delivery. 
                  Include photos of the damage or incorrect item.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                2
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Verification</h4>
                <p className="text-gray-600">
                  Our team will review your case and may request additional photos or information 
                  to process your replacement request.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                3
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Replacement Shipment</h4>
                <p className="text-gray-600">
                  Once approved, we'll ship your replacement item at no cost. You may need to 
                  return the damaged item using our prepaid shipping label.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="bg-blue-50 rounded-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Replacement Timeline</h3>
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-2">7 Days</div>
              <div className="text-sm text-blue-800">Report Issues</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-2">2-3 Days</div>
              <div className="text-sm text-blue-800">Review & Approval</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-blue-600 mb-2">3-5 Days</div>
              <div className="text-sm text-blue-800">Replacement Delivery</div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Need a Replacement?</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="flex items-start gap-3">
              <Mail className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Email Support</h4>
                <p className="text-gray-600 mb-2">Send us photos and details of the issue</p>
                <a href="mailto:support@grmrobotics.com" className="text-blue-600 hover:underline font-medium">
                  support@grmrobotics.com
                </a>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <Phone className="w-6 h-6 text-blue-600 mt-1" />
              <div>
                <h4 className="font-semibold text-gray-900">Phone Support</h4>
                <p className="text-gray-600 mb-2">Speak directly with our support team</p>
                <a href="tel:+919307720916" className="text-blue-600 hover:underline font-medium">
                  +91-9307720916
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-sm text-gray-600">
              <strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM IST<br />
              <strong>Response Time:</strong> We respond to all replacement requests within 24 hours
            </p>
          </div>
        </div>

        {/* Prevention Tips */}
        <div className="bg-green-50 rounded-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-green-900 mb-4">💡 Prevention Tips</h3>
          <ul className="space-y-2 text-sm text-green-800">
            <li>• Inspect your package immediately upon delivery</li>
            <li>• Take photos of any damage before opening</li>
            <li>• Keep all original packaging until you've tested the product</li>
            <li>• Contact us within 7 days if you notice any issues</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
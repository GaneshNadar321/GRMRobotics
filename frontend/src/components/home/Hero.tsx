import Link from 'next/link';
import { Sparkles, Play, ArrowRight } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-primary-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-primary-400 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center">
          {/* Badge */}


          {/* Main heading */}
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in-up">
            Build Your Future
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
              with Robotics
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl mb-10 text-primary-100 max-w-3xl mx-auto animate-fade-in-up animation-delay-200">
            Build robots from basics to futuristic innovations with our robotic kits </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up animation-delay-400">
            <Link
              href="/products"
              className="group btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Shop Now
              <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/tutorials"
              className="group btn bg-primary-500/20 backdrop-blur-sm border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              <Play className="inline-block mr-2 w-5 h-5 group-hover:scale-110 transition-transform" />
              Watch Tutorials
            </Link>
          </div>

          {/* Features */}
          {/* <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { icon: '🎓', text: 'Beginner Friendly' },
              { icon: '📹', text: 'Video Tutorials' },
              { icon: '🚀', text: 'Fast Shipping' },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg animate-fade-in-up"
                style={{ animationDelay: `${600 + index * 100}ms` }}
              >
                <span className="text-2xl">{feature.icon}</span>
                <span className="font-medium">{feature.text}</span>
              </div>
            ))}
          </div> */}
        </div>
      </div>

      {/* Wave separator */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="rgb(249, 250, 251)"
          />
        </svg>
      </div>
    </section>
  );
}

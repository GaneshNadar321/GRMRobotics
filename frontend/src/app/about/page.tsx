'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Award, Users, Target, Heart, Lightbulb, Rocket, Globe, Zap, Code, Cpu, BookOpen, Star, ArrowRight, Play, Shield, Headphones } from 'lucide-react';

export default function AboutPage() {
  const [activeStep, setActiveStep] = useState(1);
  const [scrollProgress, setScrollProgress] = useState(0);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div className="bg-white relative">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Floating Navigation */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 hidden lg:block">
        <div className="bg-white shadow-lg rounded-full p-2 space-y-2">
          <button
            onClick={() => scrollToSection('mission')}
            className="w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 flex items-center justify-center transition-colors group"
            title="Mission & Vision"
          >
            <Target className="w-4 h-4 text-blue-600" />
          </button>
          <button
            onClick={() => scrollToSection('features')}
            className="w-10 h-10 rounded-full bg-green-100 hover:bg-green-200 flex items-center justify-center transition-colors group"
            title="What Makes Us Different"
          >
            <Award className="w-4 h-4 text-green-600" />
          </button>
          <button
            onClick={() => scrollToSection('story')}
            className="w-10 h-10 rounded-full bg-purple-100 hover:bg-purple-200 flex items-center justify-center transition-colors group"
            title="Our Story"
          >
            <Rocket className="w-4 h-4 text-purple-600" />
          </button>
        </div>
      </div>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-purple-600/90"></div>
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Rocket className="w-4 h-4" />
              <span className="text-sm font-medium">Launching Innovation in Robotics Education</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
              About GRM Robotics
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto mb-8 leading-relaxed">
              Pioneering the future of STEM education through innovative robotics kits that inspire creativity, 
              foster learning, and build tomorrow's innovators.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => {
                  toast('🎬 Coming Soon!', {
                    icon: '🚀',
                    duration: 4000,
                    style: {
                      background: '#3B82F6',
                      color: 'white',
                      fontWeight: 'bold',
                    },
                  });
                  toast('Our story video is currently in production. Stay tuned for an inspiring journey of innovation and education!', {
                    icon: '📹',
                    duration: 6000,
                    style: {
                      background: '#1E40AF',
                      color: 'white',
                    },
                  });
                }}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 flex items-center gap-2 justify-center relative group"
              >
                <Play className="w-5 h-5 group-hover:animate-pulse" />
                Watch Our Story
                <span className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs px-2 py-1 rounded-full font-bold animate-pulse">
                  Soon
                </span>
              </button>
              <Link 
                href="/products"
                className="border-2 border-white/30 text-white px-8 py-4 rounded-xl font-semibold hover:bg-white/10 transition-all flex items-center gap-2 justify-center"
              >
                <ArrowRight className="w-5 h-5" />
                Explore Products
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mission & Vision Section */}
      <div id="mission" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 rounded-full px-4 py-2 mb-6">
              <Target className="w-4 h-4" />
              <span className="text-sm font-semibold">Our Mission</span>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Democratizing Robotics Education for Everyone
            </h2>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              At GRM Robotics, we envision a world where every curious mind has access to cutting-edge 
              robotics education. We're breaking down barriers by creating affordable, high-quality 
              robotics kits that make complex concepts simple and engaging.
            </p>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our innovative LEGO-compatible design philosophy ensures that learning is intuitive, 
              fun, and accessible to students from elementary school through university level.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Zap className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium">Hands-on learning that sparks creativity</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Code className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-gray-700 font-medium">Programming concepts made simple</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <Cpu className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-gray-700 font-medium">Real-world engineering principles</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                    <Lightbulb className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Innovation First</h3>
                  <p className="text-sm text-gray-600">Cutting-edge designs that push the boundaries of educational robotics</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Global Impact</h3>
                  <p className="text-sm text-gray-600">Building a worldwide community of young innovators and creators</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Learn by Doing</h3>
                  <p className="text-sm text-gray-600">Comprehensive tutorials and resources for every learning style</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center mb-4">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Excellence</h3>
                  <p className="text-sm text-gray-600">Premium quality components and unmatched educational value</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* What Makes Us Different */}
      <div id="features" className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 rounded-full px-4 py-2 mb-6">
              <Award className="w-4 h-4" />
              <span className="text-sm font-semibold">What Makes Us Different</span>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Built for the Future of Learning
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're not just another robotics company. We're education innovators creating 
              the next generation of learning tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Premium Quality</h3>
              <p className="text-gray-600 leading-relaxed">
                Every component is carefully selected and tested to ensure durability, 
                precision, and long-lasting educational value.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Inclusive Learning</h3>
              <p className="text-gray-600 leading-relaxed">
                Designed for all skill levels, from complete beginners to advanced students, 
                with progressive learning paths.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6">
                <Lightbulb className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Innovation Focus</h3>
              <p className="text-gray-600 leading-relaxed">
                Constantly evolving our designs based on the latest educational research 
                and technological advances.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <Headphones className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Expert Support</h3>
              <p className="text-gray-600 leading-relaxed">
                Dedicated support team of educators and engineers ready to help 
                every step of your learning journey.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <div id="story" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
              <div className="space-y-6">
                {[
                  { 
                    id: 1, 
                    title: "The Vision", 
                    description: "Recognizing the gap in accessible, high-quality robotics education tools",
                    color: "bg-blue-600"
                  },
                  { 
                    id: 2, 
                    title: "The Innovation", 
                    description: "Developing LEGO-compatible kits with professional-grade components",
                    color: "bg-green-600"
                  },
                  { 
                    id: 3, 
                    title: "The Launch", 
                    description: "Bringing our first robotics kits to market with comprehensive learning resources",
                    color: "bg-purple-600"
                  },
                  { 
                    id: 4, 
                    title: "The Future", 
                    description: "Expanding our impact to inspire the next generation of innovators worldwide",
                    color: "bg-orange-600"
                  }
                ].map((step) => (
                  <div 
                    key={step.id}
                    className={`flex items-start gap-4 cursor-pointer transition-all duration-300 ${
                      activeStep === step.id ? 'transform scale-105' : 'hover:transform hover:scale-102'
                    }`}
                    onClick={() => setActiveStep(step.id)}
                  >
                    <div className={`w-8 h-8 ${step.color} rounded-full flex items-center justify-center flex-shrink-0 mt-1 transition-all duration-300 ${
                      activeStep === step.id ? 'ring-4 ring-blue-200' : ''
                    }`}>
                      <span className="text-white text-sm font-bold">{step.id}</span>
                    </div>
                    <div>
                      <h4 className={`font-bold mb-2 transition-colors ${
                        activeStep === step.id ? 'text-blue-600' : 'text-gray-900'
                      }`}>
                        {step.title}
                      </h4>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-600 rounded-full px-4 py-2 mb-6">
              <Rocket className="w-4 h-4" />
              <span className="text-sm font-semibold">Our Journey</span>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              From Idea to Innovation
            </h2>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              GRM Robotics was born from a simple yet powerful observation: robotics education 
              was either too expensive or too simplistic. We saw an opportunity to bridge this gap 
              with innovative, affordable solutions.
            </p>
            
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Our founding team of passionate educators and engineers came together with a shared 
              vision: to democratize robotics education and make it accessible to every curious mind, 
              regardless of background or budget.
            </p>
            
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Today, we're proud to be at the forefront of educational innovation, creating tools 
              that not only teach robotics but inspire creativity, problem-solving, and a lifelong 
              love of learning.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <h4 className="font-bold text-blue-900">Our Commitment</h4>
              </div>
              <p className="text-blue-800">
                Every product we create is designed with one goal in mind: to spark curiosity, 
                foster innovation, and prepare students for a technology-driven future.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Impact & Vision Section */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <Globe className="w-4 h-4" />
              <span className="text-sm font-semibold">Our Vision for the Future</span>
            </div>
            
            <h2 className="text-4xl font-bold mb-6">
              Shaping Tomorrow's Innovators
            </h2>
            
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              We're building more than products – we're creating the foundation for the next 
              generation of engineers, programmers, and innovators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-blue-100">Quality Commitment</div>
              <p className="text-sm text-blue-200 mt-2">Every kit tested to perfection</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Learning Resources</div>
              <p className="text-sm text-blue-200 mt-2">Always available support</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold mb-2">∞</div>
              <div className="text-blue-100">Innovation Potential</div>
              <p className="text-sm text-blue-200 mt-2">Limitless creativity unleashed</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl font-bold mb-2">1st</div>
              <div className="text-blue-100">Priority: Education</div>
              <p className="text-sm text-blue-200 mt-2">Learning comes first, always</p>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold mb-4">Ready to Join the Revolution?</h3>
              <p className="text-blue-100 mb-6">
                Be part of the educational transformation. Start your robotics journey today 
                and help us build a future where every student can innovate, create, and dream big.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link 
                  href="/products"
                  className="bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-all text-center"
                >
                  Explore Our Kits
                </Link>
                <Link 
                  href="/contact"
                  className="border-2 border-white/30 text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/10 transition-all text-center"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Final CTA Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-12 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-600 rounded-full px-4 py-2 mb-6">
              <Star className="w-4 h-4" />
              <span className="text-sm font-semibold">Start Your Journey</span>
            </div>
            
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Unlock Your Potential?
            </h2>
            
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of students, educators, and innovators who are already building 
              the future with GRM Robotics. Your journey into robotics starts here.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <a 
                href="/products" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 flex items-center gap-2 justify-center"
              >
                <Rocket className="w-5 h-5" />
                Explore Our Kits
              </a>
              <a 
                href="/contact" 
                className="bg-white border-2 border-gray-300 hover:border-blue-300 text-gray-700 hover:text-blue-600 px-8 py-4 rounded-xl font-semibold transition-all flex items-center gap-2 justify-center"
              >
                <Headphones className="w-5 h-5" />
                Get in Touch
              </a>
            </div>
            
            <div className="flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Quality Guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4" />
                <span>Expert Support</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span>Made with Passion</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

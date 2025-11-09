'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import toast from 'react-hot-toast';

import { Mail, Lock, User, Phone, UserPlus, Loader2, AlertCircle, CheckCircle, Eye, EyeOff, Shield, Zap, Users, Award, ArrowRight, Gift, BookOpen, Trophy, Target } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    phone: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<any>({});
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  // Password strength calculation
  useEffect(() => {
    const password = formData.password;
    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (/[A-Z]/.test(password)) strength += 1;
    if (/[a-z]/.test(password)) strength += 1;
    if (/[0-9]/.test(password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;
    setPasswordStrength(strength);
  }, [formData.password]);

  // Form validation
  useEffect(() => {
    const isValid = formData.firstName.length > 0 && 
                   formData.lastName.length > 0 &&
                   formData.email.length > 0 && 
                   formData.password.length >= 8 && 
                   /\S+@\S+\.\S+/.test(formData.email) &&
                   agreedToTerms;
    setIsFormValid(isValid);
  }, [formData, agreedToTerms]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    // Validation
    const newErrors: any = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      const response = await api.post('/auth/register', formData);
      const { user, accessToken, refreshToken } = response.data;
      
      setAuth(user, accessToken, refreshToken);
      
      // Personalized welcome message
      toast.success(`Welcome to GRM Robotics, ${user.firstName}! 🎉`, {
        duration: 5000,
        icon: '🚀',
      });
      
      setTimeout(() => {
        router.push('/products');
      }, 100);
    } catch (error: any) {
      const message = error.response?.data?.error || 'Registration failed. Please try again.';
      toast.error(message);
      setErrors({ general: message });
    } finally {
      setLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength <= 1) return 'bg-red-500';
    if (passwordStrength <= 2) return 'bg-orange-500';
    if (passwordStrength <= 3) return 'bg-yellow-500';
    if (passwordStrength <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength <= 1) return 'Weak';
    if (passwordStrength <= 2) return 'Fair';
    if (passwordStrength <= 3) return 'Good';
    if (passwordStrength <= 4) return 'Strong';
    return 'Very Strong';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #f1f5f9 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}></div>
      </div>
      
      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Professional Branding */}
        <div className="hidden lg:flex lg:w-3/5 bg-gradient-to-br from-emerald-900 via-slate-800 to-blue-900 relative overflow-hidden">
          {/* Geometric background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-32 h-32 bg-emerald-500/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-32 right-32 w-48 h-48 bg-blue-500/10 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-500/10 rounded-full blur-lg"></div>
          </div>
          
          <div className="relative z-10 flex flex-col justify-center px-16 py-20 text-white max-w-2xl">
            {/* Logo and Brand */}
            <div className="mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl mb-8 shadow-2xl">
                <span className="text-2xl font-bold">GRM</span>
              </div>
              <h1 className="text-5xl font-bold mb-6 leading-tight tracking-tight">
                Start Your Journey in
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-purple-400">
                  Robotics Innovation
                </span>
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed">
                Be among the first to experience our innovative approach to robotics education with quality kits and expert guidance.
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Gift className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Comprehensive Kits</h3>
                  <p className="text-slate-400">Complete robotics kits with all components and detailed instructions</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <BookOpen className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Expert Guidance</h3>
                  <p className="text-slate-400">Learn from experienced engineers with step-by-step tutorials</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Trophy className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Innovation Focus</h3>
                  <p className="text-slate-400">Build cutting-edge projects with modern robotics technology</p>
                </div>
              </div>
            </div>

            {/* Company Mission */}
            <div className="p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
              <div className="flex items-center gap-3 mb-3">
                <Target className="w-5 h-5 text-emerald-400" />
                <p className="text-sm text-emerald-300 font-medium">Our Mission</p>
              </div>
              <p className="text-white font-medium mb-3">
                "To make robotics education accessible and engaging for everyone, from beginners to advanced learners, through quality kits and expert support."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-blue-400 rounded-full flex items-center justify-center">
                  <span className="text-xs font-bold text-white">GRM</span>
                </div>
                <div>
                  <p className="text-emerald-300 text-sm font-medium">GRM Robotics Team</p>
                  <p className="text-slate-400 text-xs">Robotics Engineers & Educators</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Register Form */}
        <div className="flex-1 lg:w-2/5 flex items-center justify-center px-6 sm:px-8 lg:px-12 py-12">
          <div className="w-full max-w-md space-y-8">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl mb-6 shadow-xl">
                <span className="text-2xl font-bold text-white">GRM</span>
              </div>
            </div>

            {/* Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-3">
                Create your account
              </h2>
              <p className="text-slate-600 text-lg">
                Start your robotics journey today
              </p>
            </div>

            {/* Register Card */}
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/50 p-8 space-y-6">
              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
                  <div>
                    <p className="font-semibold text-red-800">Registration Failed</p>
                    <p className="text-sm mt-1 text-red-600">{errors.general}</p>
                  </div>
                </div>
              )}



              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">First Name</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className={`h-5 w-5 transition-colors ${
                          formData.firstName ? 'text-emerald-500' : 'text-slate-400'
                        }`} />
                      </div>
                      <input
                        type="text"
                        value={formData.firstName}
                        onChange={(e) => {
                          setFormData({ ...formData, firstName: e.target.value });
                          if (errors.firstName) setErrors({ ...errors, firstName: null });
                        }}
                        className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl transition-all duration-200 bg-slate-50/50 ${
                          errors.firstName 
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                            : formData.firstName 
                              ? 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-200'
                              : 'border-slate-200 focus:border-emerald-400 focus:ring-emerald-100'
                        } focus:outline-none focus:ring-4 focus:bg-white`}
                        placeholder="First name"
                        disabled={loading}
                      />
                      {formData.firstName && !errors.firstName && (
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                      )}
                    </div>
                    {errors.firstName && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-slate-700">Last Name</label>
                    <div className="relative group">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User className={`h-5 w-5 transition-colors ${
                          formData.lastName ? 'text-emerald-500' : 'text-slate-400'
                        }`} />
                      </div>
                      <input
                        type="text"
                        value={formData.lastName}
                        onChange={(e) => {
                          setFormData({ ...formData, lastName: e.target.value });
                          if (errors.lastName) setErrors({ ...errors, lastName: null });
                        }}
                        className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl transition-all duration-200 bg-slate-50/50 ${
                          errors.lastName 
                            ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                            : formData.lastName 
                              ? 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-200'
                              : 'border-slate-200 focus:border-emerald-400 focus:ring-emerald-100'
                        } focus:outline-none focus:ring-4 focus:bg-white`}
                        placeholder="Last name"
                        disabled={loading}
                      />
                      {formData.lastName && !errors.lastName && (
                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        </div>
                      )}
                    </div>
                    {errors.lastName && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">Email Address</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className={`h-5 w-5 transition-colors ${
                        formData.email ? 'text-emerald-500' : 'text-slate-400'
                      }`} />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: null });
                      }}
                      className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl transition-all duration-200 bg-slate-50/50 ${
                        errors.email 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                          : formData.email 
                            ? 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-200'
                            : 'border-slate-200 focus:border-emerald-400 focus:ring-emerald-100'
                      } focus:outline-none focus:ring-4 focus:bg-white`}
                      placeholder="Enter your email address"
                      disabled={loading}
                    />
                    {formData.email && !errors.email && /\S+@\S+\.\S+/.test(formData.email) && (
                      <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                    )}
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">Phone Number (Optional)</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Phone className={`h-5 w-5 transition-colors ${
                        formData.phone ? 'text-emerald-500' : 'text-slate-400'
                      }`} />
                    </div>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-12 pr-4 py-4 border-2 rounded-2xl transition-all duration-200 bg-slate-50/50 border-slate-200 focus:border-emerald-400 focus:ring-emerald-100 focus:outline-none focus:ring-4 focus:bg-white"
                      placeholder="Phone number (optional)"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">Password</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className={`h-5 w-5 transition-colors ${
                        formData.password ? 'text-emerald-500' : 'text-slate-400'
                      }`} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => {
                        setFormData({ ...formData, password: e.target.value });
                        if (errors.password) setErrors({ ...errors, password: null });
                      }}
                      className={`w-full pl-12 pr-12 py-4 border-2 rounded-2xl transition-all duration-200 bg-slate-50/50 ${
                        errors.password 
                          ? 'border-red-300 focus:border-red-500 focus:ring-red-200' 
                          : formData.password 
                            ? 'border-emerald-300 focus:border-emerald-500 focus:ring-emerald-200'
                            : 'border-slate-200 focus:border-emerald-400 focus:ring-emerald-100'
                      } focus:outline-none focus:ring-4 focus:bg-white`}
                      placeholder="Create a strong password"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-emerald-500 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.password}
                    </p>
                  )}
                  
                  {/* Password Strength Meter */}
                  {formData.password && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-600 font-medium">Password strength:</span>
                        <span className={`text-xs font-semibold ${
                          passwordStrength <= 1 ? 'text-red-600' :
                          passwordStrength <= 2 ? 'text-orange-600' :
                          passwordStrength <= 3 ? 'text-yellow-600' :
                          passwordStrength <= 4 ? 'text-blue-600' :
                          'text-green-600'
                        }`}>
                          {getPasswordStrengthText()}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((level) => (
                          <div
                            key={level}
                            className={`h-2 flex-1 rounded-full transition-colors ${
                              level <= passwordStrength ? getPasswordStrengthColor() : 'bg-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Terms Agreement */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="w-5 h-5 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500 mt-0.5"
                  />
                  <span className="text-sm text-slate-600 leading-relaxed">
                    I agree to the{' '}
                    <Link href="/terms" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                      Terms & Conditions
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-emerald-600 hover:text-emerald-700 font-semibold">
                      Privacy Policy
                    </Link>
                  </span>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading || !isFormValid}
                  className={`w-full py-4 px-6 rounded-2xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-3 ${
                    loading || !isFormValid
                      ? 'bg-slate-300 cursor-not-allowed'
                      : 'bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5'
                  }`}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Creating account...</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5" />
                      <span>Create Account</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Sign In Link */}
              <div className="text-center pt-6 border-t border-slate-100">
                <p className="text-slate-600">
                  Already have an account?{' '}
                  <Link 
                    href="/login" 
                    className="text-emerald-600 hover:text-emerald-700 font-semibold transition-colors"
                  >
                    Sign in here →
                  </Link>
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center space-y-3">
              <p className="text-sm text-slate-500 flex items-center justify-center gap-2">
                <Shield className="w-4 h-4" />
                Your data is protected with enterprise-grade security
              </p>
              <p className="text-xs text-slate-400">
                © 2024 GRM Robotics. All rights reserved. | Be part of the robotics revolution
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
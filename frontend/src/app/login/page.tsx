'use client';

import { useState, useEffect } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { Mail, Lock, Eye, EyeOff, LogIn, Loader2, AlertCircle, Shield, Zap, Users, CheckCircle, ArrowRight, Star, Award, TrendingUp } from 'lucide-react';
import toast from 'react-hot-toast';


export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<any>({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Check if user was redirected from a protected page
  const redirectMessage = searchParams.get('message');
  const returnUrl = searchParams.get('returnUrl');

  // Form validation
  useEffect(() => {
    const isValid = formData.email.length > 0 &&
      formData.password.length > 0 &&
      /\S+@\S+\.\S+/.test(formData.email);
    setIsFormValid(isValid);
  }, [formData]);

  const loginMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await api.post('/auth/login', data);
      return response.data;
    },
    onSuccess: (data) => {
      // Use setAuth to set everything at once
      const { setAuth } = useAuthStore.getState();
      setAuth(data.user, data.accessToken, data.refreshToken);

      // Personalized welcome message
      const welcomeMessage = data.user.role === 'ADMIN'
        ? `Welcome back, ${data.user.firstName}! 👨‍💼`
        : `Welcome back, ${data.user.firstName}! �`;

      toast.success(welcomeMessage, {
        duration: 4000,
        icon: '🎉',
      });

      // Small delay to ensure state is persisted
      setTimeout(() => {
        // Redirect to return URL or default based on role
        const redirectTo = returnUrl || (data.user.role === 'ADMIN' ? '/admin' : '/products');
        router.push(redirectTo);
      }, 100);
    },
    onError: (error: any) => {
      const message = error.response?.data?.error || 'Login failed. Please check your credentials.';
      toast.error(message);
      setErrors({ general: message });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors: any = {};
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.password) newErrors.password = 'Password is required';
    if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    loginMutation.mutate(formData);
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
        <div className="hidden lg:flex lg:w-3/5 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
          {/* Geometric background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-20 w-32 h-32 bg-blue-500/10 rounded-full blur-xl"></div>
            <div className="absolute bottom-32 right-32 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl"></div>
            <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-green-500/10 rounded-full blur-lg"></div>
          </div>

          <div className="relative z-10 flex flex-col justify-center px-16 py-20 text-white max-w-2xl">
            {/* Logo and Brand */}
            <div className="mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-8 shadow-2xl">
                <span className="text-2xl font-bold">GRM</span>
              </div>
              <h1 className="text-5xl font-bold mb-6 leading-tight tracking-tight">
                Building the Future of
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-green-400">
                  Robotics Education
                </span>
              </h1>
              <p className="text-xl text-slate-300 leading-relaxed">
                Your gateway to hands-on robotics learning with quality kits, expert guidance, and innovative projects.
              </p>
            </div>

            {/* Key Features */}
            <div className="space-y-6 mb-12">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Zap className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Hands-On Learning</h3>
                  <p className="text-slate-400">Build real robots with comprehensive kits and step-by-step guidance</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Expert Support</h3>
                  <p className="text-slate-400">Get guidance from experienced robotics engineers and educators</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Shield className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Quality Guaranteed</h3>
                  <p className="text-slate-400">Premium components with comprehensive warranty and support</p>
                </div>
              </div>
            </div>

            {/* Company Values */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-slate-700">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-400">2024</div>
                <div className="text-slate-400 text-sm font-medium">Founded</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-400">50+</div>
                <div className="text-slate-400 text-sm font-medium">Product Kits</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">100%</div>
                <div className="text-slate-400 text-sm font-medium">Commitment</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="flex-1 lg:w-2/5 flex items-center justify-center px-6 sm:px-8 lg:px-12 py-12">
          <div className="w-full max-w-md space-y-8">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6 shadow-xl">
                <span className="text-2xl font-bold text-white">GRM</span>
              </div>
            </div>

            {/* Header */}
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900 mb-3">
                Welcome back
              </h2>
              <p className="text-slate-600 text-lg">
                Sign in to your account to continue
              </p>
              {redirectMessage && (
                <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
                  <p className="text-amber-800 text-sm font-medium">{redirectMessage}</p>
                </div>
              )}
            </div>

            {/* Login Card */}
            <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/50 p-8 space-y-6">
              {errors.general && (
                <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" />
                  <div>
                    <p className="font-semibold text-red-800">Login Failed</p>
                    <p className="text-sm mt-1 text-red-600">{errors.general}</p>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Mail className={`h-5 w-5 transition-colors ${formData.email ? 'text-blue-500' : 'text-slate-400'
                        }`} />
                    </div>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: null });
                      }}
                      className={`w-full pl-12 pr-4 py-4 border-2 rounded-2xl transition-all duration-200 bg-slate-50/50 ${errors.email
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : formData.email
                          ? 'border-blue-300 focus:border-blue-500 focus:ring-blue-200'
                          : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100'
                        } focus:outline-none focus:ring-4 focus:bg-white`}
                      placeholder="Enter your email address"
                      disabled={loginMutation.isPending}
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

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-slate-700">
                    Password
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Lock className={`h-5 w-5 transition-colors ${formData.password ? 'text-blue-500' : 'text-slate-400'
                        }`} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => {
                        setFormData({ ...formData, password: e.target.value });
                        if (errors.password) setErrors({ ...errors, password: null });
                      }}
                      className={`w-full pl-12 pr-12 py-4 border-2 rounded-2xl transition-all duration-200 bg-slate-50/50 ${errors.password
                        ? 'border-red-300 focus:border-red-500 focus:ring-red-200'
                        : formData.password
                          ? 'border-blue-300 focus:border-blue-500 focus:ring-blue-200'
                          : 'border-slate-200 focus:border-blue-400 focus:ring-blue-100'
                        } focus:outline-none focus:ring-4 focus:bg-white`}
                      placeholder="Enter your password"
                      disabled={loginMutation.isPending}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-blue-500 transition-colors"
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
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 transition-colors"
                    />
                    <span className="ml-3 text-sm text-slate-600 group-hover:text-slate-800 transition-colors">
                      Remember me
                    </span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loginMutation.isPending || !isFormValid}
                  className={`w-full py-4 px-6 rounded-2xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-3 ${loginMutation.isPending || !isFormValid
                    ? 'bg-slate-300 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transform hover:-translate-y-0.5'
                    }`}
                >
                  {loginMutation.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Signing in...</span>
                    </>
                  ) : (
                    <>
                      <LogIn className="w-5 h-5" />
                      <span>Sign In</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>



              {/* Sign Up Link */}
              <div className="text-center pt-6 border-t border-slate-100">
                <p className="text-slate-600">
                  Don't have an account?{' '}
                  <Link
                    href="/register"
                    className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                  >
                    Create one now →
                  </Link>
                </p>
              </div>

              {/* Security Notice */}
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl border border-green-200/50">
                <div className="flex items-center gap-3 mb-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  <p className="text-sm font-semibold text-green-900">Enterprise Security</p>
                </div>
                <p className="text-sm text-green-800">
                  Your account is protected with bank-grade encryption and multi-layer security protocols.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>Quality First</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="w-4 h-4 text-blue-500" />
                  <span>Expert Built</span>
                </div>
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-4 h-4 text-green-500" />
                  <span>Innovation Focused</span>
                </div>
              </div>
              <p className="text-xs text-slate-400">
                © 2024 GRM Robotics. All rights reserved. | Innovating robotics education for the future
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
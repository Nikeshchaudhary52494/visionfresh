// src/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  Brain,
  Camera,
  UploadCloud,
  Zap,
  Sparkles,
  Shield,
  BarChart3,
  Smartphone,
  Users,
  ArrowRight,
  CheckCircle,
  Play,
} from "lucide-react";

export default function HomePage() {
  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Analysis",
      description:
        "Advanced machine learning algorithms accurately detect fruit ripeness levels in seconds",
    },
    {
      icon: <Camera className="w-6 h-6" />,
      title: "Instant Capture",
      description:
        "Use your camera or upload photos to get real-time ripeness analysis",
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Precision Scoring",
      description:
        "0-300 ripeness scale with detailed breakdown from unripe to perfectly ripe to overripe",
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Smart Recommendations",
      description:
        "Get personalized usage suggestions based on your fruit's ripeness level",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "No Data Storage",
      description:
        "Your images are processed locally and never stored on our servers",
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Optimized",
      description:
        "Works perfectly on all devices with responsive camera integration",
    },
  ];

  const steps = [
    {
      number: "01",
      title: "Upload or Capture",
      description:
        "Take a photo with your camera or upload an existing image of your fruit",
      icon: <Camera className="w-8 h-8" />,
    },
    {
      number: "02",
      title: "AI Analysis",
      description:
        "Our neural network analyzes the image to determine ripeness characteristics",
      icon: <Brain className="w-8 h-8" />,
    },
    {
      number: "03",
      title: "Get Results",
      description:
        "Receive detailed ripeness score and practical usage recommendations",
      icon: <CheckCircle className="w-8 h-8" />,
    },
  ];

  const supportedFruits = ["Bananas", "Apples", "Mangoes", "Strawberries"];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-emerald-50/30">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-400 to-lime-500 flex items-center justify-center shadow-lg">
                <Brain className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">
                FreshVision
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/app"
                className="px-6 py-2 bg-linear-to-r from-emerald-500 to-lime-500 text-white font-medium rounded-xl hover:from-emerald-600 hover:to-lime-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Launch App
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-linear-to-br from-emerald-400/5 to-lime-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-sm font-medium">
                  <Zap className="w-4 h-4 mr-2" />
                  AI-Powered Fruit Ripeness Detection
                </div>

                <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                  See Freshness
                  <span className="block text-transparent bg-linear-to-r from-emerald-600 to-lime-600 bg-clip-text">
                    Like Never Before
                  </span>
                </h1>

                <p className="text-xl text-slate-600 max-w-2xl">
                  Transform how you choose and use fruits with our advanced AI
                  technology. Get instant ripeness analysis and smart
                  recommendations for perfect consumption every time.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/app"
                  className="group inline-flex items-center justify-center px-8 py-4 bg-linear-to-r from-emerald-500 to-lime-500 text-white font-semibold rounded-2xl hover:from-emerald-600 hover:to-lime-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  <Play className="w-5 h-5 mr-3" />
                  Start Analyzing Now
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>

                <button className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-2xl hover:border-emerald-400 hover:text-emerald-700 transition-all duration-300">
                  <Users className="w-5 h-5 mr-3" />
                  How It Works
                </button>
              </div>

              <div className="flex items-center space-x-6 text-sm text-slate-500">
                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-emerald-500" />
                  <span>100% Private</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span>Instant Results</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-purple-500" />
                  <span>AI Powered</span>
                </div>
              </div>
            </div>

            <div className="relative">
              {/* Mockup of the app */}
              <div className="relative bg-white rounded-3xl shadow-2xl p-6 border border-slate-200">
                <div className="bg-linear-to-br from-emerald-400 to-lime-500 rounded-2xl p-8 text-white text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Perfectly Ripe!</h3>
                  <p className="text-emerald-100">Ripeness Score: 156/300</p>
                  <div className="mt-4 w-full bg-white/30 rounded-full h-3">
                    <div
                      className="bg-white rounded-full h-3"
                      style={{ width: "52%" }}
                    ></div>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    "Ideal for eating now",
                    "Great for smoothies",
                    "Perfect ripeness level",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl"
                    >
                      <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0" />
                      <span className="text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 flex space-x-3">
                  <button className="flex-1 py-3 bg-slate-100 text-slate-700 rounded-xl font-medium">
                    New Analysis
                  </button>
                  <button className="flex-1 py-3 bg-emerald-500 text-white rounded-xl font-medium">
                    Save Result
                  </button>
                </div>
              </div>

              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-amber-400/10 rounded-2xl rotate-12"></div>
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-emerald-400/10 rounded-2xl -rotate-12"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Why Choose FreshVision?
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our cutting-edge technology combines machine learning with
              practical insights to revolutionize how you interact with fresh
              produce.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group p-8 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl border border-slate-200 hover:border-emerald-200 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-linear-to-br from-emerald-400 to-lime-500 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-linear-to-br from-slate-50 to-emerald-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Three simple steps to perfect fruit selection and usage
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative text-center">
                <div className="relative z-10">
                  <div className="w-20 h-20 bg-linear-to-br from-emerald-400 to-lime-500 rounded-3xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg">
                    {step.icon}
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-amber-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {step.number}
                  </div>
                  <h3 className="text-2xl font-semibold text-slate-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-linear-to-r from-emerald-400 to-lime-400 z-0"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Supported Fruits */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Supported Fruits
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our AI model is trained to recognize a wide variety of fruits with
              exceptional accuracy
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 max-w-4xl mx-auto">
            {supportedFruits.map((fruit, index) => (
              <div
                key={index}
                className="p-6 bg-slate-50 rounded-2xl text-center hover:bg-emerald-50 hover:border-emerald-200 border border-slate-200 transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-linear-to-br from-emerald-400 to-lime-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-3 group-hover:scale-110 transition-transform">
                  <CheckCircle className="w-6 h-6" />
                </div>
                <span className="font-semibold text-slate-800">{fruit}</span>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-slate-600 mb-6">
              And many more fruits supported with regular model updates
            </p>
            <Link
              to="/app"
              className="inline-flex items-center px-8 py-4 bg-linear-to-r from-emerald-500 to-lime-500 text-white font-semibold rounded-2xl hover:from-emerald-600 hover:to-lime-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <UploadCloud className="w-5 h-5 mr-3" />
              Try With Your Fruit
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-linear-to-br from-emerald-500 to-lime-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Fruit Experience?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are making smarter fruit choices with
            AI-powered insights
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/app"
              className="px-8 py-4 bg-white text-emerald-600 font-semibold rounded-2xl hover:bg-slate-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Start Analyzing Free
            </Link>
            <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-2xl hover:bg-white/10 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-400 to-lime-500 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">
                  FreshVision
                </span>
              </div>
              <p className="text-slate-400 mb-6 max-w-md">
                Advanced AI technology for perfect fruit ripeness detection.
                Making fresh produce selection smarter and more intuitive.
              </p>
              <div className="flex space-x-4">
                <div className="flex items-center space-x-2 text-sm">
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Powered by TensorFlow.js</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Supported Fruits
                  </a>
                </li>
                <li>
                  <Link
                    to="/app"
                    className="hover:text-white transition-colors"
                  >
                    Live Demo
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-8 pt-8 text-center">
            <p>&copy; 2025 FreshVision. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

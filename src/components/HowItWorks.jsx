// src/HowItWorks.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Camera,
  UploadCloud,
  Brain,
  BarChart3,
  Sparkles,
  Zap,
  Shield,
  Smartphone,
  CheckCircle,
  Play,
  Download,
  Share2,
  Lightbulb,
  Target,
  Users,
  Clock,
  SmartphoneIcon,
} from "lucide-react";

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      number: "01",
      title: "Capture or Upload",
      description:
        "Take a fresh photo using your device's camera or upload an existing image from your gallery",
      icon: <Camera className="w-8 h-8" />,
      details: [
        "Use the camera button for instant capture",
        "Drag & drop images for quick upload",
        "Supported formats: JPG, PNG, WebP",
        "Optimal image size: 500px - 2000px",
      ],
      tips: [
        "Ensure good lighting for best results",
        "Capture the fruit against a neutral background",
        "Get close enough to show details clearly",
      ],
      visual: "📸",
    },
    {
      number: "02",
      title: "AI Analysis",
      description:
        "Our neural network processes the image to detect ripeness patterns and characteristics",
      icon: <Brain className="w-8 h-8" />,
      details: [
        "Image preprocessing and enhancement",
        "Feature extraction using convolutional networks",
        "Pattern recognition across multiple dimensions",
        "Real-time processing on your device",
      ],
      tips: [
        "Processing takes 2-5 seconds typically",
        "No internet required after initial load",
        "Works completely offline for privacy",
      ],
      visual: "🤖",
    },
    {
      number: "03",
      title: "Ripeness Scoring",
      description:
        "Get precise ripeness measurement on our comprehensive 0-300 scale",
      icon: <BarChart3 className="w-8 h-8" />,
      details: [
        "0-100: Unripe (needs time to mature)",
        "100-200: Perfectly ripe (ready to eat)",
        "200-300: Overripe (best for specific uses)",
        "Confidence score for accuracy indication",
      ],
      tips: [
        "Scores 80-120 are ideal for immediate consumption",
        "Scores below 60 may need several days to ripen",
        "Scores above 200 are great for cooking or smoothies",
      ],
      visual: "📊",
    },
    {
      number: "04",
      title: "Smart Recommendations",
      description:
        "Receive AI-powered suggestions for optimal usage based on ripeness level",
      icon: <Sparkles className="w-8 h-8" />,
      details: [
        "Personalized usage recommendations",
        "Storage and preservation tips",
        "Recipe suggestions based on ripeness",
        "Timeline for optimal consumption",
      ],
      tips: [
        "Save recommendations for future reference",
        "Export results for meal planning",
        "Share insights with family and friends",
      ],
      visual: "💡",
    },
  ];

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Get results in under 5 seconds with our optimized AI model",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "100% Private",
      description:
        "All processing happens on your device - no images are uploaded to servers",
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile First",
      description:
        "Designed for smartphones with easy camera integration and touch-friendly interface",
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Highly Accurate",
      description:
        "Trained on thousands of fruit images with 95%+ accuracy for common fruits",
    },
  ];

  const faqs = [
    {
      question: "How accurate is the ripeness detection?",
      answer:
        "FreshVision achieves over 95% accuracy for common fruits like bananas, apples, and avocados. Accuracy may vary for less common fruits, but we're constantly improving our model.",
    },
    {
      question: "Do I need an internet connection?",
      answer:
        "Only for the initial page load and model download. Once loaded, all processing happens offline on your device for maximum privacy and speed.",
    },
    {
      question: "Which fruits are supported?",
      answer:
        "We support all major fruits including bananas, apples, avocados, tomatoes, mangoes, peaches, pears, and berries. The model is regularly updated with new fruit types.",
    },
    {
      question: "Can I use this for commercial purposes?",
      answer:
        "Yes! FreshVision is perfect for grocery stores, restaurants, and food businesses. Contact us for commercial licensing options.",
    },
    {
      question: "How does the AI determine ripeness?",
      answer:
        "Our neural network analyzes color patterns, texture, size, and shape characteristics that correlate with ripeness levels across different fruit types.",
    },
    {
      question: "Is my data stored anywhere?",
      answer:
        "No. All image processing happens locally on your device. We don't store any images or personal data on our servers.",
    },
  ];

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-50 to-emerald-50/30">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center space-x-3 group">
                <ArrowLeft className="w-5 h-5 text-slate-600 group-hover:text-slate-800 transition-colors" />
                <div className="w-8 h-8 rounded-xl bg-linear-to-br from-emerald-400 to-lime-500 flex items-center justify-center shadow-lg">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <span className="text-lg font-bold text-slate-800">
                  FreshVision
                </span>
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link
                to="/app"
                className="px-6 py-2 bg-linear-to-r from-emerald-500 to-lime-500 text-white font-medium rounded-xl hover:from-emerald-600 hover:to-lime-600 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Try It Now
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-16">
        <div className="absolute inset-0 bg-linear-to-br from-emerald-400/5 to-lime-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4 mr-2" />
              How It Works
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6">
              See the Magic Behind
              <span className="block text-transparent bg-linear-to-r from-emerald-600 to-lime-600 bg-clip-text">
                FreshVision
              </span>
            </h1>

            <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
              Discover how our advanced AI technology transforms simple fruit
              photos into precise ripeness insights and smart recommendations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/app"
                className="group inline-flex items-center justify-center px-8 py-4 bg-linear-to-r from-emerald-500 to-lime-500 text-white font-semibold rounded-2xl hover:from-emerald-600 hover:to-lime-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                <Play className="w-5 h-5 mr-3" />
                Launch FreshVision
                <ArrowLeft className="w-5 h-5 ml-2 transform rotate-180 group-hover:translate-x-1 transition-transform" />
              </Link>

              <button
                onClick={() =>
                  document
                    .getElementById("steps")
                    .scrollIntoView({ behavior: "smooth" })
                }
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-slate-300 text-slate-700 font-semibold rounded-2xl hover:border-emerald-400 hover:text-emerald-700 transition-all duration-300"
              >
                <Target className="w-5 h-5 mr-3" />
                Explore Process
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section id="steps" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              The FreshVision Process
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Four simple steps from capture to insights
            </p>
          </div>

          {/* Step Navigation */}
          <div className="flex justify-center mb-12">
            <div className="bg-slate-100 rounded-2xl p-2 flex space-x-2">
              {steps.map((step, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeStep === index
                      ? "bg-white text-slate-900 shadow-lg"
                      : "text-slate-600 hover:text-slate-800"
                  }`}
                >
                  Step {index + 1}
                </button>
              ))}
            </div>
          </div>

          {/* Active Step Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-linear-to-br from-emerald-400 to-lime-500 rounded-2xl flex items-center justify-center text-white shadow-lg">
                  {steps[activeStep].icon}
                </div>
                <div>
                  <div className="text-sm text-emerald-600 font-semibold">
                    {steps[activeStep].number}
                  </div>
                  <h3 className="text-3xl font-bold text-slate-900">
                    {steps[activeStep].title}
                  </h3>
                </div>
              </div>

              <p className="text-lg text-slate-600 leading-relaxed">
                {steps[activeStep].description}
              </p>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mr-2" />
                    How It Works
                  </h4>
                  <ul className="space-y-2">
                    {steps[activeStep].details.map((detail, index) => (
                      <li
                        key={index}
                        className="flex items-start space-x-3 text-slate-600"
                      >
                        <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 shrink-0"></div>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-semibold text-slate-900 mb-3 flex items-center">
                    <Lightbulb className="w-5 h-5 text-amber-500 mr-2" />
                    Pro Tips
                  </h4>
                  <ul className="space-y-2">
                    {steps[activeStep].tips.map((tip, index) => (
                      <li
                        key={index}
                        className="flex items-start space-x-3 text-slate-600"
                      >
                        <div className="w-2 h-2 bg-amber-400 rounded-full mt-2 shrink-0"></div>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="bg-linear-to-br from-slate-50 to-emerald-50 rounded-3xl p-8 border border-slate-200">
                <div className="text-8xl text-center mb-6">
                  {steps[activeStep].visual}
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-sm text-slate-500">
                      Step {activeStep + 1} of 4
                    </div>
                    <div className="flex space-x-1">
                      {steps.map((_, index) => (
                        <div
                          key={index}
                          className={`w-2 h-2 rounded-full ${
                            index === activeStep
                              ? "bg-emerald-500"
                              : "bg-slate-300"
                          }`}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl"
                      >
                        <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                        <div className="h-2 bg-slate-300 rounded-full flex-1"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step Progress */}
          <div className="flex justify-between items-center">
            <button
              onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
              disabled={activeStep === 0}
              className="px-6 py-3 rounded-xl border border-slate-300 text-slate-700 disabled:opacity-50 disabled:cursor-not-allowed hover:border-slate-400 transition-colors"
            >
              Previous
            </button>

            <div className="flex items-center space-x-4">
              <div className="text-sm text-slate-500">
                Step {activeStep + 1} of {steps.length}
              </div>
              <div className="w-32 h-2 bg-slate-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-linear-to-r from-emerald-400 to-lime-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${((activeStep + 1) / steps.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            <button
              onClick={() =>
                setActiveStep(Math.min(steps.length - 1, activeStep + 1))
              }
              disabled={activeStep === steps.length - 1}
              className="px-6 py-3 rounded-xl bg-emerald-500 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-emerald-600 transition-colors"
            >
              Next
            </button>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-linear-to-br from-slate-50 to-emerald-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Why It Works So Well
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Built with cutting-edge technology and user experience in mind
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="w-16 h-16 bg-linear-to-br from-emerald-400 to-lime-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
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

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to know about FreshVision
            </p>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-slate-50 rounded-2xl p-6 hover:bg-slate-100 transition-colors"
              >
                <h3 className="text-lg font-semibold text-slate-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-linear-to-br from-emerald-500 to-lime-500">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Experience It Yourself?
          </h2>
          <p className="text-xl text-emerald-100 mb-8 max-w-2xl mx-auto">
            See how FreshVision can transform your fruit selection and usage
            habits
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/app"
              className="px-8 py-4 bg-white text-emerald-600 font-semibold rounded-2xl hover:bg-slate-50 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              Start Analyzing Now
            </Link>
            <Link
              to="/"
              className="px-8 py-4 border-2 border-white text-white font-semibold rounded-2xl hover:bg-white/10 transition-all duration-300"
            >
              Back to Home
            </Link>
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
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Explore</h4>
              <ul className="space-y-2">
                <li>
                  <Link to="/" className="hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/app"
                    className="hover:text-white transition-colors"
                  >
                    Live Demo
                  </Link>
                </li>
                <li>
                  <Link
                    to="/how-it-works"
                    className="hover:text-white transition-colors"
                  >
                    How It Works
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-semibold mb-4">Support</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Privacy
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

import React from "react";
import { 
  Target, 
  Sparkles, 
  TrendingUp, 
  Shield, 
  Zap, 
  ArrowRight,
  Users,
  Trophy,
  Crown,
  Swords
} from "lucide-react";

const Home: React.FC = () => {
  const features = [
    {
      icon: Target,
      title: "AI Deck Generator",
      description: "Create personalized decks based on your playstyle and card collection using advanced AI algorithms.",
      color: "text-purple-500",
      bg: "bg-purple-50",
      borderColor: "border-purple-200",
      status: "Available Now"
    },
    {
      icon: Shield,
      title: "Deck Analysis",
      description: "Get detailed reviews and strategic insights for any deck to improve your gameplay.",
      color: "text-blue-500",
      bg: "bg-blue-50",
      borderColor: "border-blue-200",
      status: "Coming Soon"
    },
    {
      icon: TrendingUp,
      title: "Popular Decks",
      description: "Discover trending decks used by top players and adapt them to your collection.",
      color: "text-green-500",
      bg: "bg-green-50",
      borderColor: "border-green-200",
      status: "Coming Soon"
    }
  ];

  const stats = [
    { icon: Users, value: "10K+", label: "Active Players", color: "text-blue-500" },
    { icon: Target, value: "50K+", label: "Decks Generated", color: "text-purple-500" },
    { icon: Trophy, value: "85%", label: "Win Rate Improvement", color: "text-yellow-500" },
    { icon: Crown, value: "24/7", label: "AI Availability", color: "text-green-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-700 text-white">
          <div className="max-w-7xl mx-auto px-6 py-16 lg:py-24">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-2xl">
                  <Sparkles className="h-10 w-10" />
                </div>
                <h1 className="text-5xl lg:text-6xl font-bold">
                  Clash Royale
                  <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                    Deck Builder
                  </span>
                </h1>
              </div>
              
              <p className="text-xl lg:text-2xl text-purple-100 max-w-3xl mx-auto mb-8">
                Build winning decks with AI-powered recommendations tailored to your playstyle and card collection
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <button 
                  onClick={() => window.location.href = '/deck-builder'}
                  className="group bg-white text-purple-700 font-bold py-4 px-8 rounded-xl hover:bg-purple-50 transition-all transform hover:scale-105 active:scale-95 shadow-2xl flex items-center gap-3"
                >
                  <Target className="h-6 w-6" />
                  Get Started - Build Your Deck
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <div className="flex items-center gap-2 text-purple-200">
                  <Zap className="h-5 w-5 text-yellow-300" />
                  <span className="text-sm">Powered by AI • Free Forever</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/5 rounded-full blur-xl"></div>
          <div className="absolute top-1/3 -right-8 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-4 left-1/4 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg p-6 text-center border border-gray-100 hover:shadow-xl transition-shadow">
              <div className="bg-gray-50 p-3 rounded-xl w-fit mx-auto mb-4">
                <stat.icon className={`${stat.color} h-8 w-8`} />
              </div>
              <p className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Features Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Everything You Need to Dominate
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive suite of tools helps you build better decks, understand the meta, and climb the ladder
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <div key={index} className={`bg-white rounded-2xl shadow-xl p-8 border-2 ${feature.borderColor} hover:shadow-2xl transition-all transform hover:scale-[1.02] relative overflow-hidden`}>
              {/* Status Badge */}
              <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold ${
                feature.status === 'Available Now' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-orange-100 text-orange-700'
              }`}>
                {feature.status}
              </div>
              
              <div className={`${feature.bg} p-4 rounded-2xl w-fit mb-6`}>
                <feature.icon className={`${feature.color} h-10 w-10`} />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                {feature.title}
              </h3>
              
              <p className="text-gray-600 mb-6 leading-relaxed">
                {feature.description}
              </p>
              
              {feature.status === 'Available Now' ? (
                <button 
                  onClick={() => window.location.href = '/deck-builder'}
                  className={`group w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all flex items-center justify-center gap-2`}
                >
                  Try It Now
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
              ) : (
                <button 
                  disabled
                  className="w-full bg-gray-100 text-gray-400 font-semibold py-3 px-6 rounded-xl cursor-not-allowed flex items-center justify-center gap-2"
                >
                  Coming Soon
                  <Sparkles className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* How It Works Section */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12 border border-purple-100">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Building the perfect deck has never been easier
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Enter Your Player Tag",
                description: "We'll analyze your card collection, levels, and battle history to understand your playstyle.",
                icon: Users,
                color: "text-blue-500"
              },
              {
                step: "02", 
                title: "Choose Your Strategy",
                description: "Select from various playstyles like beatdown, cycle, control, or let our AI recommend the best fit.",
                icon: Target,
                color: "text-purple-500"
              },
              {
                step: "03",
                title: "Get Your Perfect Deck",
                description: "Receive a personalized deck optimized for your collection with detailed strategy explanations.",
                icon: Crown,
                color: "text-yellow-500"
              }
            ].map((step, index) => (
              <div key={index} className="text-center relative">
                <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                  <div className="bg-white rounded-full p-4 w-fit mx-auto mb-4 shadow-md">
                    <step.icon className={`${step.color} h-8 w-8`} />
                  </div>
                  
                  <div className="text-3xl font-bold text-gray-300 mb-2">
                    {step.step}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-4">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
                
                {index < 2 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="h-6 w-6 text-purple-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-20">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Ready to Build Your Winning Deck?
              </h2>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                Join thousands of players who've improved their gameplay with our AI-powered deck builder
              </p>
              
              <button 
                onClick={() => window.location.href = '/deck-builder'}
                className="group bg-white text-purple-700 font-bold py-4 px-8 rounded-xl hover:bg-purple-50 transition-all transform hover:scale-105 active:scale-95 shadow-xl flex items-center gap-3 mx-auto"
              >
                <Swords className="h-6 w-6" />
                Start Building Now
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            {/* Background decoration */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
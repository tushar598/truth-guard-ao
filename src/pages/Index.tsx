import { Link } from "react-router-dom";
import { Shield, Zap, Lock, Eye, CheckCircle, ArrowRight, Star, Users, BarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-ai-network.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section - Optimized */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with subtle animation */}
        <div className="absolute inset-0 matrix-bg opacity-30"></div>
        <div className="absolute inset-0 opacity-10">
          <img 
            src={heroImage} 
            alt="AI Network Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <div className="animate-fade-in-up">
            {/* Main Heading */}
            <div className="mb-8">
              <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
                <span className="text-gradient-primary">TruthGuard</span>
                <span className="text-foreground"> AI</span>
              </h1>
              <div className="text-xl md:text-2xl text-muted-foreground mb-2">
                Autonomous Fact-Checker & Insurance Agent
              </div>
              <div className="flex items-center justify-center gap-2 text-sm text-success">
                <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                <span>Powered by Arweave + AO</span>
              </div>
            </div>
            
            {/* Value Proposition */}
            <div className="glass-intense rounded-2xl p-8 md:p-10 mb-8 max-w-4xl mx-auto">
              <p className="text-lg md:text-xl text-foreground leading-relaxed mb-6">
                <span className="text-gradient-success font-semibold">AI-powered fact verification</span> with 
                <span className="text-gradient-primary font-semibold"> blockchain-backed transparency</span>.
                Protect yourself from misinformation with our revolutionary insurance platform.
              </p>
              
              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gradient-success">95.7%</div>
                  <div className="text-sm text-muted-foreground">Accuracy Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gradient-primary">2.1M+</div>
                  <div className="text-sm text-muted-foreground">Facts Verified</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gradient-primary">&lt; 3s</div>
                  <div className="text-sm text-muted-foreground">Response Time</div>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/dashboard">
                <Button className="btn-hero text-lg px-10 py-6 rounded-2xl shadow-2xl">
                  <CheckCircle className="mr-3 h-6 w-6" />
                  Start Fact-Checking
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </Link>
              
              <Link to="/insurance">
                <Button variant="outline" className="glass border-primary/30 text-lg px-10 py-6 rounded-2xl hover:glow-primary">
                  <Shield className="mr-3 h-6 w-6" />
                  Get Insurance Coverage
                </Button>
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>50K+ Active Users</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500" />
                <span>4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart className="h-4 w-4" />
                <span>99.9% Uptime</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Optimized */}
      <section className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient-primary">Why Choose</span> TruthGuard AI?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Advanced AI technology meets blockchain security to deliver unparalleled fact-checking accuracy
            </p>
          </div>

          {/* Feature Grid */}
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Get verification results in under 3 seconds with our optimized AI engine",
                color: "text-primary",
                gradient: "from-primary/20 to-primary/5"
              },
              {
                icon: Lock,
                title: "Blockchain Secured",
                description: "Every verification is cryptographically signed and stored on Arweave permanently",
                color: "text-success",
                gradient: "from-success/20 to-success/5"
              },
              {
                icon: Eye,
                title: "Fully Transparent",
                description: "All verification processes are auditable with public access to methodology",
                color: "text-accent",
                gradient: "from-accent/20 to-accent/5"
              },
              {
                icon: Shield,
                title: "Insurance Protected",
                description: "Get financial coverage against misinformation damage with smart contracts",
                color: "text-primary",
                gradient: "from-primary/20 to-primary/5"
              }
            ].map((feature, index) => (
              <Card 
                key={index} 
                className="glass group hover:glow-primary transition-all duration-500 border-0 animate-scale-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8 text-center h-full">
                  <div className={`w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-10 w-10 ${feature.color}`} />
                  </div>
                  <h3 className="font-bold text-xl mb-4 text-foreground group-hover:text-gradient-primary transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <Card className="glass-intense p-12 animate-fade-in-up">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-success">
                Trusted by Thousands Worldwide
              </h2>
              <p className="text-xl text-muted-foreground">
                Real impact in the fight against misinformation
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "2.1M+", label: "Facts Verified", sublabel: "This month" },
                { value: "95.7%", label: "Accuracy Rate", sublabel: "Industry leading" },
                { value: "50K+", label: "Active Users", sublabel: "Growing daily" },
                { value: "$2.4M", label: "Protected Value", sublabel: "Insurance coverage" }
              ].map((stat, index) => (
                <div key={index} className="animate-scale-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="text-3xl md:text-4xl font-bold text-gradient-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="font-semibold text-foreground mb-1">{stat.label}</div>
                  <div className="text-sm text-muted-foreground">{stat.sublabel}</div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section - Optimized */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <Card className="glass-intense p-12 md:p-16 animate-fade-in-up border-0">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-gradient-success">Ready to Fight</span>
              <br />
              <span className="text-gradient-primary">Misinformation?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Join the revolution in information integrity. Start fact-checking with AI precision 
              and protect yourself with blockchain-backed insurance coverage.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
              <Link to="/dashboard">
                <Button className="btn-success text-xl px-12 py-8 rounded-2xl shadow-2xl">
                  <CheckCircle className="mr-3 h-6 w-6" />
                  Try Free Fact Check
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="glass border-accent/30 text-xl px-12 py-8 rounded-2xl hover:glow-accent">
                  <Users className="mr-3 h-6 w-6" />
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="text-sm text-muted-foreground">
              No credit card required • Free tier available • Enterprise ready
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
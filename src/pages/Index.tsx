import { Link } from "react-router-dom";
import { Shield, Zap, Lock, Eye, CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-ai-network.jpg";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center matrix-bg overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src={heroImage} 
            alt="AI Network Background" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center animate-fade-in-up">
          <div className="glass-intense rounded-2xl p-8 md:p-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gradient-primary">TruthGuard AI</span>
            </h1>
            
            <h2 className="text-xl md:text-2xl text-muted-foreground mb-4">
              Autonomous Fact-Checker & Misinformation Insurance Agent
            </h2>
            
            <p className="text-lg md:text-xl text-foreground mb-8 max-w-2xl mx-auto">
              AI-powered fact verification with blockchain-backed transparency.
              Protect yourself from misinformation with our revolutionary insurance platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button className="btn-hero text-lg px-8 py-6 rounded-xl">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Start Fact-Checking
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              
              <Link to="/insurance">
                <Button variant="outline" className="glass border-primary/50 text-lg px-8 py-6 rounded-xl hover:glow-primary">
                  <Shield className="mr-2 h-5 w-5" />
                  Get Insurance
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-primary">
              Revolutionary Fact-Checking Platform
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powered by advanced AI and secured by blockchain technology
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Zap,
                title: "AI-Powered",
                description: "Advanced neural networks analyze claims with 95%+ accuracy",
                color: "text-primary"
              },
              {
                icon: Lock,
                title: "Blockchain Secured",
                description: "Immutable verification records stored on Arweave",
                color: "text-success"
              },
              {
                icon: Eye,
                title: "Transparent",
                description: "All decisions are auditable and publicly verifiable",
                color: "text-accent"
              },
              {
                icon: Shield,
                title: "Insured",
                description: "Get coverage against misinformation financial damage",
                color: "text-primary"
              }
            ].map((feature, index) => (
              <Card key={index} className="glass hover:glow-primary transition-all duration-300 animate-scale-in">
                <CardContent className="p-6 text-center">
                  <feature.icon className={`h-12 w-12 mx-auto mb-4 ${feature.color}`} />
                  <h3 className="font-semibold text-lg mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="glass-intense p-8 md:p-12 animate-fade-in-up">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-success">
              Ready to Fight Misinformation?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of users who trust TruthGuard AI to verify information and protect their interests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button className="btn-success text-lg px-8 py-4 rounded-xl">
                  Try Free Fact Check
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" className="glass border-accent/50 text-lg px-8 py-4 rounded-xl hover:glow-accent">
                  Learn More
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
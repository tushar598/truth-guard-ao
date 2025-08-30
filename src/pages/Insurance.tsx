import { Shield, Check, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Insurance = () => {
  const plans = [
    {
      name: "Basic Shield",
      price: "$9.99",
      period: "/month",
      description: "Essential protection for individuals",
      features: [
        "Up to $1,000 coverage",
        "5 fact-checks per day",
        "Email support",
        "Basic reporting",
        "Arweave proof storage"
      ],
      popular: false,
      variant: "outline" as const
    },
    {
      name: "Pro Guardian",
      price: "$29.99",
      period: "/month",
      description: "Advanced protection for professionals",
      features: [
        "Up to $10,000 coverage",
        "Unlimited fact-checks",
        "Priority support",
        "Advanced analytics",
        "API access",
        "Custom verification rules"
      ],
      popular: true,
      variant: "default" as const
    },
    {
      name: "Enterprise Fortress",
      price: "$99.99",
      period: "/month",
      description: "Maximum protection for organizations",
      features: [
        "Up to $100,000 coverage",
        "Unlimited everything",
        "24/7 dedicated support",
        "White-label solution",
        "Custom integrations",
        "SLA guarantees",
        "Bulk verification"
      ],
      popular: false,
      variant: "outline" as const
    }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gradient-primary">
              Misinformation Insurance
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Protect yourself from financial damage caused by fake news and misinformation. 
              Our blockchain-backed insurance provides peace of mind in the digital age.
            </p>
            
            <Card className="glass-intense max-w-2xl mx-auto p-6">
              <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-success" />
                  <span>Blockchain Secured</span>
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-primary" />
                  <span>Instant Claims</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-accent" />
                  <span>AI Verified</span>
                </div>
              </div>
            </Card>
          </div>

          {/* Pricing Plans */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <Card 
                key={index} 
                className={`glass relative animate-scale-in ${
                  plan.popular ? 'glow-primary ring-2 ring-primary/20' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-foreground">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-4xl font-bold text-gradient-primary">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-muted-foreground mt-2">{plan.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2">
                        <Check className="h-4 w-4 text-success" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className={`w-full ${
                      plan.popular ? 'btn-hero glow-primary' : 'glass hover:glow-primary'
                    }`}
                    variant={plan.variant}
                  >
                    <Shield className="mr-2 h-4 w-4" />
                    Get {plan.name}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* How It Works */}
          <div className="mb-16 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-center mb-12 text-gradient-success">
              How Misinformation Insurance Works
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  step: "1",
                  title: "Subscribe & Verify",
                  description: "Choose your plan and start fact-checking content. Our AI monitors for potential misinformation.",
                  icon: Shield
                },
                {
                  step: "2", 
                  title: "Detect Damage",
                  description: "If misinformation causes financial loss, our system automatically detects and documents the impact.",
                  icon: Zap
                },
                {
                  step: "3",
                  title: "Instant Payout",
                  description: "Smart contracts on Arweave ensure instant, transparent payouts based on verified damage assessments.",
                  icon: Check
                }
              ].map((item, index) => (
                <Card key={index} className="glass text-center">
                  <CardContent className="p-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <item.icon className="h-8 w-8 text-primary" />
                    </div>
                    <div className="text-2xl font-bold text-accent mb-2">Step {item.step}</div>
                    <h3 className="font-semibold text-lg mb-2 text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <Card className="glass-intense text-center p-8 md:p-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-4 text-gradient-primary">
              Ready to Get Protected?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands who trust TruthGuard AI to protect them from misinformation damage.
              Start with a free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-hero text-lg px-8 py-4">
                Start Free Trial
              </Button>
              <Button variant="outline" className="glass border-accent/50 text-lg px-8 py-4 hover:glow-accent">
                Learn More
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Insurance;
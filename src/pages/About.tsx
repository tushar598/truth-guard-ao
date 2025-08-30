import { Users, Target, Zap, Shield, Heart, Award, Eye } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";

const About = () => {
  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief AI Officer",
      bio: "Former OpenAI researcher with 10+ years in machine learning and fact verification systems.",
      avatar: "👩‍💻"
    },
    {
      name: "Marcus Rodriguez",
      role: "Blockchain Lead", 
      bio: "Arweave core contributor and expert in decentralized storage and consensus mechanisms.",
      avatar: "👨‍💼"
    },
    {
      name: "Elena Petrov",
      role: "Product Director",
      bio: "Ex-Google PM who led misinformation detection initiatives across social platforms.",
      avatar: "👩‍🔬"
    },
    {
      name: "James Kim",
      role: "Security Engineer",
      bio: "Cybersecurity specialist focused on cryptographic protocols and threat detection.",
      avatar: "👨‍🔧"
    }
  ];

  const values = [
    {
      icon: Shield,
      title: "Truth First",
      description: "We prioritize accuracy over speed, ensuring every verification is thoroughly researched and properly sourced."
    },
    {
      icon: Eye,
      title: "Radical Transparency", 
      description: "All our processes, algorithms, and decisions are open to public scrutiny through blockchain technology."
    },
    {
      icon: Heart,
      title: "Community Driven",
      description: "Our platform is built by and for the community, with governance decisions made collectively."
    },
    {
      icon: Zap,
      title: "Innovation",
      description: "We constantly push the boundaries of what's possible in AI and blockchain technology."
    }
  ];

  const milestones = [
    {
      year: "2024",
      title: "TruthGuard AI Launch",
      description: "Platform officially launches with full Arweave integration and insurance capabilities."
    },
    {
      year: "2023",
      title: "Beta Testing Phase",
      description: "Closed beta with 1,000+ users, processing over 100K fact-checks successfully."
    },
    {
      year: "2023",
      title: "AI Model Development",
      description: "Completed training of our proprietary fact-checking AI with 95%+ accuracy rate."
    },
    {
      year: "2022",
      title: "Team Formation",
      description: "Assembled world-class team of AI researchers, blockchain experts, and product leaders."
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
              About TruthGuard AI
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We're building the future of information verification through the power of AI and blockchain technology.
              Our mission is to create a world where truth prevails over misinformation.
            </p>
          </div>

          {/* Mission Section */}
          <Card className="glass-intense mb-16 animate-fade-in-up">
            <CardContent className="p-8 md:p-12 text-center">
              <Target className="h-16 w-16 text-primary mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-6 text-gradient-success">Our Mission</h2>
              <p className="text-lg text-muted-foreground max-w-4xl mx-auto leading-relaxed">
                In an era where misinformation spreads faster than truth, we're committed to leveling the playing field. 
                TruthGuard AI combines cutting-edge artificial intelligence with the immutable power of blockchain 
                to create the world's most reliable fact-checking platform. We believe that access to verified, 
                transparent information is a fundamental right in the digital age.
              </p>
            </CardContent>
          </Card>

          {/* Values */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-gradient-primary animate-fade-in-up">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <Card 
                  key={index} 
                  className="glass text-center hover:glow-primary transition-all duration-300 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <value.icon className="h-12 w-12 text-accent mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2 text-foreground">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-gradient-success animate-fade-in-up">
              Meet Our Team
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card 
                  key={index} 
                  className="glass text-center animate-scale-in"
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <CardContent className="p-6">
                    <div className="text-4xl mb-4">{member.avatar}</div>
                    <h3 className="font-semibold text-lg text-foreground mb-1">{member.name}</h3>
                    <div className="text-sm text-primary font-medium mb-3">{member.role}</div>
                    <p className="text-muted-foreground text-sm">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-center mb-12 text-gradient-primary animate-fade-in-up">
              Our Journey
            </h2>
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <Card 
                  key={index} 
                  className="glass animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Award className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl font-bold text-gradient-success">{milestone.year}</span>
                          <span className="text-xl font-semibold text-foreground">{milestone.title}</span>
                        </div>
                        <p className="text-muted-foreground">{milestone.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Stats */}
          <Card className="glass-intense mb-16 animate-fade-in-up">
            <CardContent className="p-8">
              <h2 className="text-3xl font-bold text-center mb-8 text-gradient-primary">
                Platform Impact
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-gradient-success mb-2">2.1M+</div>
                  <div className="text-muted-foreground">Facts Verified</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gradient-success mb-2">95.7%</div>
                  <div className="text-muted-foreground">Accuracy Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gradient-success mb-2">50K+</div>
                  <div className="text-muted-foreground">Active Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-gradient-success mb-2">99.9%</div>
                  <div className="text-muted-foreground">Uptime</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* CTA Section */}
          <Card className="glass-intense text-center p-8 md:p-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-4 text-gradient-primary">
              Join the Fight Against Misinformation
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Ready to experience the most advanced fact-checking platform ever built? 
              Start verifying information with TruthGuard AI today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/dashboard">
                <Button className="btn-hero text-lg px-8 py-4">
                  Start Fact-Checking
                </Button>
              </Link>
              <Link to="/insurance">
                <Button variant="outline" className="glass border-success/50 text-lg px-8 py-4 hover:glow-success">
                  Get Protected
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;
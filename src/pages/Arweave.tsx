import { Database, Cpu, Shield, Lock, Zap, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Arweave = () => {
  const features = [
    {
      icon: Cpu,
      title: "Arweave Compute Unit",
      description: "Decentralized AI processing power",
      details: [
        "Distributed neural network execution",
        "Consensus-based fact verification",
        "Tamper-proof AI model deployment",
        "Scalable compute resources"
      ],
      color: "text-primary"
    },
    {
      icon: Database,
      title: "Arweave Storage",
      description: "Permanent, immutable data storage",
      details: [
        "Eternal storage of fact-check records",
        "Cryptographic proof of authenticity",
        "Decentralized data availability",
        "Version control for evidence"
      ],
      color: "text-success"
    },
    {
      icon: Shield,
      title: "AO Security & Staking",
      description: "Trustless verification & insurance pool",
      details: [
        "Staked validator network",
        "Economic incentives for accuracy",
        "Slashing for malicious behavior",
        "Community governance"
      ],
      color: "text-accent"
    }
  ];

  const metrics = [
    { label: "Facts Verified", value: "2.1M+", subtext: "And growing daily" },
    { label: "Storage Efficiency", value: "99.9%", subtext: "Uptime guarantee" },
    { label: "Verification Speed", value: "< 3s", subtext: "Average response time" },
    { label: "Network Nodes", value: "1,250+", subtext: "Global distribution" }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gradient-primary">
              Powered by Arweave + AO
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Our platform leverages the cutting-edge Arweave ecosystem to provide 
              unparalleled security, transparency, and permanence for fact verification.
            </p>
            
            <Card className="glass-intense max-w-4xl mx-auto p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {metrics.map((metric, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-gradient-success mb-1">
                      {metric.value}
                    </div>
                    <div className="font-medium text-foreground">{metric.label}</div>
                    <div className="text-sm text-muted-foreground">{metric.subtext}</div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Core Features */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="glass-intense hover:glow-primary transition-all duration-300 animate-scale-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <CardHeader className="text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-card/30 flex items-center justify-center`}>
                    <feature.icon className={`h-8 w-8 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl font-bold text-foreground">
                    {feature.title}
                  </CardTitle>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${feature.color.replace('text-', 'bg-')} mt-2 flex-shrink-0`} />
                        <span className="text-foreground">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Technical Architecture */}
          <div className="mb-16 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-center mb-12 text-gradient-success">
              Technical Architecture
            </h2>
            
            <Card className="glass-intense">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Lock className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-foreground mb-2">
                          Cryptographic Verification
                        </h3>
                        <p className="text-muted-foreground">
                          Every fact-check is cryptographically signed and stored immutably, 
                          ensuring the integrity of verification results.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-success/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Zap className="h-4 w-4 text-success" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-foreground mb-2">
                          Lightning Fast Consensus
                        </h3>
                        <p className="text-muted-foreground">
                          AO's parallel processing enables sub-second consensus on fact verification 
                          while maintaining full decentralization.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Database className="h-4 w-4 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-foreground mb-2">
                          Permanent Data Layer
                        </h3>
                        <p className="text-muted-foreground">
                          All verification records are stored permanently on Arweave, 
                          creating an immutable history of truth.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="bg-card/20 rounded-2xl p-6 backdrop-blur-sm">
                      <div className="text-center mb-4">
                        <div className="text-sm text-muted-foreground mb-2">Live Network Status</div>
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
                          <span className="text-success font-medium">All Systems Operational</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Network Uptime</span>
                          <span className="text-success">99.98%</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Active Validators</span>
                          <span className="text-primary">1,247</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Stake</span>
                          <span className="text-accent">$12.4M AR</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Avg Block Time</span>
                          <span className="text-foreground">2.1s</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Integration Benefits */}
          <div className="mb-16 animate-fade-in-up">
            <h2 className="text-3xl font-bold text-center mb-12 text-gradient-primary">
              Why Arweave + AO?
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-success" />
                    Unmatched Security
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-muted-foreground">
                  <p>• Cryptographic proofs for every verification</p>
                  <p>• Economic incentives prevent manipulation</p>
                  <p>• Decentralized consensus eliminates single points of failure</p>
                  <p>• Immutable audit trail for complete transparency</p>
                </CardContent>
              </Card>
              
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-primary" />
                    Superior Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-muted-foreground">
                  <p>• Sub-second fact verification response times</p>
                  <p>• Infinite scalability with parallel processing</p>
                  <p>• Global CDN for instant access worldwide</p>
                  <p>• 99.99% uptime with redundant infrastructure</p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA Section */}
          <Card className="glass-intense text-center p-8 md:p-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-4 text-gradient-success">
              Built on the Future of Web3
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience the power of permanently stored, cryptographically verified truth. 
              Join the revolution in information integrity.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-hero text-lg px-8 py-4">
                Start Fact-Checking
              </Button>
              <Button variant="outline" className="glass border-accent/50 text-lg px-8 py-4 hover:glow-accent">
                <ExternalLink className="mr-2 h-4 w-4" />
                Learn About Arweave
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Arweave;
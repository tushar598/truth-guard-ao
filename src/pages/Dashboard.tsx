import { useState } from "react";
import { Search, FileCheck, AlertTriangle, CheckCircle, Clock, ExternalLink, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Dashboard = () => {
  const [inputText, setInputText] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleVerify = async () => {
    if (!inputText.trim()) return;
    
    setIsVerifying(true);
    setResult(null);

    // Simulate AI verification process
    setTimeout(() => {
      const mockResult = {
        verdict: Math.random() > 0.5 ? "true" : Math.random() > 0.3 ? "false" : "misleading",
        confidence: Math.floor(Math.random() * 30) + 70,
        sources: [
          { title: "Reuters Fact Check", url: "https://arweave.net/abc123", verified: true },
          { title: "Scientific Journal", url: "https://arweave.net/def456", verified: true },
          { title: "Government Database", url: "https://arweave.net/ghi789", verified: false }
        ],
        analysis: "Based on cross-referencing multiple reliable sources and analyzing the claim structure, this statement has been evaluated for accuracy."
      };
      setResult(mockResult);
      setIsVerifying(false);
    }, 3000);
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case "true": return "text-success";
      case "false": return "text-destructive";
      case "misleading": return "text-yellow-500";
      default: return "text-muted-foreground";
    }
  };

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case "true": return <CheckCircle className="h-6 w-6 text-success" />;
      case "false": return <AlertTriangle className="h-6 w-6 text-destructive" />;
      case "misleading": return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      default: return <Clock className="h-6 w-6 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-24 px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-primary">
              AI Fact-Checking Dashboard
            </h1>
            <p className="text-xl text-muted-foreground">
              Verify any claim with our advanced AI system
            </p>
          </div>

          {/* Input Section */}
          <Card className="glass-intense mb-8 animate-scale-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileCheck className="h-5 w-5 text-primary" />
                Submit Content for Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  Paste your text, URL, or news article:
                </label>
                <Textarea
                  placeholder="Enter the content you want to fact-check..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[120px] bg-card/50 border-card-border"
                />
              </div>
              
              <Button 
                onClick={handleVerify}
                disabled={!inputText.trim() || isVerifying}
                className="btn-hero w-full"
              >
                {isVerifying ? (
                  <>
                    <Clock className="mr-2 h-4 w-4 animate-spin" />
                    Verifying with AI...
                  </>
                ) : (
                  <>
                    <Search className="mr-2 h-4 w-4" />
                    Verify with AI
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Loading Progress */}
          {isVerifying && (
            <Card className="glass mb-8 animate-fade-in-up">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h3 className="font-semibold text-lg mb-2">AI Analysis in Progress</h3>
                  <p className="text-muted-foreground">Cross-referencing sources and analyzing claims...</p>
                </div>
                <Progress value={66} className="w-full" />
                <div className="mt-4 text-sm text-muted-foreground space-y-1">
                  <div>✓ Content parsed and structured</div>
                  <div>✓ Claims extracted and categorized</div>
                  <div className="text-primary">→ Cross-referencing with trusted sources...</div>
                  <div className="text-muted-foreground/50">- Generating confidence score...</div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Results Section */}
          {result && (
            <div className="space-y-6 animate-fade-in-up">
              {/* Verdict Card */}
              <Card className="glass-intense glow-primary">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getVerdictIcon(result.verdict)}
                    AI Verification Result
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className={`text-3xl font-bold mb-2 ${getVerdictColor(result.verdict)} uppercase`}>
                      {result.verdict}
                    </div>
                    <div className="text-lg text-muted-foreground">
                      Confidence Score: <span className="text-primary font-semibold">{result.confidence}%</span>
                    </div>
                  </div>
                  
                  <div className="bg-card/30 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-foreground">Analysis:</h4>
                    <p className="text-muted-foreground">{result.analysis}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Sources Card */}
              <Card className="glass">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ExternalLink className="h-5 w-5 text-success" />
                    Supporting Evidence (Arweave Links)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {result.sources.map((source: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-card/30 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full ${source.verified ? 'bg-success' : 'bg-yellow-500'}`} />
                          <span className="font-medium text-foreground">{source.title}</span>
                        </div>
                        <Button variant="outline" size="sm" className="glass">
                          <ExternalLink className="h-3 w-3 mr-1" />
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Action Card */}
              <Card className="glass">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-lg mb-2 text-foreground">Need Protection?</h3>
                  <p className="text-muted-foreground mb-4">
                    Get misinformation insurance to protect against financial damage from false information.
                  </p>
                  <Button className="btn-success">
                    <Shield className="mr-2 h-4 w-4" />
                    Get Insurance Coverage
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
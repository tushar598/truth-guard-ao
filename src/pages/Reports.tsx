import { useState } from "react";
import { Search, Filter, ExternalLink, CheckCircle, AlertTriangle, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const Reports = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  // Mock data for fact-check reports
  const reports = [
    {
      id: "1",
      title: "COVID-19 vaccine effectiveness claims",
      verdict: "true",
      confidence: 94,
      date: "2024-01-15",
      category: "Health",
      arweaveHash: "abc123def456",
      sources: 5
    },
    {
      id: "2", 
      title: "Climate change temperature data manipulation",
      verdict: "false",
      confidence: 87,
      date: "2024-01-14",
      category: "Environment",
      arweaveHash: "ghi789jkl012",
      sources: 3
    },
    {
      id: "3",
      title: "Election voting system security vulnerabilities",
      verdict: "misleading",
      confidence: 76,
      date: "2024-01-13",
      category: "Politics",
      arweaveHash: "mno345pqr678",
      sources: 7
    },
    {
      id: "4",
      title: "AI job displacement statistics",
      verdict: "true",
      confidence: 91,
      date: "2024-01-12",
      category: "Technology",
      arweaveHash: "stu901vwx234",
      sources: 4
    },
    {
      id: "5",
      title: "Cryptocurrency market manipulation allegations",
      verdict: "false",
      confidence: 89,
      date: "2024-01-11",
      category: "Finance",
      arweaveHash: "yz567abc890",
      sources: 6
    }
  ];

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
      case "true": return <CheckCircle className="h-4 w-4 text-success" />;
      case "false": return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case "misleading": return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const filteredReports = reports.filter(report => {
    const matchesSearch = report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === "all" || report.verdict === filterStatus;
    return matchesSearch && matchesFilter;
  });

  const stats = [
    { label: "Total Verifications", value: "2,847", trend: "+12%" },
    { label: "True Claims", value: "1,624", trend: "+8%" },
    { label: "False Claims", value: "891", trend: "+15%" },
    { label: "Misleading", value: "332", trend: "+5%" }
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="pt-24 px-6 pb-12">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in-up">
            <h1 className="text-3xl md:text-5xl font-bold mb-6 text-gradient-primary">
              Transparency Reports
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Real-time access to all fact-checking results with immutable Arweave proofs.
              Complete transparency in the fight against misinformation.
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
            {stats.map((stat, index) => (
              <Card key={index} className="glass text-center animate-scale-in">
                <CardContent className="p-4">
                  <div className="text-2xl font-bold text-gradient-success mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-foreground mb-1">
                    {stat.label}
                  </div>
                  <div className="text-xs text-primary">
                    {stat.trend} this week
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Search and Filters */}
          <Card className="glass-intense mb-8 animate-fade-in-up">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5 text-primary" />
                Search & Filter Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search by title, category, or keywords..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="bg-card/50 border-card-border"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40 bg-card/50 border-card-border">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="true">True</SelectItem>
                      <SelectItem value="false">False</SelectItem>
                      <SelectItem value="misleading">Misleading</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="glass">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reports List */}
          <div className="space-y-4 mb-12">
            {filteredReports.map((report, index) => (
              <Card 
                key={report.id} 
                className="glass hover:glow-primary transition-all duration-300 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-3 mb-2">
                        {getVerdictIcon(report.verdict)}
                        <div>
                          <h3 className="font-semibold text-lg text-foreground mb-1">
                            {report.title}
                          </h3>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Category: {report.category}</span>
                            <span>Date: {report.date}</span>
                            <span>Sources: {report.sources}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className={`text-lg font-bold ${getVerdictColor(report.verdict)} uppercase`}>
                          {report.verdict}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {report.confidence}% confidence
                        </div>
                      </div>
                      
                      <Button variant="outline" size="sm" className="glass">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        Arweave Proof
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mb-12">
            <Button variant="outline" className="glass hover:glow-primary">
              Load More Reports
            </Button>
          </div>

          {/* API Access CTA */}
          <Card className="glass-intense text-center p-8 md:p-12 animate-fade-in-up">
            <h2 className="text-3xl font-bold mb-4 text-gradient-primary">
              Need API Access?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Integrate our fact-checking data into your applications with our developer-friendly API.
              Real-time access to all verification results with Arweave proofs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="btn-hero text-lg px-8 py-4">
                Get API Key
              </Button>
              <Button variant="outline" className="glass border-accent/50 text-lg px-8 py-4 hover:glow-accent">
                View Documentation
              </Button>
            </div>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Reports;
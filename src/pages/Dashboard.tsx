import { useState, useEffect, useRef } from "react";
import {
  Search,
  FileCheck,
  AlertTriangle,
  CheckCircle,
  Clock,
  ExternalLink,
  Shield,
  Upload,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { uploadData, getData, connectWallet } from "@/lib/arweave";

// Utility function for delays
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Retry mechanism with exponential backoff
const fetchWithRetry = async (
  url: string,
  options: RequestInit,
  retries = 3
): Promise<Response> => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await fetch(url, options);
      if (response.ok) return response;

      if (response.status === 429) {
        await delay(1000 * Math.pow(2, i)); // exponential backoff
        continue;
      }

      throw new Error(`HTTP error! status: ${response.status}`);
    } catch (error) {
      if (i === retries - 1) throw error;
      await delay(1000 * Math.pow(2, i));
    }
  }
  throw new Error("All retries failed");
};

const fetchResultByRequest = async (requestTxId: string) => {
  const query = {
    query: `
      query {
        transactions(
          tags: [
            { name: "App-Name", values: ["AI-FactChecker"] },
            { name: "Type", values: ["FactCheckResult"] },
            { name: "Related-Request", values: ["${requestTxId}"] }
          ]
        ) {
          edges {
            node { 
              id 
              tags {
                name
                value
              }
            }
          }
        }
      }
    `,
  };

  const endpoints = [
    "https://arweave.net/graphql",
    "https://arweave.search.goldsky.com/graphql",
    "https://graphql.arweave.net/graphql",
  ];

  for (const endpoint of endpoints) {
    try {
      console.log(`Trying endpoint: ${endpoint} for request: ${requestTxId}`);

      const res = await fetchWithRetry(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query),
      });

      if (!res.ok) {
        console.warn(`Endpoint ${endpoint} returned status: ${res.status}`);
        continue;
      }

      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.warn(`Endpoint ${endpoint} returned non-JSON response`);
        continue;
      }

      const data = await res.json();

      if (data.errors) {
        console.error("GraphQL errors:", data.errors);
        continue;
      }

      if (data.data.transactions.edges.length === 0) {
        console.log("No results found for this request");
        return null;
      }

      const resultTxId = data.data.transactions.edges[0].node.id;
      console.log(`Found result transaction: ${resultTxId}`);

      const resultData = await getData(resultTxId);
      if (resultData) {
        try {
          const parsed =
            typeof resultData === "string"
              ? JSON.parse(resultData)
              : resultData;
          console.log("Successfully parsed result data:", parsed);
          return parsed;
        } catch (err) {
          console.error("Invalid JSON resultData:", resultData);
          return null;
        }
      }
    } catch (err) {
      console.error(`Error with endpoint ${endpoint}:`, err);
    }
  }

  console.error("All endpoints failed for request:", requestTxId);
  return null;
};

const Dashboard = () => {
  const [inputText, setInputText] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [arweaveTx, setArweaveTx] = useState<string | null>(null);
  const [pollingCount, setPollingCount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const pollingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Clear polling on unmount
  useEffect(() => {
    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, []);

  // Polling for results
  useEffect(() => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
    }

    if (arweaveTx && isVerifying) {
      const requestTxId = arweaveTx.split("/").pop();
      if (!requestTxId) return;

      pollingRef.current = setInterval(async () => {
        try {
          setPollingCount((prev) => prev + 1);
          console.log(
            `Polling attempt #${pollingCount + 1} for request: ${requestTxId}`
          );

          const fetchedResult = await fetchResultByRequest(requestTxId);
          console.log("Fetched result:", fetchedResult);

          if (fetchedResult && fetchedResult.verdict) {
            setResult(fetchedResult);
            setIsVerifying(false);
            setError(null);
            if (pollingRef.current) {
              clearInterval(pollingRef.current);
            }
          }

          if (pollingCount >= 11) {
            console.log("Stopping polling after 12 attempts");
            setIsVerifying(false);
            setError(
              "Verification timed out. The AI agent may be offline or busy. Please try again later."
            );
            if (pollingRef.current) {
              clearInterval(pollingRef.current);
            }
          }
        } catch (err) {
          console.error("Error polling FactCheckResult:", err);
          setError(
            "Error connecting to verification service. Please check your connection and try again."
          );
        }
      }, 5000); // every 5 seconds
    }

    return () => {
      if (pollingRef.current) {
        clearInterval(pollingRef.current);
      }
    };
  }, [arweaveTx, isVerifying]); // removed pollingCount dependency

  const handleVerify = async () => {
    if (!inputText.trim()) return;

    setIsVerifying(true);
    setResult(null);
    setArweaveTx(null);
    setPollingCount(0);
    setError(null);

    try {
      const address = await connectWallet();
      if (!address) {
        console.error("Wallet not connected");
        setError(
          "Wallet connection failed. Please make sure ArConnect is installed and unlocked."
        );
        setIsVerifying(false);
        return;
      }

      const txId = await uploadData({
        claim: inputText,
        type: "FactCheckRequest",
      });
      if (!txId) {
        throw new Error("Upload failed or returned null transaction ID");
      }

      setArweaveTx(`https://arweave.net/${txId}`);
      console.log("Claim uploaded with TX ID:", txId);
    } catch (err) {
      console.error("Arweave upload failed:", err);
      setError("Failed to upload claim to Arweave. Please try again.");
      setIsVerifying(false);
    }
  };

  const retryVerification = async () => {
    if (!arweaveTx) return;
    setIsVerifying(true);
    setResult(null);
    setPollingCount(0);
    setError(null);
  };

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case "true":
        return "text-success";
      case "false":
        return "text-destructive";
      case "misleading":
        return "text-yellow-500";
      default:
        return "text-muted-foreground";
    }
  };

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case "true":
        return <CheckCircle className="h-6 w-6 text-success" />;
      case "false":
        return <AlertTriangle className="h-6 w-6 text-destructive" />;
      case "misleading":
        return <AlertTriangle className="h-6 w-6 text-yellow-500" />;
      default:
        return <Clock className="h-6 w-6 text-muted-foreground" />;
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
              Verify any claim with our advanced AI system + permanent Arweave
              storage
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
                    Verify & Store
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Error Message */}
          {error && (
            <Card className="glass-intense glow-destructive mb-8 animate-fade-in-up">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-6 w-6 text-destructive mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">
                      Verification Issue
                    </h3>
                    <p className="text-muted-foreground mb-4">{error}</p>
                    {arweaveTx && (
                      <div className="flex gap-2">
                        <Button
                          onClick={retryVerification}
                          variant="outline"
                          size="sm"
                        >
                          <RefreshCw className="mr-2 h-4 w-4" />
                          Retry Verification
                        </Button>
                        <Button asChild variant="outline" size="sm">
                          <a
                            href={arweaveTx}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="mr-2 h-4 w-4" />
                            View Transaction
                          </a>
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Loading Progress */}
          {isVerifying && (
            <Card className="glass mb-8 animate-fade-in-up">
              <CardContent className="p-6">
                <div className="text-center mb-4">
                  <h3 className="font-semibold text-lg mb-2">
                    AI Analysis in Progress
                  </h3>
                  <p className="text-muted-foreground">
                    Cross-referencing sources and analyzing claims...
                    {pollingCount > 0 && ` (Attempt ${pollingCount}/12)`}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    This usually takes 30-60 seconds. Your claim has been stored
                    on Arweave.
                  </p>
                </div>
                <Progress
                  value={Math.min(pollingCount * 8.33, 100)}
                  className="w-full"
                />
              </CardContent>
            </Card>
          )}

          {/* Results Section */}
          {result && result.verdict && (
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
                    <div
                      className={`text-3xl font-bold mb-2 ${getVerdictColor(
                        result.verdict
                      )} uppercase`}
                    >
                      {result.verdict}
                    </div>
                    <div className="text-lg text-muted-foreground">
                      Confidence Score:{" "}
                      <span className="text-primary font-semibold">
                        {result.confidence ?? "N/A"}%
                      </span>
                    </div>
                  </div>

                  <div className="bg-card/30 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-foreground">
                      Analysis:
                    </h4>
                    <p className="text-muted-foreground">
                      {result.analysis ?? "No analysis available."}
                    </p>
                  </div>

                  {arweaveTx && (
                    <div className="mt-4 text-sm text-muted-foreground">
                      <a
                        href={arweaveTx}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-primary underline"
                      >
                        <Upload className="h-4 w-4" />
                        View Original Claim on Arweave
                      </a>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Sources Card */}
              {result.sources && result.sources.length > 0 && (
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
                        <div
                          key={index}
                          className="flex items-center justify-between p-3 bg-card/30 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-2 h-2 rounded-full ${
                                source.verified
                                  ? "bg-success"
                                  : "bg-yellow-500"
                              }`}
                            />
                            <span className="font-medium text-foreground">
                              {source.title ?? "Untitled Source"}
                            </span>
                          </div>
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="glass"
                          >
                            <a
                              href={source.url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              View
                            </a>
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Insurance Card */}
              <Card className="glass">
                <CardContent className="p-6 text-center">
                  <h3 className="font-semibold text-lg mb-2 text-foreground">
                    Need Protection?
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Get misinformation insurance to protect against financial
                    damage from false information.
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

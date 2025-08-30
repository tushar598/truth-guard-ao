import { Github, Twitter, ExternalLink, Shield } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="glass mt-20 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Shield className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold text-gradient-primary">TruthGuard AI</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Autonomous AI-powered fact verification with blockchain-backed transparency.
              Building trust in the digital age.
            </p>
            <div className="text-sm text-muted-foreground">
              <span className="text-gradient-success">Powered by Arweave + AO</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Platform</h4>
            <div className="space-y-2">
              <Link to="/dashboard" className="block text-muted-foreground hover:text-primary transition-colors">
                Fact Checker
              </Link>
              <Link to="/insurance" className="block text-muted-foreground hover:text-primary transition-colors">
                Insurance
              </Link>
              <Link to="/reports" className="block text-muted-foreground hover:text-primary transition-colors">
                Reports
              </Link>
              <Link to="/about" className="block text-muted-foreground hover:text-primary transition-colors">
                About
              </Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Connect</h4>
            <div className="space-y-2">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-4 w-4" />
                <span>GitHub</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-4 w-4" />
                <span>Twitter</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              <a
                href="https://arweave.org"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                <span>Hackathon</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-card-border mt-8 pt-8 text-center text-muted-foreground">
          <p>&copy; 2024 TruthGuard AI. Building the future of fact verification.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
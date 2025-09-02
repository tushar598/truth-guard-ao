import AoConnect from "@permaweb/aoconnect";
import fs from "fs";
import path from "path";

// Load wallet
const walletPath = path.join(process.cwd(), "wallet.json");
if (!fs.existsSync(walletPath)) {
  console.error("❌ wallet.json not found!");
  process.exit(1);
}
const wallet = JSON.parse(fs.readFileSync(walletPath, "utf-8"));

// Initialize AO client
const ao = new AoConnect({
  wallet,
  network: "mainnet", // or "testnet" if you are using the test network
});

console.log("✅ AO initialized successfully!");

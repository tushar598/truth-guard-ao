// deploy.js
import Arweave from "arweave";
import fs from "fs";
import path from "path";

// Initialize Arweave client
const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

// Load wallet
const walletPath = path.join(process.cwd(), "wallet.json");
if (!fs.existsSync(walletPath)) {
  console.error("❌ wallet.json not found in project root!");
  process.exit(1);
}
const wallet = JSON.parse(fs.readFileSync(walletPath, "utf-8"));

// Deploy Lua agent
const deployAgent = async () => {
  try {
    const agentCodePath = path.join(process.cwd(), "agent/factchecker.lua");
    if (!fs.existsSync(agentCodePath)) {
      throw new Error("agent/factchecker.lua not found!");
    }

    const luaCode = fs.readFileSync(agentCodePath, "utf-8");
    const tx = await arweave.createTransaction({ data: luaCode }, wallet);

    tx.addTag("App-Name", "AO-Agent");
    tx.addTag("Content-Type", "text/plain");
    tx.addTag("Type", "Lua-Agent");
    tx.addTag("Agent-Name", "FactChecker");

    await arweave.transactions.sign(tx, wallet);
    const response = await arweave.transactions.post(tx);

    if (response.status === 200 || response.status === 202) {
      console.log("✅ AO Agent deployed!");
      console.log("🔗 Transaction ID:", tx.id);
      console.log(`🌐 View: https://arweave.net/${tx.id}`);
    } else {
      console.error("❌ Deployment failed:", response);
    }
  } catch (err) {
    console.error("❌ Error deploying agent:", err);
  }
};

deployAgent();

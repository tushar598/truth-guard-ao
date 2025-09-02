// agent.js
import Arweave from "arweave";
import fs from "fs";
import path from "path";

// ✅ Initialize Arweave client
const arweave = Arweave.init({
  host: "arweave.net", // Arweave gateway
  port: 443,
  protocol: "https",
});

// ✅ Load wallet (must exist in same folder as agent.js)
const walletPath = path.join(process.cwd(), "wallet.json");

if (!fs.existsSync(walletPath)) {
  console.error(
    "❌ wallet.json not found! Place your Arweave wallet file in project root."
  );
  process.exit(1);
}

const wallet = JSON.parse(fs.readFileSync(walletPath, "utf-8"));

// ✅ Test function: get balance of wallet
const checkWallet = async () => {
  try {
    const address = await arweave.wallets.jwkToAddress(wallet);
    const balance = await arweave.wallets.getBalance(address);
    const ar = arweave.ar.winstonToAr(balance);

    console.log("✅ Wallet Address:", address);
    console.log("💰 Balance:", ar, "AR");
  } catch (err) {
    console.error("❌ Error:", err);
  }
};

// Run test
checkWallet();

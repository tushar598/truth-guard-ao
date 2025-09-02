// createWallet.js
import Arweave from "arweave";
import fs from "fs";

const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const createWallet = async () => {
  try {
    const key = await arweave.wallets.generate(); // generate wallet
    fs.writeFileSync("wallet.json", JSON.stringify(key, null, 2));
    const address = await arweave.wallets.jwkToAddress(key);
    console.log("✅ Wallet created!");
    console.log("Address:", address);
    console.log("Wallet saved as wallet.json in project root.");
  } catch (err) {
    console.error("❌ Error creating wallet:", err);
  }
};

createWallet();

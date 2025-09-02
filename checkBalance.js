import Arweave from "arweave";
import fs from "fs";

const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

const wallet = JSON.parse(fs.readFileSync("./wallet.json", "utf-8"));

(async () => {
  const address = await arweave.wallets.jwkToAddress(wallet);
  const balance = await arweave.wallets.getBalance(address);
  console.log("Wallet Address:", address);
  console.log("Balance (AR):", arweave.ar.winstonToAr(balance));
})();

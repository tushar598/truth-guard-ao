import Arweave from "arweave";

// Initialize Arweave client
const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

// Connect to Wander Wallet
export async function connectWallet(): Promise<string | null> {
  try {
    if (!window.arweaveWallet) {
      alert("Wander Wallet not found. Please install it.");
      return null;
    }

    await window.arweaveWallet.connect([
      "ACCESS_ADDRESS",
      "SIGN_TRANSACTION",
      "ACCESS_PUBLIC_KEY",
    ]);

    const address = await window.arweaveWallet.getActiveAddress();
    return address;
  } catch (err) {
    console.error("Wallet connection failed:", err);
    return null;
  }
}

// Upload data to Arweave
export async function uploadData(data: any): Promise<string | null> {
  try {
    const tx = await arweave.createTransaction({
      data: JSON.stringify(data),
    });

    tx.addTag("App-Name", "AI-FactChecker");
    tx.addTag("Content-Type", "application/json");
    if (data.type) tx.addTag("Type", data.type);
    if (data.claim) tx.addTag("Claim", data.claim);

    await window.arweaveWallet.sign(tx);
    const response = await arweave.transactions.post(tx);

    if (response.status === 200 || response.status === 202) {
      return tx.id;
    } else {
      console.error("Upload failed:", response);
      return null;
    }
  } catch (err) {
    console.error("Upload error:", err);
    return null;
  }
}

// Retrieve data from Arweave by transaction ID
export async function getData(txId: string): Promise<any | null> {
  try {
    const data = await arweave.transactions.getData(txId, {
      decode: true,
      string: true,
    });

    if (typeof data === "string") {
      try {
        return JSON.parse(data);
      } catch {
        return data;
      }
    }

    return data;
  } catch (err) {
    console.error("Fetch error:", err);
    return null;
  }
}

// interact.js
import Arweave from "arweave";

const arweave = Arweave.init({
  host: "arweave.net",
  port: 443,
  protocol: "https",
});

// Replace with your deployed Lua agent transaction ID
const agentTxId = "YOUR_DEPLOYED_LUA_TX_ID";

// Example function to interact
const callAgent = async (statement) => {
  try {
    const luaCallTx = {
      target: agentTxId,
      data: JSON.stringify({ statement }),
    };

    console.log("📩 Calling AO Agent...");
    // Normally, you would use ArConnect or AO SDK to interact
    // For testing, we just show the payload
    console.log(luaCallTx);

    // The agent will return verdict, confidence, analysis
    // Replace with real call using AO SDK if available
  } catch (err) {
    console.error("❌ Error calling agent:", err);
  }
};

const statement = "The sky is blue";
callAgent(statement);

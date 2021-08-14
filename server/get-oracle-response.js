const { readFileSync } = require("fs");
//const { Universal } = require("@aeternity/aepp-sdk");
const { Universal, Node, MemoryAccount } = require("@aeternity/aepp-sdk");

const getOracleResponse = async (query) => {
  // Format & Sanitize query
  query = query.toLowerCase().replace(/\ /g, "-");

  const client = await Universal({
    nodes: [
      {
        name: "hms-node",
        instance: await Node({
          url: process.env.NODE_URL,
          internalUrl: process.env.NODE_URL,
        }),
      },
    ],
    accounts: [
      MemoryAccount({
        keypair: {
          publicKey: process.env.WALLET_PUBLIC_KEY,
          secretKey: process.env.WALLET_PRIVATE_KEY,
        },
      }),
    ],
    compilerUrl: process.env.COMPILER_URL,
    address: process.env.WALLET_PUBLIC_KEY,
  });

  // Read contract source
  const CONTRACT_SOURCE = readFileSync("./contracts/HmsContract.aes", "utf-8");

  // Error logger
  const errLogger = (err) => console.error(err);

  // Contract Object
  const contractObject = await client.getContractInstance(CONTRACT_SOURCE, {
    contractAddress: process.env.CONTRACT_ADDRESS,
  });

  // Destructure contract methods
  const { querySickness, checkQuery } = contractObject.methods;

  // Query Oracle
  const oracleHash = await querySickness(query, {
    amount: 200000000000000,
  }).catch(errLogger);

  // Get Oracle response
  const response = await checkQuery(oracleHash.decodedResult).catch(errLogger);

  return response.decodedResult;
};

module.exports = getOracleResponse;

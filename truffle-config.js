const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");
require('dotenv').config()

// const mnemonic =
//   "gun hover twin vessel cherry expire expect off pet icon poet supply";

const mnemonic =
  "gun hover twin vessel cherry expire expect off pet icon poet supply";

// https://rpc-mainnet.maticvigil.com/v1/c8ec055f4fb8bf5bc8c079b4bf5513807a791e96

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    develop: {
      network_id: 5777,
      port: 7545,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      networkCheckTimeout: 10000,
    },
    matic: {
      provider: () =>
        new HDWalletProvider(
          mnemonic,
          `https://rpc-mumbai.maticvigil.com/v1/c8ec055f4fb8bf5bc8c079b4bf5513807a791e96`
        ),
      network_id: 137,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      gas: 6000000,
      gasPrice: 10000000000,
    },
  },
  compilers: {
    solc: {
      version: "^0.8.1",
    },
  },
};

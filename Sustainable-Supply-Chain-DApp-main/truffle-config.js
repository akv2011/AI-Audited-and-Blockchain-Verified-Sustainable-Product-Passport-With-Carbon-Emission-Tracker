const path = require("path");

module.exports = {
  contracts_build_directory: path.join(__dirname, "src/abis"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "1337", // Match MetaMask Chain ID
      gas: 6721975,
      gasPrice: 20000000000
    },
    develop: {
      port: 8545
    }
  },
  compilers: {
    solc: {
      version: "0.5.16"
    }
  }
};

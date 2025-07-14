const path = require("path");

module.exports = {
  contracts_build_directory: path.join(__dirname, "src/abis"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Match any network id
      gas: 6721975,
      gasPrice: 20000000000
    },
    develop: {
      port: 7545
    }
  },
  compilers: {
    solc: {
      version: "0.5.16"
    }
  }
};

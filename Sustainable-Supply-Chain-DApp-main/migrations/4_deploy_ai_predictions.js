const AIPredictions = artifacts.require("AIPredictions");

module.exports = function(deployer) {
  deployer.deploy(AIPredictions);
};

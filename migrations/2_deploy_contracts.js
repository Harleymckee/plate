// var ConvertLib = artifacts.require("./ConvertLib.sol");
// var MetaCoin = artifacts.require("./MetaCoin.sol");
var Geekt = artifacts.require("./Geekt.sol");


module.exports = function(deployer) {
  deployer.deploy(Geekt);
};

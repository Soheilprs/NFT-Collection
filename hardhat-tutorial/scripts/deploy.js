const { ethers } = require("hardhat");
require("dotenv").config({ path: ".env" });
const { WHITELIST_CONTRACT_ADDRESS, METADATA_URL } = require("../constants");

async function main() {
  const whitelistContract = WHITELIST_CONTRACT_ADDRESS;

  const metadataURL = METADATA_URL;

  const cryptoDevsContract = await ethers.getContractFactory("CryptoDevs");

  const deployCryptoDevsContract = await cryptoDevsContract.deploy(
    metadataURL,
    whitelistContract
  );

  await deployCryptoDevsContract.deployed();

  console.log(
    "Crypto Devs Contract Address:",
    deployCryptoDevsContract.address
  );

  console.log("Sleeping.....");
  await sleep(40000);

  await hre.run("verify:verify", {
    address: deployCryptoDevsContract.address,
    constructorArguments: [metadataURL, whitelistContract],
  });

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

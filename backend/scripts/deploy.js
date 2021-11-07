async function main() {
    // We get the contract to deploy
    
    const RandomSwap = await ethers.getContractFactory("RandomSwap");
    const randomSwap = await RandomSwap.deploy(); 
  
    console.log("Contract deployed to:", randomSwap.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
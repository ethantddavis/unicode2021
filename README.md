# Random Swap
<h2>Description</h2>
An implementatipon of Uniswap's V3 exact input swap function to give users a token chosen randomly from a curated list of trusted tokens like WBTC, DAI, and others in exchange for ETH. Currently randomness is not implemented, and the output token is fixed to DAI. This project was built using Solidity, Hardhat, Uniswap v3-periphery library, React, and web3js.

to compile contracts:
  cd backend
  npx hardhat compile

to deploy contracts:
  cd backend
  npx hardhat run --network kovan scripts/deploy.js
  
to run frontend:
  cd frontend
  npm start

Kovan Contract deployed to: 0x62Bb2142A967955637dD784d45aB454Fcdd3d443

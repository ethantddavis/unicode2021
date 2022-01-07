const { expect, assert } = require('chai');
const { ethers } = require('hardhat');

let RandomSwap;
let randomSwap;
let dai;

beforeEach(async () => {
  RandomSwap = await ethers.getContractFactory("RandomSwap");
  randomSwap = await RandomSwap.deploy();
  await randomSwap.deployed();
  dai = '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa';
})

describe('testing swap contract...', () => {

  it('swap router exists', async () => {
    expect(await randomSwap.swapRouter).to.not.be.null;
  })

  it('swaps eth for dai', async () => {
    let ethBefore = 10;
    let daiBefore = 0;
    let ethAfter = 10;
    let daiAfter = 0;
    //await randomSwap.convertExactEthTo(dai);
    //expect(ethBefore > ethAfter);
    //expect(daiBefore < daiAfter);
    expect(0).to.be.equal(1);
  })
  
})



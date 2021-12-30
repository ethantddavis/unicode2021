// SPDX-License-Identifier: MIT
pragma solidity >=0.7.6;
pragma abicoder v2;

import '@uniswap/v3-periphery/contracts/interfaces/ISwapRouter.sol';

contract RandomSwap {
  ISwapRouter public constant swapRouter = ISwapRouter(0xE592427A0AEce92De3Edee1F18E0157C05861564);
  address private constant DaiKovan = 0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa; //example
  address private constant RaiKovan = 0x76b06a2f6dF6f0514e7BEC52a9AfB3f603b477CD; //example
  address private constant WETH9 = 0xd0A1E359811322d97991E03f863a0C30C2cF029C;

  function convertExactEthTo(address tokenType) external payable {
    require(msg.value > 0, "Must pass non 0 ETH amount");

    uint256 deadline = block.timestamp + 15; // using 'now' for convenience, for mainnet pass deadline from frontend!
    address tokenIn = WETH9;
    address tokenOut = tokenType;
    uint24 fee = 3000;
    address recipient = msg.sender;
    uint256 amountIn = msg.value;
    uint256 amountOutMinimum = 1;
    uint160 sqrtPriceLimitX96 = 0;
    
    ISwapRouter.ExactInputSingleParams memory params = ISwapRouter.ExactInputSingleParams(
        tokenIn,
        tokenOut,
        fee,
        recipient,
        deadline,
        amountIn,
        amountOutMinimum,
        sqrtPriceLimitX96
    );
    
    swapRouter.exactInputSingle{ value: msg.value }(params);
  }
  
}
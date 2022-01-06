import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import RandomSwap from './abis/RandomSwap.json';
import { ChainId, Fetcher, WETH, Route, Trade, TokenAmount, TradeType } from '@uniswap/sdk';

class App extends Component {
  
  async componentDidMount() {
    await this.loadBlockchainData()
  }

  async loadBlockchainData() {

    //check if MetaMask exists 
    const ethereum = window.ethereum;
    if (typeof ethereum !== 'undefined') {
      const web3 = new Web3(ethereum)
      console.log(web3)
  
      //metamask popup
      const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
      //console.log('your account ', accounts[0])
      const netId = await ethereum.request({ method: 'net_version' });
      console.log('network id ', netId)
      const chainId = await web3.eth.getChainId();
      console.log('chain id', chainId);
      
      
      //check if account is detected, then load balance&setStates, else push alert
      if (typeof accounts[0] !== 'undefined') {
        const balance = await ethereum.request({ method: "eth_getBalance", params: [accounts[0]] })
        this.setState({ account: accounts[0], balance: balance, web3: web3 })
        //console.log('eth balance in wallet ', web3.utils.fromWei(balance))
        
      } else {
        window.alert('Please login with MetaMask')
      }
  
      //in try block load contracts
      try {
        const daiAddress = this.state.tokenAddresses.dai;
        const dai = await Fetcher.fetchTokenData(chainId, daiAddress)
        const randomSwap = new web3.eth.Contract(RandomSwap.abi, "0x62Bb2142A967955637dD784d45aB454Fcdd3d443")
        this.setState({ swap: randomSwap })
        //console.log("nothing broke?");
  
      } catch (e) {
        console.log('Error', e)
        window.alert('Contracts not deployed to the current network')
      }
  
    //if MetaMask not exists push alert
    } else {
      window.alert('Please install MetaMask')
    }
  }

  async swap(amount) {
    if (this.state.swap !== 'undefined') {
      try {
        //console.log(amount)
        await this.state.swap.methods.convertExactEthTo(this.state.tokenAddresses.dai).send({ 
          from: this.state.account, 
          value: amount
        })
      } catch (e) {
        console.log('Error, swap: ', e)
      }
    }
  }
  

  constructor(props) {
    super(props)
    this.state = {
      web3: 'undefined',
      account: '',
      balance: 0,
      swap: null,
      tokenAddresses: {
        dai: '0x4F96Fe3b7A6Cf9725f59d353F723c1bDb64CA6Aa',
        rai: '',
        weth: '',
      },
    }
  }
  
  render() {
    return (
      <div className='App'>
        <div className='header'>
          AccidentalSwap
        </div>
        <form className='swapForm' onSubmit={(e) => {
          e.preventDefault()
          let amount = this.swapAmount.value
          amount = amount * 10**18
          this.swap(amount)
        }}>
          <div className='bio'>
            How much ETH would you like to swap?
          </div>
          <div className='input'>
            <input
              className='swapAmount'
              id='swapAmount'
              type='number'
              step='0.00000001'
              placeholder='0.0'
              required
              ref={(input) => { this.swapAmount = input }}
            />
            <button type='submit' className='swapButton'>
              Swap
            </button>
          </div>
        </form>
      </div>
    );
  }
}



export default App;
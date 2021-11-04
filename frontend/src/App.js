import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import RandomSwap from './abis/RandomSwap.json';

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
      console.log('your account ', accounts[0])
      const netId = await ethereum.request({ method: 'net_version' });
      console.log('network id ', netId)
      
      
      //check if account is detected, then load balance&setStates, else push alert
      if (typeof accounts[0] !== 'undefined') {
        const balance = await ethereum.request({ method: "eth_getBalance", params: [accounts[0]] })
        this.setState({ account: accounts[0], balance: balance, web3: web3 })
        console.log('eth balance in wallet ', web3.utils.fromWei(balance))
        
      } else {
        window.alert('Please login with MetaMask')
      }
  
      //in try block load contracts
      try {
        const randomSwap = new web3.eth.Contract(RandomSwap.abi, "0x5FbDB2315678afecb367f032d93F642f64180aa3")
        console.log("nothing broke?");
  
      } catch (e) {
        console.log('Error', e)
        window.alert('Contracts not deployed to the current network')
      }
  
    //if MetaMask not exists push alert
    } else {
      window.alert('Please install MetaMask')
    }
  }
  

  constructor(props) {
    super(props)
    this.state = {
      web3: 'undefined',
      account: '',
      balance: 0,
    }
  }
  
  render() {
    return (
      <div className='App'>
        <p>right click, inspect, navigate to console</p>
      </div>
    );
  }
}



export default App;
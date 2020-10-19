import { toAsciiFromByte32, getWeb3 } from '../utils'
import PaypalContractMeta from './contracts/Paypal.json'
import usdtContractMeta from './contracts/Usdt.json'
import contract from 'truffle-contract'


let instance = null

export default class PaypalContract {
  constructor() {
    console.log(instance)
    if (!instance) {
      
      instance = this
      this.web3 = getWeb3()
      console.log("web3 init:",this.web3)
      this.contract = contract(PaypalContractMeta)
      this.contract.setProvider(this.web3.currentProvider)
      this.usdtcontract = contract(usdtContractMeta)
      this.usdtcontract.setProvider(this.web3.currentProvider)
      // this.web3.eth.getAccounts().then(e => { 
      //       this.accounts = e;
      //       this.account = e[0];
      //       console.log('account:',this.account)
      // }) 
      
    }

    return instance
  }

  async payToContract(coin_address,recipient,price,order_id) {
    //const { eth: { accounts: [ account ] } } = this.web3
    var currentAccount = await this.web3.eth.getAccounts()
    console.log("web3:",this.web3)
    console.log("eth:",this.web3.eth)
    console.log("coin address:",coin_address)
    const coincontractInstance = await this.usdtcontract.at(coin_address)
    const contractInstance = await this.contract.deployed()
    var priceUnit = this.web3.utils.toBN(price).mul(this.web3.utils.toBN(this.web3.utils.toWei("1")))
    await coincontractInstance.approve(contractInstance.address,priceUnit,{from: currentAccount[0]})
    await contractInstance.deposit(coin_address,recipient,priceUnit,order_id,{ from: currentAccount[0] })
    //await contractInstance.setExpiryDate(order_id,0,{ from: currentAccount[0] })

  }

  async withdraw(order_id) {

    var currentAccount = await this.web3.eth.getAccounts()

    const contractInstance = await this.contract.deployed()
    return contractInstance.withdraw(order_id,{ from: currentAccount[0] })
  }

  async pendingPayment(order_id) {
    const contractInstance = await this.contract.deployed()
    var currentAccount = await this.web3.eth.getAccounts()
    return contractInstance.pendingFund(order_id, { from: currentAccount[0] })
  }

  async releasePayment(order_id) {
    var currentAccount = await this.web3.eth.getAccounts()
    const contractInstance = await this.contract.deployed()

    return contractInstance.releaseFund(order_id, { from: currentAccount[0] })
  }

  async activePayment(order_id) {
    const contractInstance = await this.contract.deployed()
    var currentAccount = await this.web3.eth.getAccounts()
    return contractInstance.activeFund(order_id, { from: currentAccount[0] })
  }

  async enableRefund(order_id) {
    const contractInstance = await this.contract.deployed()
    var currentAccount = await this.web3.eth.getAccounts()
    return contractInstance.enableRefund(order_id, { from: currentAccount[0] })
  }


  async refund(order_id) {
    const contractInstance = await this.contract.deployed()
    var currentAccount = await this.web3.eth.getAccounts()
    return contractInstance.refund(order_id,{ from: currentAccount[0] })
  }

  async getDeposit(order_id) {
    const contractInstance = await this.contract.deployed()
    return contractInstance.depositsOf.call(order_id)
  }

  async getPayer(order_id) {
    const contractInstance = await this.contract.deployed()

    return contractInstance.payer.call(order_id)
  }


  async getRecipient(order_id) {
    const contractInstance = await this.contract.deployed()
    return contractInstance.payee.call(order_id);
  }

  async getExpiry(order_id) {
    const contractInstance = await this.contract.deployed()

    return contractInstance.expire.call(order_id);
  }

  async getState(order_id) {
    const contractInstance = await this.contract.deployed()
    //const status = ['Active', 'Refunding', 'Pending', 'Releasing']
    return await contractInstance.state.call(order_id);
  }

}

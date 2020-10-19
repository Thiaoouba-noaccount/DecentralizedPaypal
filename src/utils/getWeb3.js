import Web3 from 'web3'

export default  () => {
	var web3 = null;
	if (typeof window.ethereum !== "undefined") {
        web3 = new Web3(window.ethereum)
        try {
            // Request account access if needed
            window.ethereum.enable()
            console.log("MetaMask init successfully!")
            // Acccounts now exposed
        } catch (error) {
            // User denied account access...
            console.log("MetaMask cannot be enabled!")
    	}
    }
    // Legacy dapp browsers...
    else if (window.web3) {
        web3 = new Web3(window.web3.currentProvider);
    }
    // Non-dapp browsers...we use ganache
    else {
        console.log('Non-Ethereum browser detected. You should consider trying MetaMask!');
        web3 = new Web3.providers.HttpProvider('http://localhost:7545');
  		console.log("ganache")
    }
	return web3
}
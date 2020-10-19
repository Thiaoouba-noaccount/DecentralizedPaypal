import time
from web3 import Web3, HTTPProvider
import json


truffleFile_paypal = json.load(open('./build/contracts/Paypal.json'))
file_usdt = json.load(open('./build/contracts/usdt.json'))
w3 =Web3(HTTPProvider('http://127.0.0.1:7545'))
USDT_ADDR =''
DAI_ADDR =''
accounts =[]
wallet_private_buyer =''
wallet_address_buyer =''
wallet_private_seller =''
wallet_address_seller =''
paypal_contract_address =''
paypal_contract =0
usdt_contract =0

def setTestEnvironment(ropsten):
    global w3,USDT_ADDR,DAI_ADDR,accounts,wallet_private_buyer
    global wallet_address_buyer,wallet_private_seller
    global wallet_address_seller,paypal_contract_address
    global paypal_contract,usdt_contract

    if ropsten == False:
        print("enter ganache setting!")
        w3 = Web3(HTTPProvider('http://127.0.0.1:7545'))
        USDT_ADDR =w3.toChecksumAddress('0xBa67F0c2CC12E27266822D69b43E3895dAeD8899')
        DAI_ADDR = w3.toChecksumAddress('0x525e9ecc0F9269827FE802E0c14c2e613A76379A')
        accounts = ['0xDd98fc04a2b5729de3248721a8B245f0ce2F13db',
            '0xB4a9b998561BD1C18F82c8a0257B6a18D35F1263',
            '0x7Fd228fAB94b6A9236Cc9e9aaf2AF490436f800a']
        wallet_private_buyer   = 'e3af1d7d7a3f41ffb1794a3b56fb35d4532391732f770a6477ffd424eb3ea966'      
        wallet_private_seller   = '6c3cdbd9bd89521e7879f3a2838d087891519f4cf4e7f36a2252564926817930'
        paypal_contract_address = truffleFile_paypal["networks"]["5777"]["address"]
    else:      
        #for Ropsten pub testnet
        w3 = Web3(HTTPProvider('https://ropsten.infura.io/v3/8cf5098b0e754abbac176b9ed5f2d59d'))
        accounts = ['0x438269EBf0fa37fba49BBf2056Ce8A01a859a6E9',
                    '0x32b410a236760F5c0831Bd0D14184E9a0a49bDb0',
                    '0x02C12b82BBC492978DeD4DBfDEc9FC13Ab93A743']
        USDT_ADDR = '0xc09E62C5c30644dce152B3fDcAFe7b8C86bc6719'
        DAI_ADDR = '0x96c54F2A5C3dE2fF5F1a1627EaEf2A1Ec88c9FD5'
        wallet_private_buyer   = '444f1f9854dbb2bc8152542d7c35d03b2d36c51da9c6057c166fe5f8b4948c43'
        wallet_private_seller   = '5a822717ef47e64c6a3286d163248937b2bacd1ac2fd633f35fe166bd46aa168'
        paypal_contract_address = truffleFile_paypal["networks"]["3"]["address"]

    wallet_address_buyer = accounts[0] 
    wallet_address_seller = accounts[1]
    paypal_contract_address = w3.toChecksumAddress(paypal_contract_address)      
    paypal_contract = w3.eth.contract(address = paypal_contract_address, abi = truffleFile_paypal['abi'])
    usdt_contract = w3.eth.contract(address = USDT_ADDR, abi = file_usdt['abi'])


def balanceOf(token_contract,account):
    return token_contract.functions.balanceOf(account).call()

def allowance(token_contract,owner,spender):
    return token_contract.functions.allowance(owner,spender).call()

def transfer(token_contract,payee,amount):
        
    #for ropsten
    nonce = w3.eth.getTransactionCount(wallet_address_buyer)
    print(nonce)
    amount = amount *10**18

    txn_dict = token_contract.functions.approve(payee,amount).buildTransaction({
            'chainId': 3,
            'gas': 140000,
            'gasPrice': w3.toWei('40', 'gwei'),
            'nonce': nonce,
    })

    signed_txn = w3.eth.account.signTransaction(txn_dict, private_key=wallet_private_buyer)

    result = w3.eth.sendRawTransaction(signed_txn.rawTransaction)

    tx_receipt = w3.eth.getTransactionReceipt(result)

    count = 0
    while tx_receipt is None and (count < 30):
        time.sleep(10)
        tx_receipt = w3.eth.getTransactionReceipt(result)
        print(tx_receipt)
        
    if tx_receipt is None:
            return {'status': 'failed', 'error': 'timeout'}
        
    return {'status': 'added', 'tx_receipt': tx_receipt}


def approve(token_contract,payee,amount):
        
    #for ropsten
    nonce = w3.eth.getTransactionCount(wallet_address_buyer)
    print(nonce)
    amount = amount *10**18

    txn_dict = token_contract.functions.approve(payee,amount).buildTransaction({
            'chainId': 3,
            'gas': 140000,
            'gasPrice': w3.toWei('40', 'gwei'),
            'nonce': nonce,
    })

    signed_txn = w3.eth.account.signTransaction(txn_dict, private_key=wallet_private_buyer)

    result = w3.eth.sendRawTransaction(signed_txn.rawTransaction)

    tx_receipt = w3.eth.getTransactionReceipt(result)

    count = 0
    while tx_receipt is None and (count < 30):
        time.sleep(10)
        tx_receipt = w3.eth.getTransactionReceipt(result)
        print(tx_receipt)
        
    if tx_receipt is None:
            return {'status': 'failed', 'error': 'timeout'}
        
    return {'status': 'added', 'tx_receipt': tx_receipt}


def deposit(token,payee,amount, orderid):
        
    #for ropsten
    nonce = w3.eth.getTransactionCount(wallet_address_buyer)
    print(nonce)
    #amount = amount *10**18

    txn_dict = paypal_contract.functions.deposit(token,payee,amount,orderid).buildTransaction({
            'chainId': 3,
            'gas': 230000,
            'gasPrice': w3.toWei('100', 'gwei'),
            'nonce': nonce,
    })

    signed_txn = w3.eth.account.signTransaction(txn_dict, private_key=wallet_private_buyer)

    result = w3.eth.sendRawTransaction(signed_txn.rawTransaction)

    tx_receipt = w3.eth.getTransactionReceipt(result)

    count = 0
    while tx_receipt is None and (count < 30):
        time.sleep(10)
        tx_receipt = w3.eth.getTransactionReceipt(result)
        print(tx_receipt)
        
    if tx_receipt is None:
            return {'status': 'failed', 'error': 'timeout'}
        
    return {'status': 'added', 'tx_receipt': tx_receipt}
    
    
def releaseFund(orderid):
        
    #for ropsten
    nonce = w3.eth.getTransactionCount(wallet_address_buyer)
    amount = amount *10**18

    txn_dict = paypal_contract.functions.releaseFund(orderid).buildTransaction({
            'chainId': 3,
            'gas': 140000,
            'gasPrice': w3.toWei('40', 'gwei'),
            'nonce': nonce,
    })

    signed_txn = w3.eth.account.signTransaction(txn_dict, private_key=wallet_private_buyer)

    result = w3.eth.sendRawTransaction(signed_txn.rawTransaction)

    tx_receipt = w3.eth.getTransactionReceipt(result)

    count = 0
    while tx_receipt is None and (count < 30):
        time.sleep(10)
        tx_receipt = w3.eth.getTransactionReceipt(result)
        print(tx_receipt)
        
    if tx_receipt is None:
            return {'status': 'failed', 'error': 'timeout'}
        
    return {'status': 'added', 'tx_receipt': tx_receipt}

def withdraw(orderid):
        
    #for ropsten
    nonce = w3.eth.getTransactionCount(wallet_address_seller)
    amount = amount *10**18

    txn_dict = paypal_contract.functions.withdraw(orderid).buildTransaction({
            'chainId': 3,
            'gas': 140000,
            'gasPrice': w3.toWei('40', 'gwei'),
            'nonce': nonce,
    })

    signed_txn = w3.eth.account.signTransaction(txn_dict, private_key=wallet_private_seller)

    result = w3.eth.sendRawTransaction(signed_txn.rawTransaction)

    tx_receipt = w3.eth.getTransactionReceipt(result)

    count = 0
    while tx_receipt is None and (count < 30):
        time.sleep(10)
        tx_receipt = w3.eth.getTransactionReceipt(result)
        print(tx_receipt)
        
    if tx_receipt is None:
            return {'status': 'failed', 'error': 'timeout'}
        
    return {'status': 'added', 'tx_receipt': tx_receipt}

        


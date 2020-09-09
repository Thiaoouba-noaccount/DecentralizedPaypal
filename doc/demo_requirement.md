# Simple buy and sell process.





## assumption: 

1. user has some USDT in Metamask/Scatter wallet.

2. actions associated with relay buying/selling 'EOS' are manual work.

3. both relay and trader can confirm the trade according to fact, if one of them cheat, the case will be escalated to 'DCI' holders for mediation. 

4. a website for user to login and connect to their own wallet.



## buy process

place a buy order to buy  'EOS', specify price and volume.

- the order can show up, with a button aside 'take the order', order is sent to DB:
    - UUID for order number

    - coin type

    - stable coin type

    - side

    - volume

    - done volume

    - remained volume

    - time stamp

    - trader's wallet address

    - trader's EOS wallet address


- the amount of USDT is sent to the smart contract.

- the contract should have the order details.


- another user can login, take the order and relay to a crypto exchange.

- database is updated:
  - taken volume
  - trader's wallet address

- send message to the smart contract.
- the smart contract should update the order associated with this msg.sender.
- use API provided by the crypto exchange, send order( manual in demo ).
- update the order status as 'taken' and taken volume.
- trader can see who takes the order and how many.

after the order gets traded,  it shows correct status. Relay sends 'completed' button, trader sends 'confirmed'.

- relay sends 'EOS' to the trader's wallet.
- on receiving of relay's message, contract will issue an event to trader.
- trader confirms for individual relay is sent to contract.
- on receiving confirmation from trader, contract sends deposit USDT to relays.
- order is inactive.


## sell process

place a sell order to sell the 'EOS' bought in the former process.

- the contract should have the 'EOS' volume, the coin type, and msg.sender.

- the 'EOS' wallet address should be sent to contract as well.

- the order can show up, with a button aside 'take the order' and these are stored in DB.

  - UUID for order number
  - coin type
  - stable coin type
  - side
  - volume
  - done volume
  - remained volume
  - time stamp
  - trader's wallet address
  - trader's EOS wallet address

another user can login, take the order and relay to a crypto exchange.

- send message to the smart contract to deposit the amount of USDT for this order.

- the smart contract should update the order associated with this msg.sender.

- receiving the deposit, smart contract should notify trader to send the amount of 'EOS'  to the relay.

- update the order status as 'taken' and taken volume.

- trader can see who takes the order and how many.

- relay should notify the trader his/her EOS wallet address.

- trader sends EOS to relay's wallet.

- relay waits until trader's EOS arrives.

- relay sells EOS to crypto exchange.


after the order gets traded, it shows correct status.

- relay sends message to the smart contract to indicate the amount of order filled.
- on receiving the relay's message, contract releases the amount of USDT to trader.


#### 


# Key technical points

## UI interface function and database 

- [ ] login using  metamask wallet.
- [ ] login with scatter wallet.
- [ ] render and DB.
- [ ] transfer 'EOS' using crypto exchange API.
- [ ] auto check if 'EOS' has arrived the account.



## smart contract 

- [ ] Using Ganache or Metamask? Remix or truffle?
- [ ] using web3 to call 'USDT' contract to transfer token to this contract.
- [ ] order signature verification
- [ ] link USDT deposited by trader to a UUID ( order id ).
- [ ] map UUID to order structure.
- [ ] release 'USDT' out from this contract according to UUID.
- [ ] get 'EOS' wallet address from scatter wallet.
- [ ] arbitration mechanism if anyone cheats.

## solutions for realistic issue 

- [ ] how if trader want to amend/cancel a order when the order has been taken?
      - it is possible the relay does not go to any exchange, but use their own coins.
      - if the order goes to exchange, how can a trader authenrized to amend a relay's order?

- [ ] how can relay automatically notify trader the doneVol of an order.






Result to check

1. How convenient this system would be?
2. How much gas would be exhausted in Ethereum in the transaction?
3. How much exchange fee would be charged ?
4. How much transfer fee would be for target coin ( variable depending on different blockchain)? 


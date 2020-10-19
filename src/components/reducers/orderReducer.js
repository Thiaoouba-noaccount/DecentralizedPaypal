import { PAY_TO_CONTRACT,WITHDRAW,PENDING_PAYMENT,RELEASE_PAYMENT,
    ACTIVE_PAYMENT,ENABLE_REFUND,REFUND,GET_PAYER,GET_PAYEE,GET_STATE,COIN_SELECTED } from '../actions/action-types/order-actions'

import { PaypalContract } from '../../contracts-api'


const initState = {
    coins: [
        {type:'usdt', desc: "USDT", addr:'0xc09E62C5c30644dce152B3fDcAFe7b8C86bc6719',abi:'Usdt.json'},
        {type:'dai', desc: "DAI", addr:'0x96c54F2A5C3dE2fF5F1a1627EaEf2A1Ec88c9FD5',abi:'Dai.json'},
        {type:'usdc', desc: "USDC", addr:'0xc09E62C5c30644dce152B3fDcAFe7b8C86bc6719',abi:'Usdc.json'}
    ],
    coin_select:'usdt',
    orderid: 1,
    price: 1000,
    //payer: '0x438269EBf0fa37fba49BBf2056Ce8A01a859a6E9',
    recipient: '0x32b410a236760F5c0831Bd0D14184E9a0a49bDb0',
    arbitrator: '0x438269EBf0fa37fba49BBf2056Ce8A01a859a6E9',
    orderStatus: 'Active'

}
const orderReducer=  (state = initState,action)=>{
    const status = ['Active', 'Refunding', 'Pending', 'Releasing','Closed'];
    switch (action.type) {

      case PAY_TO_CONTRACT:
        let coin_address = state.coins.find(coin=>coin.type===action.coin_select)
        coin_address = coin_address.addr
        console.log("recipient:",action.recipient)
        let result = (new PaypalContract())
                      .payToContract(coin_address,action.recipient,action.price,action.id)
                      .then(() => (new PaypalContract()).getDeposit(action.id))
            console.log("deposited:",result)
            return{
                ...state,
                coin_select: action.coin_select,
                recipient: action.recipient,
                price: action.price,
                orderid: action.id,
                orderStatus:status[0]
            }

      case WITHDRAW:
        (new PaypalContract()).withdraw(action.id)
        return{
            ...state,
            orderStatus:status[4]
        }
    
      case PENDING_PAYMENT:
       (new PaypalContract())
                    .pendingPayment(action.id)
                    .then(() => (new PaypalContract()).getState(action.id))
                    .then(function(e) {
                        console.log("status in orderReducer:",status[e])
                        return{
                          ...state,
                          orderStatus: status[2]
                        }
                    })
        return state

      case RELEASE_PAYMENT:
        
        var e = (new PaypalContract())
                    .releasePayment(action.id)
                    .then(() => (new PaypalContract()).getState(action.id))
        console.log("status in orderReducer:",status[e])
        return{
                ...state,
                orderStatus:status[3]
              }
        
    
      case ACTIVE_PAYMENT:
        (new PaypalContract())
                    .activePayment(action.id)
                    .then(() => (new PaypalContract()).getState(action.id))
                    .then(function(e) {
                                      console.log("status in orderReducer:",status[e])
                                      return{
                                        ...state,
                                        orderStatus: status[e]
                                      }
                    })
        return state

      case ENABLE_REFUND:
        (new PaypalContract())
                    .enableRefund(action.id)
                    .then(() => (new PaypalContract()).getState(action.id))
                    .then(function(e) {
                                      console.log("status in orderReducer:",status[e])
                                      return{
                                        ...state,
                                        orderStatus: status[e]
                                      }
                    })
        return{
                ...state,
                orderStatus:status[1]
              }

      case REFUND:
        (new PaypalContract()).refund(action.id)
        return{
            ...state,
            orderStatus:status[4]
        }

      case COIN_SELECTED:
        return{
                ...state,
                coin_select: action.coinType
            }
      
      default:
        return state
  }
    
}

export default orderReducer

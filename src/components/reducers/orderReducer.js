import { PAY_TO_CONTRACT,WITHDRAW,PENDING_PAYMENT,RELEASE_PAYMENT,
    ACTIVE_PAYMENT,ENABLE_REFUND,REFUND,GET_PAYER,GET_PAYEE,GET_STATE,COIN_SELECTED } from '../actions/action-types/order-actions'



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
    orderStatus: null,
    lastStatus:null

}
const orderReducer=  (state = initState,action)=>{
    const status = ['Active', 'Refunding', 'Pending', 'Releasing','Closed'];  

    switch (action.type) {

      case `${PAY_TO_CONTRACT}_PENDING`:
      case `${WITHDRAW}_PENDING`:
      case `${PENDING_PAYMENT}_PENDING`:
      case `${RELEASE_PAYMENT}_PENDING`:
      case `${ACTIVE_PAYMENT}_PENDING`:
      case `${ENABLE_REFUND}_PENDING`:
      case `${REFUND}_PENDING`:
        console.log("ENABLE_REFUND Pending")
        console.log("pending",action.meta)
        return{
            ...state,
            orderStatus:'Progressing...'
          }

      case `${PAY_TO_CONTRACT}_REJECTED`:
        console.log("_REJECTED",action.meta)
        return{
            ...state,
            orderStatus: null
          }

      case `${WITHDRAW}_REJECTED`:
      case `${PENDING_PAYMENT}_REJECTED`:
      case `${RELEASE_PAYMENT}_REJECTED`:
      case `${ACTIVE_PAYMENT}_REJECTED`:
      case `${ENABLE_REFUND}_REJECTED`:
      case `${REFUND}_REJECTED`:
        console.log("_REJECTED",action.meta)
        return{
            ...state,
            orderStatus: state.lastStatus
          }

      case `${PAY_TO_CONTRACT}_FULFILLED`:
        console.log("_FULFILLED",action.meta.id)
        return {
          ...state,
          orderStatus: status[0],
          recipient: action.meta.recipient,
          price: action.meta.price,
          orderid: action.meta.id,
          lastStatus:status[0]
        };


      
      case `${WITHDRAW}_FULFILLED`:
      case `${REFUND}_FULFILLED`:
        return{
            ...state,
            orderStatus:status[4]
          }

      
      case `${PENDING_PAYMENT}_FULFILLED`:
      case `${RELEASE_PAYMENT}_FULFILLED`:
      case `${ACTIVE_PAYMENT}_FULFILLED`:
      case `${ENABLE_REFUND}_FULFILLED`:
        console.log("_FULFILLED",action.meta)
        
        return{
            ...state,
            orderid: action.meta,
            orderStatus:status[action.payload],
            lastStatus:status[action.payload]
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

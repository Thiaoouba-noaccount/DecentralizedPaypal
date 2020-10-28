
import { PAY_TO_CONTRACT,WITHDRAW,PENDING_PAYMENT,RELEASE_PAYMENT,
    ACTIVE_PAYMENT,ENABLE_REFUND,REFUND,GET_PAYER,GET_PAYEE,GET_STATE,COIN_SELECTED
} from './action-types/order-actions'

import { PaypalContract } from '../../contracts-api'



//add order action
export const payToContract= (coin_address,recipient,price,id)=>{
    console.log("orderid in payToContract",id)
    return{
        type: PAY_TO_CONTRACT,
        payload: (new PaypalContract())
                .payToContract(coin_address,recipient,price,id)
                .then(() => (new PaypalContract()).getDeposit(id)),
        
        meta: {

            id:id,
            recipient:recipient,
            price:price
        }
                
    }
}

export const withdraw=(id)=>{
    return{
        type: WITHDRAW,
        payload: (new PaypalContract()).withdraw(id),
        meta: id
    }
}

export const pendingPayment=(id)=>{
    return{
        type: PENDING_PAYMENT,
        payload: (new PaypalContract())
                .pendingPayment(id)
                .then(() => (new PaypalContract()).getState(id)),
        meta:id
    }
}

export const releasePayment=(id)=>{
    console.log("order_id in orderActions:",id)
    return{
        type: RELEASE_PAYMENT,
        payload: (new PaypalContract())
                .releasePayment(id)
                .then(() => (new PaypalContract()).getState(id)),
        meta:id
    }
}

export const activePayment=(id)=>{
    return{
        type: ACTIVE_PAYMENT,
        payload: (new PaypalContract())
                .activePayment(id)
                .then(() => (new PaypalContract()).getState(id)),
        meta:id
    }
}

export const enableRefund=(id)=>{
    console.log("enableRefund")
    console.log('id=',id)
    return{
        type: ENABLE_REFUND,
        payload: (new PaypalContract())
                .enableRefund(id)
                .then(() => (new PaypalContract()).getState(id)),
        meta:id
    }
}


export const refund=(id)=>{
    return{
        type: REFUND,
        payload: (new PaypalContract()).refund(id),
        meta:id
    }
}


export const getPayer=(id)=>{
    return{
        type: GET_PAYER,
        id
    }
}

export const getPayee=(id)=>{
    return{
        type: GET_PAYEE,
        id
    }
}

export const getState=(id)=>{
    return{
        type: GET_STATE,
        id
    }
}

export const coinSelected=(coinType)=>{
    return{
        type: COIN_SELECTED,
        coinType
    }
}


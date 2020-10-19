
import { PAY_TO_CONTRACT,WITHDRAW,PENDING_PAYMENT,RELEASE_PAYMENT,
    ACTIVE_PAYMENT,ENABLE_REFUND,REFUND,GET_PAYER,GET_PAYEE,GET_STATE,COIN_SELECTED
} from './action-types/order-actions'



//add order action
export const payToContract= (coin_select,recipient,price,id)=>{
    return{
        type: PAY_TO_CONTRACT,
        coin_select,
        recipient,
        price,
        id
    }
}

export const withdraw=(id)=>{
    return{
        type: WITHDRAW,
        id
    }
}

export const pendingPayment=(id)=>{
    return{
        type: PENDING_PAYMENT,
        id
    }
}

export const releasePayment=(id)=>{
    console.log("order_id in orderActions:",id)
    return{
        type: RELEASE_PAYMENT,
        id
    }
}

export const activePayment=(id)=>{
    return{
        type: ACTIVE_PAYMENT,
        id
    }
}

export const enableRefund=(id)=>{
    return{
        type: ENABLE_REFUND,
        id
    }
}


export const refund=(id)=>{
    return{
        type: REFUND,
        id
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


import React, { Component } from 'react'
import { connect } from 'react-redux'
import { pendingPayment,releasePayment,activePayment,enableRefund,refund, withdraw} from './actions/orderActions'


class Order extends Component{

    
    handlePending = (id)=>{
        this.props.pendingPayment(id);
    }
 
    handleRelease = (id)=>{
        console.log("order_id in order:",id)
        this.props.releasePayment(id);
    }
 
    handleActive = (id)=>{
        this.props.activePayment(id);
    }

    handleEnableRefund = (id)=>{
        this.props.enableRefund(id);
    }

    handleRefund = (id)=>{
        this.props.refund(id);
    }

    handleWithdraw = (id)=>{
        this.props.withdraw(id);
    }

    render(){

        return(

            <div className="container">
                <div className="collection">
                    <li className="collection-item">
                            <h5>Order ID: {this.props.orderid}</h5>
                            <h5>Total Price: {this.props.price}</h5>
                            <h5>Payment Status: {this.props.orderStatus}</h5>
                            <h5>Payment actions:</h5>
                            <div class="btn-toolbar" >
                                <button className="btn btn-space" onClick={()=>{this.handlePending(this.props.orderid)}}>Pending</button>
                                <button className="btn btn-space" onClick={()=>{this.handleRelease(this.props.orderid)}}>Release</button>
                                <button className="btn btn-space" onClick={()=>{this.handleActive(this.props.orderid)}}>Active</button>
                                <button className="btn btn-space" onClick={()=>{this.handleEnableRefund(this.props.orderid)}}>EnableRefund</button>
                                <button className="btn btn-space" onClick={()=>{this.handleRefund(this.props.orderid)}}>Refund</button>
                                <button className="btn btn-space" onClick={()=>{this.handleWithdraw(this.props.orderid)}}>Withdraw</button>
                            </div>
                    </li>
                </div>

            </div>
        )
    }
              
        
}


const mapStateToProps = (state)=>{
    return{
        orderid: state.orderid,
        price: state.price,
        orderStatus: state.orderStatus
    }
}
const mapDispatchToProps = (dispatch)=>{
    return{
        pendingPayment: (id)=>{dispatch(pendingPayment(id))},
        releasePayment: (id)=>{dispatch(releasePayment(id))},
        activePayment: (id)=>{dispatch(activePayment(id))},
        enableRefund: (id)=>{dispatch(enableRefund(id))},
        refund: (id)=>{dispatch(refund(id))},
        withdraw: (id)=>{dispatch(withdraw(id))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Order)
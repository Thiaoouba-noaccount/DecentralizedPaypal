import React, { Component } from 'react'
import { connect } from 'react-redux'
import { coinSelected,payToContract } from './actions/orderActions'

 class Home extends Component{
    


    onChangeValue(event) {
        console.log("click")
        console.log(event.target.value);
        this.props.coinSelected(event.target.value);
    }

    confirm = () =>{
        this.props.payToContract(this.props.coin_select,this.props.recipient,this.props.price,this.props.orderid)
        this.props.history.push('/order')
    }

    render(){
        console.log('I was triggered during render')
        console.log(this.props.coin_select)
        return(

            <div className="container">
            <span className="title" style={{color:'red'}}><b>Order ID: </b>{this.props.orderid}</span>
            <p>
                <b>Movie ordered: Brave heart</b> 
            </p>
            <p><b>Total Price: {this.props.price}</b></p>

            <span className="title">Which stable coin do you prfer to pay:</span><br/>
            
                { this.props.coins.map( result =>{
                                return <label className="btn btn-primary active">
                                    <input type="radio" style ={{opacity:1}}
                                            name="coin" 
                                            value={result.type} 
                                            onChange={this.onChangeValue.bind(this)} 
                                            checked={result.type === this.props.coin_select} />
                                            <label style={{color:'red'}}>'         ' {result.desc}</label><br/>
                                    </label>
                                        })
                        }
                    <br/>
                    <div className="checkout">
                        <button className="waves-effect waves-light btn" onClick={this.confirm.bind(this)}>Checkout</button>
                    </div>
            </div>
        )
    }
}
const mapStateToProps = (state)=>{
    return {
      coin_select: state.coin_select,
      coins:state.coins,
      orderid: state.orderid,
      price: state.price,
      recipient:state.recipient
    }
  }
const mapDispatchToProps= (dispatch)=>{
    
    return{
        coinSelected: (coinType)=>{dispatch(coinSelected(coinType))},
        payToContract: (coin_select,recipient,price,id)=>{dispatch(payToContract(coin_select,recipient,price,id))}
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)
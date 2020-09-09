pragma solidity ^0.5.0;

import "./Ownable.sol";
import "./IERC20.sol";

// contract Stabletoken {
//     function transfer(address recipient, uint256 amount);
//     function allowance(address owner, address spender);
//     function transferFrom(address sender, address recipient, uint256 amount);

// }
contract Agent is Ownable {

    // event buyOrderSent(uint256 uuid, string baseAssetType, uint256 baseAssetAmount,address baseAssetAddr,string quoteAssetType,
    //                    uint256 quoteAssetAmount,string walletAddr,string walletMemo);

    // event buyOrderTaken(uint256 uuid,string walletAddr,string walletMemo);
    // event buyOrderConfirmed(uint256 uuid,address addr,uint256 filledAmount);

    event buyOrder(uint256 uuid, string baseAssetType, uint256 baseAssetAmount,address baseAssetAddr);

    //event buyOrderTaken(uint256 uuid);
    event buyOrderFilled(uint256 uuid,address addr,uint256 filledAmount);

    event sellOrder(uint256 uuid,string baseAssetType,uint256 baseAssetAmount,address baseAssetAddr);
    event SellTaken(uint256 uuid,uint256 takenAmount);
    event SellOrderFilled(uint256 uuid,uint256 filledAmount); 


    // struct Wallet {
    //     string addr;
    //     string memo;
    // }

    struct OrderTakenDetail {
        uint256 takenAmount;
        uint256 filledAmount;
        //Wallet relayWalllet;
    }

     
    
	struct Order {

        address trader;
        string baseAssetType;
        uint256 baseAssetAmount;
        address baseAssetAddr;  //stable coin token based on ERC20
        //string quoteAssetType;
        //uint256 quoteAssetAmount;
        //Wallet walletAddr;
        address[] relays;
        mapping (address => OrderTakenDetail) relayOrder; 

    } 

    mapping (uint256 => Order) private _orderDetail;

    //This is very important to ensure no one can mimic fake buy and sell order/confirm to steal money from this contract!
    mapping (address => uint256) private _deposit;

    function getDeposit(
        address addr
    ) 
        external
        view
        returns (uint256) 
    {
        return _deposit[addr];
    }

    function getFilledAmount(
        uint256 uuid,
        address sender
    )
        external
        view
        returns (uint256)
    {
        return _orderDetail[uuid].relayOrder[sender].filledAmount;
    }


	function buyOrderSent(
        uint256 uuid, 
        string memory baseAssetType,
        uint256 baseAssetAmount,
        address baseAssetAddr)
        //string quoteAssetType,
        //uint256 quoteAssetAmount,
        //string walletAddr,
        //string walletMemo
        public 
        returns (bool) 
    {
  		
  		_orderDetail[uuid].trader = msg.sender;
        _orderDetail[uuid].baseAssetType = baseAssetType;
        _orderDetail[uuid].baseAssetAmount = baseAssetAmount;
        _orderDetail[uuid].baseAssetAddr = baseAssetAddr;
        //orderDetail[uuid].quoteAssetType = quoteAssetType;
        //orderDetail[uuid].quoteAssetAmount = quoteAssetAmount;
        //orderDetail[uuid].walletAddr.addr = walletAddr; 

        
        IERC20 stableConotract = IERC20(baseAssetAddr);
        require (stableConotract.allowance(msg.sender,address(this))>=baseAssetAmount);
        _deposit[msg.sender] = _deposit[msg.sender]+baseAssetAmount;
        stableConotract.transferFrom(msg.sender,address(this),baseAssetAmount);
        
        //buyOrderSent(uuid,baseAssetType,baseAssetAmount,baseAssetAddr,quoteAssetType,quoteAssetAmount,
        //            walletAddr,walletMemo);
        emit buyOrder(uuid,baseAssetType,baseAssetAmount,baseAssetAddr);

  		return true;
	}

    function sellOrderSent(
        uint256 uuid,
        string memory baseAssetType,
        uint256 baseAssetAmount,
        address baseAssetAddr
        //string quoteAssetType,
        //uint256 quoteAssetAmount,
        //string walletAddr,
        //string walletMemo
    ) 
        public 
        returns (bool) 
    {
        
        _orderDetail[uuid].trader = msg.sender;
        _orderDetail[uuid].baseAssetType = baseAssetType;
        _orderDetail[uuid].baseAssetAmount = baseAssetAmount;
        _orderDetail[uuid].baseAssetAddr = baseAssetAddr;
        //orderDetail[uuid].quoteAssetType = quoteAssetType;
        //orderDetail[uuid].quoteAssetAmount = quoteAssetAmount;
        //orderDetail[uuid].walletAddr.addr = walletAddr; 
        emit sellOrder(uuid,baseAssetType,baseAssetAmount,baseAssetAddr);
        return true;
    }



	// function buyOrderTaken(
 //        uint256 uuid,
 //        string walletAddr,
 //        string walletMemo
 //    ) 
 //        public 
 //        returns (bool) 
 //    {
 //        orderDetail[uuid].relays.push(msg.sender);
 //  		orderDetail[uuid].relayOrder[msg.sender].filledAmount = 0;
 //        orderDetail[uuid].relayOrder[msg.sender].relayWalllet.addr = walletAddr;
 //        orderDetail[uuid].relayOrder[msg.sender].relayWalllet.memo = walletMemo;

 //        buyOrderTaken(uuid,walletAddr,walletMemo);
 //        return true;
	// }

    function SellOrderTaken(
        uint256 uuid,
        //string quoteAssetType,
        uint256 takenAmount
        //string walletAddr,
        //string walletMemo
    ) 
        public 
        returns (bool) 
    {
        //orderDetail[uuid].relays.push(msg.sender);
        _orderDetail[uuid].relayOrder[msg.sender].takenAmount =takenAmount;
        //orderDetail[uuid].relayOrder[msg.sender].relayWalllet.addr = walletAddr;
        //orderDetail[uuid].relayOrder[msg.sender].relayWalllet.memo = walletMemo;

        // uint256 baseAssetType = orderDetail[uuid].baseAssetType;
        // uint256 baseAssetAmount = orderDetail[uuid].baseAssetAmount;

        address baseAssetAddr=_orderDetail[uuid].baseAssetAddr;
        //orderDetail[uuid].quoteAssetType = quoteAssetType;
        //orderDetail[uuid].quoteAssetAmount = quoteAssetAmount;

        IERC20 stableContract = IERC20(baseAssetAddr);
        require (stableContract.allowance(msg.sender,address(this))>=takenAmount);
        _deposit[msg.sender] = _deposit[msg.sender]+takenAmount;
        stableContract.transferFrom(msg.sender,address(this),takenAmount);

        emit SellTaken(uuid,takenAmount);
        return true;
    }

    function buyOrderConfirmed(
        uint256 uuid,
        address addr,
        uint256 filledAmount
    ) 
        public 
        returns (bool) 
    {
        if (_orderDetail[uuid].trader==msg.sender)
        {
            require(_orderDetail[uuid].relayOrder[addr].filledAmount == filledAmount);
            //uint256 amountTransfer = orderDetail[uuid].baseAssetAmount*filledAmount/orderDetail[uuid].quoteAssetAmount
            delete _orderDetail[uuid].relayOrder[addr];
            require (_deposit[msg.sender]>=filledAmount);
            address baseAssetAddr = _orderDetail[uuid].baseAssetAddr;
            IERC20 stableConotract = IERC20(baseAssetAddr);
            require (stableConotract.balanceOf(address(this))>=filledAmount);
            _deposit[msg.sender] = _deposit[msg.sender] -filledAmount;
            stableConotract.transfer(addr,filledAmount);
        }
        else
        {
            _orderDetail[uuid].relayOrder[msg.sender].filledAmount = filledAmount;
            

        }


        return true;
    }

    function SellOrderConfirmed(
        uint256 uuid,
        uint256 filledAmount
    ) 
        public 
        returns (bool) 
    {
        address baseAssetAddr = _orderDetail[uuid].baseAssetAddr;
        require( _orderDetail[uuid].relayOrder[msg.sender].takenAmount ==filledAmount);
        require (_deposit[msg.sender]>=filledAmount);
        delete _orderDetail[uuid].relayOrder[msg.sender];
        IERC20 stableConotract = IERC20(baseAssetAddr);
        require (stableConotract.balanceOf(address(this))>=filledAmount);
        _deposit[msg.sender] = _deposit[msg.sender] -filledAmount;
        stableConotract.transfer(_orderDetail[uuid].trader,filledAmount);
        emit SellOrderFilled(uuid,filledAmount); 
        return true;
    }

    function close(address payable _payee) public onlyOwner { //onlyOwner is custom modifier
        selfdestruct(_payee);  // `owner` is the owners address
    }

}
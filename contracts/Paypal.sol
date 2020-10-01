pragma solidity ^0.5.0;

//import "openzeppelin-solidity/contracts/math/SafeMath.sol";
import "openzeppelin-solidity/contracts/ownership/Secondary.sol";
import "openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "openzeppelin-solidity/contracts/token/ERC20/SafeERC20.sol";
import "./ArbitratorRole.sol";
 /**
  * Decentralized Paypal contract
    for test purpose, these two stable coins token addresses are used:
    0xc09E62C5c30644dce152B3fDcAFe7b8C86bc6719  USDT
    0x96c54F2A5C3dE2fF5F1a1627EaEf2A1Ec88c9FD5  DAI
  */



contract Paypal is Secondary,ArbitratorRole{

    using SafeERC20 for IERC20;
    //using SafeMath for uint256;
    /*
    Active means seller can withdraw upon expired;
    Refunding means buyer can refund;
    Pending means both buyer and seller cannot claim the fund;
    */
    enum State { Active, Refunding, Pending, Releasing}


    mapping(address => uint256) private _deposits;

    event Deposited(uint orderid, address payer, address recipient, uint256 amount);
    event Withdraw(uint orderid, address  recipient, uint256 amount);
    event Refund(uint orderid,address  payer,uint256 amount);
    event ReleaseFund(uint orderid);
    event PendingFund(uint orderid);
    event ActiveFund(uint orderid);
    event EnableRefund(uint orderid);
    event ArbitratorWithdraw(address sender, uint256 payment);

    struct Order {

        address _payee;
        address _payer;
        uint256 _expiryTime;
        uint256 _amount;
        IERC20 _token;
        State _state;
        
    } 

    mapping (uint256 => Order) private _orderDetail;

    function depositsOf(uint orderid) public view returns (uint256) {
        return _orderDetail[orderid]._amount;
    }

    function payee(uint orderid) public view returns (address) {
        return _orderDetail[orderid]._payee;
    }


    function payer(uint orderid) public view returns (address) {
        return _orderDetail[orderid]._payer;
    }

    function expire(uint orderid) public view returns (uint256) {
        return _orderDetail[orderid]._expiryTime;
    }

    function state(uint orderid) public view returns (State) {
        return _orderDetail[orderid]._state;
    }

    function setExpiryDate(uint orderid,uint256 expiry) public {
        _orderDetail[orderid]._expiryTime = expiry;
    }


    /**
     * for Arbitrator to deposit ETH
     */
    function () external payable {

        _deposits[msg.sender]=_deposits[msg.sender]+msg.value;
    }

    function arbitratorWithdraw() external payable {

        uint256 payment = _deposits[msg.sender];

        _deposits[msg.sender] = 0;

        msg.sender.transfer(payment);

        emit ArbitratorWithdraw(msg.sender, payment);
    }
    /**
     * @dev Stores the sent amount as credit to be withdrawn.
     * @param recipient The destination address of the funds.
     */
    function deposit(address token,address recipient,uint256 amount,uint orderid) public returns (bool)  {
        IERC20 stableCoin = IERC20(token);
        require (stableCoin.allowance(msg.sender,address(this)) >=amount,"allowance must larger than deposit!");
        _orderDetail[orderid]._amount = amount;
        _orderDetail[orderid]._payee = recipient;
        _orderDetail[orderid]._payer = msg.sender;
        _orderDetail[orderid]._token = stableCoin;
        _orderDetail[orderid]._state = State.Active;
        //IERC20(token).safeTransferFrom(msg.sender,address(this),amount);
        //uint256 sendBalance = stableCoin.balanceOf(msg.sender);
        stableCoin.safeTransferFrom(msg.sender,address(this),amount);
        emit Deposited(orderid,msg.sender,recipient,amount);
        return true;
    }

    function releaseFund(uint orderid) public  {
        require (_orderDetail[orderid]._payer ==msg.sender);
        _orderDetail[orderid]._state = State.Releasing;
        emit ReleaseFund(orderid);
    }

    function pendingFund(uint orderid) public {
        require (_orderDetail[orderid]._payer ==msg.sender);
        _orderDetail[orderid]._state = State.Pending;
        emit PendingFund(orderid);
    }

    function activeFund(uint orderid) public onlyArbitrator {
        _orderDetail[orderid]._state = State.Active;
        emit ActiveFund(orderid);
    }

     function enableRefund(uint orderid) public onlyArbitrator {
        _orderDetail[orderid]._state = State.Refunding;
        emit EnableRefund(orderid);
    }


    function refund(uint orderid) public {
        require(_orderDetail[orderid]._state == State.Refunding, "refund: buyer can only get refund while refunding");
        address recipient = _orderDetail[orderid]._payer;
        uint256 payment = _orderDetail[orderid]._amount;
        IERC20 token = _orderDetail[orderid]._token;
        delete _orderDetail[orderid];
        token.safeTransfer(recipient,payment);
        emit Refund(orderid, recipient,payment);
    }
    /**
     * @dev Withdraw accumulated balance for a recipient.
     */
    function withdraw(uint orderid) public  {
        require(block.timestamp >= _orderDetail[orderid]._expiryTime,"withdraw: seller can only withdraw after time out");
        require(_orderDetail[orderid]._state == State.Releasing||_orderDetail[orderid]._state ==State.Active,"withdraw: need active or releasing");
        uint256 payment = _orderDetail[orderid]._amount;
        IERC20 token = _orderDetail[orderid]._token;
        address recipient = _orderDetail[orderid]._payee;
        delete _orderDetail[orderid];
        token.safeTransfer(recipient,payment);
        emit Withdraw(orderid,recipient,payment);
    }



}

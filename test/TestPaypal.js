const assert = require('assert');
const Paypal = artifacts.require('Paypal.sol');
//mock stable coin's ABI in json file
const usdc_contract = artifacts.require('Usdt');
//need to install truffle-assertions
const truffleAssert = require('truffle-assertions'); 

contract('Dencentralized paypal test', async accounts => {
    var paypal,usdc;
    var USDC_ADDRESS = '0xBa67F0c2CC12E27266822D69b43E3895dAeD8899';
    var account_one = accounts[0]; //buyer's account
    var account_two = accounts[1]; //seller's account
    var account_three = accounts[2]; //arbitrator's account
    var order_id = 1;

    beforeEach(async () => {
        usdc = await usdc_contract.at(USDC_ADDRESS);
        paypal = await Paypal.deployed();

        //buy order created

        await usdc.approve(paypal.address,1000,{from: account_one});

        let allowed = await usdc.allowance(account_one,paypal.address);
        assert.equal(allowed,1000);

        let contractBalanceB4 = await usdc.balanceOf(paypal.address);
        await paypal.deposit(USDC_ADDRESS,account_two,1000,order_id,{ from: account_one });
        await paypal.setExpiryDate(order_id,0,{ from: account_one });
        let contractBalanceAft = await usdc.balanceOf(paypal.address);
        assert.equal(contractBalanceAft-contractBalanceB4,1000);
            

    });


    it("should be withdrawn by seller!", async () => { 
        await paypal.releaseFund(order_id,{ from: account_one });

        let status = await paypal.state(order_id);
        assert.equal(status,3);

        let contractBalanceB4 = await usdc.balanceOf(account_two);
        await paypal.withdraw(order_id,{ from: account_two });
        let contractBalanceAft = await usdc.balanceOf(account_two);

        assert.equal(contractBalanceAft-contractBalanceB4,1000);
        
    });

    it("should not be withdrawn by seller before expiry!", async () => { 
        let time = 1601424000;

        await paypal.setExpiryDate(order_id,time,{ from: account_one });

        let status = await paypal.state(order_id);
        assert.equal(status,0);

        await truffleAssert.fails(
            paypal.withdraw(order_id,{ from: account_two }),
            truffleAssert.ErrorType.REVERT,
            "withdraw: seller can only withdraw after time out"
        );
    
        
    });


    it("should not be withdrawn by seller in pending status!", async () => { 
        await paypal.pendingFund(order_id,{ from: account_one });

        let status = await paypal.state(order_id);
        assert.equal(status,2);

        await truffleAssert.fails(
            paypal.withdraw(order_id,{ from: account_two }),
            truffleAssert.ErrorType.REVERT,
            "withdraw: need active or releasing"
        );

    });

    it("should not be withdrawn by seller in refunding status!", async () => { 
        await paypal.enableRefund(order_id,{ from: account_one });

        let status = await paypal.state(order_id);
        assert.equal(status,1);

        await truffleAssert.fails(
            paypal.withdraw(order_id,{ from: account_two }),
            truffleAssert.ErrorType.REVERT,
            "withdraw: need active or releasing"
        );

    });


    it("should be withdrawn by buyer in refunding status!", async () => { 
        await paypal.enableRefund(order_id,{ from: account_one });

        let status = await paypal.state(order_id);
        assert.equal(status,1);

        await paypal.refund(order_id,{ from: account_one });
        //bignumber calculation, truffle can only handle up to 53 bits.
    });




});


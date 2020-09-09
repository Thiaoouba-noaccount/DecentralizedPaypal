const assert = require('assert');
const Agent = artifacts.require('Agent.sol');
const usdc_contract = artifacts.require('Stabletoken');

contract('BuyOrder', async accounts => {
    var agent,usdc;
    var USDC_ADDRESS = '0xEEF05CB4BfBeF3D0FaB714629d71ffB891E9B8Ec';
    var account_one = accounts[0];
    var account_two = accounts[1];
    var account_three = accounts[2];
    var order_id = 1;

    before(async () => {
        usdc = await usdc_contract.at(USDC_ADDRESS);
        agent = await Agent.deployed();

        //buy order created

        await usdc.approve(agent.address,1000,{from: account_one});

        let allowed = await usdc.allowance(account_one,agent.address);
        assert.equal(allowed,1000);
        
        await agent.buyOrderSent(order_id,'USDC',1000,USDC_ADDRESS,{ from: account_one });

        let depositAmount = await agent.getDeposit(account_one);
        assert.equal(depositAmount,1000);

        let contractBalance = await usdc.balanceOf(agent.address);
        assert.equal(contractBalance,1000);


        //buy order confirmed from relayer
        let uuid = order_id;
        let filledAmount = 400;

        await agent.buyOrderConfirmed(uuid,account_two,filledAmount,{from: account_two});
        await console.log(uuid);
        await console.log(account_two);
        let confirmedAmount = await agent.getFilledAmount(uuid,account_two);
        assert.equal(confirmedAmount,400);

        filledAmount =600;
        await agent.buyOrderConfirmed(uuid,account_two,filledAmount,{from: account_three});
        confirmedAmount = await agent.getFilledAmount(uuid,account_three);
        assert.equal(confirmedAmount,600);

    });


    it("should buy order confirmed from trader", async () => {
        let uuid = order_id;
        let filledAmount = 400;

        let account_two_balance_B4 = await usdc.balanceOf(account_two);

        await agent.buyOrderConfirmed(uuid,account_two,filledAmount,{from: account_one});
        let depositAmount = await agent.getDeposit(account_one);
        assert.equal(depositAmount,600);
        let account_two_balance_Aft = await usdc.balanceOf(account_two);
        assert.equal(account_two_balance_Aft-account_two_balance_B4,400);


        let contractBalance = await usdc.balanceOf(agent.address);
        assert.equal(contractBalance,600);


        filledAmount = 600;
        let account_three_balance_b4 = await usdc.balanceOf(account_three);
        await agent.buyOrderConfirmed(uuid,account_three,filledAmount,{from: account_one});
        depositAmount = await agent.getDeposit(account_one);
        assert.equal(depositAmount,0);
        let account_three_balance_aft = await usdc.balanceOf(account_three);

        let account_three_balance =account_three_balance_aft-account_three_balance_b4
        assert.equal(account_three_balance,600);
        contractBalance = await usdc.balanceOf(agent.address);
        assert.equal(contractBalance,0);
        
    });
});



contract('SellOrder', async accounts => {
    let agent,usdc;
    let USDC_ADDRESS = '0xEEF05CB4BfBeF3D0FaB714629d71ffB891E9B8Ec';
    let account_one = accounts[0];
    let account_two = accounts[1];
    let account_three = accounts[2];
    let order_id = 2;


    before(async () => {
        usdc = await usdc_contract.at(USDC_ADDRESS);
        agent = await Agent.deployed();

        //sell order create

        await agent.sellOrderSent(order_id,'USDC',1000*10**10,USDC_ADDRESS, { from: account_one });
        

        //sell order taken by account_two

        let uuid = order_id;
        let takenAmount = 400*10**10;

        //transfer enough tokens to account two
        await usdc.transfer(account_two,takenAmount);


        await usdc.approve(agent.address,takenAmount,{from:account_two});
        let allowed = await usdc.allowance(account_two,agent.address);
        assert.equal(allowed,takenAmount);
        
        await agent.SellOrderTaken(uuid,takenAmount,{from: account_two});

        let depositAmount = await agent.getDeposit(account_two);
        assert.equal(depositAmount,takenAmount);

        let contractBalance = await usdc.balanceOf(agent.address);
        assert.equal(contractBalance,takenAmount);


        //sell order taken by account_three
        takenAmount = 600*10**10;

        //transfer enough tokens to account two
        await usdc.transfer(account_three,takenAmount);


        await usdc.approve(agent.address,takenAmount,{from:account_three});
        allowed = await usdc.allowance(account_three,agent.address);
        assert.equal(allowed,takenAmount);
        
        await agent.SellOrderTaken(uuid,takenAmount,{from: account_three});

        depositAmount = await agent.getDeposit(account_three);
        assert.equal(depositAmount,takenAmount);

        contractBalance = await usdc.balanceOf(agent.address);
        assert.equal(contractBalance,1000*10**10);

    });




    it("should sell order confirmed by account_two", async () => {
        let uuid = order_id;
        let filledAmount = 400*10**10;


        let traderBalance_b4 = await usdc.balanceOf(account_one);

        await agent.SellOrderConfirmed(uuid,filledAmount,{from: account_two});
        
        let depositAmount = await agent.getDeposit(account_two);
        assert.equal(depositAmount,0);


        let traderBalance_aft = await usdc.balanceOf(account_one);
    

        let diff = (traderBalance_aft-traderBalance_b4)/filledAmount;
        assert.equal(Math.round(diff),1);

        let contractBalance = await usdc.balanceOf(agent.address);
        assert.equal(Math.round(contractBalance/(600*10**10)),1);

    });

    it("should sell order confirmed by account_three", async () => {
        let uuid = order_id;
        let filledAmount = 600*10**10;

        let traderBalance_b4 = await usdc.balanceOf(account_one);


        await agent.SellOrderConfirmed(uuid,filledAmount,{from: account_three});
        
        let depositAmount = await agent.getDeposit(account_three);
        assert.equal(depositAmount,0);

        let traderBalance_aft = await usdc.balanceOf(account_one);

        await console.log('order confirmed:',traderBalance_aft-traderBalance_b4);

        let diff = (traderBalance_aft-traderBalance_b4)/filledAmount;

        assert.equal(Math.round(diff),1);

        let contractBalance = await usdc.balanceOf(agent.address);

        await console.log('contract balance:',contractBalance);
        assert.equal(contractBalance,0);

    });


});

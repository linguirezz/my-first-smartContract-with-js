const { assert, expect } = require("chai");
const { deployments, ethers, getNamedAccounts } = require("hardhat");

describe("FundMe Contract test", function () {
    let deployer;
    let fundMe;
    let mockV3Aggregator;
    let signer
    let FundMeAddress
    let MockV3Aggregator
    const ethValue = ethers.parseEther("1")
    beforeEach(async () => {
        console.log("deploying all the contracts");
        deployer = (await getNamedAccounts()).deployer;
        await deployments.fixture(["all"]);
         signer = await ethers.getSigner(deployer)       
          FundMeAddress = (await deployments.get("FundMe")).address;
         console.log(FundMeAddress);
          MockV3AggregatorAddress = (await deployments.get("MockV3Aggregator")).address;
         console.log(MockV3AggregatorAddress);
        fundMe = await ethers.getContractAt("FundMe", FundMeAddress, signer);
        mockV3Aggregator = await ethers.getContractAt("MockV3Aggregator",MockV3AggregatorAddress, signer);
        console.log("deploy selesai");
    });

    describe("constructor", function () {
        it("should have the same address as mockV3Aggregator's address", async () => {
            try {
                console.log("test 1")
                const response = await fundMe.getPriceFeed();
            assert.equal(response, ((await deployments.get("MockV3Aggregator")).address));    
            } catch (error) {
                console.error(error)
            }
           
        });
    });
    describe("fund function",function(){
        
        it("if ether values is not more than the bare minimum it will return error",async()=>{
            await expect(fundMe.fund()).to.be.revertedWith("You need to spend more ETH!")
        })
        it("Updates the amount funded data structure",async()=>{
            await fundMe.fund({value:ethValue})
            const funderAmount = await fundMe.getAddressToAmountFunded(deployer)
            assert.equal(funderAmount,ethValue)
        })
        it("update the list of funder",async()=>{
            await fundMe.fund({value:ethValue})
            const funderAddress = await fundMe.getFunder(0)
            assert.equal(deployer.toString(),funderAddress.toString())
        })
        
    })
    describe("withdraw",function(){
        beforeEach(async()=>{
            await fundMe.fund({value:ethValue})
        })
        it("the withDraw should work!!",async()=>{
            const getBeforeDeployerBalance=await ethers.provider.getBalance(deployer)
            const getBeforeFundMeContractBalance=await ethers.provider.getBalance(FundMeAddress)
           
           const withDraw =  await fundMe.withdraw()
           const withDrawReceipt = await withDraw.wait()
           const {gasUsed,gasPrice} = withDrawReceipt
           const totalGas = gasPrice*gasUsed
           const getAfterDeployerBalance=await ethers.provider.getBalance(deployer)
           const getAfterFundMeContractBalance=await ethers.provider.getBalance(FundMeAddress)
           
           assert.equal(getAfterFundMeContractBalance,0)
        })
        it("the withDraw should work with multiple users!",async()=>{
         //arrange
         const accounts = await ethers.getSigners()
         
            
         //  action
         for(i=0;1>3;i++){
            fundMeConnectedAccount = await fundMe.connect(accounts[i])
         await   fundMeConnectedAccount.fund({value:1})
         }
        
         const getBeforeDeployerBalance=await ethers.provider.getBalance(deployer)
            const getBeforeFundMeContractBalance=await ethers.provider.getBalance(FundMeAddress)

         const withDraw =  await fundMe.withdraw()
         const withDrawReceipt = await withDraw.wait()
         const {gasUsed,gasPrice} = withDrawReceipt
         const totalGas = gasPrice*gasUsed 
         const getAfterFundMeContractBalance=await ethers.provider.getBalance(FundMeAddress)
         const getAfterDeployerBalance=await ethers.provider.getBalance(deployer)
         // assert
         assert.equal(getAfterFundMeContractBalance,0)
         assert.equal(getBeforeDeployerBalance+getBeforeFundMeContractBalance,getAfterDeployerBalance+totalGas)
    })
    it("only owner who can withdraw",async()=>{
        const accounts =await ethers.getSigners();
        const fundMeConnectedAccount = fundMe.connect(accounts[3])
        await expect(
            fundMeConnectedAccount.withdraw()
        ).to.be.reverted
    })
    })
    
});

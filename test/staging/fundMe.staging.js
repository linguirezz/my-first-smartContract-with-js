const { assert } = require("chai")
const{deployments,ethers,network,getNamedAccounts}=require("hardhat")
describe("fundMe staging",function(){
    let fundMe
    let deployer
    let fundMeAddress
    const ethValue = ethers.parseEther("1")
    beforeEach(async()=>{
        deployer = (await getNamedAccounts()).deployer
        const signer = ethers.getSigner(deployer)
        fundMeAddress = (await deployments.get("FundMe")).address
        fundMe = ethers.getContractAt("FundMe",fundMeAddress,signer)
    }
    )
    it("allows people to fund and owner to withdraw",async()=>{
      
        const fund =await fundMe.fund({value:ethValue})
        await fund.wait(1)
        const withDraw = await fundMe.withDraw()
        await withDraw.wait(1)
        const getFundMeBalance = ethers.provider.getBalance(fundMeAddress)
        assert.equal(getFundMeBalance,0)
        
    })
})
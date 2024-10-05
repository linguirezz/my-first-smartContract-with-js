const {network}= require("hardhat")
const{testNetPriceFeeds}=require('../helper.config')

// console.log(`apakah ini adalah test network?${(testNetPriceFeeds.includes(network.config.chainId))}`)
const DECIMALS = "8"
const INITIAL_PRICE = "200000000000"
module.exports=async ({ getNamedAccounts, deployments })=>{
    const {log,deploy} = deployments
    const {deployer} = await getNamedAccounts()
    log("deploy 00")
    
    if(network.config.chainId == 31337){
        log("local env detected! deploying local pricefeed")
        await deploy("MockV3Aggregator",{
            from:deployer,
            args:[DECIMALS,INITIAL_PRICE],
            log:true
        })
        log("------------------------------------------")
    }
}
module.exports.tags = ["all","aggregator"]
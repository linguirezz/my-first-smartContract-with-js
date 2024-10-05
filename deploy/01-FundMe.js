const {network}= require("hardhat")
const{testNetPriceFeeds,netPriceFeed}=require('../helper.config')
const{verify}=require("../utils/verify")
// console.log(`apakah ini adalah test network?${(testNetPriceFeeds.includes(network.config.chainId))}`)

module.exports=async ({ getNamedAccounts, deployments })=>{
    const {log,deploy} = deployments
    const {deployer} = await getNamedAccounts()
    let ethUsdPriceFeedAddress
    if (network.config.chainId == 31337) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        ethUsdPriceFeedAddress = netPriceFeed[network.config.chainId].priceFeed
    }
    log("deploy 01")
    
//  TODO: buat verif jika id chain adalah network utama
        
        await deploy("FundMe",{
            from:deployer,
            args:[ethUsdPriceFeedAddress],
            log:true
        })
        const fundMeAddress = await deployments.get("FundMe").address
        log("------------------------------------------")
    if(network.config.chainId !== 31337){
    console.log("proses verifikasi sedang berlangsung!!")
    verify(fundMeAddress,[ethUsdPriceFeedAddress])    
    }
    
}
module.exports.tags = ["all","FundMe"]
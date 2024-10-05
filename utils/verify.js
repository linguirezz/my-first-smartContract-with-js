const{ethers,network,run}=require("hardhat")
async function verify(_address,args){
    try {
        run("verify:verify",{
            address:_address,
            constructorArgument:args
        })
        
    } catch (error) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already verified!")
          } else {
            console.log(e)
          }   
    }
    
}
module.exports = {verify}
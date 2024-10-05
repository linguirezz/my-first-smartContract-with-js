const {ethers} =require("hardhat")
async function main(){
    try {
        const contractFactory= await ethers.getContractFactory("PriceConverter")

        const contract = await contractFactory.deploy()

        await contract.waitForDeployment()

        const blockAddress = await contract.getAddress()

        console.log(`your contract has been deployed at ${blockAddress}`)

    } catch (error) {
        console.error
    }

};
main().then(()=>process.exit(0)).catch(()=>process.exit(1))
require("@nomicfoundation/hardhat-toolbox");
require("hardhat-deploy")

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    compilers:[
      {version:"0.8.27"},
      {version:"0.6.7"}
    ]
  },
  networks:{
    
    localhost:{
      url:"http://127.0.0.1:8545/",
      chainId:31337,
    },
    sepolia:{
      accounts:["71b57f668771b1a0e0f03660bc3fb29f0b965986aa2c293edb461b5c692ad870"],
      chainId:11155111,
      url:"https://eth-sepolia.g.alchemy.com/v2/FtBXOugE4zlVN4qo_geosvR7pEUP5zy_"
     }
  },
  namedAccounts:{
    deployer:{
      default:0
    }
  },
  gasReporter:{
    enabled:true,
    noColors:true,
    outputFile:"gas-report.txt"
  },
  etherscan:{
    apiKey:"BBFJ6PW89HHXB5FUTKZ4BJPH43C639Z5UW"
  }
};

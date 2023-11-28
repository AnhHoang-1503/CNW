require('@nomicfoundation/hardhat-toolbox')
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: '0.8.20',
  paths: {
    artifacts: './src/ABI/artifacts'
  },
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: 'https://polygon-mumbai.g.alchemy.com/v2/bhXAK_Ls9D01h21Ia3Q0uNxOzZ6kzuQ5',
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  }
}

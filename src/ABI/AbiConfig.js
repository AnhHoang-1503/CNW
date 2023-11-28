import { ethers } from 'ethers'

import contractABI from './artifacts/contracts/Main.sol/Main.json'
const contractAddress = '0x5dAEe35EC88aAc504F1Fe26288A6C3a1307AAE78'

export var provider
export var signer
export var contract
export var abiInterface = new ethers.Interface(contractABI.abi)
export var errorList = contractABI.abi.filter((item) => item.type === 'error')

export async function connect() {
  if (typeof window.ethereum === 'undefined') {
    throw new Error('MetaMask not installed')
  }

  provider = new ethers.BrowserProvider(window.ethereum)
  signer = await provider.getSigner()
  contract = new ethers.Contract(contractAddress, contractABI.abi, signer)

  return {
    provider,
    signer,
    contract
  }
}

export async function execute(fn, params = []) {
  try {
    await connect()
  } catch (error) {
    console.log("Can't connect to contract", error)
  }

  try {
    return await fn(...params)
  } catch (error) {
    // Lỗi do giao dịch
    try {
      var detailError = abiInterface.parseError(error.data)
      error.name = detailError.fragment.name
      error.data = detailError
    } catch (error) {}

    throw error
  }
}

export default {
  provider,
  signer,
  contract,
  connect,
  execute
}

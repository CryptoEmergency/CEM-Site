import Web3 from 'web3';
// import fs from 'fs';
import abiTest from '@src/component/abi/test.json'
const web3CEM = new Web3('https://cemchain.com');

const web3Action = {}

web3Action.getNews = async function () {
    const tokenAddress = "0x4AB57803Dfd5D9034595e26884222F875390036F";
    const contract = new web3CEM.eth.Contract(abiTest, tokenAddress);
    const tmp = await contract.methods.getRow().call();
    // console.log("Информация", tmp[0])
    return tmp
}

export { web3CEM, web3Action }
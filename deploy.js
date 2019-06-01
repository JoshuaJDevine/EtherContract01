const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'item veteran tissue inner choose jungle bachelor spot goddess question diesel traffic',
    'https://rinkeby.infura.io/v3/5cafd8251ae74a56a3f2a3c891c7a965'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();
    
    console.log('Attempting to deploy from account ', accounts[0])
    
    const result = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: '0x' + bytecode, arguments: ['Hello Eth World', accounts[0]] })
        .send({ gas: '1000000', from: accounts[0] });
    
    console.log('This contract was deployed to ', result.options.address);
};
deploy();
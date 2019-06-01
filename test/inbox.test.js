const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const provider = ganache.provider();
const OPTIONS = {
  defaultBlock: "latest",
  transactionConfirmationBlocks: 1,
  transactionBlockTimeout: 5
};
const web3 = new Web3(provider, null, OPTIONS);
const { interface, bytecode } = require('../compile');

let accounts;
let inbox;

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts();

    // use one of those accounts to depoly the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
        .deploy({ data: bytecode, arguments: ['hello world of Ether!', accounts[0]] })
        .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
    
    it ('deploys a contract', () => {
        assert.ok(inbox.options.address);
    });
    
    it ('has a default message', async () => {
        const message = await inbox.methods.message().call();
        assert.equal(message, 'hello world of Ether!');
    });
    
    it ('recorded the first sending address', async () =>{
        const message = await inbox.methods.lastUsedAddress().call();
        assert.equal(message, accounts[0]);
    })
    
    it ('can change the message', async () => {
        await inbox.methods.setMessage('message changed', accounts[1]).send({ from: accounts[1] })
        const message = await inbox.methods.message().call();
        assert.equal(message, 'message changed');
    });
    
    it ('recorded the sending address', async () => {
        await inbox.methods.setMessage('a third message', accounts[2]).send({ from: accounts[2] })
        const lastUsedAddress = await inbox.methods.lastUsedAddress().call();
        const message = await inbox.methods.message().call();
        assert.equal(lastUsedAddress, accounts[2]);
        assert.equal(message, 'a third message');
    });
});


/*

MOCHA TEST SAMPLES

class Car {
    park(){
        return 'stopped';
    }
    drive() {
        return 'vroom';
    }
}

let car;
let x = 0;

beforeEach(() => {
    console.log('running test [' + x + ']');
    x = x +1;
    car = new Car();
});

describe('Car Classs', () => {
    it('can park', () => {
        assert.equal(car.park(), 'stopped');
     });
        
    it('can drive', () => {
        assert.equal(car.drive(), 'vroom');
     });
} );

*/

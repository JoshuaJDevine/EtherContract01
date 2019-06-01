pragma solidity ^0.4.17;

contract Inbox {
    string public message;
    string public lastUsedAddress;
    
    function Inbox(string initMessage, string sendingAddress) public {
        message = initMessage;
        lastUsedAddress = sendingAddress;
    }
    
    function setMessage(string newMessage, string sendingAddress) public {
        message = newMessage;
        lastUsedAddress = sendingAddress;
    }
}
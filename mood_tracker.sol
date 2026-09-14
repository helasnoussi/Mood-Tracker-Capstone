// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract MoodTracker {
    string public currentMood = "Neutre";
    address public lastSetter;

    event MoodChanged(address indexed setter, string newMood);

    function setMood(string memory _newMood) public {
        currentMood = _newMood;
        lastSetter = msg.sender;
        emit MoodChanged(msg.sender, _newMood);
    }
}
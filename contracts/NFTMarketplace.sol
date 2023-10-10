//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTOpenCase is ERC721URIStorage {

    address payable owner;

    using Counters for Counters.Counter;

    constructor() ERC721("NFTOpenCase", "NFTOC") {
        owner = payable(msg.sender);
    }  
}
//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTOpenCase is ERC721URIStorage {

    address payable owner;

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    uint256 listPrice = 0.01 ether;

    constructor() ERC721("NFTOpenCase", "NFTOC") {
        owner = payable(msg.sender);
    }

    mapping(uint256 => Item) private idItem;

    modifier ownerOnly() {
        require(owner == msg.sender, "Only owner can change the listing price!");
        _;
    }

    modifier possibleToCreateToken(uint256 price) {
        require(msg.value == listPrice, "Not Enough ether to list!");
        require(price > 0, "The price can not be negative number!");
        _;
    }

    struct Item {
        uint256 tokenId;
        address payable owner;
        address payable seller;
        uint256 price;
        bool sold;
    } 

    function getCurrentToken() public view returns (uint256) {
        return _tokenIds.current();
    }

    function getListPrice() public view returns (uint256) {
        return listPrice;
    }

    function updateListPrice(uint256 _listPrice) public payable ownerOnly {
        listPrice = _listPrice;
    }

    function getLatestTokenIdByItem() public view returns (Item memory) {
         return idItem[getCurrentToken()];
    }

    function getItemByTokenId(uint256 tokenId) public view returns (Item memory) {
        return idItem[tokenId];
    }

    function createListedToken(uint256 tokenId, uint256 price) private {
        idItem[tokenId] = Item(
            tokenId,
            payable(address(this)),
            payable(msg.sender),
            price,
            true
        );

        _transfer(msg.sender, address(this), tokenId);
    }

    function createToken(string memory tokenURI, uint256 price) public payable possibleToCreateToken(price) returns (uint256) {
        _tokenIds.increment();
        uint256 currentTokenId = _tokenIds.current();
        _safeMint(msg.sender, currentTokenId);

        _setTokenURI(currentTokenId, tokenURI);

        createListedToken(currentTokenId, price);

        return currentTokenId;
    }

    function getAllNFT() public view returns (Item[] memory) {
        uint256 nftCount = _tokenIds.current();
        Item[] memory tokens = new Item[](nftCount);

        uint256 currentIndex = 0;
        for (uint256 i=0; i<nftCount; i++) {
            Item storage currentItem = idItem[i+1];
            tokens[currentIndex] = currentItem;
            currentIndex++;
        }

        return tokens;
    }

    function getMyNFT() public view returns(Item[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for(uint256 i=0; i<totalItemCount; i++) {
            if(idItem[i+1].owner == msg.sender || idItem[i+1].seller == msg.sender) {
                itemCount++;
            }
        }

        Item[] memory items = new Item[](itemCount);
        for(uint256 i=0; i<totalItemCount; i++) {
            if(idItem[i+1].owner == msg.sender || idItem[i+1].seller == msg.sender) {
                Item storage currentItem = idItem[i+1];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }

        return items;
    }

    function executeSale(uint256 tokenId) public payable {
        uint256 price = idItem[tokenId].price;
        require(msg.value == price, "Insufficient funds!");

        address seller = idItem[tokenId].seller;

        idItem[tokenId].sold = true;
        idItem[tokenId].seller = payable(msg.sender);

        _itemsSold.increment();

        _transfer(address(this), msg.sender, tokenId);

        approve(address(this), tokenId);

        payable(owner).transfer(listPrice);
        payable(seller).transfer(msg.value);
    }
}
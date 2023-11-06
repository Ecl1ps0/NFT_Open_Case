//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFTOpenCase is ERC721URIStorage {

    address payable owner;

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    uint256 listPrice = 0.0001 ether;

    constructor() ERC721("NFTOpenCase", "NFTOC") {
        owner == payable(msg.sender);
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

    event itemCreated (
        uint256 indexed tokenId,
        address owner, 
        address seller,
        uint256 price,
        bool sold
    );

    // Operating with token and list price
    function getListPrice() public view returns (uint256) {
        return listPrice;
    }

    function updateListPrice(uint256 _listPrice) public payable ownerOnly {
        listPrice = _listPrice;
    }

    // Create item func
    function createItem(uint256 tokenId, uint256 price) private {
        require (price > 0, "Price should not be a zero!");
        require(msg.value == listPrice, "Price should be equal the listing price!");

        idItem[tokenId] = Item(
            tokenId,
            payable(address(this)),
            payable(msg.sender),
            price,
            false
        );

        _transfer(msg.sender, address(this), tokenId);

        emit itemCreated(tokenId, address(this), msg.sender, price, false);
    }

    // Create token func
    function createToken(string memory tokenURI, uint256 price) public payable possibleToCreateToken(price) returns (uint256) {
        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        createItem(newTokenId, price);

        return newTokenId;
    }

    // Sale func
    function createSale(uint256 tokenId) public payable {
        uint256 price = idItem[tokenId].price;

        require(msg.value == price, "Please submit asking price!");

        idItem[tokenId].owner = payable(msg.sender);
        idItem[tokenId].sold = true;
        idItem[tokenId].owner = payable(address(0));

        _itemsSold.increment();

        _transfer(address(this), msg.sender, tokenId);
        
        payable(owner).transfer(listPrice);
        payable(idItem[tokenId].seller).transfer(msg.value);
    }

    // Resell token
    function resellToken(uint256 tokenId, uint256 price) public payable {
        require(idItem[tokenId].owner == msg.sender, "Only owner can sell it!");
        require(msg.value == listPrice, "Price should be equal to list price!");

        idItem[tokenId].price = price;
        idItem[tokenId].sold = false;
        idItem[tokenId].seller = payable(msg.sender);
        idItem[tokenId].owner = payable(address(this));

        _itemsSold.decrement();

        _transfer(msg.sender, address(this), tokenId);
    }

    // Get unsold nft
    function getAllNFT() public view returns (Item[] memory) {
        uint256 itemCount = _tokenIds.current();
        uint256 unsoldItem = _tokenIds.current() - _itemsSold.current();
        Item[] memory items = new Item[](unsoldItem);

        uint256 currentIndex = 0;
        for (uint256 i = 0; i < itemCount; i++) {
            if (idItem[i + 1].owner == address(this)) {
                Item storage currentItem = idItem[i+1];
                items[currentIndex] = currentItem;
                currentIndex++;   
            }
        }

        return items;
    }

    // Get my nft
    function getMyNFT() public view returns(Item[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for(uint256 i = 0; i < totalItemCount; i++) {
            if(idItem[i + 1].owner == msg.sender || idItem[i + 1].seller == msg.sender) {
                itemCount++;
            }
        }

        Item[] memory items = new Item[](itemCount);
        for(uint256 i = 0; i < totalItemCount; i++) {
            if(idItem[i + 1].owner == msg.sender || idItem[i + 1].seller == msg.sender) {
                Item storage currentItem = idItem[i+1];
                items[currentIndex] = currentItem;
                currentIndex++;
            }
        }

        return items;
    }
}
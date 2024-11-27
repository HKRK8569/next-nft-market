// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.27;

import {ERC721} from "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import {ERC721URIStorage} from "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

struct NFTListing {
    uint256 price;
    address seller;
}

contract NFTMarket is ERC721, ERC721URIStorage {
    uint256 private _nextTokenId;
    mapping(uint256 => NFTListing) private _listings;

    event NFTTransfer(
        uint256 tokenID,
        address from,
        address to,
        string tokenURI,
        uint256 price
    );

    constructor() ERC721("MyToken", "MTK") {}

    function createNFT(string memory uri) public {
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
        emit NFTTransfer(tokenId, address(0), msg.sender, uri, 0);
    }

    function listNFT(uint256 tokenID, uint256 price) public {
        require(price > 0, "NFTMarket: price must be greater than 0");
        transferFrom(msg.sender, address(this), tokenID);
        _listings[tokenID] = NFTListing(price, msg.sender);
        emit NFTTransfer(tokenID, msg.sender, address(this), "", price);
    }

    function cancelListing(uint256 tokenID) public {
        NFTListing memory listing = _listings[tokenID];
        require(listing.price > 0, "NFTMarket: nft not listed for sale");
        require(
            listing.seller == msg.sender,
            "NFTMarket: you're not the seller"
        );
        ERC721(address(this)).transferFrom(address(this), msg.sender, tokenID);
        clearListing(tokenID);
        emit NFTTransfer(tokenID, address(this), msg.sender, "", 0);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function clearListing(uint256 tokenID) private {
        _listings[tokenID].price = 0;
        _listings[tokenID].seller = address(0);
    }
}

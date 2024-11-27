import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("NFTMarket", function () {
  const deployTokenFixture = async () => {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const myNft = await ethers.deployContract("NFTMarket");

    return {
      myNft,
      owner,
      addr1,
      addr2,
    };
  };

  describe("NFT作成", () => {
    it("NFT作成ができるかのテスト", async () => {
      const { myNft, owner } = await loadFixture(deployTokenFixture);
      const tokenURI = "https://example.com/";
      await myNft.connect(owner).createNFT(tokenURI);
      expect(await myNft.ownerOf(0)).to.equal(owner.address);
      expect(await myNft.tokenURI(0)).to.equal(tokenURI);
    });

    it("連続でNFT作成した際の整合性のテスト", async () => {
      const { myNft, owner, addr1 } = await loadFixture(deployTokenFixture);
      const tokenURI = "https://example.com/1";
      const tokenURI2 = "https://example.com/2";
      await myNft.connect(owner).createNFT(tokenURI);
      await myNft.connect(addr1).createNFT(tokenURI2);
      expect(await myNft.ownerOf(0)).to.equal(owner.address);
      expect(await myNft.tokenURI(0)).to.equal(tokenURI);
      expect(await myNft.ownerOf(1)).to.equal(addr1.address);
      expect(await myNft.tokenURI(1)).to.equal(tokenURI2);
    });
  });
});

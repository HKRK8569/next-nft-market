import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";

describe("NFTMarket", function () {
  const deployTokenFixture = async () => {
    const [owner, addr1, addr2] = await ethers.getSigners();

    const token = await ethers.deployContract("NFTMarket");

    return {
      token,
      owner,
      addr1,
      addr2,
    };
  };

  describe("NFT作成", () => {
    it("NFT作成ができるかのテスト", async () => {
      const { token, owner } = await loadFixture(deployTokenFixture);
      const tokenURI = "https://example.com/";
      await token.connect(owner).createNFT(tokenURI);
      expect(await token.ownerOf(0)).to.equal(owner.address);
      expect(await token.tokenURI(0)).to.equal(tokenURI);
    });

    it("一般ユーザーがNFT作成ができるかのテスト", async () => {
      const { token, owner, addr1 } = await loadFixture(deployTokenFixture);
      const tokenURI = "https://example.com/";
      await token.connect(addr1).createNFT(tokenURI);
      expect(await token.ownerOf(0)).to.equal(addr1.address);
      expect(await token.tokenURI(0)).to.equal(tokenURI);
    });

    it("連続でNFT作成した際の整合性のテスト", async () => {
      const { token, owner, addr1 } = await loadFixture(deployTokenFixture);
      const tokenURI = "https://example.com/1";
      const tokenURI2 = "https://example.com/2";
      await token.connect(owner).createNFT(tokenURI);
      await token.connect(addr1).createNFT(tokenURI2);
      expect(await token.ownerOf(0)).to.equal(owner.address);
      expect(await token.tokenURI(0)).to.equal(tokenURI);
      expect(await token.ownerOf(1)).to.equal(addr1.address);
      expect(await token.tokenURI(1)).to.equal(tokenURI2);
    });

    it("emitのテスト", async () => {
      const { token, owner } = await loadFixture(deployTokenFixture);
      const tokenURI = "https://example.com/";
      const tx = await token.connect(owner).createNFT(tokenURI);
      await expect(tx)
        .to.emit(token, "NFTTransfer")
        .withArgs(0, ethers.ZeroAddress, owner.address, tokenURI, 0);
    });
  });

  describe("出品", () => {
    it("NFTの出品", async () => {
      const { token, owner } = await loadFixture(deployTokenFixture);
      const tokenURI = "https://example.com/";
      const price = 100;
      await token.connect(owner).createNFT(tokenURI);
      const tx = await token.connect(owner).listNFT(0, price);
      const marketAddress = await token.getAddress();
      await expect(tx)
        .to.emit(token, "NFTTransfer")
        .withArgs(0, owner.address, marketAddress, "", price);
    });

    it("一般ユーザーのNFTの出品", async () => {
      const { token, owner, addr1 } = await loadFixture(deployTokenFixture);
      const tokenURI = "https://example.com/";
      const price = 100;
      await token.connect(addr1).createNFT(tokenURI);
      const tx = await token.connect(addr1).listNFT(0, price);
      const marketAddress = await token.getAddress();
      await expect(tx)
        .to.emit(token, "NFTTransfer")
        .withArgs(0, addr1.address, marketAddress, "", price);
    });

    it("NFT所有者と違うアドレスで出品した際のテスト", async () => {
      const { token, owner, addr1 } = await loadFixture(deployTokenFixture);
      const tokenURI = "https://example.com/";
      const price = 100;
      await token.connect(owner).createNFT(tokenURI);
      const tx = token.connect(addr1).listNFT(0, price);
      await expect(tx).to.be.revertedWithCustomError(
        token,
        "ERC721InsufficientApproval"
      );
    });

    it("存在しないtokenIdを指定していた際のテスト", async () => {
      const { token, owner } = await loadFixture(deployTokenFixture);
      const tokenURI = "https://example.com/";
      const price = 100;
      await token.connect(owner).createNFT(tokenURI);

      const tx = token.connect(owner).listNFT(1, price);

      await expect(tx).to.be.revertedWithCustomError(
        token,
        `ERC721NonexistentToken`
      );
    });

    it("priceを0で出品した際のテスト", async () => {
      const { token, owner } = await loadFixture(deployTokenFixture);
      const tokenURI = "https://example.com/";
      const price = 0;
      await token.connect(owner).createNFT(tokenURI);
      const tx = token.connect(owner).listNFT(1, price);
      await expect(tx).to.be.revertedWith(
        "NFTMarket: price must be greater than 0"
      );
    });
  });
});

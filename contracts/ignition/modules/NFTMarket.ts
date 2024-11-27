import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const NFTMarketModule = buildModule("NFTMarket", (m) => {
  const token = m.contract("NFTMarket");

  return {
    token,
  };
});

export default NFTMarketModule;

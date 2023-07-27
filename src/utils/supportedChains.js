import FactoryContractABI from "src/abis/FactoryContract.json";
import FundWithEtherContract from "src/abis/FundWithEtherContract.json";

export const chainMapping = {
  "0x1": {
    id: "0x1",
    token: "ETH",
    label: "Ethereum",
    rpcUrl: `https://eth-mainnet.alchemyapi.io/v2/${process.env.NEXT_PUBLIC_MAINNET_PRIVATE_KEY_ALCHEMY}`,
    logo: "/eth_icon.svg",
  },
  "0x5": {
    id: "0x5",
    token: "gETH",
    label: "Goerli",
    rpcUrl: `https://eth-goerli.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_GOERLI_PRIVATE_KEY_ALCHEMY}`,
    logo: "/go_icon.png",
    factoryContract: {
      address: "0x3680488E6EB8c75A2F0f2304C3AD1618FB4b7eF4",
      fromBlock: "0x8FB637",
      abi: FactoryContractABI.abi,
    },
    implementations: {
      1: {
        address: "0xe0fDBF53D50b03F12D169f6634828E3910587cd3",
        abi: FundWithEtherContract.abi,
        type: 1, // ETHER TYPE,
        symbol: "ETH",
        decimals: 18,
        fromBlock: "0x8FB636",
      },
    },
  },
  "0x89": {
    id: "0x89",
    token: "MATIC",
    label: "Polygon",
    rpcUrl: `https://polygon-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_POLYGON_PRIVATE_KEY_ALCHEMY}`,
    logo: "/polygon_icon.svg",
  },
};

export const chainsForOnboardJSInit = Object.values(chainMapping).map(
  (chain) => ({
    id: chain.id,
    token: chain.token,
    label: chain.label,
    rpcUrl: chain.rpcUrl,
  })
);

export const chainsForNetworkSwitcher = Object.values(chainMapping).map(
  (chain) => ({
    id: chain.id,
    label: chain.label,
    logo: chain.logo,
  })
);

export const contractsForChain = (chainId) => {
  return {
    factoryContract: chainMapping[chainId].factoryContract,
    implementations: chainMapping[chainId].implementations,
  };
};

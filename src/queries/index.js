import axios from "axios";
import { useQuery } from "react-query";
import { ethers } from "ethers";

import { chainMapping } from "src/utils/supportedChains";

export const parseProxyCreatedEvent = (event) => {
  const { args } = event;
  const [
    proxyAddress,
    ownerAddress,
    receiver,
    typeOfFunding,
    createdAt,
    targetAmount,
    ipfsLink,
  ] = args;

  const result = {
    createdAt: createdAt.toString(),
    ipfsLink,
    ownerAddress,
    proxyAddress,
    receiverAddress: receiver,
    targetAmountInWei: targetAmount.toString(),
    typeOfFunding,
  };
  return result;
};

export const useGetAllProxies = (appNetworkId) => {
  return useQuery(
    "allProxies",
    async () => {
      const { factoryContract, rpcUrl } = chainMapping[appNetworkId];

      const contractInterface = new ethers.utils.Interface(factoryContract.abi);
      const topic = contractInterface.getEventTopic("FundCreated");

      const options = {
        method: "POST",
        url: rpcUrl,
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        data: {
          id: 1,
          jsonrpc: "2.0",
          method: "eth_getLogs",
          params: [
            {
              address: factoryContract.addresses,
              fromBlock: "0x429d3b",
              toBlock: "latest",
              topics: [topic],
            },
          ],
        },
      };

      const response = await axios.request(options);
      const decodedEvents = response.data.result.map((event) => {
        const decodedEvent = contractInterface.parseLog(event);
        return {
          ...parseProxyCreatedEvent(decodedEvent),
        };
      });
      return decodedEvents;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
    }
  );
};

export const useGetDataFromIpfs = (ipfsLink, options = {}) => {
  return useQuery(
    ["ipfs", ipfsLink],
    async () => {
      const response = await axios.get(`${ipfsLink}`);
      return response.data;
    },
    {
      ...options,
      cacheTime: Infinity,
      staleTime: Infinity,
    }
  );
};

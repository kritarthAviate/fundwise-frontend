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

export const parseContributionEvent = (event) => {
  const { args } = event;
  const [contributor, amount] = args;

  const result = {
    amount: amount.toString(),
    contributorAddress: contributor,
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
              fromBlock: factoryContract.fromBlock,
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
      console.log("decodedEvents", decodedEvents);
      return decodedEvents;
    },
    {
      refetchOnMount: false,
      refetchOnWindowFocus: true,
      refetchOnReconnect: false,
    }
  );
};

export const useGetContributions = (
  proxyAddress,
  typeOfFunding,
  appNetworkId,
  options = {}
) => {
  return useQuery(
    ["contributions", proxyAddress],
    async () => {
      const { rpcUrl, implementations } = chainMapping[appNetworkId];
      const concernedImplementation = implementations[typeOfFunding];

      const contractInterface = new ethers.utils.Interface(
        concernedImplementation.abi
      );
      const topic = contractInterface.getEventTopic("Contribute");

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
              address: proxyAddress,
              fromBlock: concernedImplementation.fromBlock,
              toBlock: "latest",
              topics: [topic],
            },
          ],
        },
      };

      const response = await axios.request(options);
      console.log({ response });
      const decodedEvents = response.data.result.map((event) => {
        const decodedEvent = contractInterface.parseLog(event);
        console.log("GetContributions", { decodedEvent });
        return {
          ...parseContributionEvent(decodedEvent),
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

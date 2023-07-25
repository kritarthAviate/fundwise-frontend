import { useContext } from "react";
import { useQueryClient } from "react-query";
import { parseEther } from "ethers/lib/utils";

import { getProxyAddress } from "src/utils/web3Utils";
import { BaseContext } from "src/context/BaseContext";
import { contractsForChain } from "src/utils/supportedChains";
import useContract from "./useContract";

const useFactoryContract = () => {
  const queryClient = useQueryClient();
  const { appNetworkId } = useContext(BaseContext);
  const factoryContract = contractsForChain(appNetworkId).factoryContract;

  const { contract: FactoryContract } = useContract(
    factoryContract.address,
    factoryContract.abi
  );

  const createCrowdfunding = async (
    targetAmount,
    ipfsHash,
    receiverAddress,
    typeofFunding = 1
  ) => {
    const tx = await FactoryContract.createFund(
      typeofFunding,
      parseEther(targetAmount),
      ipfsHash,
      receiverAddress
    );
    const receipt = await tx.wait();
    queryClient.invalidateQueries("allProxies");

    return getProxyAddress(receipt);
  };

  return { createCrowdfunding };
};

export default useFactoryContract;

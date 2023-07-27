import { useContext, useEffect, useState } from "react";
import { parseEther } from "ethers/lib/utils";

import { BaseContext } from "src/context/BaseContext";
import { chainMapping } from "src/utils/supportedChains";
import useContract from "./useContract";

const getProjectStatusString = (status) => {
  switch (status) {
    case "0":
      return "ONGOING";
    case "1":
      return "SUCCESS";
    case "2":
      return "FAILED";
    default:
      return "ONGOING";
  }
};

const useImplementationContract = (address, typeOfFunding) => {
  const { appNetworkId, account } = useContext(BaseContext);
  const { implementations } = chainMapping[appNetworkId];
  const implementation = implementations[typeOfFunding];

  const [totalAmountRaisedInWei, setTotalAmountRaisedInWei] = useState("0");
  const [projectStatus, setProjectStatus] = useState("ONGOING");
  const [fundsWithdrawn, setFundsWithdrawn] = useState(false);
  const [certificateClaimed, setCertificateClaimed] = useState(false);

  const { contract: ImplementationContractInstance } = useContract(
    address,
    implementation.abi
  );

  const getTotalAmountRaised = async () => {
    const data = await ImplementationContractInstance.amountRaised();
    setTotalAmountRaisedInWei(data.toString());
  };
  const getProjectStatus = async () => {
    const data = await ImplementationContractInstance.projectStatus();
    setProjectStatus(getProjectStatusString(data.toString()));
  };

  const checkFundsWithdrawn = async () => {
    const data = await ImplementationContractInstance.fundsWithdrawn();
    setFundsWithdrawn(data);
  };

  const checkIfCertificateClaimed = async () => {
    const data = await ImplementationContractInstance.certificateClaimed(
      account
    );
    setCertificateClaimed(data);
  };

  useEffect(() => {
    if (ImplementationContractInstance?.amountRaised) {
      getTotalAmountRaised();
      getProjectStatus();
      checkFundsWithdrawn();
      checkIfCertificateClaimed();
    }
  }, [ImplementationContractInstance?.amountRaised]);

  const donate = async (amount) => {
    const estimatedGas =
      await ImplementationContractInstance.estimateGas.contribute({
        value: parseEther(amount),
      });
    const tx = await ImplementationContractInstance.contribute({
      value: parseEther(amount),
      gasLimit: estimatedGas.add(estimatedGas.div(9)),
    });
    const receipt = await tx.wait();
    return receipt;
  };

  const withdrawFunds = async () => {
    const estimatedGas =
      await ImplementationContractInstance.estimateGas.withdrawFunds();
    const gasLimit = estimatedGas.add(estimatedGas.div(9));
    const tx = await ImplementationContractInstance.withdrawFunds({
      gasLimit,
    });
    const receipt = await tx.wait();
    return receipt;
  };

  const claimCertificate = async () => {
    const estimatedGas =
      await ImplementationContractInstance.estimateGas.claimCertificate();
    const gasLimit = estimatedGas.add(estimatedGas.div(9));
    const tx = await ImplementationContractInstance.claimCertificate({
      gasLimit,
    });
    const receipt = await tx.wait();
    return receipt;
  };

  return {
    totalAmountRaisedInWei,
    currencySymbol: implementation.symbol,
    decimals: implementation.decimals,
    donate,
    refetchAmountRaised: getTotalAmountRaised,
    refetchProjectStatus: getProjectStatus,
    projectStatus,
    withdrawFunds,
    claimCertificate,
    checkFundsWithdrawn,
    fundsWithdrawn,
    checkIfCertificateClaimed,
    certificateClaimed,
  };
};

export default useImplementationContract;

import { useContext, useEffect, useState } from "react";
import { ethers } from "src/utils/web3Utils";

import { BaseContext } from "src/context/BaseContext";

const useContract = (address, abi) => {
  const { signer } = useContext(BaseContext);
  const [contract, setContract] = useState();

  useEffect(() => {
    if (!signer) return;
    setContract(new ethers.Contract(address, abi, signer));
  }, [signer, address, abi]);

  return { contract };
};

export default useContract;

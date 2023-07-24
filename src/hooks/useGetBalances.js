import { useContext } from "react";

import { ethers } from "src/utils/web3Utils";
import { BaseContext } from "src/context/BaseContext";
import ERC20Artifact from "src/abis/ERC20.json";

const useGetBalances = () => {
  const { provider } = useContext(BaseContext);

  async function fetchEthBalance(walletAddress) {
    try {
      const balanceInWei = await provider.getBalance(walletAddress);
      const balanceInEth = ethers.utils.formatEther(balanceInWei);

      return { balanceInWei, balanceInEth };
    } catch (error) {
      console.error("Error fetching ETH balance:", error);
    }
  }

  async function fetchERC20TokenBalance(walletAddress, tokenAddress) {
    try {
      const contract = new ethers.Contract(
        tokenAddress,
        ERC20Artifact.abi,
        provider
      );
      const balanceInWei = await contract.getBalance(walletAddress);
      const balanceInEth = ethers.utils.formatEther(balanceInWei);
      return { balanceInWei, balanceInEth };
    } catch (error) {
      console.error("Error fetching Token balance:", error);
    }
  }

  return { fetchEthBalance, fetchERC20TokenBalance };
};

export default useGetBalances;

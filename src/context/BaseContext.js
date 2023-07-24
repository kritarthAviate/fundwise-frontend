import { createContext, useState, useEffect } from "react";
import { init, useConnectWallet, useSetChain } from "@web3-onboard/react";
import injectedModule from "@web3-onboard/injected-wallets";
import { ethers } from "src/utils/web3Utils";

import { chainsForOnboardJSInit } from "src/utils/supportedChains";
import { useGetAllProxies } from "src/queries";

const wallets = [injectedModule()];

init({
  wallets,
  chains: chainsForOnboardJSInit,
  appMetadata: {
    name: "Fund Wise",
    icon: "<svg>Dapp Icon</svg>",
    description: "Crowdfunding",
  },
  connect: {
    autoConnectLastWallet: true,
  },
  accountCenter: {
    desktop: {
      enabled: false,
      position: "topRight",
    },
  },
});

export const BaseContext = createContext();

export const BaseProvider = (props) => {
  const [{ wallet, connecting }, connect, disconnect] = useConnectWallet();
  const [{ connectedChain }, setChain] = useSetChain();
  const [provider, setProvider] = useState(null);
  const [appNetworkId, setAppNetworkId] = useState("0x5");

  const { data: allProxies, isLoading: proxiesLoading } =
    useGetAllProxies(appNetworkId);

  useEffect(() => {
    if (!wallet?.provider) {
      setProvider(null);
    } else {
      const webProvider = new ethers.providers.Web3Provider(
        wallet.provider,
        "any"
      );
      setProvider(webProvider);
    }
  }, [wallet]);

  const handleChangeChain = async (newChainId) => {
    return await setChain({ chainId: newChainId });
  };

  const handleChangeAppNetworkId = (newChainId) => {
    setAppNetworkId(newChainId);
  };

  const handleDisconnect = async () => {
    await disconnect(wallet);
  };

  // ConnectWalletCheck function
  // 1. Check if wallet is connected
  // 2. If not connected, connect wallet and change chain to appNetworkId
  // 3. If connected, check if connected chain is same as appNetworkId
  // 4. If not same, change chain to appNetworkId
  // 5. If same, return true
  // 6. If error, return false

  const connectWalletCheck = async () => {
    try {
      if (!wallet?.accounts[0]?.address) {
        const connectedWallet = await connect(wallet);
        if (!connectedWallet[0]?.accounts[0]?.address) {
          return false;
        }
      }
      if (connectedChain != appNetworkId) {
        return await handleChangeChain(appNetworkId);
      }
      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <BaseContext.Provider
      value={{
        account: wallet?.accounts[0]?.address,
        wallet,
        connect,
        disconnect,
        connecting,
        connectedChain: parseInt(connectedChain?.id, 16),
        provider,
        signer: provider?.getSigner(),
        handleChangeChain,
        appNetworkId,
        setAppNetworkId,
        handleChangeAppNetworkId,
        handleDisconnect,
        fundraisers: { data: allProxies, loading: proxiesLoading },
        connectWalletCheck,
      }}
    >
      {props.children}
    </BaseContext.Provider>
  );
};

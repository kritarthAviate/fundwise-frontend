import { createIcon } from "@download/blockies";

import { minifyAddress } from "src/utils/web3Utils";
import StyledTypography from "src/components/StyledTypography";
import { NameAddressWrapper } from "./styles";
import { useContext } from "react";
import { BaseContext } from "src/context/BaseContext";
import { getExplorerLinkByChainIdForAddress } from "@/src/utils/supportedChains";

export default function NameAddress({
  imgSize,
  textSize,
  address,
  isOnClick = true,
}) {
  const { appNetworkId } = useContext(BaseContext);
  const explorerLink = getExplorerLinkByChainIdForAddress(
    appNetworkId,
    address
  );
  const icon = createIcon({
    // All options are optional
    seed: address, // seed used to generate icon data, default: random
    // size: 10, // width/height of the icon in blocks, default: 10
    // scale: 5, // width/height of each block in pixels, default: 5
  }).toDataURL();

  return (
    <NameAddressWrapper
      onClick={
        isOnClick
          ? (event) => {
              event.stopPropagation();
              window.open(explorerLink, "_blank");
            }
          : () => {}
      }
    >
      <img
        src={icon}
        alt=""
        height={imgSize}
        width={imgSize}
        style={{ borderRadius: "50%" }}
      />
      <StyledTypography type={textSize} fontColor="lightGrey">
        {minifyAddress(address)}
      </StyledTypography>
    </NameAddressWrapper>
  );
}

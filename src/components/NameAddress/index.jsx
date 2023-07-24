import { createIcon } from "@download/blockies";

import { minifyAddress } from "src/utils/web3Utils";
import StyledTypography from "src/components/StyledTypography";
import { NameAddressWrapper } from "./styles";

export default function NameAddress({
  imgSize,
  textSize,
  address = "0xa234bF5AcC3B150907704ce26D855A5638dEF890",
  isOnClick = true,
}) {
  let icon;
  if (typeof window === "object") {
    icon = createIcon({
      // All options are optional
      seed: address, // seed used to generate icon data, default: random
      size: imgSize, // width/height of the icon in blocks, default: 10
      scale: imgSize, // width/height of each block in pixels, default: 5
    }).toDataURL();
  }

  return (
    <NameAddressWrapper
      onClick={
        isOnClick
          ? (event) => {
              event.stopPropagation();
              window.open(`https://goerli.etherscan.io/address/${address}`);
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

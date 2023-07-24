import { useState, useContext } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { styled } from "@mui/material/styles";
import { Box, Menu, MenuItem } from "@mui/material";

import { StyledTypography } from "src/components";
import {
  KeyboardArrowDownIcon,
  KeyboardArrowUpIcon,
  LogoutIcon,
  StarsIcon,
  AssistantPhotoIcon,
} from "src/components/Icons";
import { BaseContext } from "src/context/BaseContext";
import { getWalletIcon } from "src/utils/walletIcons";
import { minifyAddress } from "src/utils/web3Utils";
import { colors } from "src/utils/colors";

export const HeaderSwitch = styled(Box)`
  align-self: center;
  font-size: 14px;
  line-height: 14px;
  padding: 4px 8px;
  border-radius: 32px;
  font-weight: 500;
  background: #ffffff;
  border: 1px solid ${colors.black};
  cursor: pointer;
  align-items: center;

  .center {
    vertical-align: middle;
  }

  .icon {
    font-size: 16px;
  }
`;

export const StyledMenuItem = styled(MenuItem)`
  padding-top: 1;
  padding-bottom: 1;
  display: flex;
  width: 100%;
  gap: 10px;
  font-size: 14px;
  color: ${colors.lightGrey};
  &:hover {
    background-color: ${colors.lightBlack};
  }
  &.Mui-selected {
    background-color: inherit;
    color: inherit;
  }
`;

const WalletInfo = () => {
  const router = useRouter();

  const { wallet, account, handleDisconnect } = useContext(BaseContext);
  const [anchorElWalletProfile, setAnchorElWalletProfile] = useState(null);
  const openWalletProfile = Boolean(anchorElWalletProfile);

  const handleCloseWalletProfile = () => {
    setAnchorElWalletProfile(null);
  };
  const handleClickWalletProfile = (event) => {
    setAnchorElWalletProfile(event.currentTarget);
  };

  return (
    <Box>
      <HeaderSwitch>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}
          onClick={handleClickWalletProfile}
        >
          <Image
            src={getWalletIcon[wallet?.label?.toLowerCase()]}
            width="16px"
            height="16px"
            className="center"
            alt=""
          />
          <Box>
            <StyledTypography type="p4" fontColor={colors.black}>
              {minifyAddress(account, 4)}
            </StyledTypography>
          </Box>
          <Box alignSelf={"flex-end"}>
            {openWalletProfile ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </Box>
        </div>
      </HeaderSwitch>
      <Menu
        sx={{
          marginTop: "8px",
          "& .MuiPaper-root": {
            backgroundColor: colors.secondary,
            borderRadius: "8px",
            minWidth: "180px",
          },
          "& .MuiList-root": {
            padding: "0",
          },
        }}
        anchorEl={anchorElWalletProfile}
        open={openWalletProfile}
        onClose={handleCloseWalletProfile}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <StyledMenuItem onClick={() => router.push("/my-fundraisers")}>
          <Box display={"flex"} alignItems="center" gap="8px">
            <AssistantPhotoIcon fontSize="16px" htmlColor={colors.green} />
            <StyledTypography type="p4" fontColor={"lightGrey"}>
              My Fundraisers
            </StyledTypography>
          </Box>
        </StyledMenuItem>
        <StyledMenuItem onClick={() => router.push("/my-contributions")}>
          <Box display={"flex"} alignItems="center" gap="8px">
            <StarsIcon fontSize="16px" htmlColor={colors.blue} />
            <StyledTypography type="p4" fontColor={"lightGrey"}>
              My Contributions
            </StyledTypography>
          </Box>
        </StyledMenuItem>
        <StyledMenuItem onClick={() => handleDisconnect()}>
          <Box display={"flex"} alignItems="center" gap="8px">
            <span
              style={{
                width: "14px",
                paddingBottom: "2px",
                height: "16px",
              }}
            >
              <LogoutIcon fontSize="16px" htmlColor={colors.red} />
            </span>

            <StyledTypography type="p4" fontColor={"red"}>
              Disconnect Wallet
            </StyledTypography>
          </Box>
        </StyledMenuItem>
      </Menu>
    </Box>
  );
};

export default WalletInfo;

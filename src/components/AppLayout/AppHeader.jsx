import { useContext } from "react";
import { Box, Button } from "@mui/material";
import { useRouter } from "next/router";

import { BaseContext } from "src/context/BaseContext";
import NetworkSwitcher from "./NetworkSwitcher";
import WalletInfo from "./WalletInfo";
import { HeaderWrapper } from "./styles";
import StyledTypography from "../StyledTypography";

const Header = () => {
  const router = useRouter();
  const { account, connect } = useContext(BaseContext);
  return (
    <HeaderWrapper>
      <StyledTypography type="p2" onClick={() => router.push("/")}>
        Fund Wise
      </StyledTypography>
      <Box
        display={"flex"}
        alignItems={"center"}
        marginLeft={"auto"}
        gap={"16px"}
      >
        <StyledTypography type="p4" onClick={() => router.push("/discover")}>
          Discover
        </StyledTypography>
        <StyledTypography
          type="p4"
          onClick={() => router.push("/create/fundraiser")}
        >
          Create Fundraiser
        </StyledTypography>
        <NetworkSwitcher />
        {account ? (
          <WalletInfo />
        ) : (
          <Button onClick={() => connect()}>Connect Wallet</Button>
        )}
      </Box>
    </HeaderWrapper>
  );
};

export default Header;

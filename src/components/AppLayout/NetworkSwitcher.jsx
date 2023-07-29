import { useState, useContext } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Image from "next/image";

import { StyledTypography } from "src/components";
import {
  KeyboardArrowDownIcon,
  KeyboardArrowUpIcon,
} from "src/components/Icons";
import { BaseContext } from "src/context/BaseContext";
import { colors } from "src/utils/colors";
import {
  chainsForNetworkSwitcher,
  chainMapping,
} from "src/utils/supportedChains";

export default function NetworkSwitcher() {
  const { appNetworkId, handleChangeAppNetworkId } = useContext(BaseContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNetworkChange = (chainId) => {
    handleChangeAppNetworkId(chainId);
    handleClose();
  };

  return (
    <div>
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        onClick={handleClick}
        endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
        startIcon={
          <Image
            src={chainMapping[appNetworkId]?.logo}
            width={"16"}
            height={"16"}
            alt={""}
          />
        }
        sx={{
          textTransform: "none",
          backgroundColor: colors.black,
          color: colors.lightGrey,
          borderRadius: "50px",
          "&:hover": {
            backgroundColor: colors.lightBlack,
          },
        }}
      >
        {chainMapping[appNetworkId]?.label}
      </Button>
      <Menu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        sx={{
          marginTop: "8px",
          "& .MuiPaper-root": {
            backgroundColor: colors.secondary,
            borderRadius: "8px",
            minWidth: "150px",
          },
          "& .MuiList-root": {
            padding: "0",
          },
        }}
      >
        {chainsForNetworkSwitcher.map((chain) => (
          <MenuItem
            onClick={() => handleNetworkChange(chain.id)}
            disableRipple
            key={chain.id}
            sx={{
              "&:hover": {
                backgroundColor: colors.lightBlack,
              },
              backgroundColor: "inherit",
              color: colors.lightGrey,
              fontSize: "14px",

              paddingTop: 1,
              paddingBottom: 1,
              display: "flex",
              width: "100%",
              gap: "10px",
              // color: 'inherit' when selected
              "&[aria-selected='true']": {
                backgroundColor: "inherit",
                color: "inherit",
              },
            }}
          >
            <Image
              src={chain.logo}
              width={"16"}
              height={"16"}
              style={{ verticalAlign: "middle" }}
              alt={""}
            />
            <StyledTypography
              type="p4"
              fontColor={colors.lightGrey}
              lineHeightSameAsFont
            >
              {chain.label}
            </StyledTypography>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
}

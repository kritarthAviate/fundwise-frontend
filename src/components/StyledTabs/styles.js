import styled from "styled-components";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

import { colors } from "src/utils/colors";

export const StyledTabs = styled(Tabs)`
  .MuiTabs-indicator {
    background-color: ${colors.lightGrey}; /* Change the color of the selected tab indicator */
  }
`;

// Create a custom styled Tab component
export const StyledTab = styled(Tab)`
  && {
    color: ${colors.lightGrey};
    font-size: 16px;
    font-weight: 500; /* Change the color of the tab text */
  }
`;

import styled from "@emotion/styled";
import { Box } from "@mui/material";

import { colors } from "src/utils/colors";

export const HeaderWrapper = styled(Box)`
  width: 100%;
  margin-x: auto;
  display: flex;
  align-item: center;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 20px;
  padding-bottom: 20px;
  background: ${colors.secondary};
  box-shadow: 3px -1px 15px 0px;
  height: 77px;
  position: sticky;
  top: 0;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

export const PageContainer = styled.div`
  margin: 40px;
  flex: 1;
  overflow-y: auto;
`;

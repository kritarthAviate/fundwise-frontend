import styled from "@emotion/styled";

import { colors } from "src/utils/colors";
import { INNER_SPACE } from "./helper";

export const TitleSection = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

export const Container = styled.div`
  padding: 40px 70px 40px 70px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const BodyContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 24px;
  align-items: flex-start;
`;

export const Seperator = styled.div`
  height: 0.8px;
  background: ${colors.dullGrey};
  margin-left: ${INNER_SPACE};
  margin-right: ${INNER_SPACE};
`;

export const LeftContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  gap: 20px;
  justify-content: flex-end;
  .section_1 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: ${INNER_SPACE};
    padding-right: ${INNER_SPACE};
  }
  .social_icons_section {
    display: flex;
    flex-direction: row;
    gap: 15px;
  }
  .description_section {
    padding-left: ${INNER_SPACE};
    padding-right: ${INNER_SPACE};
  }
`;

import styled from "styled-components";

// import { colors } from 'src/utils/colors';

export const Container = styled.div`
  padding: 40px 70px 40px 70px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  .tab_section {
    color: white;
    &.Mui-selected {
      background: white;
    }
  }
`;

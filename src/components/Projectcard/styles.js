import styled from "styled-components";

import { colors } from "src/utils/colors";

export const CardWrapper = styled.div`
  border-radius: 8px;
  background: ${colors.secondary};
  cursor: pointer;
  height: 350px;
  box-shadow: 3px -1px 15px 0px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .percentage-section {
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .image-section {
    height: 200px;
  }
  .contents {
    padding: 20px;
  }
  img {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  transition: 1s;

  &:hover {
    transform: scale(1.05);
    z-index: 2;
  }

  .loader {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

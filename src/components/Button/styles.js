import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Button } from "@mui/material";

import { colors } from "src/utils/colors";

export const ButtonWrapperMulti = styled(Button)`
  /* Add your custom styles here */
  text-transform: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  background: linear-gradient(to bottom, #c435a4, #10cee6);
  &:hover {
    background: linear-gradient(to bottom, ${colors.pink}, ${colors.teal});
  }
  /* Conditional styles */
  ${(props) =>
    (props.disabled || props.loading) &&
    css`
      background: linear-gradient(to bottom, #c289b6, #37747c);
      cursor: default;
    `}

  ${(props) =>
    !props.disabled ||
    (!props.loading &&
      css`
        cursor: pointer;
      `)}
`;

export const ButtonWrapperBlack = styled(Button)`
  /* Add your custom styles here */
  text-transform: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  background: ${colors.black};
  &:hover {
    background: ${colors.lightBlack};
  }
  /* Conditional styles */
  ${(props) =>
    (props.disabled || props.loading) &&
    css`
      background: ${colors.disabledColor};
      cursor: default;
    `}

  ${(props) =>
    !props.disabled ||
    (!props.loading &&
      css`
        cursor: pointer;
      `)}
`;

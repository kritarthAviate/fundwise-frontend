import { Typography } from "@mui/material";

import {
  calculateFontColor,
  calculateFontSize,
  calculateFontWeight,
  calculateLineHeight,
} from "./utils";

export default function StyledTypography({
  children,
  lineHeightSameAsFont = false,
  type = "p4",
  fontColor = "white",
  component = "p",
  onClick,
  sx,
  ...otherProps
}) {
  if (onClick) {
    return (
      <Typography
        fontSize={calculateFontSize(type)}
        lineHeight={
          lineHeightSameAsFont
            ? calculateFontWeight(type)
            : calculateLineHeight(type)
        }
        fontWeight={calculateFontWeight(type)}
        color={calculateFontColor(fontColor)}
        component={component}
        onClick={onClick}
        sx={{ cursor: "pointer", display: "flex", alignItems: "center", ...sx }}
        {...otherProps}
      >
        {children}
      </Typography>
    );
  }
  return (
    <Typography
      fontSize={calculateFontSize(type)}
      lineHeight={calculateLineHeight(type)}
      fontWeight={calculateFontWeight(type)}
      color={calculateFontColor(fontColor)}
      component={component}
      {...otherProps}
      sx={{ display: "flex", alignItems: "center", ...sx }}
    >
      {children}
    </Typography>
  );
}

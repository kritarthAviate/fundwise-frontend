import styled from "styled-components";

import { StyledTypography } from "src/components";
import { colors } from "src/utils/colors";

const StatusBox = styled.span``;

export default function Status({ status }) {
  const getColor = () => {
    if (status === "ONGOING") return colors.blue;
    if (status === "SUCCESS") return colors.green;
    if (status === "FAILED") return colors.red;
    return "white";
  };

  const color = getColor();

  return (
    <span
      type="p5"
      fontColor={color}
      component="span"
      style={{
        fontSize: "12px",
        borderRadius: "12px",
        color: `${color}`,
        padding: "4px 10px",
        border: `1px solid ${color}`,
        verticalAlign: "middle",
        marginLeft: "10px",
      }}
    >
      {status}
    </span>
  );
}

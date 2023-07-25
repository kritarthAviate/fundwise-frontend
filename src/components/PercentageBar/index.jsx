import { colors } from "src/utils/colors";
import { BigNumber } from "ethers";

const PercentageBar = ({ total, part }) => {
  let percentage = 0;
  if (part && total) {
    const partBN = BigNumber.from(part);
    const totalBN = BigNumber.from(total);
    const percentageBN = partBN.mul(100).div(totalBN);
    percentage = percentageBN.toString();
    if (percentage > 100) percentage = 100;
  }

  return (
    <div
      style={{
        background: colors.dullGrey,
        height: ".3rem",
        borderRadius: "6.25rem",
      }}
    >
      <div
        style={{
          width: `${percentage}%`,
          background: colors.green,
          height: ".3rem",
          borderRadius: "6.25rem",
        }}
      ></div>
    </div>
  );
};

export default PercentageBar;

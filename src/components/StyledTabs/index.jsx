import { StyledTabs, StyledTab } from "./styles";

const StyledTabsComp = ({ value, handleChange, options }) => {
  console.log({ options });
  return (
    <div>
      <StyledTabs value={value} onChange={handleChange}>
        {options.map((option) => {
          return (
            <StyledTab
              key={option.value}
              label={option.label}
              value={option.value}
            />
          );
        })}
      </StyledTabs>
    </div>
  );
};

export default StyledTabsComp;

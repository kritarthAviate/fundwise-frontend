import { useState } from "react";

import { StyledTabs } from "src/components";
import useMyFundraisers from "./useMyFundraisers";
import { Container } from "./styles";

export default function MyFundraisers() {
  const { loading } = useMyFundraisers();
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loading) return null;

  return (
    <Container>
      <StyledTabs
        value={value}
        handleChange={handleChange}
        options={[
          { label: "Fundraisers created by me", value: "1" },
          { label: "Fundraisers for me", value: "2" },
        ]}
      />
      <div style={{ color: "white" }}>{value}</div>
    </Container>
  );
}

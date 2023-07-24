import { useState } from "react";

import { StyledTabs } from "src/components";
import useMyContributions from "./useMyContributions";
import { Container } from "./styles";

export default function MyContributions() {
  const { loading } = useMyContributions();
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    console.log({ newValue });
    setValue(newValue);
  };
  if (loading) return null;
  return (
    <Container>
      <StyledTabs
        value={value}
        handleChange={handleChange}
        options={[
          { label: "My contributions", value: "1" },
          { label: "My certificates", value: "2" },
        ]}
      />
      <div style={{ color: "white" }}>{value}</div>
    </Container>
  );
}

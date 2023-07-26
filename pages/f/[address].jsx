import { Backdrop } from "@mui/material";
import { useRouter } from "next/router";
import ProjectDetails from "src/screens/ProjectDetails";
import { useContext } from "react";
import { BaseContext } from "@/src/context/BaseContext";
import { StyledTypography } from "@/src/components";

export default function CreatePage() {
  const router = useRouter();
  const { address } = router.query;
  const { fundraisers } = useContext(BaseContext);

  const { data, loading } = fundraisers;

// TODO
  if (loading)
    return (
      <Backdrop open={loading} style={{ zIndex: 100 }}>

      </Backdrop>

    );

  const fundraiserData = data.find((ele) => ele.proxyAddress == address);

  if (!fundraiserData) {
    return (
      <StyledTypography type={"h2"} fontColor="white">
        No Project Found
      </StyledTypography>
    );
  }

  return (
    <>
      <ProjectDetails fundraiserData={fundraiserData} />
    </>
  );
}

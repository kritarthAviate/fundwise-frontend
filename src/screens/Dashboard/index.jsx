import { useRouter } from "next/router";

import hope from "public/hope.jpg";
import { Button, StyledTypography } from "src/components";
import DashboardIllustration from "./DashboardIllustration";
import { Container } from "./styles";

export default function Dashboard() {
  const router = useRouter();

  return (
    <Container>
      <div className="body_section">
        <div className="left_section">
          <StyledTypography
            component={"div"}
            type={"h1"}
            fontColor="dullGrey"
            sx={{ opacity: 0.6 }}
          >
            Empowering the Future:
          </StyledTypography>

          <StyledTypography
            type={"h1"}
            fontColor="dullGrey"
            sx={{ opacity: 0.6, marginBottom: "20px" }}
          >
            Join the Web3 Crowdfunding Revolution!
          </StyledTypography>

          <StyledTypography
            component={"div"}
            type={"p3"}
            fontColor="lightGrey"
            sx={{ marginBottom: "30px", paddingRight: "100px" }}
          >
            {
              "Join the revolution of decentralized crowdfunding. Embrace the power of Web3 and play an active role in shaping the projects that will shape our future. Connect your Web3 wallet now to begin your journey with FundWise! Together, let's empower innovation, elevate communities, and pave the way for a more inclusive world."
            }
          </StyledTypography>

          <Button
            variant="multi"
            sx={{ width: "300px" }}
            size={"large"}
            onClick={() => router.push(`/discover`)}
          >
            Discover fundraisers
          </Button>
        </div>
      </div>
      <div className="image-icon">
        <DashboardIllustration />
      </div>
      <img
        src={hope.src}
        width={"100%"}
        height={"100%"}
        alt="Picture of the author"
      />
    </Container>
  );
}

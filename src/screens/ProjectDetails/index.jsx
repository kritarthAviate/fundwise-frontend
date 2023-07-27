import { useContext } from "react";

import { NameAddress, StyledTypography } from "src/components";
import Status from "./components/Status";
import SocialIconsComp from "./components/SocialIconsComp";
import StickyCard from "./components/StickyCard";
import { useGetContributions, useGetDataFromIpfs } from "src/queries";
import { BaseContext } from "src/context/BaseContext";
import { colors } from "src/utils/colors";
import { getSocialPlatformsData } from "./helper";
import {
  Container,
  LeftContainer,
  BodyContainer,
  Seperator,
  TitleSection,
} from "./styles";
import Box from "src/components/Box";
import { useImplementationContract } from "src/hooks";

export default function ProjectDetails({ fundraiserData }) {
  const { ipfsLink, proxyAddress, receiverAddress, typeOfFunding } =
    fundraiserData;

  const { projectStatus } = useImplementationContract(
    proxyAddress,
    typeOfFunding
  );

  const { appNetworkId } = useContext(BaseContext);

  const { data: ipfsData, isLoading: ipfsLoading } =
    useGetDataFromIpfs(ipfsLink);
  const { data: contributionsData } = useGetContributions(
    proxyAddress,
    typeOfFunding,
    appNetworkId
  );

  if (ipfsLoading || !ipfsData) return;

  const { title, description, imageUrl, videoUrl } = ipfsData;

  const socialLinksData = getSocialPlatformsData(ipfsData);

  return (
    <Container>
      <TitleSection>
        <div
          style={{
            gap: "10px",
            color: colors.white,
            fontWeight: 700,
            fontSize: "32px",
            width: "400x",
            alignItems: "center",
            display: "flex",
          }}
        >
          {title}
          <Status status={projectStatus} />
        </div>
      </TitleSection>

      <BodyContainer>
        <LeftContainer>
          {imageUrl && (
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              borderRadius="16px"
              bgcolor={colors.secondary}
            >
              <img
                src={imageUrl}
                style={{
                  height: "410px",
                  maxWidth: "100%",
                  alignSelf: "center",
                }}
              />
            </Box>
          )}
          <div className="section_1">
            <NameAddress
              imgSize={"25px"}
              textSize={"p3"}
              isOnClick
              address={receiverAddress}
            />
            <div className="social_icons_section">
              {socialLinksData.map((item) => {
                return (
                  <SocialIconsComp
                    color={item.color}
                    type={item.type}
                    url={item.url}
                    key={item.type}
                  />
                );
              })}
            </div>
          </div>

          {videoUrl && (
            <>
              <Seperator />

              <video width="100%" height="100%" controls>
                <source src={videoUrl} type="video/mp4" />
              </video>
            </>
          )}
          <Seperator />
          <div className="description_section">
            <StyledTypography type={"p3"} fontColor={"lightGrey"}>
              {description}
            </StyledTypography>
          </div>
        </LeftContainer>
        <StickyCard
          {...{ ...fundraiserData, ...ipfsData, contributionsData }}
        />
      </BodyContainer>
    </Container>
  );
}

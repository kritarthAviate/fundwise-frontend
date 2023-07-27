import { useRouter } from "next/navigation";
import { formatUnits } from "ethers/lib/utils";

import { useImplementationContract } from "src/hooks";
import { Loader, StyledTypography, PercentageBar } from "src/components";
import { useGetDataFromIpfs } from "src/queries";
import { CardWrapper } from "./styles";

const ProjectCard = ({ project }) => {
  const { totalAmountRaisedInWei, currencySymbol, decimals } =
    useImplementationContract(project.proxyAddress, project.typeOfFunding);

  const { data: ipfsData } = useGetDataFromIpfs(project?.ipfsLink);

  const router = useRouter();

  return (
    <CardWrapper onClick={() => router.push(`/f/${project.proxyAddress}`)}>
      {!ipfsData ? (
        <div className="loader">
          <Loader />
        </div>
      ) : (
        <>
          <div className="image-section">
            <img
              src={ipfsData?.imageUrl || "/sample.jpg"}
              width={"100%"}
              height={"100%"}
              alt="project image"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className="contents">
            <StyledTypography
              type={"h5"}
              fontColor="white"
              sx={{
                textTransform: "uppercase",
                marginBottom: "5px",
                overflow: "hidden",
              }}
            >
              {ipfsData?.title}
            </StyledTypography>
            <StyledTypography type={"p3"} fontColor="lightGrey">
              {project.description}
            </StyledTypography>
            <div className="percentage-section">
              <PercentageBar
                total={project.targetAmountInWei}
                part={totalAmountRaisedInWei}
              />
            </div>
            <div>
              <StyledTypography
                type={"p3"}
                fontColor="white"
                component="strong"
              >
                {`${currencySymbol} ${formatUnits(
                  totalAmountRaisedInWei,
                  decimals
                )} raised of`}
                &nbsp;
                <StyledTypography type={"p3"} fontColor="lightGrey">
                  {`${currencySymbol} ${formatUnits(
                    project.targetAmountInWei,
                    decimals
                  )}`}
                </StyledTypography>
              </StyledTypography>
            </div>
          </div>
        </>
      )}
    </CardWrapper>
  );
};

export default ProjectCard;

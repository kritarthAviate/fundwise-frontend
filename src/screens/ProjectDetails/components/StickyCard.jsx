import { useContext, useState } from "react";
import { useQueryClient } from "react-query";
import styled from "@emotion/styled";
import { formatUnits, getAddress } from "ethers/lib/utils";

import {
  PercentageBar,
  StyledTypography,
  Button,
  CopyToClipboard,
} from "src/components";
import { BaseContext } from "src/context/BaseContext";
import { colors } from "src/utils/colors";
import { useImplementationContract } from "src/hooks";
import DonateModal from "./DonateModal";
import { BORDER_RADIUS } from "../helper";

const StickyCardContainer = styled.div`
  background: ${colors.secondary};
  width: 400px;
  border-radius: ${BORDER_RADIUS};
  box-shadow: 2px 2px 15px 0px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  .buttons_section {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    margin-top: 20px;
  }
`;

const StickyCard = ({
  proxyAddress,
  typeOfFunding,
  targetAmount,
  contributionsData,
  targetAmountInWei,
  receiverAddress,
}) => {
  const queryClient = useQueryClient();
  const { connectWalletCheck, account } = useContext(BaseContext);
  const [showDonateModal, toggleDonateModal] = useState(false);
  const [lodingDonate, setLoadingDonate] = useState(false);
  const {
    totalAmountRaisedInWei,
    currencySymbol,
    donate,
    decimals,
    refetchAmountRaised,
    projectStatus,
    withdrawFunds,
    refetchProjectStatus,
    claimCertificate,
    fundsWithdrawn,
    certificateClaimed,
  } = useImplementationContract(proxyAddress, typeOfFunding);
  const fundType = { symbol: currencySymbol };

  const isLoggedIn = !!account;

  const isMyfundraiser =
    isLoggedIn && getAddress(account) === getAddress(receiverAddress);
  const haveIContributed =
    isLoggedIn &&
    contributionsData?.some(
      (contribution) => contribution.contributorAddress === getAddress(account)
    );

  const handleDonate = async (amount) => {
    try {
      setLoadingDonate(true);
      const walletCheck = await connectWalletCheck();
      if (!walletCheck) return;
      await donate(amount);
      queryClient.invalidateQueries("contributions", proxyAddress);
      await refetchAmountRaised();
      toggleDonateModal(false);
    } catch (error) {
      console.log({ error });
    } finally {
      setLoadingDonate(false);
    }
  };

  const handleWithdrawClick = async () => {
    const walletCheck = await connectWalletCheck();
    if (!walletCheck) return;
    await withdrawFunds();
    await refetchProjectStatus();
  };

  const handleClaimCertificate = async () => {
    const walletCheck = await connectWalletCheck();
    if (!walletCheck) return;
    await claimCertificate();
  };

  const renderButton = () => {
    if (projectStatus === "ONGOING") {
      return (
        <Button
          variant="multi"
          sx={{ width: "100%" }}
          size={"large"}
          onClick={() => toggleDonateModal(true)}
        >
          Donate
        </Button>
      );
    }
    if (projectStatus === "SUCCESS" && isMyfundraiser && isLoggedIn) {
      return (
        <Button
          variant="multi"
          sx={{ width: "100%" }}
          size={"large"}
          onClick={handleWithdrawClick}
          disabled={fundsWithdrawn}
        >
          {fundsWithdrawn ? `Funds withdrawn` : `Withdraw all donations`}
        </Button>
      );
    }

    if (projectStatus === "FAILED" && haveIContributed && isLoggedIn) {
      return (
        <Button variant="multi" sx={{ width: "100%" }} size={"large"}>
          Withdraw back Contributions
        </Button>
      );
    }
  };

  const renderCertificateButton = () => {
    if (projectStatus === "SUCCESS" && haveIContributed && isLoggedIn) {
      return (
        <Button
          sx={{ width: "100%" }}
          size={"large"}
          onClick={handleClaimCertificate}
          variant="multi"
          disabled={certificateClaimed}
        >
          {certificateClaimed ? `Certificate claimed` : `Claim my certificate`}
        </Button>
      );
    }
  };

  return (
    <StickyCardContainer>
      <div>
        <StyledTypography type={"p2"} fontColor="white" component="strong">
          {`${fundType.symbol} ${formatUnits(
            totalAmountRaisedInWei,
            decimals
          )}`}
          &nbsp;
          <StyledTypography type={"p4"} fontColor="lightGrey">
            {`raised of ${fundType.symbol} ${targetAmount}`}
          </StyledTypography>
        </StyledTypography>
      </div>

      <PercentageBar total={targetAmountInWei} part={totalAmountRaisedInWei} />
      <StyledTypography type={"p4"} fontColor="lightGrey">
        {contributionsData?.length} donation(s)
      </StyledTypography>

      <div className="buttons_section">
        <CopyToClipboard
          value={window.location.href}
          text={"Click to copy link to this page"}
        >
          <Button style={{ width: "100%" }} size={"large"}>
            Share fundraiser
          </Button>
        </CopyToClipboard>

        {renderButton()}
        {renderCertificateButton()}
      </div>
      <DonateModal
        handleDonate={handleDonate}
        currencySymbol={currencySymbol}
        decimals={decimals}
        showModal={showDonateModal}
        toggleModal={toggleDonateModal}
        loading={lodingDonate}
      />
    </StickyCardContainer>
  );
};

export default StickyCard;

import styled from "styled-components";
import { Dialog as MUIDialog } from "@mui/material";
import { makeStyles } from "@mui/styles";

import { StyledTypography } from "src/components";
import { ArrowBackIosRoundedIcon } from "src/components/Icons";
import { colors } from "src/utils/colors";

const useStyles = makeStyles(() => ({
  backdrop: {
    opacity: 0.4,
    background: "rgba(0, 0, 0, 0.6)", // Customize the backdrop color and opacity
  },
}));

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 8px;
  background: ${colors.secondary};
  padding: 24px;
  gap: 16px;
`;

const Title = styled.div`
  background: ${colors.secondary};
  display: flex;
  align-items: center;
  justify-content: space-between;
  align-self: stretch;
`;

const Body = styled.div``;

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  width: 100%;
`;

export const DialogSeperator = styled.div`
  width: 100%;
  background: ${colors.lightGrey};
  height: 0.01px;
`;

export const DialogContainer = ({ children }) => {
  return <Container>{children}</Container>;
};

export const DialogTitle = ({ value, handleClose, showClose }) => {
  return (
    <Title>
      <StyledTypography color={"lightGrey"} type="h5">
        {value}
      </StyledTypography>
      {showClose && (
        <div style={{ display: "flex", alignItems: "center" }}>
          <ArrowBackIosRoundedIcon
            fontSize="large"
            htmlColor={colors.lightGrey}
          />
        </div>
      )}
    </Title>
  );
};

export const DialogBody = ({ value }) => {
  return (
    <Body>
      <StyledTypography sx={{ color: colors.dullGrey }} type="p3">
        {value}
      </StyledTypography>
    </Body>
  );
};

export const DialogFooter = ({ children }) => {
  return <Footer>{children}</Footer>;
};

const CustomDialog = ({ showModal, handleClose, children, style = {} }) => {
  const classes = useStyles();

  return (
    <MUIDialog
      onClose={handleClose}
      open={showModal}
      BackdropProps={{
        classes: {
          root: classes.backdrop, // Apply the custom backdrop style
        },
      }}
      PaperProps={{
        style: {
          borderRadius: "8px",
          background: "none",
          boxShadow: "6px 5px 12px 2px",
          ...style,
        },
      }}
    >
      {children}
    </MUIDialog>
  );
};

export default CustomDialog;

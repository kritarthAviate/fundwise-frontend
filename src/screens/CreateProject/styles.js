import styled from "styled-components";
import { Box } from "src/components";

export const Container = styled.form``;

export const FormContainer = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 20px;
  overflow: scroll;
  width: 55vw;
`;

export const FormSection = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const MainHeaderBox = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 20px;
  .header_section {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
`;

export const InputFlexContainer = styled(Box)`
  display: flex;
  gap: 20px;
`;

export const ButtonBox = styled.div`
  display: flex;
  gap: 20px;
  justify-content: flex-end;
`;

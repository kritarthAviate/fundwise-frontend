import styled from "styled-components";
import { TextField } from "@mui/material";

import { colors } from "src/utils/colors";

const InputFieldContainer = styled(TextField)`
  && {
    color: ${colors.dullGrey};

    .MuiOutlinedInput-notchedOutline {
      border: 1px solid ${colors.dullGrey};
    }
    & .MuiInputBase-root {
      color: ${colors.lightGrey}; /* Replace with your desired text color */
    }

    & .MuiFormLabel-root {
      color: ${colors.dullGrey}; /* Replace with your desired label color */
    }
    & .Mui-error .MuiOutlinedInput-notchedOutline {
      border: 1px solid red; /* Replace with your desired error color */
    }
  }
`;

const InputField = ({ ...rest }) => (
  <InputFieldContainer {...rest} color="secondary" />
);

export default InputField;

import { TextField } from "@mui/material";
import styled from "@emotion/styled";

import { colors } from "src/utils/colors";

const TextAreaContainer = styled(TextField)`
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

const TextArea = ({ ...rest }) => {
  return <TextAreaContainer {...rest} />;
};

TextArea.defaultProps = {
  rows: 3,
  placeholder: "Write here...",
  multiline: true,
};

export default TextArea;

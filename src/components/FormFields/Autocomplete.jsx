import Autocomplete from "@mui/material/Autocomplete";
import { makeStyles } from "@mui/styles";

import { colors } from "src/utils/colors";
import InputField from "./InputField";

const useStyles = makeStyles(() => ({
  autocomplete: {
    /* Add your custom styles here */
  },
  inputRoot: {
    /* Add your custom styles here */
  },
  inputInput: {
    /* Add your custom styles here */
  },
  option: {
    /* Add your custom styles here */
    color: colors.lightGrey,
    "&:hover": {
      background: colors.lightBlack,
    },
  },
  optionHover: {
    background: colors.lightBlack,
    /* Add your hover styles here */
  },
  paper: {
    /* Add your custom styles here */
    background: colors.secondary,
    borderRadius: "8px",
    boxShadow: "3px -1px 15px 0px",
  },
  icon: {
    color: colors.lightGrey, // Add your custom icon color here
  },
}));

const CustomAutocomplete = ({
  name,
  options,
  label,
  onChange,
  error,
  helperText,
  required,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Autocomplete
      name={name}
      options={options}
      renderInput={(params) => (
        <InputField
          label={label}
          error={error}
          helperText={helperText}
          required={required}
          {...params}
        />
      )}
      onChange={onChange}
      isOptionEqualToValue={(option, value) =>
        option.id === value.id && option.label === value.label
      }
      classes={{
        root: classes.autocomplete,
        inputRoot: classes.inputRoot,
        inputInput: classes.inputInput,
        option: classes.option,
        paper: classes.paper,
        clearIndicator: classes.icon,
        popupIndicator: classes.icon,
      }}
      {...rest}
      /* Other props */
    />
  );
};

export default CustomAutocomplete;

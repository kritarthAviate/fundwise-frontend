import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

const SingleSelect = ({ label, options, ...rest }) => {
  return (
    <Select
      labelId="simple-select-label"
      id="select-id"
      label={label}
      {...rest}
    >
      {options?.map((item) => (
        <MenuItem key={item.value} value={item.value}>
          {item.label}
        </MenuItem>
      ))}
    </Select>
  );
};

SingleSelect.defaultProps = {
  disabled: false,
  error: false,
  value: "",
  helperText: "",
  displayEmpty: false,
  name: "select",
  validate: () => {},
};

export default SingleSelect;

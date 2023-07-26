import { useState } from "react";

import { Button, FormFields } from "src/components";
import CustomDialog, {
  DialogContainer,
  DialogTitle,
  DialogBody,
  DialogFooter,
} from "src/components/CustomDialog";

import { extractDecimalNumber } from "src/utils/web3Utils";

const { InputField } = FormFields;

const DonateModal = ({
  showModal,
  toggleModal,
  currencySymbol,
  decimals,
  handleDonate,
}) => {
  const [value, setValue] = useState("");

  const handleChange = (event) => {
    const _value = event.target.value;
    const newValue = extractDecimalNumber(_value, decimals);
    setValue(newValue);
  };

  return (
    <CustomDialog
      showModal={showModal}
      handleClose={() => toggleModal(false)}
      style={{ width: "420px" }}
    >
      <DialogContainer>
        <div style={{ marginBottom: "10px" }}>
          <DialogTitle
            value={"Donate"}
            handleClose={() => toggleModal(false)}
          />
        </div>
        <div>
          <DialogBody
            value={`Enter the value in ${currencySymbol} to donate for the cause`}
            handleClose={() => toggleModal(false)}
          />

          <InputField
            variant="outlined"
            required
            sx={{ width: "100%", marginTop: "12px" }}
            value={value}
            onChange={handleChange}
          />
        </div>

        <DialogFooter>
          <Button onClick={() => toggleModal(false)} sx={{ flex: 1 }}>
            Back
          </Button>
          <Button
            variant="multi"
            onClick={() => handleDonate(value)}
            sx={{ flex: 1 }}
          >
            Donate
          </Button>
        </DialogFooter>
      </DialogContainer>
    </CustomDialog>
  );
};

export default DonateModal;

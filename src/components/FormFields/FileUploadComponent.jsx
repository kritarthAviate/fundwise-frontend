import { useState } from "react";
import styled from "@emotion/styled";

import { UploadIcon } from "src/components/Icons";
import useFileUpload from "src/hooks/useIPFSUpload";
import { colors } from "src/utils/colors";

export const FileTypeContainer = styled.div`
  input[type="file"] {
    display: none;
  }
  label {
    color: ${colors.lightGrey};
    padding: 20px;
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 8px;
    background: black;
    cursor: pointer;
    font-size: 16px;
  }
  label:hover {
    background: ${colors.lightBlack};
  }
`;

const FileUploadComponent = ({
  maxSize = 5,
  setUploadedLink,
  btnText,
  id,
  accept,
}) => {
  const { uploadFile } = useFileUpload();
  const [textToDisplay, setTextToDisplay] = useState(btnText);

  const handleUpload = async (event) => {
    // only allow total size of 5MB
    const selectedFile = event.target.files[0];
    if (selectedFile.size > maxSize * 1024 * 1024) {
      alert(`File size should be less than ${maxSize}MB`);
      // reset the selected files
      event.target.value = null;
      return;
    }
    setTextToDisplay("Uploading...");
    const ipfsLink = await uploadFile(selectedFile);
    setTextToDisplay(selectedFile?.name || "Uploaded");
    setUploadedLink(ipfsLink);
  };

  return (
    <FileTypeContainer>
      <input type="file" id={id} onChange={handleUpload} accept={accept} />
      <label htmlFor={id}>
        <UploadIcon fontSize="small" htmlColor={colors.lightGrey} />
        {textToDisplay}
      </label>
    </FileTypeContainer>
  );
};

export default FileUploadComponent;

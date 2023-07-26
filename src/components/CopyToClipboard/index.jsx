import React, { useCallback, useEffect, useState } from "react";
import { Tooltip } from "@mui/material";
import copy from "copy-to-clipboard";

const CopyToClipboard = ({
  children,
  value,
  text,
  copiedMessage = `Copied `,
  disabled = false,
  ...passThrough
}) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let timer;
    if (copied) {
      timer = setTimeout(() => setCopied(false), 1500);
    }

    return () => clearTimeout(timer);
  }, [copied]);

  const onClickCopy = useCallback(
    (event) => {
      event.stopPropagation();
      copy(value);
      setCopied(true);
    },
    [value]
  );

  if (disabled) {
    return <React.Fragment>{children}</React.Fragment>;
  }
  return (
    <div style={{ width: "100%" }} {...passThrough}>
      <Tooltip
        title={copied ? copiedMessage : `${text ? text : "Click to Copy"}`}
        placement="top"
      >
        <div onClick={onClickCopy} {...passThrough}>
          {children}
        </div>
      </Tooltip>
    </div>
  );
};

export default CopyToClipboard;

import { colors } from "src/utils/colors";

import { ButtonWrapperMulti, ButtonWrapperBlack } from "./styles";

const ButtonMulti = ({
  children,
  loading = false,
  disabled = false,
  onClick,
  ...rest
}) => {
  if (loading || disabled) {
    return (
      <ButtonWrapperMulti
        style={{ color: colors.lightWhite }}
        loading={loading}
        disabled={disabled}
        {...rest}
      >
        {loading ? "loading..." : children}
      </ButtonWrapperMulti>
    );
  }
  return (
    <ButtonWrapperMulti
      style={{ color: colors.lightWhite }}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </ButtonWrapperMulti>
  );
};

const ButtonBlack = ({
  children,
  loading = false,
  disabled = false,
  onClick,
  ...rest
}) => {
  if (loading || disabled) {
    return (
      <ButtonWrapperBlack
        style={{ color: colors.lightWhite }}
        loading={loading}
        disabled={disabled}
        {...rest}
      >
        {loading ? "loading..." : children}
      </ButtonWrapperBlack>
    );
  }
  return (
    <ButtonWrapperBlack
      style={{ color: colors.lightWhite }}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </ButtonWrapperBlack>
  );
};

const Button = ({
  variant,
  children,
  loading = false,
  disabled = false,
  onClick,
  ...rest
}) => {
  if (variant === "multi")
    return (
      <ButtonMulti
        style={{ color: colors.lightWhite }}
        loading={loading}
        disabled={disabled}
        onClick={onClick}
        {...rest}
      >
        {children}
      </ButtonMulti>
    );
  return (
    <ButtonBlack
      style={{ color: colors.lightWhite }}
      loading={loading}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      {children}
    </ButtonBlack>
  );
};

export default Button;

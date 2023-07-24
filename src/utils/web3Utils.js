import { ethers as _ethers, BigNumber, utils } from "ethers";

export const ethers = _ethers;

export const extractDecimalNumber = (_value, _maxDecimals = 6) => {
  const numArr = String(_value)
    .replace(/[^0-9.]/g, "")
    .split(".");
  const wholePart = numArr[0] || "";
  const decimalPart = numArr[1] || "";
  const dot = String(_value).includes(".") ? "." : "";
  return wholePart + dot + decimalPart.slice(0, _maxDecimals);
};

export const extractNaturalNumber = (_value) => {
  const numArr = String(_value)
    .replace(/[^0-9.]/g, "")
    .split(".");
  const wholePart = numArr[0] || "";
  return wholePart;
};

export const commifyNumber = (_value) => {
  const numArr = String(_value).split(".");
  const wholePart = numArr[0] || "";
  const commifiedWholePart =
    wholePart.length > 0 ? utils.commify(wholePart) : "";
  const decimalPart = numArr[1] || "";
  const dot = String(_value).includes(".") ? "." : "";
  return commifiedWholePart + dot + decimalPart;
};

export const minifyAddress = (_address, _middleChars = 6, _endChars = 4) => {
  if (!_address) return "";
  if (_address.substr(-4) == ".eth" && _address.length < 20) return _address;
  return `${_address.substring(0, _middleChars + 2)}...${_address.substring(
    _address.length - _endChars
  )}`;
};

export const formatWeiToDecimal = (_weiString, _decimal) => {
  return _ethers.utils.formatUnits(BigNumber.from(_weiString), _decimal);
};

export const formatDecimalToWei = (_decimalString, _decimal) => {
  return _ethers.utils.parseUnits(_decimalString, _decimal).toString();
};

export const isValidAddress = (_address) => {
  return _ethers.utils.isAddress(_address);
};

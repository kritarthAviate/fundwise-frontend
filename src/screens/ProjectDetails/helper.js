export const getSocialPlatformsData = (_data) => {
  let result = [];
  if (_data.facebook) {
    result.push({
      type: "facebook",
      url: _data.facebook,
      color: "#1976d2",
    });
  }

  if (_data.instagram) {
    result.push({
      type: "instagram",
      url: _data.instagram,
      color: "#E1306C",
    });
  }

  if (_data.twitter) {
    result.push({
      type: "twitter",
      url: _data.twitter,
      color: "#1DA1F2",
    });
  }

  if (_data.documentUrl) {
    result.push({
      type: "other",
      url: _data.documentUrl,
      color: "#1DA1F2",
    });
  }

  return result;
};

export const BORDER_RADIUS = "16px";
export const INNER_SPACE = "10px";

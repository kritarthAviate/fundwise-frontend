import { colors } from "src/utils/colors";

export function calculateFontSize(type) {
  switch (type) {
    case "h1":
      return "40px";
    case "h2":
      return "32px";
    case "h3":
    case "p1":
      return "24px";
    case "h4":
    case "p2":
      return "20px";
    case "h5":
    case "p3":
      return "16px";
    case "h6":
    case "p4":
      return "14px";
    case "p5":
      return "12px";
    case "p6":
      return "10px";
    default:
      return "40px";
  }
}

export function calculateLineHeight(type) {
  switch (type) {
    case "h1":
      return "60px";
    case "h2":
      return "48px";
    case "h3":
    case "p1":
      return "36px";
    case "h4":
    case "p2":
      return "30px";
    case "h5":
    case "p3":
      return "24px";
    case "h6":
    case "p4":
      return "20px";
    case "p5":
      return "18px";
    case "p6":
      return "16px";
    default:
      return "60px";
  }
}

export function calculateFontWeight(type) {
  switch (type) {
    case "h1":
      return "800";

    case "h2":
    case "h3":
    case "h4":
    case "h5":
    case "h6":
      return "700";

    case "p1":
    case "p2":
    case "p3":
    case "p4":
    case "p5":
    case "p6":
      return "500";

    default:
      return "700";
  }
}

export function calculateFontColor(fontColor) {
  if (fontColor) {
    return colors[fontColor];
  }
  return colors.default;
}

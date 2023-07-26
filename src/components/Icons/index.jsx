import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import LogoutIcon from "@mui/icons-material/Logout";
import StarsIcon from "@mui/icons-material/Stars";
import AssistantPhotoIcon from "@mui/icons-material/AssistantPhoto";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import UploadIcon from "@mui/icons-material/Upload";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import FileCopyIcon from "@mui/icons-material/FileCopy";

const SocialIcons = ({ type, ...rest }) => {
  if (type === "facebook") return <FacebookIcon {...rest} />;
  if (type === "instagram") return <InstagramIcon {...rest} />;
  if (type === "twitter") return <TwitterIcon {...rest} />;
  if (type === "other") return <FileCopyIcon {...rest} />;
  return <OpenInNewIcon {...rest} />;
};

export {
  KeyboardArrowDownIcon,
  KeyboardArrowUpIcon,
  LogoutIcon,
  AssistantPhotoIcon,
  StarsIcon,
  ArrowBackIosRoundedIcon,
  UploadIcon,
  SocialIcons,
};

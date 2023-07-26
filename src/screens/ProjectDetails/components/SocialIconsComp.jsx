import { SocialIcons } from "src/components/Icons";

const SocialIconsComp = ({ color, type, url }) => {
  const openInNewTab = () => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };
  return (
    <div onClick={openInNewTab} style={{ cursor: "pointer" }}>
      <SocialIcons sx={{ color }} type={type} />
    </div>
  );
};

export default SocialIconsComp;

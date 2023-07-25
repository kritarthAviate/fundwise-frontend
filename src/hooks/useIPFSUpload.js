import { create } from "ipfs-http-client";

const useIPFSUpload = () => {
  const projectId = process.env.NEXT_PUBLIC_IPFS_PROJECT_ID;
  const projectSecret = process.env.NEXT_PUBLIC_IPFS_PROJECT_SECRET;
  const authorization = "Basic " + btoa(projectId + ":" + projectSecret);
  let ipfs;
  try {
    ipfs = create({
      url: "https://ipfs.infura.io:5001/api/v0",
      headers: {
        authorization,
      },
    });
  } catch (error) {
    console.error("IPFS error ", error);
    ipfs = undefined;
  }

  const uploadFile = async (file) => {
    if (!ipfs) {
      return;
    }

    const { cid } = await ipfs.add(file);
    return `https://ipfs.io/ipfs/${cid.toString()}`;
  };

  return { uploadFile };
};

export default useIPFSUpload;

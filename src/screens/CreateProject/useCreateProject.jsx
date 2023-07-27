import { useContext, useState } from "react";
import { isAddress } from "ethers/lib/utils";
import { useRouter } from "next/router";

import { useFactoryContract, useIPFSUpload } from "src/hooks";
import { extractDecimalNumber } from "src/utils/web3Utils";
import { BaseContext } from "src/context/BaseContext";

const useCreateProject = () => {
  const router = useRouter();

  const { connectWalletCheck, account } = useContext(BaseContext);
  const { uploadFile } = useIPFSUpload();
  const { createCrowdfunding } = useFactoryContract();
  const [loading, setLoading] = useState(false);

  const initialState = {
    title: "",
    category: null,
    description: "",
    recipient: account,
    targetAmount: "",
    twitter: "",
    facebook: "",
    instagram: "",
    imageUrl: "",
    documentUrl: "",
    videoUrl: "",
  };
  const [errors, setErrors] = useState({});

  const [formValues, setFormValues] = useState(initialState);

  const handleChangeFormValues = (event) => {
    const value = event.target.value;
    const key = event.target.name;

    setFormValues({
      ...formValues,
      [key]: value,
    });
    setErrors({
      ...errors,
      [key]: "",
    });
  };

  const handleSubmitForm = async () => {
    try {
      const walletCheck = await connectWalletCheck();
      if (!walletCheck) return;
      setLoading(true);

      console.log({ formValues });

      const jsonToUpload = {
        title: formValues.title,
        category: formValues.category,
        description: formValues.description,
        recipient: formValues.recipient,
        targetAmount: formValues.targetAmount,
        twitter: formValues.twitter,
        facebook: formValues.facebook,
        instagram: formValues.instagram,
        imageUrl: formValues.imageUrl,
        documentUrl: formValues.documentUrl,
        videoUrl: formValues.videoUrl,
      };

      console.log("uploading json to ipfs");

      const ipfsLink = await uploadFile(JSON.stringify(jsonToUpload));

      console.log("ipfs link", ipfsLink);

      const address = await createCrowdfunding(
        formValues.targetAmount,
        ipfsLink,
        formValues.recipient
      );

      router.push(`/f/${address}`);
    } catch (error) {
      console.log({ error });
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (ipfsLink) => {
    setFormValues({
      ...formValues,
      imageUrl: ipfsLink,
    });
  };

  const handleDocumentUpload = (ipfsLink) => {
    setFormValues({
      ...formValues,
      documentUrl: ipfsLink,
    });
  };

  const handleVideoUpload = (ipfsLink) => {
    setFormValues({
      ...formValues,
      videoUrl: ipfsLink,
    });
  };

  const validateRecipient = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    if (!value) {
      setErrors({
        ...errors,
        [key]: "Required",
      });
    } else if (!isAddress(value)) {
      setErrors({
        ...errors,
        [key]: "Invalid address",
      });
    } else {
      setErrors({
        ...errors,
        [key]: "",
      });
    }
  };

  const validateURL = (event) => {
    const value = event.target.value;
    const key = event.target.name;

    const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

    if (!value) {
      setErrors({
        ...errors,
        [key]: "",
      });
      return;
    }

    if (!urlRegex.test(value)) {
      setErrors({
        ...errors,
        [key]: "not a valid url",
      });
    } else {
      setErrors({
        ...errors,
        [key]: "",
      });
    }
  };

  const validateRequired = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    console.log({ value, key });
    if (!value) {
      setErrors({
        ...errors,
        [key]: "Required",
      });
    } else {
      setErrors({
        ...errors,
        [key]: "",
      });
    }
  };

  const validateRequiredForCategory = (event) => {
    const value = event.target.value;
    if (!value) {
      setErrors({
        ...errors,
        category: "Required",
      });
    } else {
      setErrors({
        ...errors,
        category: "",
      });
    }
  };

  const handleChangeTargetAmount = (event) => {
    const value = event.target.value;
    const key = event.target.name;
    const _value = extractDecimalNumber(value, 8);
    setFormValues({
      ...formValues,

      [key]: _value,
    });
    if (!_value) {
      setErrors({
        ...errors,
        [key]: "Required",
      });
    } else {
      setErrors({
        ...errors,
        [key]: "",
      });
    }
  };

  const validate = {
    title: validateRequired,
    description: validateRequired,
    category: validateRequiredForCategory,
    recipient: validateRecipient,
    twitter: validateURL,
    facebook: validateURL,
    instagram: validateURL,
  };

  const categories = [
    { id: "medical", label: "Medical Expenses" },
    { id: "education", label: "Education" },
    { id: "emergencies", label: "Emergencies" },
    { id: "community", label: "Community Projects" },
    { id: "animals", label: "Animals & Pets" },
    { id: "environment", label: "Environment" },
    { id: "arts", label: "Arts & Culture" },
    { id: "sports", label: "Sports & Competitions" },
    { id: "business", label: "Business & Entrepreneurs" },
    { id: "technology", label: "Technology & Innovation" },
    { id: "creative", label: "Creative Projects" },
    { id: "travel", label: "Travel & Adventure" },
    { id: "nonprofit", label: "Nonprofits & Charities" },
    { id: "memorials", label: "Memorials & Funerals" },
  ];

  const validateFirstFormOfSection =
    errors?.title ||
    errors?.description ||
    errors?.category ||
    errors?.recipient ||
    errors?.targetAmount ||
    !formValues?.title?.trim() ||
    !formValues?.description?.trim() ||
    !formValues?.category ||
    !formValues?.recipient?.trim() ||
    !formValues?.targetAmount?.trim();

  return {
    handleSubmitForm,
    handleImageUpload,
    handleDocumentUpload,
    handleVideoUpload,
    handleChangeTargetAmount,
    formValues,
    setFormValues,
    errors,
    setErrors,
    handleChangeFormValues,
    validate,
    validateFirstFormOfSection,
    categories,
    loading,
  };
};

export default useCreateProject;

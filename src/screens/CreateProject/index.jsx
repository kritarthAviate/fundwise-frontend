import { useContext } from "react";

import { Button, StyledTypography, FormFields } from "src/components";
import useCreateProject from "./useCreateProject";
import CreateProjectContext from "./context";
import {
  Container,
  FormContainer,
  FormSection,
  MainHeaderBox,
  InputFlexContainer,
  ButtonBox,
} from "./styles";

const { InputField, TextArea, Autocomplete, FileUploadComponent } = FormFields;

const CreateProjectComp = () => {
  const {
    handleSubmitForm,
    loading,
    formValues,
    setFormValues,
    errors,
    handleImageUpload,
    handleDocumentUpload,
    handleVideoUpload,
    handleChangeFormValues,
    handleChangeTargetAmount,
    validate,
    categories,
    validateFirstFormOfSection,
  } = useContext(CreateProjectContext);

  return (
    <Container
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmitForm();
      }}
    >
      <FormContainer>
        <FormSection>
          <MainHeaderBox>
            <div className="header_section">
              <StyledTypography type="h4" fontColor="lightGrey">
                Basic details
              </StyledTypography>
              <StyledTypography type="p4" fontColor="lightGrey">
                Add basic details for the crowdfunding project/cause
              </StyledTypography>
            </div>

            <InputFlexContainer>
              <InputField
                label={"Title"}
                variant="outlined"
                name="title"
                required
                sx={{ flex: 1 }}
                value={formValues.title}
                onChange={handleChangeFormValues}
                error={!!errors.title}
                helperText={errors.title}
                onBlur={validate.title}
              />

              <Autocomplete
                label={"Category"}
                variant="outlined"
                name="category"
                options={categories}
                required
                sx={{ flex: 1 }}
                value={formValues.category}
                onChange={(event, newValue) => {
                  setFormValues({ ...formValues, category: newValue });
                }}
                error={!!errors.category}
                helperText={errors.category}
                onBlur={validate.category}
              />
            </InputFlexContainer>

            <TextArea
              label={"Description"}
              variant="outlined"
              name="description"
              rows={6}
              required
              value={formValues.description}
              onChange={handleChangeFormValues}
              error={!!errors.description}
              helperText={errors.description}
              onBlur={validate.description}
            />

            <InputFlexContainer>
              <InputField
                label={"Recipient (logged in address by default)"}
                variant="outlined"
                name="recipient"
                required
                sx={{ flex: 1 }}
                value={formValues.recipient}
                onChange={handleChangeFormValues}
                error={!!errors.recipient}
                helperText={errors.recipient}
                onBlur={validate.recipient}
              />

              <InputField
                label={"Target Amount"}
                variant="outlined"
                name="targetAmount"
                required
                sx={{ flex: 1 }}
                value={formValues.targetAmount}
                onChange={handleChangeTargetAmount}
                error={!!errors.targetAmount}
                helperText={errors.targetAmount}
              />
            </InputFlexContainer>
          </MainHeaderBox>

          <MainHeaderBox>
            <div className="header_section">
              <StyledTypography type="h4" fontColor="lightGrey">
                Social media links
              </StyledTypography>
              <StyledTypography type="p4" fontColor="lightGrey">
                Add social media links relevant to the cause or the person
                running the initiative.
              </StyledTypography>
            </div>

            <InputFlexContainer>
              <InputField
                label={"Twitter"}
                variant="outlined"
                name="twitter"
                sx={{ flex: 1 }}
                value={formValues.twitter}
                onChange={handleChangeFormValues}
                error={!!errors.twitter}
                helperText={errors.twitter}
                onBlur={validate.twitter}
              />
              <InputField
                label={"Facebook"}
                variant="outlined"
                name="facebook"
                sx={{ flex: 1 }}
                value={formValues.facebook}
                onChange={handleChangeFormValues}
                error={!!errors.facebook}
                helperText={errors.facebook}
                onBlur={validate.facebook}
              />
              <InputField
                label={"Instagram"}
                variant="outlined"
                name="instagram"
                sx={{ flex: 1 }}
                value={formValues.instagram}
                onChange={handleChangeFormValues}
                error={!!errors.instagram}
                helperText={errors.instagram}
                onBlur={validate.instagram}
              />
            </InputFlexContainer>
          </MainHeaderBox>
          <MainHeaderBox>
            <div className="header_section">
              <StyledTypography type="h4" fontColor="lightGrey">
                Important documents
              </StyledTypography>
              <StyledTypography
                type="p4"
                fontColor="lightGrey"
                style={{ marginBottom: "20px" }}
              >
                Upload relevant documents which will help users to feel more
                connected to the cause and donate.
              </StyledTypography>
            </div>

            <InputFlexContainer
              style={{ flexDirection: "column", gap: "20px" }}
            >
              <FileUploadComponent
                btnText="Upload Image"
                setUploadedLink={handleImageUpload}
                id={"form_image"}
                accept={"image/*"}
              />
              <FileUploadComponent
                btnText="Upload Documents"
                setUploadedLink={handleDocumentUpload}
                id={"form_documents"}
                accept={"application/pdf"}
              />
              <FileUploadComponent
                btnText="Upload Videos"
                setUploadedLink={handleVideoUpload}
                id={"form_videos"}
                accept={"video/*"}
              />
            </InputFlexContainer>
          </MainHeaderBox>

          <ButtonBox>
            <Button
              loading={loading}
              type="submit"
              key={"submit"}
              sx={{ width: "150px" }}
              variant="multi"
              disabled={validateFirstFormOfSection}
            >
              Submit
            </Button>
          </ButtonBox>
        </FormSection>
      </FormContainer>
    </Container>
  );
};

const CreateProject = () => {
  const value = useCreateProject();
  return (
    <CreateProjectContext.Provider value={value}>
      <CreateProjectComp />
    </CreateProjectContext.Provider>
  );
};

export default CreateProject;

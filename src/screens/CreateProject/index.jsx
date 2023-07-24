import { useContext } from "react";

import useCreateProject from "./useCreateProject";
import CreateProjectContext from "./context";
import { Container } from "./styles";

const CreateProjectComp = () => {
  const data = useContext(CreateProjectContext);
  console.log({ data });
  return <Container>CreateProject</Container>;
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

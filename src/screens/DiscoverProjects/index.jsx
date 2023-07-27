import { useContext } from "react";

import { ProjectCard } from "src/components";
import { BaseContext } from "src/context/BaseContext";
import { CardListWrapper } from "./styles";

export default function DiscoverProjects() {
  const { fundraisers } = useContext(BaseContext);
  const { data, loading } = fundraisers;

  const isData = data?.length > 0;

  if (loading) return null;
  if (!isData) return null;

  return (
    <CardListWrapper>
      {data.map((project) => {
        return (
          <div key={project.proxyAddress}>
            <ProjectCard project={project} />
          </div>
        );
      })}
    </CardListWrapper>
  );
}

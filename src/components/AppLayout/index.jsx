import { useRouter } from "next/router";

import AppHeader from "./AppHeader";
import { PageContainer } from "./styles";

const AppLayout = ({ Component, pageProps }) => {
  const router = useRouter();

  // add conditional rendering for pages that don't need the header
  if (router.pathname === "/")
    return (
      <>
        <AppHeader />
        <Component {...pageProps} />
      </>
    );

  return (
    <>
      <AppHeader />
      <PageContainer>
        <Component {...pageProps} />
      </PageContainer>
    </>
  );
};

export default AppLayout;

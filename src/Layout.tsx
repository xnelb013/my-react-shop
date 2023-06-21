import React, { lazy } from "react";
const Navigation = lazy(() => import("./components/Navigation"));
const Footer = lazy(() => import("./components/Footer"));

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <header>
        <Navigation />
      </header>
      <div>{children}</div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;

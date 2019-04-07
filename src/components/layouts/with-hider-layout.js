import React from "react";
import Header from "./header";

export default props => {
  const { children } = props;

  return (
    <React.Fragment>
      <Header />
      <main className="cont-1120">{children}</main>
    </React.Fragment>
  );
};

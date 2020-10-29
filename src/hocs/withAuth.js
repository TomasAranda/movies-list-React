import React, { useEffect } from "react";

export default function withAuth(ComponentToBeRendered, isUserAuthenticated, userHasGroup) {
  function Authenticate(props) {
    const { history, location } = props;
    useEffect(() => {
      if (!isUserAuthenticated && location.pathname !== '/' && location.pathname !== '/auth/signin' && location.pathname !== '/auth/signup') {
        history.push("/auth/signin");
        if(!userHasGroup && location.pathname !== '/auth/signup/group') {
          history.push("/auth/signup/group");
        }
      }
    }, [history, location.pathname]);

    return <ComponentToBeRendered {...props} />;
  }

  return Authenticate;
}
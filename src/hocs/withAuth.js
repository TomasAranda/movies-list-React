import React, { useEffect } from "react";
import { useSelector } from "react-redux";

export default function withAuth(ComponentToBeRendered) {
  function Authenticate(props) {
    const isAuthenticated = useSelector(state => state.currentUser.isAuthenticated);

    useEffect(() => {
      if (isAuthenticated === false) {
        props.history.push("/auth/signin");
      }
    })

    return <ComponentToBeRendered {...props} />;
  }

  return Authenticate;
}
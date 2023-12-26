import React from "react";
import { Outlet } from "react-router-dom";

type Props = {};

const UserRoot = (props: Props) => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default UserRoot;

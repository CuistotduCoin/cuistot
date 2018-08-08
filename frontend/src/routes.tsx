import { asyncComponent } from "@jaredpalmer/after";
import Loading from "components/Loading";
import React from "react";

export default [
  {
    path: "/",
    component: asyncComponent({
      Placeholder: () => <Loading />,
      loader: () => import("components/App")
    })
  }
];

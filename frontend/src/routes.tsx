import { asyncComponent } from "@jaredpalmer/after";
import React from "react";

export default [
  {
    component: asyncComponent({
      Placeholder: () => <div>...LOADING...</div>,
      loader: () => import("./pages/Business/Business")
    }),
    exact: true,
    path: "/business"
  },
  {
    component: asyncComponent({
      Placeholder: () => <div>...LOADING...</div>,
      loader: () => import("./pages/Cook/Cook")
    }),
    exact: true,
    path: "/cook/:id"
  },
  {
    component: asyncComponent({
      Placeholder: () => <div>...LOADING...</div>,
      loader: () => import("./pages/Gift/Gift")
    }),
    exact: true,
    path: "/gift"
  },
  {
    component: asyncComponent({
      Placeholder: () => <div>...LOADING...</div>,
      loader: () => import("./pages/GroupLesson/GroupLesson")
    }),
    exact: true,
    path: "/group-lesson"
  },
  {
    component: asyncComponent({
      Placeholder: () => <div>...LOADING...</div>,
      loader: () => import("./pages/Home/Home")
    }),
    exact: true,
    path: "/"
  },
  {
    component: asyncComponent({
      Placeholder: () => <div>...LOADING...</div>,
      loader: () => import("./pages/HowItWorks/HowItWorks")
    }),
    exact: true,
    path: "/how-it-works"
  },
  {
    component: asyncComponent({
      Placeholder: () => <div>...LOADING...</div>,
      loader: () => import("./pages/Individual/Individual")
    }),
    exact: true,
    path: "/individual"
  },
  {
    component: asyncComponent({
      Placeholder: () => <div>...LOADING...</div>,
      loader: () => import("./pages/Invite/Invite")
    }),
    exact: true,
    path: "/invite"
  },
  {
    component: asyncComponent({
      Placeholder: () => <div>...LOADING...</div>,
      loader: () => import("./pages/Join/Join")
    }),
    exact: true,
    path: "/join"
  },
  {
    component: asyncComponent({
      Placeholder: () => <div>...LOADING...</div>,
      loader: () => import("./pages/Legal/Legal")
    }),
    exact: true,
    path: "/legal"
  },
  {
    component: asyncComponent({
      Placeholder: () => <div>...LOADING...</div>,
      loader: () => import("./pages/Login/Login")
    }),
    exact: true,
    path: "/login"
  },
  {
    component: asyncComponent({
      Placeholder: () => <div>...LOADING...</div>,
      loader: () => import("./pages/Mission/Mission")
    }),
    exact: true,
    path: "/mission"
  },
  {
    component: asyncComponent({
      Placeholder: () => <div>...LOADING...</div>,
      loader: () => import("./pages/Organize/Organize")
    }),
    exact: true,
    path: "/organize"
  },
  {
    component: asyncComponent({
      Placeholder: () => <div>...LOADING...</div>,
      loader: () => import("./pages/Presskit/Presskit")
    }),
    exact: true,
    path: "/presskit"
  },
  {
    component: asyncComponent({
      Placeholder: () => <div>...LOADING...</div>,
      loader: () => import("./pages/Profil/Profil")
    }),
    exact: true,
    path: "/profil/:id"
  },
  {
    component: asyncComponent({
      Placeholder: () => <div>...LOADING...</div>,
      loader: () => import("./pages/Search/Search")
    }),
    exact: true,
    path: "/search"
  },
  {
    component: asyncComponent({
      Placeholder: () => <div>...LOADING...</div>,
      loader: () => import("./pages/SignUp/SignUp")
    }),
    exact: true,
    path: "/signup"
  },
  {
    component: asyncComponent({
      Placeholder: () => <div>...LOADING...</div>,
      loader: () => import("./pages/Team/Team")
    }),
    exact: true,
    path: "/team"
  },
  {
    component: asyncComponent({
      Placeholder: () => <div>...LOADING...</div>,
      loader: () => import("./pages/Testimony/Testimony")
    }),
    exact: true,
    path: "/testimony"
  },
  {
    component: asyncComponent({
      Placeholder: () => <div>...LOADING...</div>,
      loader: () => import("./pages/Workshop/Workshop")
    }),
    exact: true,
    path: "/workshop/:id"
  },
  {
    component: asyncComponent({
      Placeholder: () => <div>...LOADING...</div>,
      loader: () => import("./pages/NotFound/NotFound")
    })
  }
];

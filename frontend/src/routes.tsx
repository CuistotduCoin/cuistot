import { asyncComponent } from "@jaredpalmer/after";
import Loading from "components/Loading";
import React from "react";

export default [
  {
    component: asyncComponent({
      Placeholder: () => <Loading />,
      loader: () => import("pages/Business/Business")
    }),
    exact: true,
    path: "/business"
  },
  {
    component: asyncComponent({
      Placeholder: () => <Loading />,
      loader: () => import("pages/Cook")
    }),
    exact: true,
    path: "/cook/:id"
  },
  {
    component: asyncComponent({
      Placeholder: () => <Loading />,
      loader: () => import("pages/Gift")
    }),
    exact: true,
    path: "/gift"
  },
  {
    component: asyncComponent({
      Placeholder: () => <Loading />,
      loader: () => import("pages/GroupLesson")
    }),
    exact: true,
    path: "/group-lesson"
  },
  {
    component: asyncComponent({
      Placeholder: () => <Loading />,
      loader: () => import("pages/Home")
    }),
    exact: true,
    path: "/"
  },
  {
    component: asyncComponent({
      Placeholder: () => <Loading />,
      loader: () => import("pages/HowItWorks")
    }),
    exact: true,
    path: "/how-it-works"
  },
  {
    component: asyncComponent({
      Placeholder: () => <Loading />,
      loader: () => import("pages/Individual")
    }),
    exact: true,
    path: "/individual"
  },
  {
    component: asyncComponent({
      Placeholder: () => <Loading />,
      loader: () => import("pages/Invite")
    }),
    exact: true,
    path: "/invite"
  },
  {
    component: asyncComponent({
      Placeholder: () => <Loading />,
      loader: () => import("pages/InviteBusiness")
    }),
    exact: true,
    path: "/invite-business"
  },
  {
    component: asyncComponent({
      Placeholder: () => <Loading />,
      loader: () => import("pages/Join")
    }),
    exact: true,
    path: "/join"
  },
  {
    component: asyncComponent({
      Placeholder: () => <Loading />,
      loader: () => import("pages/Terms")
    }),
    exact: true,
    path: "/terms"
  },
  {
    component: asyncComponent({
      Placeholder: () => <Loading />,
      loader: () => import("pages/TermsPro")
    }),
    exact: true,
    path: "/terms-pro"
  },
  {
    component: asyncComponent({
      Placeholder: () => <Loading />,
      loader: () => import("pages/Login")
    }),
    exact: true,
    path: "/login"
  },
  {
    component: asyncComponent({
      Placeholder: () => <Loading />,
      loader: () => import("pages/Mission")
    }),
    exact: true,
    path: "/mission"
  },
  {
    component: asyncComponent({
      Placeholder: () => <Loading />,
      loader: () => import("pages/Organize")
    }),
    exact: true,
    path: "/organize"
  },
  {
    component: asyncComponent({
      Placeholder: () => <Loading />,
      loader: () => import("pages/Presskit")
    }),
    exact: true,
    path: "/presskit"
  },
  {
    component: asyncComponent({
      Placeholder: () => <Loading />,
      loader: () => import("pages/Profil")
    }),
    exact: true,
    path: "/profil/:id"
  },
  {
    component: asyncComponent({
      Placeholder: () => <Loading />,
      loader: () => import("pages/Search")
    }),
    exact: true,
    path: "/search"
  },
  {
    component: asyncComponent({
      Placeholder: () => <Loading />,
      loader: () => import("pages/SignUp")
    }),
    exact: true,
    path: "/signup"
  },
  {
    component: asyncComponent({
      Placeholder: () => <Loading />,
      loader: () => import("pages/ResetPasswordRequest")
    }),
    exact: true,
    path: "/password/reset/request"
  },
  {
    component: asyncComponent({
      Placeholder: () => <Loading />,
      loader: () => import("pages/ResetPassword")
    }),
    exact: true,
    path: "/password/reset"
  },
  {
    component: asyncComponent({
      Placeholder: () => <Loading />,
      loader: () => import("pages/Team")
    }),
    exact: true,
    path: "/team"
  },
  {
    component: asyncComponent({
      Placeholder: () => <Loading />,
      loader: () => import("pages/Testimony")
    }),
    exact: true,
    path: "/testimony"
  },
  {
    component: asyncComponent({
      Placeholder: () => <Loading />,
      loader: () => import("pages/Workshop")
    }),
    exact: true,
    path: "/workshop/:id"
  },
  {
    component: asyncComponent({
      Placeholder: () => <Loading />,
      loader: () => import("pages/NotFound")
    })
  }
];

import ProtectedRoute from "./components/ProtectedRoute";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./layouts/dashboard/Dashboard";
import { Fragment, lazy, ReactNode } from "react";
import Landing from "./layouts/landing/Landing";

const routes = [
  {
    guard: ProtectedRoute,
    layout: Dashboard,
    path: "/home",
    component: lazy(() => import("src/views/home")),
  },
  {
    layout: Landing,
    path: "/sign-in",
    component: lazy(() => import("src/views/auth/SignIn")),
  },
  {
    layout: Landing,
    path: "/register",
    component: lazy(() => import("src/views/auth/Register")),
  },
  {
    layout: Landing,
    path: "/",
    component: lazy(() => import("src/views/home")),
  },
];

interface Route {
  guard?: JSX.Element;
  layout?: JSX.Element;
  component?: JSX.Element;
  path: string;
}

export function renderRoutes(routes: any) {
  return (
    <Routes>
      {routes.map((route: any, i: number) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            element={
              <Guard>
                <Layout>
                  <Component />
                </Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  );
}

function AppRoutes() {
  return renderRoutes(routes);
}

export default AppRoutes;

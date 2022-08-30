import { Fragment, Suspense, lazy } from "react";
import { Routes, Navigate, Route } from "react-router-dom";
import AuthLayout from "./layouts/auth/AuthLayout";
import GuestGuard from "./components/GuestGuard";
import LinearLoadingScreen from "./components/progress-bar/LinearLoadingScreen";
import AuthGuard from "./components/AuthGuard";
import Dashboard from "./layouts/dashboard/Dashboard";

const routes = [
  {
    exact: true,
    path: "/sign-in",
    guard: GuestGuard,
    layout: AuthLayout,
    component: lazy(() => import("src/views/auth/Login")),
  },
  {
    exact: true,
    path: "/dashboard",
    guard: AuthGuard,
    layout: Dashboard,
    component: lazy(() => import("src/views/home/Home")),
  },
  {
    path: '*',
    component: () => <Navigate to="/" />,
  },
];

export const renderRoutes = (routes) => (
  <Suspense fallback={<LinearLoadingScreen />}>
    <Routes>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            element={
              <Guard>
                <Layout>
                  {routes.routes ? renderRoutes(route.routes) : <Component />}
                </Layout>
              </Guard>
            }
          />
        );
      })}
    </Routes>
  </Suspense>
);

function AppRoutes() {
  return renderRoutes(routes);
}

export default AppRoutes;

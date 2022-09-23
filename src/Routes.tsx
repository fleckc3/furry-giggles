import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';
import Dashboard from './layouts/dashboard/Dashboard';
import Landing from './layouts/landing/Landing';
import LinearLoadingScreen from './components/progress-bar/LinearLoadingScreen';
import { Route, Routes as Switch, Navigate } from 'react-router-dom';
import { Fragment, lazy, Suspense } from 'react';

const routes = [
  {
    guard: ProtectedRoute,
    layout: Dashboard,
    path: '/home',
    component: lazy(() => import('src/views/home')),
  },
  {
    guard: GuestRoute,
    layout: Landing,
    path: '/login',
    component: lazy(() => import('src/views/auth/Login')),
  },
  {
    guard: GuestRoute,
    layout: Landing,
    path: '/register',
    component: lazy(() => import('src/views/auth/Register')),
  },
  {
    guard: GuestRoute,
    layout: Landing,
    path: '/',
    component: lazy(() => import('src/views/landing-page')),
  },
  {
    path: '*',
    component: () => <Navigate to="/" />,
  },
];

interface TRoute {
  guard?: React.FunctionComponent;
  layout?: React.FunctionComponent;
  component?: any;
  path: string;
}

export function renderRoutes(routes: any) {
  return (
    <Suspense fallback={<LinearLoadingScreen />}>
      <Switch>
        {routes.map((route: TRoute, i: number) => {
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
      </Switch>
    </Suspense>
  );
}

function Routes() {
  return renderRoutes(routes);
}

export default Routes;

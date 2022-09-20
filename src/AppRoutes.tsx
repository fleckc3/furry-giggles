import ProtectedRoute from './components/ProtectedRoute';
import { Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './layouts/dashboard/Dashboard';
import { Fragment, lazy, Suspense } from 'react';
import Landing from './layouts/landing/Landing';
import LinearLoadingScreen from './components/progress-bar/LinearLoadingScreen';

const routes = [
  {
    guard: ProtectedRoute,
    layout: Dashboard,
    path: '/home',
    component: lazy(() => import('src/views/home')),
  },
  {
    layout: Landing,
    path: '/login',
    component: lazy(() => import('src/views/auth/Login')),
  },
  {
    layout: Landing,
    path: '/register',
    component: lazy(() => import('src/views/auth/Register')),
  },
  {
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
      <Routes>
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
      </Routes>
    </Suspense>
  );
}

function AppRoutes() {
  return renderRoutes(routes);
}

export default AppRoutes;

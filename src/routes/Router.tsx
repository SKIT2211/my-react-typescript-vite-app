import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import PageNotFound from '../pages/PageNotFound';
import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';
import MainLayout from '../layouts/MainLayout';
import {
  InitialRender,
  LoginCheckRoute,
  PrivateRouteForAdmin,
} from './protected-routes/Private';

const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<InitialRender />} />
      <Route
        path="/home"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route element={<PrivateRouteForAdmin />}>
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />
      </Route>

      <Route element={<LoginCheckRoute />}>
        <Route path="/login" element={<SignIn />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
);

export default Router;

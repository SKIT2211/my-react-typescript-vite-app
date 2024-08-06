import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import PageNotFound from '../pages/PageNotFound';
import SignIn from '../pages/SignIn';
import Dashboard from '../pages/Dashboard';

const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/login" element={<SignIn />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
);

export default Router;

import React from 'react';
import { Box } from '@mui/material';
import Navbar from '../pages/Navbar';

interface MainLayoutProps {
  children: React.ReactNode;
}
const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <Box sx={{ background: '#ffffff' }}>
      <Navbar />
      <Box
        sx={{
          height: 'calc(100vh - 48px)',
          width: '100vw',
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;

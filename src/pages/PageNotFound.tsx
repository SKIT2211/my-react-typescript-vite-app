import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

const PageNotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate('/');
  };
  return (
    <>
      <Typography variant="h4">Oops...Something went wrong</Typography>
      <Typography variant="body2">
        Seems like you're lost in space.Don't worry,we can help you find your
        way back
      </Typography>
      <Button onClick={handleNavigation}>back to home</Button>
    </>
  );
};

export default PageNotFound;

import { Button, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/dashboard');
  };
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '60%',
          width: {
            xs: '80%',
            lg: '60%',
          },
          backgroundColor: 'rgba(147, 147, 147, 0.2)',
          borderRadius: '10px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: {
              xs: '80%',
              lg: '60%',
            },
          }}
        >
          <Typography
            variant="h4"
            color="primary"
            sx={{ textAlign: 'center', padding: '20px' }}
          >
            Welcome to the OneApp!
          </Typography>
          <Typography
            color="#ed5384"
            sx={{
              textAlign: 'center',
              fontSize: '12px',
              padding: '20px',
            }}
          >
            Welcome to the OneApp home page, where managing your products has
            never been easier. Whether you're adding new items, tracking
            inventory, or organizing your catalog, OneApp is here to streamline
            your workflow and enhance productivity. Dive in and start managing
            your products effortlessly with our intuitive interface and powerful
            features.
          </Typography>
          <Button
            sx={{
              height: '24px',
              width: '60%',
              margin: 'auto 0',
              padding: '10px',
              '&:hover': {
                background: '#ed5384',
              },
            }}
            variant="outlined"
            color="primary"
            onClick={handleNavigate}
          >
            Go to dashboard.!
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Home;

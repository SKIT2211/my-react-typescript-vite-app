import { Box, styled } from '@mui/material';

const SpinnerContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '24px',
  paddingTop: '10px',
  '& div': {
    width: '10px',
    height: '10px',
    backgroundColor: '#b46677',
    borderRadius: '50%',
    margin: '0 3px',
    animation: 'bounce 1.4s infinite ease-in-out both',
  },
  '& div:nth-child(2)': {
    animationDelay: '-0.32s',
  },
  '& div:nth-child(3)': {
    animationDelay: '-0.16s',
  },
  '@keyframes bounce': {
    '0%, 20%, 50%, 80%, 100%': {
      transform: 'translateY(0)',
    },
    '40%': {
      transform: 'translateY(-15px)',
    },
    '60%': {
      transform: 'translateY(-7px)',
    },
  },
}));

const LoadingSpinner: React.FC = () => {
  return (
    <SpinnerContainer>
      <div />
      <div />
      <div />
    </SpinnerContainer>
  );
};

export default LoadingSpinner;

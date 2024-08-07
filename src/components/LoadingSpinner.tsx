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
    borderRadius: '50%',
    margin: '0 3px',
    animation: 'bounce 1.4s infinite ease-in-out both',
  },
  '#first': {
    backgroundColor: 'rgba(40,140,200,1)',
  },
  '#second': {
    backgroundColor: 'rgba(200,20,20,1)',
  },
  '#third': {
    backgroundColor: 'rgba(10,200,10,1)',
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
      <div id="first" />
      <div id="second" />
      <div id="third" />
    </SpinnerContainer>
  );
};

export default LoadingSpinner;

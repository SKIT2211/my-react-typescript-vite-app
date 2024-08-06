import { SnackbarProvider, SnackbarKey, closeSnackbar } from 'notistack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

// SnackbarAction Component
const SnackbarAction: React.FC<{
  snackbarId: SnackbarKey;
  closeSnackbar: (id: SnackbarKey) => void;
}> = ({ snackbarId, closeSnackbar }) => {
  return (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={() => closeSnackbar(snackbarId)}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );
};

// AppSnackbarProvider Component
const AppSnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const renderSnackbarAction = (key: SnackbarKey) => (
    <SnackbarAction snackbarId={key} closeSnackbar={closeSnackbar} />
  );

  return (
    <SnackbarProvider
      maxSnack={3}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      preventDuplicate
      action={renderSnackbarAction}
    >
      {children}
    </SnackbarProvider>
  );
};

export default AppSnackbarProvider;

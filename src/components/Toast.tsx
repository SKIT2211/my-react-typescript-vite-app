import { enqueueSnackbar } from 'notistack';

type ToastOptions = {
  message: string;
  variant?: 'default' | 'success' | 'error' | 'warning' | 'info';
  autoHideDuration?: number;
};

const Toast = ({
  message,
  variant = 'default',
  autoHideDuration = 3000,
}: ToastOptions) => {
  enqueueSnackbar(message, {
    variant,
    autoHideDuration,
  });
};

export default Toast;

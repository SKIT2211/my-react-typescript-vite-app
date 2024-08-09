import React, { useEffect } from 'react';
import {
  Modal,
  Box,
  TextField,
  Button,
  Typography,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Toast from '../../components/Toast';

// Define the validation schema
const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  price: yup
    .number()
    .required('Price is required')
    .positive('Price must be positive'),
  description: yup.string().required('Description is required'),
  category: yup.string().required('Category is required'),
});

interface FormValues {
  title: string;
  price: number;
  description: string;
  category: string;
  id: number;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

type ProductPopupFormValues = Omit<FormValues, 'id' | 'rating' | 'image'>;

interface ProductPopupProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ProductPopupFormValues) => void;
  initialData: FormValues | null;
  isEditMode?: boolean;
}

const ProductPopup: React.FC<ProductPopupProps> = ({
  open,
  onClose,
  onSubmit,
  initialData,
  isEditMode = false,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductPopupFormValues>({
    resolver: yupResolver(schema),
    defaultValues: initialData || {},
  });

  useEffect(() => {
    if (open && initialData) {
      reset(initialData);
    }
  }, [open, initialData, reset]);

  const onSubmitForm = (data: ProductPopupFormValues) => {
    onSubmit(data);
    if (isEditMode) {
      Toast({
        message: 'Product updated successfully!',
        variant: 'success',
      });
    } else {
      Toast({
        message: 'Product added successfully!',
        variant: 'success',
      });
    }
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'relative',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" component="h2">
          {isEditMode ? 'Edit Product' : 'Add Product'}
        </Typography>
        <IconButton
          sx={{ position: 'absolute', top: 8, right: 8 }}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <Box sx={{ mb: 2 }}>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Title"
                  fullWidth
                  variant="outlined"
                  error={!!errors.title}
                  helperText={errors.title?.message}
                />
              )}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Controller
              name="price"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Price"
                  fullWidth
                  variant="outlined"
                  error={!!errors.price}
                  helperText={errors.price?.message}
                />
              )}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Description"
                  fullWidth
                  variant="outlined"
                  multiline
                  rows={3}
                  error={!!errors.description}
                  helperText={errors.description?.message}
                />
              )}
            />
          </Box>
          <Box sx={{ mb: 2 }}>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Category"
                  fullWidth
                  variant="outlined"
                  error={!!errors.category}
                  helperText={errors.category?.message}
                />
              )}
            />
          </Box>
          <Button type="submit" variant="contained" color="primary">
            {isEditMode ? 'Update' : 'Submit'}
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ProductPopup;

import axios from 'axios';
import { API } from '../constants/constantApi';
import Toast from '../components/Toast';

interface Rating {
  rate: number;
  count: number;
}

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: Rating;
}

// Fetch all products
export const fetchAllProducts = async (): Promise<Product[] | null> => {
  try {
    const response = await axios.get(`${API.ALL_PRODUCTS}`);
    return response.data;
  } catch (error) {
    const errorMessage =
      (error as { message?: string }).message ?? 'An unknown error occurred';

    if (error) {
      Toast({
        message: errorMessage,
        variant: 'error',
      });
    }
    return null;
  }
};

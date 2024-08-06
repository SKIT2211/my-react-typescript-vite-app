import axios, { AxiosResponse } from 'axios';
import { API } from '../constants/constantApi';
import Toast from '../components/Toast';

interface ApiResponse {
  refreshToken: string;
  id: string;
  username: string;
  email: string;
  roles: string[];
  message: string;
  sessionId: string;
  accessToken: string;
  tokenType: string;
}

// Function to make the API call
export const loginApi = async (data: {
  email: string;
  password: string;
}): Promise<ApiResponse | null> => {
  try {
    const response: AxiosResponse<ApiResponse> = await axios.post(
      `${API.LOGIN_USER}`,
      data,
    );

    const user = response?.data;
    if (user) {
      Toast({
        message: `${user?.message}`,
        variant: 'success',
      });
      return user;
    }
    return null;
  } catch (error) {
    const errorResponse = error as {
      response?: { status?: number; data?: { message?: string } };
      message?: string;
    };
    if (errorResponse?.response?.status === 400) {
      Toast({
        message: `${errorResponse?.response?.data?.message}`,
        variant: 'error',
      });
    } else {
      Toast({
        message: `${errorResponse?.message} From Authentication !`,
        variant: 'error',
      });
    }
    return null;
  }
};

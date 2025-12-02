import { useState } from 'react';
import api from '../utils/api';

const useApiPost = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const post = async (postData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const response = await api.post(url, postData,{ withCredentials : true }, options);
      setData(response.data);
      setSuccess(true);
      return response.data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { post, data, loading, error, success };
};

export default useApiPost;
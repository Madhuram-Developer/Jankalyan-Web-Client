'use client'

import { useState, useCallback } from 'react';
import api from '../utils/api';
import { API_ENDPOINTS } from '../constants/api';

const useLogs = () => {
  const [apiLogs, setApiLogs] = useState(null);
  const [errorLogs, setErrorLogs] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchApiLogs = useCallback(async (page = 1, pageSize = 100) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(API_ENDPOINTS.LOGS.API, {
        params: { page, pageSize },
        withCredentials: true,
      });
      setApiLogs(response.data.data);
      return response.data.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch API logs');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchErrorLogs = useCallback(async (page = 1, pageSize = 100) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(API_ENDPOINTS.LOGS.ERROR, {
        params: { page, pageSize },
        withCredentials: true,
      });
      setErrorLogs(response.data.data);
      return response.data.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch error logs');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(API_ENDPOINTS.LOGS.STATS, {
        withCredentials: true,
      });
      setStats(response.data.data);
      return response.data.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch stats');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchArchives = useCallback(async (type = 'api') => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.get(API_ENDPOINTS.LOGS.ARCHIVES, {
        params: { type },
        withCredentials: true,
      });
      return response.data.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch archives');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    apiLogs,
    errorLogs,
    stats,
    loading,
    error,
    fetchApiLogs,
    fetchErrorLogs,
    fetchStats,
    fetchArchives,
  };
};

export default useLogs;

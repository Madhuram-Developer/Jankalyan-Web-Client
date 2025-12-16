'use client'; 

import React, { useState, useEffect } from 'react';
import { TextField, Box, Typography, Container, Snackbar, Alert, CircularProgress } from '@mui/material';
import Button from '@/components/Button';
import useApiGet from '@/hooks/useApiGet';
import useApiPost from '@/hooks/useApiPost';
import { API_ENDPOINTS } from '@/constants/api';

const AppSettingsPage = () => {
  const [formData, setFormData] = useState({
    description: '',
    paymentQR: '',
    bankName: '',
    ifscCode: '',
    accountNumber: '',
    videoUrl: '',
    title: '',
    upiId: '',
    TransactionNote: '',
    titleHindi: '',
    descriptionHindi: '',
    targetAmount: '',
    collectedAmount: '',
    totalAmount: ''
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const { data, loading, refetch } = useApiGet(API_ENDPOINTS.SETTINGS);

  const { post, loading: postLoading, error: postError } = useApiPost(API_ENDPOINTS.SETTINGS, () => {
    refetch();
    setSnackbarOpen(true);
  });

  useEffect(() => {
    if (data) {
      // eslint-disable-next-line
      setFormData(data);
    }
  }, [data]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await post(formData);
      console.log('Settings saved successfully');
    } catch (err) {
      console.error('Error saving settings:', err);
    }
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          App Settings
        </Typography>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              margin="normal"
              required
              size="small"
              sx={{ '& .MuiInputBase-input': { padding: '6px 10px' } }}
            />
            <TextField
              fullWidth
              label="Title (Hindi)"
              name="titleHindi"
              value={formData.titleHindi}
              onChange={handleChange}
              margin="normal"
              size="small"
              sx={{ '& .MuiInputBase-input': { padding: '6px 10px' } }}
            />
            <TextField
              fullWidth
              label="Video URL"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleChange}
              margin="normal"
              size="small"
              sx={{ '& .MuiInputBase-input': { padding: '6px 10px' } }}
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
              required
              size="small"
              sx={{'& .MuiInputBase-input': { padding: '6px 10px' } }}
            />
            <TextField
              fullWidth
              label="Description (Hindi)"
              name="descriptionHindi"
              value={formData.descriptionHindi}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={4}
              size="small"
              sx={{'& .MuiInputBase-input': { padding: '6px 10px' } }}
            />
            <TextField
              fullWidth
              label="Payment QR"
              name="paymentQR"
              value={formData.paymentQR}
              onChange={handleChange}
              margin="normal"
              type="url"
              size="small"
              sx={{ '& .MuiInputBase-input': { padding: '6px 10px' } }}
            />
            <TextField
              fullWidth
              label="UPI ID"
              name="upiId"
              value={formData.upiId}
              onChange={handleChange}
              margin="normal"
              size="small"
              sx={{ '& .MuiInputBase-input': { padding: '6px 10px' } }}
            />
            <TextField
              fullWidth
              label="Transaction Note"
              name="TransactionNote"
              value={formData.TransactionNote}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={2}
              size="small"
              sx={{ '& .MuiInputBase-input': { padding: '6px 10px' } }}
            />
            <TextField
              fullWidth
              label="Bank Name"
              name="bankName"
              value={formData.bankName}
              onChange={handleChange}
              margin="normal"
              size="small"
              sx={{ '& .MuiInputBase-input': { padding: '6px 10px' } }}
            />
            <TextField
              fullWidth
              label="Account Number"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleChange}
              margin="normal"
              size="small"
              sx={{ '& .MuiInputBase-input': { padding: '6px 10px' } }}
            />
            <TextField
              fullWidth
              label="IFSC Code"
              name="ifscCode"
              value={formData.ifscCode}
              onChange={handleChange}
              margin="normal"
              size="small"
              sx={{ '& .MuiInputBase-input': { padding: '6px 10px' } }}
            />
            <TextField
              fullWidth
              label="Target Amount"
              name="targetAmount"
              value={formData.targetAmount}
              onChange={handleChange}
              margin="normal"
              type="number"
              size="small"
              sx={{ '& .MuiInputBase-input': { padding: '6px 10px' } }}
            />
            <TextField
              fullWidth
              label="Collected Amount"
              name="collectedAmount"
              value={formData.collectedAmount}
              onChange={handleChange}
              margin="normal"
              type="number"
              size="small"
              sx={{ '& .MuiInputBase-input': { padding: '6px 10px' } }}
            />
            <TextField
              fullWidth
              label="Total Amount"
              name="totalAmount"
              value={formData.totalAmount}
              onChange={handleChange}
              margin="normal"
              type="number"
              size="small"
              sx={{ '& .MuiInputBase-input': { padding: '6px 10px' } }}
            />
            <Box sx={{ mt: 2 }}>
              <Button type="submit" disabled={postLoading} className="bg-text-primary text-white font-semibold ext-white px-4 py-2">
                {postLoading ? 'Saving...' : 'Save Settings'}
              </Button>
            </Box>
          </form>
        )}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert onClose={() => setSnackbarOpen(false)} severity="success" sx={{ width: '100%' }}>
            Settings saved successfully!
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default AppSettingsPage;
'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Box, Container, Typography, Card as MuiCard, Snackbar, Alert, CircularProgress } from '@mui/material';
import Button from '@/components/Button';
import AddDonationModal from '@/components/AddDonationModal';
import useApiGet from '@/hooks/useApiGet';
import useApiPost from '@/hooks/useApiPost';
import { API_ENDPOINTS } from '@/constants/api';
import api from '@/utils/api';
import { Trash2, Plus, Edit } from 'lucide-react';

const DonationsPage = () => {
  const [openModal, setOpenModal] = useState(false);
  const [editingDonation, setEditingDonation] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const { data, loading, refetch } = useApiGet(API_ENDPOINTS.DONATIONS);
  
  const donationUrl = editingDonation 
    ? `${API_ENDPOINTS.DONATIONS}/${editingDonation.id || editingDonation._id}` 
    : API_ENDPOINTS.DONATIONS;
  
  const { post, loading: postLoading } = useApiPost(donationUrl, () => {
    setSnackbarMessage(editingDonation ? 'Donation updated successfully!' : 'Donation added successfully!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    refetch();
    setOpenModal(false);
    setEditingDonation(null);
  });

  const { post: deletePost, loading: deleteLoading } = useApiPost('', () => {
    setSnackbarMessage('Donation deleted successfully!');
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
    refetch();
  });

  const getDonationsList = () => {
    if (!data) return [];
    return Array.isArray(data) ? data : (data.donations || []);
  };

  const handleAddDonation = async (formData) => {
    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        titleHindi: formData.titleHindi,
        descriptionHindi: formData.descriptionHindi,
        images: formData.images,
      };
      await post(payload);
    } catch (err) {
      console.error('Error adding/updating donation:', err);
      setSnackbarMessage(editingDonation ? 'Error updating donation. Please try again.' : 'Error adding donation. Please try again.');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };

  const handleEditDonation = (donation) => {
    setEditingDonation(donation);
    setOpenModal(true);
  };

  const handleDeleteDonation = async (donation) => {
    if (window.confirm('Are you sure you want to delete this donation?')) {
      try {
        const deleteUrl = `${API_ENDPOINTS.DONATIONS}/${donation.id || donation._id}/delete`;
        await deletePost({}, deleteUrl);
      } catch (err) {
        console.error('Error deleting donation:', err);
        setSnackbarMessage('Error deleting donation. Please try again.');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      }
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setEditingDonation(null);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div className='overflow-y-auto'>
      <Container maxWidth="lg">
        <Box sx={{ mt: 4, mb: 4 }}>
          <div className='flex justify-between items-center mb-6'>
            <div className='text-black font-bold text-2xl'>
              Donation Settings
            </div>
            <Button
              onClick={() => setOpenModal(true)}
              className="bg-text-primary text-white font-semibold px-4 py-2 flex items-center gap-2"
            >
              <Plus size={20} />
              Add Donation
            </Button>
          </div>

          {getDonationsList().length === 0 ? (
            <Typography variant="body1" color="textSecondary" sx={{ textAlign: 'center', py: 4 }}>
              No donations added yet. Click &quot;Add Donation&quot; to get started.
            </Typography>
          ) : (
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {getDonationsList().map((donation, index) => (
                <MuiCard key={donation.id || donation._id || index} sx={{ p: 3, boxShadow: 2 }}>
                  <div className='flex justify-between items-start mb-3'>
                    <div>
                      <Typography variant="h6" className='font-bold text-text-primary'>
                        {donation.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {donation.titleHindi && `${donation.titleHindi} (हिंदी)`}
                      </Typography>
                    </div>
                    <div className='flex gap-2'>
                      <button
                        onClick={() => handleEditDonation(donation)}
                        className='text-blue-500 hover:text-blue-700 p-1'
                      >
                        <Edit size={20} />
                      </button>
                      <button
                        onClick={() => handleDeleteDonation(donation)}
                        className='text-red-500 hover:text-red-700 p-1'
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>

                  <Typography variant="body2" className='mb-2'>
                    <span className='font-semibold'>Description:</span> {donation.description}
                  </Typography>

                  {donation.descriptionHindi && (
                    <Typography variant="body2" className='mb-3'>
                      <span className='font-semibold'>विवरण:</span> {donation.descriptionHindi}
                    </Typography>
                  )}

                  {donation.images && donation.images.length > 0 && (
                    <div className='flex gap-2 mt-3 flex-wrap'>
                      {donation.images.map((image, idx) => (
                        <div key={idx} className='relative h-20 w-20 rounded overflow-hidden'>
                          <Image
                            src={image}
                            alt={`${donation.title} ${idx + 1}`}
                            fill
                            className='object-cover'
                            unoptimized
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </MuiCard>
              ))}
            </div>
          )}
        </Box>
      </Container>

      <AddDonationModal
        open={openModal}
        onClose={handleCloseModal}
        onSuccess={handleAddDonation}
        loading={postLoading}
        editingDonation={editingDonation}
      /> 

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default DonationsPage;

import React, { useState } from 'react';
import { TextField, Box, Stack, Chip } from '@mui/material';
import Modal from '@/components/Modal';
import Button from '@/components/Button';

const AddDonationModal = ({ open, onClose, onSuccess, loading, editingDonation }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    titleHindi: '',
    descriptionHindi: '',
    images: [],
  });
  
  const [imageInput, setImageInput] = useState('');

  React.useEffect(() => {
    if (editingDonation && open) {
      setFormData({
        title: editingDonation.title || '',
        description: editingDonation.description || '',
        titleHindi: editingDonation.titleHindi || '',
        descriptionHindi: editingDonation.descriptionHindi || '',
        images: editingDonation.images || [],
      });
    } else if (!editingDonation && open) {
      setFormData({
        title: '',
        description: '',
        titleHindi: '',
        descriptionHindi: '',
        images: [],
      });
    }
    setImageInput('');
  }, [open, editingDonation]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleAddImage = () => {
    const trimmedUrl = imageInput.trim();
    if (trimmedUrl && !formData.images.includes(trimmedUrl)) {
      setFormData(prev => ({
        ...prev,
        images: [...prev.images, trimmedUrl]
      }));
      setImageInput('');
    }
  };

  const handleRemoveImage = (indexToRemove) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove)
    }));
  };

  const handleImageInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddImage();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    return newErrors;
  };

  const handleSubmit = async () => {
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        titleHindi: formData.titleHindi,
        descriptionHindi: formData.descriptionHindi,
        images: formData.images,
      };

      await onSuccess(payload);
      // Reset form
      setFormData({
        title: '',
        description: '',
        titleHindi: '',
        descriptionHindi: '',
        images: [],
      });
      setImageInput('');
      setErrors({});
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  const handleClose = () => {
    setFormData({
      title: '',
      description: '',
      titleHindi: '',
      descriptionHindi: '',
      images: [],
    });
    setImageInput('');
    setErrors({});
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      title={editingDonation ? "Edit Donation" : "Add New Donation"}
      actions={
        <>
          <Button 
            onClick={handleClose} 
            className="text-gray-500 px-4 py-2"
            disabled={loading}
          >
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={loading} 
            className="bg-text-primary text-white px-4 py-2"
          >
            {loading ? (editingDonation ? 'Updating...' : 'Adding...') : (editingDonation ? 'Update Donation' : 'Add Donation')}
          </Button>
        </>
      }
    >
      <Box sx={{ py: 2 }}>
        <Stack spacing={2}>
          <TextField
            label="Title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
            error={!!errors.title}
            helperText={errors.title}
            required
          />

          <TextField
            label="Title (Hindi)"
            name="titleHindi"
            value={formData.titleHindi}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
          />

          <TextField
            label="Description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
            multiline
            rows={3}
            error={!!errors.description}
            helperText={errors.description}
            required
          />

          <TextField
            label="Description (Hindi)"
            name="descriptionHindi"
            value={formData.descriptionHindi}
            onChange={handleChange}
            fullWidth
            variant="outlined"
            size="small"
            multiline
            rows={3}
          />

          <Box>
            <TextField
              label="Add Image URL"
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              onKeyDown={handleImageInputKeyDown}
              fullWidth
              variant="outlined"
              size="small"
              placeholder="https://example.com/image.jpg"
              helperText="Press Enter or click Add to add image"
            />
            <Button
              onClick={handleAddImage}
              className="bg-text-primary text-white px-3 py-1 mt-2"
              disabled={!imageInput.trim()}
            >
              Add Image
            </Button>
          </Box>

          {formData.images.length > 0 && (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 2 }}>
              {formData.images.map((image, index) => (
                <Chip
                  key={index}
                  label={image.substring(0, 40) + (image.length > 40 ? '...' : '')}
                  onDelete={() => handleRemoveImage(index)}
                  variant="filled"
                  color="primary"
                  title={image}
                />
              ))}
            </Box>
          )}
        </Stack>
      </Box>
    </Modal>
  );
};

export default AddDonationModal;

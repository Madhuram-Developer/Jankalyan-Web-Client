import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const Loader = () => {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }} className="min-h-[30vh]">
      <CircularProgress />
    </Box>
  );
};

export default Loader;
import Button from '@mui/material/Button';
import React from 'react';

const ClearFiltersBtn = ({ onClick, text }: { onClick: () => void; text: string }) => {
  return (
    <Button
      onClick={onClick}
      sx={{
        padding: '5px 10px'
      }}
    >
      {text}
    </Button>
  );
};

export default ClearFiltersBtn;

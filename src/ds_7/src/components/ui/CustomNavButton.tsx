import { Button } from '@mui/material';
import React from 'react';
import { navigateToDboard } from '../../utils';

const CustomNavButton = ({ text, dBoardNumber }: { text: string; dBoardNumber: string }) => {
  return (
    <Button
      size="small"
      variant="outlined"
      sx={{
        color: 'black',
        padding: '10px',
        px: '20px',
        border: '1px solid black',
        fontSize: '15px',
        textTransform: 'none',
        bgcolor: 'transparent'
      }}
      onClick={() => navigateToDboard(dBoardNumber)}
    >
      {text}
    </Button>
  );
};

export default CustomNavButton;

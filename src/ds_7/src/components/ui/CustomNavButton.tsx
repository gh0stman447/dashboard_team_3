import { Button } from '@mui/material';
import React from 'react';
import { navigateToDboard } from '../../utils';

const CustomNavButton = ({ text, dBoardNumber }: { text: string; dBoardNumber: string }) => {
  return (
    <Button
      size="large"
      sx={{ color: 'black', padding: '10px', border: '1px solid black', backgroundColor: 'white' }}
      onClick={() => navigateToDboard(dBoardNumber)}
    >
      {text}
    </Button>
  );
};

export default CustomNavButton;

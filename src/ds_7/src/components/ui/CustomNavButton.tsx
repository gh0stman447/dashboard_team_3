import { Button } from '@mui/material';
import React from 'react';
import { navigateToDboard } from '../../utils';

const CustomNavButton = ({ text, dBoardNumber }: { text: string; dBoardNumber: string }) => {
  return (
    <Button
      size="small"
      sx={{
        color: 'black',
        padding: '10px',
        border: '1px solid black',
        backgroundColor: 'white',
        fontSize: '15px',
        textTransform: 'none'
      }}
      onClick={() => navigateToDboard(dBoardNumber)}
    >
      {text}
    </Button>
  );
};

export default CustomNavButton;

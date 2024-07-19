import { Button } from '@mui/material';
import React from 'react';

const CustomFilterButton = ({ handler, text }: { handler: () => void; text: string }) => {
  return (
    <Button
      size="large"
      onClick={handler}
      variant="text"
      sx={{
        color: 'black',
        border: '1px solid black',
        backgroundColor: 'white',
        padding: '5px 8px',
        '&:hover': {
          backgroundColor: 'lightgray'
        },
        fontSize: '16px',
        fontFamily: 'serif'
      }}
    >
      {text}
    </Button>
  );
};

export default CustomFilterButton;

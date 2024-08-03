import { Button } from '@mui/material';
import React from 'react';

const CustomFilterButton = ({ handler, text, fontSize }: { handler: () => void; text: string; fontSize: string }) => {
  return (
    <Button
      size="small"
      onClick={handler}
      variant="text"
      sx={{
        color: 'black',
        border: '1px solid black',
        backgroundColor: 'transparent',
        padding: '5px 8px',
        '&:hover': {
          transition: '0.3s',
          transform: 'scale(1.1)'
        },
        fontSize: fontSize
      }}
    >
      {text}
    </Button>
  );
};

export default CustomFilterButton;

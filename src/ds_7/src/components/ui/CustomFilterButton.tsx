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
        backgroundColor: 'white',
        padding: '5px 8px',
        '&:hover': {
          backgroundColor: 'lightgray'
        },
        fontSize: fontSize,
        fontFamily: 'serif'
      }}
    >
      {text}
    </Button>
  );
};

export default CustomFilterButton;

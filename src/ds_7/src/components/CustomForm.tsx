import { Button } from '@mui/material';
import { Modal } from 'antd';
import React from 'react';

interface CustomDialogSelectProps {
  children: React.ReactNode;
  handler: () => void;
  openBtn: React.ReactElement;
  title?: string;
}

const CustomForm: React.FC<CustomDialogSelectProps> = ({ children, handler, openBtn, title }) => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const applyHandler = () => {
    handler();
    setOpen(false);
  };

  return (
    <>
      <span onClick={handleClickOpen}>{openBtn}</span>

      <Modal
        onCancel={handleCancel}
        title={title || ''}
        open={open}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Закрыть
          </Button>,
          <Button key="apply" onClick={handler ? applyHandler : handleCancel}>
            Применить
          </Button>
        ]}
      >
        {children}
      </Modal>
    </>
  );
};

export default CustomForm;

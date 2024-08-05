import React from 'react';

const ArrowUserSwitcher = ({ children, onClick }: { children: React.ReactNode; onClick: () => void }) => {
  return (
    <button className="btn btn-primary" onClick={onClick}>
      {children}
    </button>
  );
};

export default ArrowUserSwitcher;

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { CustomModal } from './CustomComponents';
const ToggleContent = ({ toggle, content, isVisible }) => {
  const [isShown, setIsShown] = useState(isVisible);
  const hide = () => setIsShown(false);

  return (
    <>
      {isShown && content(hide)}
    </>
  );
};

const Modal = ({ children }) =>
  createPortal(
    <CustomModal>{children}</CustomModal>,
    document.getElementById('modal-portal')
  );

export { ToggleContent, Modal };

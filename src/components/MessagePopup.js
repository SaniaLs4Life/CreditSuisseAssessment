import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import { CustomModal } from './CustomComponents';
const ToggleContent = ({ content, isVisible, setShowMessage }) => {
  return <>{isVisible && content(() => setShowMessage())}</>;
};

const Modal = ({ children }) =>
  createPortal(
    <CustomModal>{children}</CustomModal>,
    document.getElementById('modal-portal')
  );

ToggleContent.propTypes = {
  content: PropTypes.func,
  isVisible: PropTypes.bool,
  setShowMessage: PropTypes.func
};

Modal.propTypes = {
  children: PropTypes.node
};

export { ToggleContent, Modal };

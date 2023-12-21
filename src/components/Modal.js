import React from 'react';
import styles from './Modal.module.css';

const Modal = ({ isOpen, onClose, children, customStyles = {} }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={onClose} style={customStyles.overlay}>
      <div className={styles.modal} style={customStyles?.modal || {}} onClick={(e) => e.stopPropagation()}>
        <span className={styles.close} onClick={onClose}>
          &times;
        </span>
        {children}
      </div>
    </div>
  );
};

export default Modal;
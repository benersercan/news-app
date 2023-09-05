import { useState } from 'react';
import PropTypes from 'prop-types';
import'./CustomModal.scss'

// eslint-disable-next-line no-unused-vars
let modalVisible = false;
// eslint-disable-next-line no-unused-vars
let modalMessage = "";

export const CustomModal = ({ show, onClose, title, children }) => {
  const handleClose = () => {
    modalVisible = false;
    modalMessage = "";
    if (onClose) onClose();
  };

  return (
    <div className={`modal ${show ? 'show-modal' : ''}`}>
      <div className="modal-content">
        <div className="modal-header">
          <h4>{title}</h4>
          <button onClick={handleClose}>&times;</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

CustomModal.showError = (message) => {
  modalVisible = true;
  modalMessage = message;
};

CustomModal.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string,
  children: PropTypes.node
};


export const useModal = () => {
  const [isVisible, setIsVisible] = useState(false);

  const show = () => setIsVisible(true);
  const hide = () => setIsVisible(false);

  return {
    isVisible,
    show,
    hide
  };
};

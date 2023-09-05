import { useState } from 'react';
import PropTypes from 'prop-types';
import'./CustomModal.scss'

export const CustomModal = ({ show, onClose, title, children }) => {
  const handleClose = () => {
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

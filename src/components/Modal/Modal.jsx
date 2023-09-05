import PropTypes from 'prop-types';
import './Modal.scss';

const Modal = ({ onConfirm, onCancel }) => {

  /*
  *
  *I wasn't sure if the user should be asked or given this experience
  */
  return (
    <div className="modal-confirm">
      <div className="modal-confirm-content">
        <p>Otomatik yenilemeyi etkinleştirmek ister misiniz?</p>
        <button onClick={onConfirm}>Evet</button>
        <button onClick={onCancel}>Hayır</button>
      </div>
    </div>
  );
}

Modal.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default Modal;

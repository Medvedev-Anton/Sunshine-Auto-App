import PropTypes from 'prop-types';
import './SuccessMessage.css';

export default function SuccessMessage({ vehicle, onClose }) {
  return (
    <div className="success-message">
      <div className="success-icon">✓</div>
      <h2 className="success-title">Поздравляем с покупкой!</h2>
      <p className="success-text">
        Вы успешно приобрели {vehicle.name}. Наш менеджер свяжется с вами в ближайшее время для уточнения деталей.
      </p>
      <button className="close-button" onClick={onClose}>
        Закрыть
      </button>
    </div>
  );
}

SuccessMessage.propTypes = {
  vehicle: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
}; 
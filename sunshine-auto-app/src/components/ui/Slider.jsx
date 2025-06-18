import PropTypes from 'prop-types';
import './Slider.css';

const Slider = ({ label, value, min = 0, max = 100 }) => {
  return (
    <div className="slider-container">
      <label className="slider-label">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        className="slider"
        disabled
        readOnly
      />
      <span className="slider-value">{value}</span>
    </div>
  );
};

Slider.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
};

export default Slider; 
import { useState } from 'react';
import PropTypes from 'prop-types';
import './BuyForm.css';
import SuccessMessage from './SuccessMessage';

export default function BuyForm({ vehicle, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    paymentMethod: 'card',
    pickupMethod: 'dealership'
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Phone mask function
  const formatPhoneNumber = (value) => {
    // Remove all non-digit characters except +
    const cleaned = value.replace(/[^\d+]/g, '');
    
    // If starts with +7, format as +7 (XXX) XXX-XX-XX
    if (cleaned.startsWith('+7')) {
      const digits = cleaned.substring(2).replace(/\D/g, '');
      if (digits.length <= 10) {
        const match = digits.match(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
        if (match) {
          const parts = match.slice(1).filter(Boolean);
          if (parts.length === 0) return '+7 ';
          if (parts.length === 1) return `+7 (${parts[0]}`;
          if (parts.length === 2) return `+7 (${parts[0]}) ${parts[1]}`;
          if (parts.length === 3) return `+7 (${parts[0]}) ${parts[1]}-${parts[2]}`;
          return `+7 (${parts[0]}) ${parts[1]}-${parts[2]}-${parts[3]}`;
        }
      }
      return cleaned;
    }
    
    // If starts with 8, format as 8 (XXX) XXX-XX-XX
    if (cleaned.startsWith('8')) {
      const digits = cleaned.substring(1).replace(/\D/g, '');
      if (digits.length <= 10) {
        const match = digits.match(/^(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})$/);
        if (match) {
          const parts = match.slice(1).filter(Boolean);
          if (parts.length === 0) return '8 ';
          if (parts.length === 1) return `8 (${parts[0]}`;
          if (parts.length === 2) return `8 (${parts[0]}) ${parts[1]}`;
          if (parts.length === 3) return `8 (${parts[0]}) ${parts[1]}-${parts[2]}`;
          return `8 (${parts[0]}) ${parts[1]}-${parts[2]}-${parts[3]}`;
        }
      }
      return cleaned;
    }
    
    // If doesn't start with 8 or +7, don't format
    return cleaned;
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Имя обязательно для заполнения';
    } else if (formData.name.length < 2) {
      newErrors.name = 'Имя должно содержать минимум 2 символа';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email обязателен для заполнения';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Введите корректный email адрес';
    }

    // Phone validation
    const phoneDigits = formData.phone.replace(/\D/g, '');
    if (!formData.phone.trim()) {
      newErrors.phone = 'Телефон обязателен для заполнения';
    } else if (!formData.phone.startsWith('8') && !formData.phone.startsWith('+7')) {
      newErrors.phone = 'Номер должен начинаться с 8 или +7';
    } else if (phoneDigits.length !== 11) {
      newErrors.phone = 'Номер должен содержать 11 цифр';
    }

    // Address validation (only if delivery is selected)
    if (formData.pickupMethod === 'delivery' && !formData.address.trim()) {
      newErrors.address = 'Адрес обязателен для доставки';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowSuccess(true);
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Произошла ошибка при отправке формы. Пожалуйста, попробуйте позже.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Apply phone mask
      const formattedValue = formatPhoneNumber(value);
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleKeyDown = (e) => {
    if (e.target.name === 'phone' && e.key === 'Backspace') {
      const currentValue = formData.phone;
      const cursorPosition = e.target.selectionStart;
      
      // If cursor is at a position with a formatting character, move it back
      if (currentValue[cursorPosition - 1] && !/\d/.test(currentValue[cursorPosition - 1])) {
        e.preventDefault();
        const newPosition = cursorPosition - 1;
        e.target.setSelectionRange(newPosition, newPosition);
      }
    }
  };

  const handleFocus = (e) => {
    if (e.target.name === 'phone' && !formData.phone.trim()) {
      setFormData(prev => ({
        ...prev,
        phone: '+7 '
      }));
    }
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      pickupMethod: 'dealership',
      address: '',
      paymentMethod: 'card'
    });
    setErrors({});
    onClose();
  };

  if (showSuccess) {
    return (
      <SuccessMessage
        vehicle={vehicle}
        onClose={handleSuccessClose}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="buy-form">
      <h2>Оформление покупки</h2>
      <p className="vehicle-info">
        {vehicle.name} - {vehicle.price.toLocaleString()}
      </p>

      <div className="form-group">
        <label htmlFor="name">Имя *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'error' : ''}
          placeholder="Введите ваше имя"
        />
        {errors.name && <span className="error-message">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email *</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'error' : ''}
          placeholder="Введите ваш email"
        />
        {errors.email && <span className="error-message">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="phone">Телефон *</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          className={errors.phone ? 'error' : ''}
          placeholder="+7 (___) ___-__-__"
        />
        {errors.phone && <span className="error-message">{errors.phone}</span>}
      </div>

      <div className="form-group">
        <label>Способ получения</label>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="pickupMethod"
              value="dealership"
              checked={formData.pickupMethod === 'dealership'}
              onChange={handleChange}
            />
            Самовывоз из автосалона
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="pickupMethod"
              value="delivery"
              checked={formData.pickupMethod === 'delivery'}
              onChange={handleChange}
            />
            Доставка
          </label>
        </div>
      </div>

      {formData.pickupMethod === 'delivery' && (
        <div className="form-group">
          <label htmlFor="address">Адрес доставки *</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={errors.address ? 'error' : ''}
            placeholder="Введите адрес доставки"
          />
          {errors.address && <span className="error-message">{errors.address}</span>}
        </div>
      )}

      <div className="form-group">
        <label>Способ оплаты</label>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              name="paymentMethod"
              value="card"
              checked={formData.paymentMethod === 'card'}
              onChange={handleChange}
            />
            Банковской картой
          </label>
          <label className="radio-label">
            <input
              type="radio"
              name="paymentMethod"
              value="cash"
              checked={formData.paymentMethod === 'cash'}
              onChange={handleChange}
            />
            Наличными
          </label>
        </div>
      </div>

      {errors.submit && (
        <div className="error-message submit-error">{errors.submit}</div>
      )}

      <div className="form-actions">
        <button
          type="button"
          className="cancel-button"
          onClick={onClose}
          disabled={isSubmitting}
        >
          Отмена
        </button>
        <button
          type="submit"
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Отправка...' : 'Оформить покупку'}
        </button>
      </div>
    </form>
  );
}

BuyForm.propTypes = {
  vehicle: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired
}; 
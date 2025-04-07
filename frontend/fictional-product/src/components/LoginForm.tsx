import React, { useState } from 'react';
import './LoginForm.scss';

interface ApiError {
  detail: string | { msg: string }[];
}

const LoginForm: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pricingPlan, setPricingPlan] = useState('Monthly');
  const [errors, setErrors] = useState({ name: '', email: '', pricingPlan: '', api: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isValid) {
      setIsLoading(true);
      setErrors(prev => ({ ...prev, api: '' }));

      try {
        const response = await fetch('http://localhost:8000/api/users/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            pricing_plan: pricingPlan
          })
        });

        if (!response.ok) {
          const errorData: ApiError = await response.json();
          if (Array.isArray(errorData.detail)) {
            const errorMessage = errorData.detail.map(err => err.msg).join(', ');
            throw new Error(errorMessage);
          } else {
            throw new Error(errorData.detail || 'Failed to create user');
          }
        }

        const data = await response.json();
        console.log('User created:', data);
        // Clear form after successful submission
        setName('');
        setEmail('');
        setPricingPlan('Monthly');
        alert('Registration successful!');
      } catch (error) {
        setErrors(prev => ({
          ...prev,
          api: error instanceof Error ? error.message : 'An error occurred'
        }));
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleInputChange = (field: 'name' | 'email' | 'pricingPlan', value: string) => {
    // Update the field value
    switch (field) {
      case 'name':
        setName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'pricingPlan':
        setPricingPlan(value);
        break;
    }

    // Validate all fields with the new value
    const newErrors = { ...errors };
    let formValid = true;

    // Validate name
    if (field === 'name' ? value.trim() === '' : name.trim() === '') {
      newErrors.name = 'Name is required';
      formValid = false;
    } else {
      newErrors.name = '';
    }

    // Validate email
    const emailToValidate = field === 'email' ? value : email;
    if (emailToValidate.trim() === '' || !/\S+@\S+\.\S+/.test(emailToValidate)) {
      newErrors.email = 'Valid email is required';
      formValid = false;
    } else {
      newErrors.email = '';
    }

    // Validate pricing plan
    const planToValidate = field === 'pricingPlan' ? value : pricingPlan;
    if (planToValidate === '') {
      newErrors.pricingPlan = 'Pricing plan is required';
      formValid = false;
    } else {
      newErrors.pricingPlan = '';
    }

    setErrors(newErrors);
    setIsValid(formValid);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <div className="form-header">
          <h2>Create Account</h2>
          <p>Join our community and get started</p>
        </div>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            disabled={isLoading}
          />
          {errors.name && <p className="error-message">{errors.name}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            disabled={isLoading}
          />
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>
        <div className="form-group">
          <label htmlFor="pricingPlan">Preferred Pricing Plan:</label>
          <select
            id="pricingPlan"
            value={pricingPlan}
            onChange={(e) => handleInputChange('pricingPlan', e.target.value)}
            disabled={isLoading}
          >
            <option value="Monthly">Monthly</option>
            <option value="Annual">Annual</option>
          </select>
          {errors.pricingPlan && <p className="error-message">{errors.pricingPlan}</p>}
        </div>
        {errors.api && <p className="error-message api-error">{errors.api}</p>}
        <button type="submit" disabled={!isValid || isLoading}>
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
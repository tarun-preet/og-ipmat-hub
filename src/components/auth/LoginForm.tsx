import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Login is removed; redirect users to the name-only entry page.
export const LoginForm = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/enter', { replace: true });
  }, [navigate]);
  return null;
};

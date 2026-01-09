import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Signup removed — redirect to the name-only entry page.
export const SignupForm = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/enter', { replace: true });
  }, [navigate]);
  return null;
};

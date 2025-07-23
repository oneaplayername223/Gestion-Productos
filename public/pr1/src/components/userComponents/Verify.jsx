// hooks/useVerifySession.js
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function useVerifySession() {
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/index', {
      credentials: 'include'
    })
      .then(res => {
        if (res.status === 401 || res.status === 403) {
          navigate('/login');
        }
      })
      .catch(() => navigate('/login'));
  }, []);
}

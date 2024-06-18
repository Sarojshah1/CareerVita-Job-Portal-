// Example useAuth hook (simplified)
import { useState } from 'react';

export const useAuth = () => {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [userType, setUserType] = useState(localStorage.getItem('userType'));
  const [token, setToken] = useState(localStorage.getItem('token'));


  const login = (userId, userType, token) => {
    localStorage.setItem('userId', userId);
    localStorage.setItem('userType', userType);
    localStorage.setItem('token', token);
    setUserId(userId);
    setUserType(userType);
    setToken(token);
    
  };

  const logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('userType');
    localStorage.removeItem('token');
    localStorage.removeItem('jobSeekerId');
    localStorage.removeItem('companyId');
    setUserId(null);
    setUserType(null);
    setToken(null);
    setJobSeekerId(null);
    setCompanyId(null);
  };

  return { userId, userType, token, login, logout };
};

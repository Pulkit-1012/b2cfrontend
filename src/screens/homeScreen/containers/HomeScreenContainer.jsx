import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import HomeScreen from '../components/HomeScreen';

const HomeScreenContainer = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/signup');
  };

  return <HomeScreen onGetStarted={handleGetStarted} />;
};

export default HomeScreenContainer;
import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { FaCircleCheck } from 'react-icons/fa6';

// Animation for sliding effect
const slideDown = keyframes`
  from {
    transform: translateY(-100%);
  }
  to {
    transform: translateY(0);
  }
`;

const AlertWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #d4edda;
  border-color: #c3e6cb;
  color: #155724;
  padding: 10px;
  border-radius: 10px;
  margin: 20px 20px 20px 0;
  align-content: center;
  z-index: 9999;
  
  /* Positioning */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: auto;
  max-width: 650px;  
  margin-left: auto;
  margin-right: auto;

  /* Animation */
  animation: ${slideDown} 0.5s ease-out;
`;

const Boxik = styled.div`
  background: #3ebc62;
  height: 33px;
  width: 33px;
  display: flex;
  justify-content: center;
  margin-right: 0.5rem;
  align-items: center;
  border-radius: 7px;
  min-width: 33px;
  min-height: 33px;
`;

const SuccessBadge = styled.span`
  font-weight: bold;
  margin-right: 0.5rem;
`;

const SuccessIcon = styled(FaCircleCheck)`
  font-size: 1.5rem;
  color: #fff;
`;

const CloseIcon = styled(FaTimes)`
  font-size: 1rem;
  margin-left: auto;
  cursor: pointer;
`;

export default function SuccessAlert({ message }) {
  const [dismissed, setDismissed] = useState(false);

  const dismissAlert = () => {
    setDismissed(true);
  };

  if (dismissed) {
    return null;
  }

  return (
    <AlertWrapper>
      <Boxik>
        <SuccessIcon />
      </Boxik>
      <SuccessBadge>Success</SuccessBadge>
      {message}
      <CloseIcon onClick={dismissAlert} />
    </AlertWrapper>
  );
}

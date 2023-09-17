import React, {  useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { FaTriangleExclamation } from 'react-icons/fa6';

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
  background-color: #fff3cd;
  border-color: #ffeeba;
  color: #856404;
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
  background: #f7bc0b;
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

const WarningBadge = styled.span`
  font-weight: bold;
  margin-right: 0.5rem;
`;

const WarningIcon = styled(FaTriangleExclamation)`
  font-size: 1.5rem;
  color: #fff;
`;

const CloseIcon = styled(FaTimes)`
  font-size: 1rem;
  margin-left: auto;
  cursor: pointer;
`;

export default function WarningAlert({message}) {
    const [dismissed, setDismissed] = useState(false);
  
    const dismissAlert = () => {
      setDismissed(true);
    };

    // If the alert is dismissed, we don't render it at all
    if (dismissed) {
      return null;
    }
  
    return (
      <AlertWrapper>
      <Boxik>
        <WarningIcon />
      </Boxik>
      <WarningBadge>Warning</WarningBadge>
      {message}
      <CloseIcon onClick={dismissAlert} />
    </AlertWrapper>
  );
}

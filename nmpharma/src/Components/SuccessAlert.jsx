import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import {  FaTimes } from 'react-icons/fa';
import { FaCircleCheck } from 'react-icons/fa6';



const AlertWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #d4edda;
  border-color: #c3e6cb;
  color: #155724;
  padding: 10px;
  border-radius: 10px;
  margin: 20px 20px 20px 0;
  opacity: ${({ dismissed }) => (dismissed ? 0 : 1)};
  transition: opacity 0.3s ease;
  align-content: center;
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

export default function SuccessAlert() {
    const [dismissed, setDismissed] = useState(false);
  
    useEffect(() => {
      let timeout;
      if (dismissed) {
        timeout = setTimeout(() => {
          setDismissed(false);
        }, 2000); // Delay before resetting dismissed state to show the fading effect
      }
  
      return () => clearTimeout(timeout);
    }, [dismissed]);
  
    const dismissAlert = () => {
      setDismissed(true);
    };
  
    return (
      <AlertWrapper dismissed={dismissed ? 'true' : undefined}>
      <Boxik>
        <SuccessIcon />
      </Boxik>
      <SuccessBadge>Success</SuccessBadge>
      Your success message goes here!
      <CloseIcon onClick={dismissAlert} />
    </AlertWrapper>
  );
}

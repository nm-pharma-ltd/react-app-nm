import React, { useState } from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { FaCircleXmark } from 'react-icons/fa6';

const AlertWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
  padding: 10px;
  border-radius: 10px;
  margin: 20px 20px 20px 0;
  align-content: center;
  z-index: 9999;
`;

const Boxik = styled.div`
  background: #dc3545;
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

const DangerBadge = styled.span`
  font-weight: bold;
  margin-right: 0.5rem;
`;

const DangerIcon = styled(FaCircleXmark)`
  font-size: 1.5rem;
  color: #fff;
`;

const CloseIcon = styled(FaTimes)`
  font-size: 1rem;
  margin-left: auto;
  cursor: pointer;
`;

export default function DangerAlert({ message }) {
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
        <DangerIcon />
      </Boxik>
      <DangerBadge>Warning</DangerBadge>
      {message}
      <CloseIcon onClick={dismissAlert} />
    </AlertWrapper>
  );
}

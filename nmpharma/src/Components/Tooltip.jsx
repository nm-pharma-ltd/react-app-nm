import styled from 'styled-components';
import React from 'react';

function Tooltip({ children, message }) {
  return (
    <TooltipContainer>
      {children}
      <TooltipText className="tooltip">{message}</TooltipText>
    </TooltipContainer>
  );
}



const TooltipContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 100%;

  &:hover .tooltip {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.7s;
  }
`;

const TooltipText = styled.span`
  visibility: hidden;
  background-color: #656565cb;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 125%; // Position above the element
  left: 50%;
  margin-left: -60px; // Half of width to center it
  opacity: 0;

  &::after {
    content: "";
    position: absolute;
    top: 100%; 
    left: 50%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: #555 transparent transparent transparent;
  }
`;

export default Tooltip;

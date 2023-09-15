import React from "react";
import { DvdScreensaver } from "react-dvd-screensaver";
import styled from 'styled-components';

const LoadingStevan = () => {
  
  const [componentImpactCount, setComponentImpactCount] = React.useState(0);
  

  const handleComponentImpactCount = () => {
    const randomCount = Math.floor(Math.random() * 4) + 1;
    setComponentImpactCount(randomCount);
  };


  return (
    <StyledContents>
      <StyledDvdScreensaver speed={3} height="100vh" impactCallback={handleComponentImpactCount}>
        <StyledImage
          src={require(`../img/Stevan${componentImpactCount}.png`)}
          alt=""
        />
      </StyledDvdScreensaver>
    </StyledContents>
  );
};

export default LoadingStevan;



const StyledContents = styled.div`
  height: 100vh;
  overflow: hidden;
`;

const StyledDvdScreensaver = styled(DvdScreensaver)`
  animation: rotate 4s linear infinite;
  width: 100%;
  height: 100%;
`;

const StyledImage = styled.img`
  height: 130px;
  width: 100px;
  transform: rotate(90deg);
`;
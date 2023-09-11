import React, { useEffect } from "react";
import { useDvdScreensaver, DvdScreensaver } from "react-dvd-screensaver";
import styled from 'styled-components';

export const COLORS = [
  "#ff0000",
  "#ff4000",
  "#ff0040",
  "#ff0000",
];

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

const LoadingStevan = () => {
  const { containerRef, elementRef, hovered, impactCount } = useDvdScreensaver({
    freezeOnHover: true,
    speed: 5,
  });
  const [componentImpactCount, setComponentImpactCount] = React.useState(0);
  const [logoColor, setLogoColor] = React.useState(COLORS[0]);

  useEffect(() => {
    if (hovered) {
      console.log("* FROZEN");
    }
  }, [hovered]);

  useEffect(() => {
    setLogoColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
  }, [impactCount]);

  return (
    <StyledContents>
      <StyledDvdScreensaver speed={1} height="100vh">
        <StyledImage
          src={require("../img/Stevan1.png")}
          alt=""
        />
      </StyledDvdScreensaver>
    </StyledContents>
  );
};

export default LoadingStevan;

import React from "react";
import { styled } from "styled-components";
import TeamCardDetail, { gradientColors } from "../Components/TeamCardDetails";
import Teams from "../Components/Teams";
import { UnderlineH } from "./Stock";


export default function Targets() {


  return (
    <>
      <SpaceH2>Targets</SpaceH2>
      <Teams />
    </>
  );
}

const SpaceH2 = styled.h2`
  margin-bottom: 20px;
`


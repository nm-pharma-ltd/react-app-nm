import React from "react";
import LineChart from "../Components/LineChart";
import BarChart from "../Components/BarChart"
import { GoBackButton, Title, TitleWrapper } from "./ClientsDetails";
import { styled } from "styled-components";


export default function SingleProductDetails() {
    
    return (
      <Kontaineros>
       <TitleWrapper>
        <Title>Sales activity - Voltaren</Title>
        <GoBackButton to="/pharmacies">Back</GoBackButton>
      </TitleWrapper>

      <BarChart />
      <LineChart />
      
      <h2>Targets</h2>
      

      </Kontaineros>
    );

}

const Kontaineros = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`

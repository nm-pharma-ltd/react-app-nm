import React from "react";
import LineChart from "../Components/Chart";
import BarChart from "../Components/BarChart"
import { GoBackButton, Title, TitleWrapper } from "./ClientsDetails";


export default function SingleProductDetails() {
    
    return (
      <>
       <TitleWrapper>
        <Title>Sales activity - Voltaren</Title>
        <GoBackButton to="/pharmacies">Back</GoBackButton>
      </TitleWrapper>
      <BarChart />
      <LineChart />
      

      </>
    );

}

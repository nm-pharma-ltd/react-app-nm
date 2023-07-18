import React from "react";
import LineChart from "../Components/Chart";
import { GoBackButton, Title, TitleWrapper } from "./ClientsDetails";


export default function SinglePharmacyDetails() {

  return (
    <>
      <TitleWrapper>
        <Title>Sales activity - Pharmacy 1</Title>
        <GoBackButton to="/pharmacies">Back</GoBackButton>
      </TitleWrapper>
      <LineChart />
    </>
  );
}

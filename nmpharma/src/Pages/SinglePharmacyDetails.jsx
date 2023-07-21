import React from "react";
import LineChart from "../Components/LineChart";
import { GoBackButton, Title, TitleWrapper } from "./ClientsDetails";
import Table from "../Components/Table";



export function SinglePharmacyDetails() {

  const products = [
    { rank: 1, name: 'Product 1', profit: 500, soldTarget: '1250 / 1520' },
    { rank: 2, name: 'Product 2', profit: 80, soldTarget: '580 / 1050' },
    { rank: 3, name: 'Product 3', profit: 200, soldTarget: '405 / 1050' },
    { rank: 4, name: 'Product 4', profit: 300, soldTarget: '705 / 1050' },
    { rank: 5, name: 'Product 5', profit: 150, soldTarget: '820 / 1050' },

  ];

  return (
    <>
      <TitleWrapper>
        <Title>Sales activity - Pharmacy 1</Title>
        <GoBackButton to="/pharmacies">Back</GoBackButton>
      </TitleWrapper>


      <Table
        title="Product Profit & Quantity"
        subtitle="TOP 5"
        viewDetailsLink="/pharmacies/productdetails"
        width="auto"
        columns={[
          { label: 'RANK', field: 'rank', align: 'left' },
          { label: 'NAME', field: 'name', align: 'left' },
          { label: 'PROFIT', field: 'profit', align: 'right' },
          { label: 'SOLD/TARGET', field: 'soldTarget', align: 'right' },
        ]}
        data={products}
      />


      <LineChart />
    </>
  );
}

import React from "react";
import { styled } from "styled-components";
import Table from "../Components/Table";
import { GoBackButton } from "./ClientsDetails";

export default function ProductDetails() {

  
  const products = [
    { rank: 1, name: 'Product 1', profit: 500, soldTarget: `${1250}€ / ${1520}€` },
    { rank: 2, name: 'Product 2', profit: 80, soldTarget: `${580}€ / ${1050}€` },
    { rank: 3, name: 'Product 3', profit: 200, soldTarget: `${405}€ / ${1050}€` },
    { rank: 4, name: 'Product 4', profit: 300, soldTarget: `${705}€ / ${1050}€` },
    { rank: 5, name: 'Product 5', profit: 150, soldTarget: `${820}€ / ${1050}€` },
    { rank: 6, name: 'Product 6', profit: 400, soldTarget: `${1250}€ / ${1520}€` },
    { rank: 7, name: 'Product 7', profit: -400, soldTarget: `${1250}€ / ${1520}€` },
    { rank: 8, name: 'Product 8', profit: -80, soldTarget: `${580}€ / ${1050}€` },
    { rank: 9, name: 'Product 9', profit: 200, soldTarget: `${405}€ / ${1050}€` },
    { rank: 10, name: 'Product 10', profit: 300, soldTarget: `${705}€ / ${1050}€` },
    { rank: 11, name: 'Product 11', profit: 500, soldTarget: `${1250}€ / ${1520}€` },
    { rank: 12, name: 'Product 12', profit: 80, soldTarget: `${580}€ / ${1050}€` },
    { rank: 13, name: 'Product 13', profit: 200, soldTarget: `${405}€ / ${1050}€` },
    { rank: 14, name: 'Product 14', profit: 300, soldTarget: `${705}€ / ${1050}€` },
    { rank: 15, name: 'Product 15', profit: 150, soldTarget: `${820}€ / ${1050}€` },
    { rank: 16, name: 'Product 16', profit: 400, soldTarget: `${1250}€ / ${1520}€` },
    { rank: 17, name: 'Product 17', profit: -400, soldTarget: `${1250}€ / ${1520}€` },
    { rank: 18, name: 'Product 18', profit: -80, soldTarget: `${580}€ / ${1050}€` },
    { rank: 19, name: 'Product 19', profit: 200, soldTarget: `${405}€ / ${1050}€` },
    { rank: 20, name: 'Product 20', profit: 300, soldTarget: `${705}€ / ${1050}€` },
    { rank: 21, name: 'Product 21', profit: 500, soldTarget: `${1250}€ / ${1520}€` },
    { rank: 22, name: 'Product 22', profit: 80, soldTarget: `${580}€ / ${1050}€` },
    { rank: 23, name: 'Product 23', profit: 200, soldTarget: `${405}€ / ${1050}€` },
    { rank: 24, name: 'Product 24', profit: 300, soldTarget: `${705}€ / ${1050}€` },
    { rank: 25, name: 'Product 25', profit: 150, soldTarget: `${820}€ / ${1050}€` },
  ];
  
  

  return (
    <>
      <Container>
        <TitleWrapper>
          <Title>Sales activity details</Title>
          <GoBackButton to="/pharmacies">Back</GoBackButton>
        </TitleWrapper>
        <MamRadVelkyZadky>
        <Table
          title="Product Profit & Quantity"
          subtitle="TOP 82"
          width="100%"
          columns={[
            { label: 'RANK', field: 'rank', align: 'left' },
            { label: 'NAME', field: 'name', align: 'left' },
            { label: 'PROFIT', field: 'profit', align: 'center' },
            { label: 'SOLD/TARGET', field: 'soldTarget', align: 'right' },
          ]}
          data={products}
        />
        </MamRadVelkyZadky>
      </Container>
    </>
  );
}

const Container = styled.div`
  margin-bottom: 20px;
`;

const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

const Title = styled.h2`
  margin: 0;
  display: flex;
`;



const MamRadVelkyZadky = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 20px;
  width: 100%;
`;

import React from "react";
import { styled } from "styled-components";
import { NavLink } from "react-router-dom";
import Table from "../Components/Table";

export default function ClientDetails() {

  const pharmacies = [
    { rank: 1, name: 'Pharmacy 1', profit: 500, monthlysales: `${1520}€` },
    { rank: 2, name: 'Pharmacy 2', profit: 80, monthlysales: `${50}€` },
    { rank: 3, name: 'Pharmacy 3', profit: 200, monthlysales: `${1050}€` },
    { rank: 4, name: 'Pharmacy 4', profit: 300, monthlysales: `${1050}€` },
    { rank: 5, name: 'Pharmacy 5', profit: 150, monthlysales: `${1050}€` },
    { rank: 6, name: 'Pharmacy 6', profit: 400, monthlysales: `${1520}€` },
    { rank: 7, name: 'Pharmacy 7', profit: -400, monthlysales: `${1520}€` },
    { rank: 8, name: 'Pharmacy 8', profit: -80, monthlysales: `${1050}€` },
    { rank: 9, name: 'Pharmacy 9', profit: 200, monthlysales: `${1050}€` },
    { rank: 10, name: 'Pharmacy 10', profit: 300, monthlysales: `${1050}€` },
    { rank: 11, name: 'Pharmacy 11', profit: 500, monthlysales: `${1520}€` },
    { rank: 12, name: 'Pharmacy 12', profit: 80, monthlysales: `${50}€` },
    { rank: 13, name: 'Pharmacy 13', profit: 200, monthlysales: `${1050}€` },
    { rank: 14, name: 'Pharmacy 14', profit: 300, monthlysales: `${1050}€` },
    { rank: 15, name: 'Pharmacy 15', profit: 150, monthlysales: `${1050}€` },
    { rank: 16, name: 'Pharmacy 16', profit: 400, monthlysales: `${1520}€` },
    { rank: 17, name: 'Pharmacy 17', profit: -400, monthlysales: `${1520}€` },
    { rank: 18, name: 'Pharmacy 18', profit: -80, monthlysales: `${1050}€` },
    { rank: 19, name: 'Pharmacy 19', profit: 200, monthlysales: `${1050}€` },
    { rank: 20, name: 'Pharmacy 20', profit: 300, monthlysales: `${1050}€` },
    { rank: 21, name: 'Pharmacy 21', profit: 500, monthlysales: `${1520}€` },
    { rank: 22, name: 'Pharmacy 22', profit: 80, monthlysales: `${50}€` },
    { rank: 23, name: 'Pharmacy 23', profit: 200, monthlysales: `${1050}€` },
    { rank: 24, name: 'Pharmacy 24', profit: 300, monthlysales: `${1050}€` },
    { rank: 25, name: 'Pharmacy 25', profit: 150, monthlysales: `${1050}€` },
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
            title="Pharmacies (Clients)"
            subtitle="TOP 82"
            viewDetailsLink="/pharmacies/clientdetails"
            width="100%"
            columns={[
              { label: 'RANK', field: 'rank', align: 'left' },
              { label: 'NAME', field: 'name', align: 'left' },
              { label: 'PROFIT', field: 'profit', align: 'center' },
              { label: 'MONTHLY SALES', field: 'monthlysales', align: 'right' },
            ]}
            data={pharmacies}
          />
        </MamRadVelkyZadky>
      </Container>
    </>
  );
}

const Container = styled.div`
  margin-bottom: 20px;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
`;

export const Title = styled.h2`
  margin: 0;
  display: flex;
`;

export const GoBackButton = styled(NavLink)`
  padding: 4px;
  cursor: pointer;
  font-weight: 600;
  width: 80px;
  min-width: 80px;
  text-decoration: none;
  color: #d54529;
  font-size: 14px;
  text-align: center;
  border: 3px solid #d54529;
  margin: 0px 20px;
  border-radius: 10px;
  transition: all 0.25s ease-in-out;


  &:hover {
    color: #fff;
    background: #d54629dd;

  }
`;

const MamRadVelkyZadky = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 20px;
  width: 100%;
`;

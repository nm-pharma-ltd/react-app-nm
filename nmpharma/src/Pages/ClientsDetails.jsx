import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import { NavLink } from "react-router-dom";
import Table from "../Components/Table";
import ApiService from "../api/ApiService";

export default function ClientDetails() {

  const [pharmaciesData, setPharmaciesData] = useState([]);

  useEffect(() => {
    async function fetchPharmacyData() {
      try {
        const fetchedData = await ApiService.get("clients/sales/2023/1");
        
        const sortedPharmacies = fetchedData.sort((a, b) => b.monthlySale - a.monthlySale);
        const processedPharmacies = sortedPharmacies.map((pharmacy, index) => ({
          rank: index + 1,
          clientName: pharmacy.clientName,
          monthlyProfit: pharmacy.monthlyProfit.toFixed(1),
          monthlySale: parseFloat(pharmacy.monthlySale).toFixed(0) + "€"
        }));
    
        setPharmaciesData(processedPharmacies.slice(0, 82)); // Display top 10
      } catch (error) {
        console.error('Error fetching pharmacy data:', error);
      }
    }
  
    fetchPharmacyData();
  }, []);
  

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
          width="98%"
          columns={[
            { label: 'RANK', field: 'rank', align: 'left' },
            { label: 'NAME', field: 'clientName', align: 'left' },
            { label: 'PROFIT', field: 'monthlyProfit', align: 'center' },
            { label: 'MONTHLY SALES', field: 'monthlySale', align: 'right' },
          ]}
          data={pharmaciesData}
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

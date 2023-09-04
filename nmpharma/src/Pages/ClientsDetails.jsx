import React, { useEffect, useState } from "react";
import styled from "styled-components"; 
import { NavLink } from "react-router-dom";
import Table from "../Components/Table";
import ApiService from "../api/ApiService";
import { Skeleton } from "@mui/material";
import { FiSearch } from "react-icons/fi"; 

export default function ClientDetails() {

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [pharmaciesData, setPharmaciesData] = useState([]);
  const [filteredPharmacies, setFilteredPharmacies] = useState([]);



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
    
        setPharmaciesData(processedPharmacies.slice(0, 82));
        setFilteredPharmacies(processedPharmacies.slice(0, 82));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching pharmacy data:', error);
        setLoading(false);
      }
    }
    fetchPharmacyData();
  }, []);


  useEffect(() => {
      if (searchTerm === "") {
        setFilteredPharmacies(pharmaciesData);
      } else {
        const filtered = pharmaciesData.filter(pharmacy => pharmacy.clientName.toLowerCase().startsWith(searchTerm.toLowerCase()));
        setFilteredPharmacies(filtered);
      }
  }, [searchTerm, pharmaciesData]);
  
  
  function HighlightedText({ text, highlight }) {
    const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
    return (
      <span>
        {parts.map((part, index) => 
          part.toLowerCase() === highlight.toLowerCase() ? <Highlight0 key={index}>{part}</Highlight0> : part
        )}
      </span>
    );
  }

  return (
    <>
      <Container>
        <TitleWrapper>
          <Title>Sales activity details</Title>
          <GoBackButton to="/pharmacies">Back</GoBackButton>
          <SearchBarWrapper>
            <FiSearch />
            <InputSeacrh
              type="text"
              placeholder="Search Clients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </SearchBarWrapper>
        </TitleWrapper>
        <MamRadVelkyZadky>
        {loading ? (
          <NutellaTableContainer style={{ width: "98%"}}>
            <NutellaSkeleton variant="text" width="60%" height="24px" />
            <NutellaSkeleton variant="text" width="30%" height="20px" marginBottom="16px" />
            <div style={{ display: 'flex', marginBottom: "10px" }}>
              <NutellaSkeleton variant="rectangular" width="10%" height="20px" marginRight="2%" />
              <NutellaSkeleton variant="rectangular" width="45%" height="20px" marginRight="2%" />
              <NutellaSkeleton variant="rectangular" width="15%" height="20px" marginRight="2%" />
              <NutellaSkeleton variant="rectangular" width="25%" height="20px" />
            </div>
            {Array(15).fill().map((_, i) => (
              <div key={i} style={{ display: 'flex', marginBottom: "10px" }}>
                <NutellaSkeleton variant="rectangular" width="10%" height="20px" marginRight="2%" />
                <NutellaSkeleton variant="rectangular" width="45%" height="20px" marginRight="2%" />
                <NutellaSkeleton variant="rectangular" width="15%" height="20px" marginRight="2%" />
                <NutellaSkeleton variant="rectangular" width="25%" height="20px" />
              </div>
            ))}
          </NutellaTableContainer>
        ) : (
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
            data={filteredPharmacies.map(pharmacy => ({
              ...pharmacy,
              clientName: <HighlightedText text={pharmacy.clientName} highlight={searchTerm} />
            }))}                      
          />
        )}
        </MamRadVelkyZadky>
      </Container>
    </>
  );
}

const Highlight0 = styled.mark`
  background-color: #d54529;  
  color: black; 
`;


export const InputSeacrh = styled.input`
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  background: ${props=> props.theme.nav};
  outline: none;
  transition: all 0.2s ease-in-out;
  color: ${props=> props.theme.text};

  &:focus {
    background: ${props=> props.theme.componentBackground};
  }
`;

export const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  padding: 5px 10px;
  background: ${props=> props.theme.componentBackground};
  border-radius: 20px;

  svg {
    color: #888;
    font-size: 18px;
    margin-right: 4px;
  }
`;

const NutellaTableContainer = styled.div`
  background-color: ${(props) => props.theme.componentBackground};
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
  margin-right: 25px;
  width: ${(props) => props.width || "98%"};
  min-width: 500px;
  height: 600px;

  @media (max-width: 1320px) {
    width: 100%;
  }
`;

const NutellaSkeleton = styled(Skeleton)`
  color: ${(props) => props.theme.lightdark};
`;

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
    background: #d54629;

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

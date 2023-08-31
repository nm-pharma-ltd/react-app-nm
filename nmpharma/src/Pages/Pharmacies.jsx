import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import ChatBox from "../Components/ChatBox";
import { Title } from "./ClientsDetails";
import Table from "../Components/Table";
import Teams from "../Components/Teams";
import { Konto } from "./ForecastSingleProduct";
import ApiService from "../api/ApiService";
import Skeleton from "@mui/material/Skeleton";

export default function Pharmacies() {
  const [products, setProducts] = useState([]); 
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoadingPharmacies, setIsLoadingPharmacies] = useState(true);

  
  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoadingProducts(true);
        const productsData = await ApiService.get("products/sales/2023/1");

        // Ensure data is sorted by rank
        const sortedData = productsData.sort((a, b) => a.rank - b.rank);

        const processedData = sortedData.map((product) => ({
          ...product,
          soldTarget: `${product.quantitySold} / ${product.quantityTarget}`,
          monthlyProfit: parseFloat(product.monthlyProfit).toFixed(0),
        }));

        // Set only the top 10 products
        setProducts(processedData.slice(0, 10));
        console.log(processedData.slice(0, 10));
        setIsLoadingProducts(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoadingProducts(false);
      }
    }

    fetchData();
  }, []);

  const [pharmaciesData, setPharmaciesData] = useState([]);

  useEffect(() => {
    async function fetchPharmacyData() {
      try {
        setIsLoadingPharmacies(true);
        const fetchedData = await ApiService.get("clients/sales/2023/1");

        const sortedPharmacies = fetchedData.sort(
          (a, b) => b.monthlySale - a.monthlySale
        );
        const processedPharmacies = sortedPharmacies.map((pharmacy, index) => ({
          rank: index + 1,
          clientName: pharmacy.clientName,
          monthlyProfit: pharmacy.monthlyProfit.toFixed(0),
          monthlySale: parseFloat(pharmacy.monthlySale).toFixed(0) + "€",
        }));

        setPharmaciesData(processedPharmacies.slice(0, 10)); // Display top 10
        setIsLoadingPharmacies(false);
      } catch (error) {
        console.error("Error fetching pharmacy data:", error);
        setIsLoadingPharmacies(false);
      }
    }

    fetchPharmacyData();
  }, []);

  return (
    <>
      <Title>Sales activity</Title>
      <MamRadVelkyZadky>
        {isLoadingProducts ? (
          <NutellaSkeletonTableContainer style={{ width: "47%" }}>
           
            <NutellaSkeleton variant="text" width="60%" height="24px" />
            <NutellaSkeleton variant="text" width="30%" height="20px" />
          
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <NutellaSkeleton
                variant="rectangular"
                width="10%"
                height="20px"
              />
              <NutellaSkeleton
                variant="rectangular"
                width="45%"
                height="20px"
              />
              <NutellaSkeleton
                variant="rectangular"
                width="15%"
                height="20px"
              />
              <NutellaSkeleton
                variant="rectangular"
                width="25%"
                height="20px"
              />
            </div>

            {/* Table Rows */}
            {Array(10)
              .fill()
              .map((_, i) => (
                <div key={i} style={{ display: "flex", marginBottom: "10px" }}>
                  <NutellaSkeleton
                    variant="rectangular"
                    width="10%"
                    height="20px"
                  />
                  <NutellaSkeleton
                    variant="rectangular"
                    width="45%"
                    height="20px"
                  />
                  <NutellaSkeleton
                    variant="rectangular"
                    width="15%"
                    height="20px"
                  />
                  <NutellaSkeleton
                    variant="rectangular"
                    width="25%"
                    height="20px"
                  />
                </div>
              ))}
          </NutellaSkeletonTableContainer>
        ) : (
          <Table
            title="Product Profit & Quantity"
            subtitle="TOP 10"
            viewDetailsLink="/pharmacies/productdetails"
            width="47%"
            columns={[
              { label: "RANK", field: "rank", align: "left" },
              { label: "NAME", field: "productDescription", align: "left" },
              { label: "PROFIT", field: "monthlyProfit", align: "center" },
              { label: "SOLD/TARGET", field: "soldTarget", align: "right" },
            ]}
            data={products}
          />
        )}

        {isLoadingPharmacies ? (
          <NutellaSkeletonTableContainer style={{ width: "47%" }}>
            {/* Title & Subtitle */}
            <NutellaSkeleton variant="text" width="60%" height="24px" />
            <NutellaSkeleton variant="text" width="30%" height="20px" />

            {/* Table Headers */}
            <div style={{ display: "flex", marginBottom: "10px" }}>
              <NutellaSkeleton
                variant="rectangular"
                width="10%"
                height="20px"
              />
              <NutellaSkeleton
                variant="rectangular"
                width="45%"
                height="20px"
              />
              <NutellaSkeleton
                variant="rectangular"
                width="15%"
                height="20px"
              />
              <NutellaSkeleton
                variant="rectangular"
                width="25%"
                height="20px"
              />
            </div>

            {/* Table Rows */}
            {Array(10)
              .fill()
              .map((_, i) => (
                <div key={i} style={{ display: "flex", marginBottom: "10px" }}>
                  <NutellaSkeleton
                    variant="rectangular"
                    width="10%"
                    height="20px"
                  />
                  <NutellaSkeleton
                    variant="rectangular"
                    width="45%"
                    height="20px"
                  />
                  <NutellaSkeleton
                    variant="rectangular"
                    width="15%"
                    height="20px"
                  />
                  <NutellaSkeleton
                    variant="rectangular"
                    width="25%"
                    height="20px"
                  />
                </div>
              ))}
          </NutellaSkeletonTableContainer>
        ) : (
          <Table
            title="Pharmacies (Clients)"
            subtitle="TOP 10"
            viewDetailsLink="/pharmacies/clientdetails"
            width="47%"
            columns={[
              { label: "RANK", field: "rank", align: "left" },
              { label: "NAME", field: "clientName", align: "left" },
              { label: "PROFIT", field: "monthlyProfit", align: "center" },
              { label: "MONTHLY SALES", field: "monthlySale", align: "right" },
            ]}
            data={pharmaciesData}
          />
        )}
      </MamRadVelkyZadky>
  
  {/* TÝMY */}
      <Teams/>
    
    {/* CHAT */}
      <h2>Chat</h2>
      <Konto>
        <ChatBox endPoint="comments" />
      </Konto>
    </>
  );
}









































const NutellaSkeletonTableContainer = styled.div`
  background-color: ${(props) => props.theme.componentBackground};
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
  margin-right: 25px;
  width: ${(props) => props.width || "48%"};
  min-width: 500px;
  height: 600px;

  @media (max-width: 1320px) {
    width: 100%;
  }
`;

const NutellaSkeleton = styled(Skeleton)`
  color: ${(props) => props.theme.lightdark};
`;



export const MamRadVelkyZadky = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 20px;
`;

export const MamRadVelkyZadky2 = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-right: 20px;
  margin-bottom: 20px;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const IconLink = styled(NavLink)`
  padding: 10px;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  color: #d54529;
  font-size: 20px;

  &:hover {
    color: #5d5d5d;
    transition: all 0.25s ease-in-out;
  }
`;

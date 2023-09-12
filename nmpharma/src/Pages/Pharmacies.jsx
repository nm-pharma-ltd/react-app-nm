import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import ChatBox from "../Components/ChatBox";
import { Title } from "./ClientsDetails";
import Table from "../Components/Table";
import Teams from "../Components/Teams";
import { Konto } from "./ForecastSingleProduct";
import Skeleton from "@mui/material/Skeleton";
import DangerAlert from "../Components/DangerAlert";
import { Context, SIGNEDUSER, PRODUCTS, CLIENTS  } from '../providers/provider';

export default function Pharmacies({ IsLoadingPharmacies, IsLoadingProducts  }) {

  const [store, dispatch] = useContext(Context);
  const [errorMessage, setErrorMessage] = useState('');

  return (
    <>
      <Title>Sales activity</Title>
      {errorMessage && 
      <DangerAlert message={errorMessage} />}
      <MamRadVelkyZadky>
        {IsLoadingProducts ? (
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
            details="View details"
            viewDetailsLink="/pharmacies/productdetails"
            width="47%"
            columns={[
              { label: "RANK", field: "rank", align: "left" },
              { label: "NAME", field: "productDescription", align: "left" },
              { label: "PROFIT", field: "monthlyProfit", align: "center" },
              { label: "SOLD/TARGET", field: "soldTarget", align: "right" },
            ]}
            data={store.products.slice(0, 10)}
          />
        )}

        {IsLoadingPharmacies ? (
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
            details="View details"
            viewDetailsLink="/pharmacies/clientdetails"
            width="47%"
            columns={[
              { label: "RANK", field: "rank", align: "left" },
              { label: "NAME", field: "clientName", align: "left" },
              { label: "PROFIT", field: "monthlyProfit", align: "center" },
              { label: "MONTHLY SALES", field: "monthlySale", align: "right" },
            ]}
            data={store.clients.slice(0, 10)}
          />
        )}
      </MamRadVelkyZadky>

      {/* TÝMY */}
      <Teams />

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

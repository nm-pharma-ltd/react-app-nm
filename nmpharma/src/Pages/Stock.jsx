import React, { useEffect, useState, useContext } from "react";
import StockCard, { CardContainer } from "../Components/StockCard";
import { styled } from "styled-components";
import ApiService from "../api/ApiService";
import { Context } from "../providers/provider";
import Skeleton from "@mui/material/Skeleton";
import { NavLink } from "react-router-dom";

export default function Stock({ IsLoadingForecast }) {
  const [store, dispatch] = useContext(Context);
  const [displayMode, setDisplayMode] = useState("SUPPLIERS"); // default to SUPPLIERS
  const [pharmacies, setPharmacies] = useState(store.processedForecast);

  useEffect(() => {
    setPharmacies(store.processedForecast);
  }, [store.processedForecast]);

  return (
    <Kontainer>
      <h2>Stock</h2>
      <UnderlineH>Sorted by {displayMode === "SUPPLIERS" ? "Suppliers" : "All Products"}</UnderlineH>
      {/* Buttons to toggle display mode */}
      <div>
        <ModeButtonL
          active={displayMode === "SUPPLIERS"}
          onClick={() => setDisplayMode("SUPPLIERS")}
        >
          View by Suppliers
        </ModeButtonL>
        <ModeButtonR
          active={displayMode === "ALL_PRODUCTS"}
          onClick={() => setDisplayMode("ALL_PRODUCTS")}
        >
          View All Products
        </ModeButtonR>

      </div>

      {IsLoadingForecast ? renderSkeletons() : (
        displayMode === "SUPPLIERS" ? (
          pharmacies ? pharmacies.map((item, index) => (
            <StockCard key={index} data={item} />
          )) : <p>No Data</p>
        ) : (
          pharmacies ? <StockCard data={{ processedForecast: pharmacies.flatMap(item => item.productsForecast).sort((a, b) => (a.productCode || '').localeCompare(b.productCode || '')) }} /> : <p>No Data</p>
        )
      )}
    </Kontainer>
  );

  function renderSkeletons() {
    return (
      <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
        {Array(10).fill().map((_, index) => (
          <CardContainer style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
            <div style={{ width: "80%", display: "flex", flexDirection: "row" }}>
              <NutellaSkeleton
                variant="rectangular"
                width="10%"
                height="2em"
                color="black"
              />
              <NutellaSkeleton
                variant="rectangular"
                width="35%"
                marginLeft="10px"
                height="2em"
                color="black"
              />
            </div>
            <NutellaSkeleton
              variant="rectangular"
              width="15%"
              marginLeft="10px"
              height="2em"
              color="black"
            />
          </CardContainer>
        ))}
      </div>
    );
  }
}

export const ModeButtonL = styled(NavLink)`
  color: ${props => props.theme.text};
  padding: 5px 10px;
  border: 3px solid #575757;
  border-radius: 5px 0 0 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: 0.2s ease-in-out;
  text-wrap: nowrap;
  background-color: ${props => props.active ? '#575757' : props.theme.componentBackground};
  color: ${props => props.active ? '#fff' : props.theme.text};

  &:hover {
    background-color: #575757;
    color: #fff;
  }
`;
export const ModeButtonR = styled(NavLink)`
  background-color: ${props => props.active ? '#575757' : props.theme.componentBackground};
  color: ${props => props.active ? '#fff' : props.theme.text};
  padding: 5px 10px;
  border: 3px solid #575757;
  border-radius: 0 5px 5px 0;
  cursor: pointer;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: 0.2s ease-in-out;
  text-wrap: nowrap;

  &:hover{
    background-color: #575757;
    color: #fff;

  }
`;



export const UnderlineH = styled.h3`
  color: ${props => props.theme.UnderlineH};
  margin-bottom: 10px;
`

const NutellaSkeleton = styled(Skeleton)`
  color: ${(props) => props.theme.lightdark};
  margin-left: 10px;
`;

export const Kontainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 20px 20px 0px;
`
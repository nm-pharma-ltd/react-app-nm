import React, { useEffect, useState, useContext } from "react";
import StockCard, { CardContainer } from "../Components/StockCard";
import { styled } from "styled-components";
import ApiService from "../api/ApiService";
import { Context } from "../providers/provider";
import Skeleton from "@mui/material/Skeleton";

export default function Stock() {
  const [pharmacies, setPharmacies] = useState();
  const [store, dispatch] = useContext(Context);
  useEffect(() => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    
    ApiService.get(`suppliers/forecast/${year}/${month}`, { "Authorization": "Bearer " + store.user.token }).then(response => {
      setPharmacies(response);
      

    });
  }, [])

  return (
    <Kontainer>
      <h2>Stock</h2>
      <UnderlineH>Sorted by Suppliers</UnderlineH>
      {pharmacies ? pharmacies.map((item, index) => {
        return (
          <StockCard key={index} data={item} />
        );
      }) :

        
          <div style={{ display: "flex", flexDirection: "column", marginBottom: "10px" }}>
            {Array(10).fill().map((_, index) => {
              return (
                <CardContainer style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                <div style={{width: "80%", display: "flex", flexDirection: "row"}}>
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
              )
            })}
          </div>

      }
    </Kontainer>
  );

}

export const UnderlineH = styled.h3`
  color: ${props => props.theme.UnderlineH};
`
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
  margin-left: 10px;
`;

export const Kontainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 20px 20px 0px;
`
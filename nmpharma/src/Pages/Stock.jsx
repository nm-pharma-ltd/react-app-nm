import React, { useEffect, useState, useContext } from "react";
import StockCard from "../Components/StockCard";
import { styled } from "styled-components";
import ApiService from "../api/ApiService";
import { Context } from "../providers/provider";




export default function Stock() {
  const[pharmacies, setPharmacies] = useState();
  const[store, dispatch] = useContext(Context);
  useEffect(() => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    console.log(month);
    ApiService.get(`suppliers/forecast/${year}/${month}`, { "Authorization": "Bearer " + store.user.token }).then(response => {
      setPharmacies(response);
    });
  },[])

  return (
      <Kontainer>
        <h2>Stock</h2>
        <UnderlineH>Sorted by Suppliers</UnderlineH>
        {pharmacies && pharmacies.map((item, index) =>{
          return(
          <StockCard key={index} data={item} />
          );
        })}
      </Kontainer>
  );

}

export const UnderlineH = styled.h3`
  color: ${props=> props.theme.UnderlineH};
`

export const Kontainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 20px 20px 0px;
`
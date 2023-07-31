import React from "react";
import StockCard from "../Components/StockCard";
import { styled } from "styled-components";


export default function Stock() {

  return (
    <>
      <Kontainer>
        <h2>Stock</h2>
        <UnderlineH>Sorted by Suppliers</UnderlineH>
        <StockCard />
        <StockCard />
        <StockCard />
        <StockCard />

      </Kontainer>
    </>
  );

}

const UnderlineH = styled.h3`
  color: #5b5b5b;
`

export const Kontainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 20px 20px 0px;
`
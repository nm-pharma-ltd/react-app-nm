import React from "react";
import StockCard from "../Components/StockCard";
import { styled } from "styled-components";


export default function Stock() {

  return (
    <>
      <Kontainer>
        <h2>Stock</h2>
        <StockCard />
      </Kontainer>
    </>
  );

}

const Kontainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px 20px 20px 0px;
`
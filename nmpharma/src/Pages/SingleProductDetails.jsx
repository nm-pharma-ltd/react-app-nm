import React, { useContext, useEffect, useState } from "react";
import BarChart from "../Components/BarChart";
import { GoBackButton, Title, TitleWrapper } from "./ClientsDetails";
import styled from "styled-components";  // Corrected this line
import { useParams } from "react-router";
import ApiService from "../api/ApiService";
import { Context } from "../providers/provider";
import { UnderlineH } from "./Stock";

export default function SingleProductDetails() {
  
  const [store] = useContext(Context);  
  const { productCode } = useParams();
  const [productName, setProductName] = useState();

  

  const handleProductNameUpdate = (name) => {
    setProductName(name);
  };


  return (
    <Kontaineros>
      <TitleWrapper>
        <Title>{productName ? productName : "Loading..."}</Title>
        <GoBackButton to="/pharmacies">Back</GoBackButton>
      </TitleWrapper>
      <BarChart productCode={productCode} onProductNameUpdate={handleProductNameUpdate} />
    </Kontaineros>
  );
}

const Kontaineros = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

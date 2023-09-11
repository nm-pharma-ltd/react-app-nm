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
  const [productName, setProductName] = useState('');

  useEffect(() => {
    // Just fetch the product's name
    ApiService.get(`products/${productCode}`, { "Authorization": "Bearer " + store.user.token })
      .then(data => {
        if (data && data[0]) {
          setProductName(data[0].name);
        }
      })
      .catch(error => console.error("Error fetching product name:", error));
  }, [productCode, store.user.token]);

  const handleProductNameUpdate = (name) => {
    setProductName(name);
  };


  return (
    <Kontaineros>
      <TitleWrapper>
        <Title>{productName}</Title>
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

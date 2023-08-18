import React, { useEffect, useState } from "react";
import { styled } from "styled-components";
import Table from "../Components/Table";
import { GoBackButton } from "./ClientsDetails";
import ApiService from "../api/ApiService";

export default function ProductDetails() {
  const [products, setProducts] = useState([]); // State pro ukládání dat

  useEffect(() => {
    async function fetchData() {
      try {
        const productsData = await ApiService.get("products/sales/2023/1");

        // Ensure data is sorted by rank
        const sortedData = productsData.sort((a, b) => a.rank - b.rank);

        const processedData = sortedData.map(product => ({
          ...product,
          soldTarget: `${product.quantitySold} / ${product.quantityTarget}`,
          monthlyProfit: parseFloat(product.monthlyProfit).toFixed(0),
        }));

        // Set only the top 10 products
        setProducts(processedData.slice(0, 82));
        console.log(processedData.slice(0, 82));

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);



  return (
    <>
      <Container>
        <TitleWrapper>
          <Title>Sales activity details</Title>
          <GoBackButton to="/pharmacies">Back</GoBackButton>
        </TitleWrapper>
        <MamRadVelkyZadky>
          <Table
            title="Product Profit & Quantity"
            subtitle="TOP 82"
            viewDetailsLink="/pharmacies/productdetails"
            width="98%"
            columns={[
              { label: 'RANK', field: 'rank', align: 'left' },
              { label: 'NAME', field: 'productDescription', align: 'left' },
              { label: 'PROFIT', field: 'monthlyProfit', align: 'center' },
              { label: 'SOLD/TARGET', field: 'soldTarget', align: 'right' },
            ]}
            data={products}
          />
        </MamRadVelkyZadky>
      </Container>
    </>
  );
}

const Container = styled.div`
      margin-bottom: 20px;
      `;

const TitleWrapper = styled.div`
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      `;

const Title = styled.h2`
      margin: 0;
      display: flex;
      `;



const MamRadVelkyZadky = styled.div`
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      flex-wrap: wrap;
      margin-bottom: 20px;
      width: 100%;
      `;

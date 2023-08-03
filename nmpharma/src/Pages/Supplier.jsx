import React from "react";
import StockCard from "../Components/StockCard";
import { styled } from "styled-components";
import Table from "../Components/testmrtka";
import { MamRadVelkyZadky } from "./Pharmacies";
import { GoBackButton, TitleWrapper } from "./ClientsDetails";


const testData = [
  { name: 'Produkt 1', price: 100, profit: 20, inputValue: '50', months: ['July', 'August', 'September', 'October', 'November', 'December'] },
  { name: 'Produkt 2', price: 50, profit: -10, inputValue: '30', months: ['July', 'August', 'September', 'October', 'November', 'December'] },
  { name: 'Produkt 3', price: 80, profit: 5, inputValue: '70', months: ['July', 'August', 'September', 'October', 'November', 'December'] },
];

function Tabulky() {
  return (
    <MamRadVelkyZadky>
      <TitleWrapper>
      <h2>Supplier - THE001</h2>
      <GoBackButton to='/stock'>Back</GoBackButton>
      </TitleWrapper>
      <Table
        title="THE001"
        subtitle="List of products"
        viewDetailsLink="/stock/forecastdetails"
        width="100%"
        columns={[
          { label: 'Product name', field: 'name', align: 'center' },
          { label: 'Price', field: 'price', align: 'center' },
          { label: 'Profit', field: 'profit', align: 'center' },
          // Nové sloupce pro měsíce
          ...testData[0].months.map(month => ({
            label: month,
            field: month.toLowerCase(),
            align: 'center',
          })),
        ]}
        data={testData}
        inputValue="2"
      />
    </MamRadVelkyZadky>
  );
}

export default Tabulky;

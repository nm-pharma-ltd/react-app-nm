import React from "react";
import StockCard from "../Components/StockCard";
import { styled } from "styled-components";
import Table from "../Components/testmrtka";
import { MamRadVelkyZadky } from "./Pharmacies";
import { GoBackButton, TitleWrapper } from "./ClientsDetails";




    const testData = [
        { name: 'Produkt 1', price: 100, profit: 20, inputValue: '50' },
        { name: 'Produkt 2', price: 50, profit: -10, inputValue: '30' },
        { name: 'Produkt 3', price: 80, profit: 5, inputValue: '70' },
      ];
      
      function Tabulky() {
        return (
          <div>
            <h1>Tabulky</h1>
            <Table
              title="Název tabulky"
              subtitle="Podnázev tabulky"
              viewDetailsLink="/details"
              width="100%"
              columns={[
                { label: 'Název produktu', field: 'name', align: 'center' },
                { label: 'Cena', field: 'price', align: 'center' },
                { label: 'Profit', field: 'profit', align: 'center' },
              ]}
              data={testData}
              inputValue="2" 
            />
          </div>
        );
      }
      
      export default Tabulky;


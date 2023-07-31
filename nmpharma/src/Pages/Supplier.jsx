import React from "react";
import StockCard from "../Components/StockCard";
import { styled } from "styled-components";
import Table from "../Components/Table";


export default function Supplier() {

    const products = [
        { rank: 1, name: 'Voltaren', profit: 500, soldTarget: `${1250}€ / ${1520}€` },
        { rank: 2, name: 'Product 2', profit: 80, soldTarget: `${580}€ / ${1050}€` },
        { rank: 3, name: 'Product 3', profit: 200, soldTarget: `${405}€ / ${1050}€` },
        { rank: 4, name: 'Product 4', profit: 300, soldTarget: `${705}€ / ${1050}€` },
        { rank: 5, name: 'Product 5', profit: 150, soldTarget: `${820}€ / ${1050}€` },
        { rank: 6, name: 'Product 6', profit: 400, soldTarget: `${1250}€ / ${1520}€` },
        { rank: 7, name: 'Product 7', profit: -400, soldTarget: `${1250}€ / ${1520}€` },
        { rank: 8, name: 'Product 8', profit: -80, soldTarget: `${580}€ / ${1050}€` },
        { rank: 9, name: 'Product 9', profit: 200, soldTarget: `${405}€ / ${1050}€` },
        { rank: 10, name: 'Product 10', profit: 300, soldTarget: `${705}€ / ${1050}€` },
      ];
      const pharmacies = [
        { rank: 1, name: 'Pharmacy 1', profit: 500, monthlysales: `${1520}€` },
        { rank: 2, name: 'Pharmacy 2', profit: 80, monthlysales: `${50}€` },
        { rank: 3, name: 'Pharmacy 3', profit: 200, monthlysales: `${1050}€` },
        { rank: 4, name: 'Pharmacy 4', profit: 300, monthlysales: `${1050}€` },
        { rank: 5, name: 'Pharmacy 5', profit: 150, monthlysales: `${1050}€` },
        { rank: 6, name: 'Pharmacy 6', profit: 400, monthlysales: `${1520}€` },
        { rank: 7, name: 'Pharmacy 7', profit: -400, monthlysales: `${1520}€` },
        { rank: 8, name: 'Pharmacy 8', profit: -80, monthlysales: `${1050}€` },
        { rank: 9, name: 'Pharmacy 9', profit: 200, monthlysales: `${1050}€` },
          { rank: 10, name: 'Pharmacy 10', profit: 300, monthlysales: `${1050}€` },
        ];

  return (
    <>
      <h2>Supplier forecast</h2>
      <Table
          title="Product Profit & Quantity"
          subtitle="TOP 10"
          viewDetailsLink="/pharmacies/productdetails"
          width="47%"
          columns={[
            { label: 'RANK', field: 'rank', align: 'left' },
            { label: 'NAME', field: 'name', align: 'left' },
            { label: 'PROFIT', field: 'profit', align: 'center' },
            { label: 'SOLD/TARGET', field: 'soldTarget', align: 'right' },
          ]}
          data={products}
        />

    </>
  );

}

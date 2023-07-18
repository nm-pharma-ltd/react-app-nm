import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export default function ProfitQuantityTable() {
  const topProducts = [
    { rank: 1, name: "Voltaren", profit: 500, sold: 1250, target: 1520 },
    { rank: 2, name: "Xanax", profit: -200, sold: 580, target: 1050 },
    { rank: 3, name: "Ibuprofen", profit: 800, sold: 950, target: 1700 },
    { rank: 4, name: "Mirekren", profit: 1200, sold: 1520, target: 1700 },
    { rank: 5, name: "Šuriken", profit: -500, sold: 420, target: 500 },
    { rank: 6, name: "Prcaren", profit: 1500, sold: 1875, target: 2000 },
    { rank: 7, name: "Zkurvyryn 300mg", profit: 0, sold: 0, target: 100 },
    { rank: 8, name: "Zpičisyn 250mg", profit: -300, sold: 380, target: 500 },
    { rank: 9, name: "Tobolky na šulina 66ks", profit: 700, sold: 890, target: 1000 },
    { rank: 10, name: "Šprcky", profit: 400, sold: 650, target: 820 },
  ];

  const renderProfitBox = (profit) => {
    if (profit >= 0) {
      return <GreenBox>{`${profit}€`}</GreenBox>;
    } else {
      return <RedBox>{`${profit}€`}</RedBox>;
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <Title>Product Profit & Quantity</Title>
          <ViewDetailsLink to="/pharmacies/productdetails">View details</ViewDetailsLink>
        </CardHeader>
        <Subtitle>TOP 10</Subtitle>
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCellLeft>RANK</TableHeaderCellLeft>
                <TableHeaderCell>NAME</TableHeaderCell>
                <TableHeaderCell>PROFIT</TableHeaderCell>
                <TableHeaderCellRight>SOLD/TARGET</TableHeaderCellRight>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topProducts.map((product) => (
                <TableRow key={product.rank}>
                  <TableCellLeft>{product.rank}</TableCellLeft>
                  <TableCell>
                    <ProductLink to={`/pharmacies/product${product.rank}`}>
                      {product.name}
                    </ProductLink>
                  </TableCell>
                  <TableCell>{renderProfitBox(product.profit)}</TableCell>
                  <TableCellRight>{`${product.sold}€ / ${product.target}€`}</TableCellRight>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}

// Remaining code...




const Card = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
  margin-right: 20px;
  width: 48%;
  min-width: 500px;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Title = styled.h3`
  margin: 0;
`;

const Subtitle = styled.p`
  margin: 0 0 20px 0;
  color: #7e7e7e;
`;

export const ViewDetailsLink = styled(NavLink)`
  color: #e16a32;
  text-decoration: none;
  transition: all 0.25s ease-in-out;

  &:hover {
    color: #753619;
    margin-right: 3px;
  }
`;

const TableContainer = styled.div`
  overflow-x: auto;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
  text-wrap: nowrap;

  @media (max-width: 768px) {
    font-size: 11px;
  }
`;

const TableHeader = styled.thead`
  border-bottom: 1px solid #e0e0e0;
  margin-top: 25px;
`;

const TableRow = styled.tr``;

const TableHeaderCell = styled.th`
  padding: 10px;
  text-align: center;
  color: #909090;
  font-weight: 500;
  font-size: 14px;

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 12px;
  }
`;

const TableHeaderCellLeft = styled.th`
  padding: 10px;
  text-align: left;
  color: #909090;
  font-weight: 500;
  font-size: 14px;

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 12px;
  }
`;

const TableHeaderCellRight = styled.th`
  padding: 10px;
  text-align: right;
  color: #909090;
  font-weight: 500;
  font-size: 14px;

  @media (max-width: 768px) {
    padding: 8px;
    font-size: 12px;
  }
`;

const TableBody = styled.tbody``;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  text-align: center;
  text-wrap: nowrap;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const TableCellLeft = styled.td`
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  text-align: left;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

const TableCellRight = styled.td`
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  text-align: right;

  @media (max-width: 768px) {
    padding: 8px;
  }
`;

export const ProductLink = styled(NavLink)`
  color: #000000;
  text-decoration: none;
  transition: all 0.25s ease-in-out;

  &:hover {
    color: #e16a32;
  }
`;


export const GreenBox = styled.div`
  height: 22px;
  text-align: center;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #0e9f6e;
  margin: 0 auto;
  width: 70px;
  background-color: #def7ec;
  font-size: 13px;

  @media (max-width: 768px) {
    width: 55px;
    font-size: 12px;
  }
`;

export const RedBox = styled.div`
  height: 22px;
  text-align: center;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a72e39;
  margin: 0 auto;
  width: 65px;
  background-color: #fde8e8;
  font-size: 13px;

  @media (max-width: 768px) {
    width: 55px;
    font-size: 12px;
  }
`;

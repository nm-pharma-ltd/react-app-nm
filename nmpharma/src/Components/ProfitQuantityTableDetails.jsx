import React from "react";
import styled from "styled-components";
import { GreenBox, ProductLink, RedBox } from "./ProfitQuantityTable";

export default function ProfitQuantityTableDetails() {

  const renderProfitBox = (profit) => {
    if (profit >= 0) {
      return (
        <GreenBox>
          <ProfitText>{`${profit}€`}</ProfitText>
        </GreenBox>
      );
    } else {
      return (
        <RedBox>
          <ProfitText>{`${profit}€`}</ProfitText>
        </RedBox>
      );
    }
  };

  const generateRows = () => {
    const rows = [];
    for (let i = 1; i <= 82; i++) {
      rows.push(
        <TableRow key={i}>
          <TableCellLeft>{i}</TableCellLeft>
          <TableCell>
            <ProductLink to="/pharmacies/product1">
              Product {i}
            </ProductLink>
          </TableCell>
          <TableCell>{renderProfitBox(Math.floor(Math.random() * 2000 - 1000))}</TableCell>
          <TableCellRight>{Math.floor(Math.random() * 2000)}€ / {Math.floor(Math.random() * 2000 + 1000)}€</TableCellRight>
        </TableRow>
      );
    }
    return rows;
  };

  return (
    <>
      <Card>
        <CardHeader>
          <Title>Product Profit & Quantity</Title>
        </CardHeader>
        <Subtitle>TOP 82</Subtitle>
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
              {generateRows()}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}


const ProfitText = styled.span`
  text-align: center;
  margin: 4px;
  font-size: 13px;
`;



const Card = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
  margin-right: 20px;
  width: 100%;
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

const TableContainer = styled.div`
  overflow-x: auto;
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;
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
`;

const TableHeaderCellLeft = styled.th`
  padding: 10px;
  text-align: left;
  color: #909090;
  font-weight: 500;
`;

const TableHeaderCellRight = styled.th`
  padding: 10px;
  text-align: right;
  color: #909090;
  font-weight: 500;
`;

const TableBody = styled.tbody``;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  text-align: center;
`;

const TableCellLeft = styled.td`
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  text-align: left;
`;

const TableCellRight = styled.td`
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  text-align: right;
`;

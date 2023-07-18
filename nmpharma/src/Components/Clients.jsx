import React from "react";
import styled from "styled-components";
import { GreenBox, ProductLink, RedBox, ViewDetailsLink } from "./ProfitQuantityTable";

export default function Clients() {
  const topPharmacies = [
    { rank: 1, name: "Pharmacy 1", profit: 500, monthlySales: 1250 },
    { rank: 2, name: "Pharmacy 2", profit: -200, monthlySales: 580 },
    { rank: 3, name: "Pharmacy 3", profit: 800, monthlySales: 950 },
    { rank: 4, name: "Pharmacy 4", profit: 1200, monthlySales: 1520 },
    { rank: 5, name: "Pharmacy 5", profit: -500, monthlySales: 420 },
    { rank: 6, name: "Pharmacy 6", profit: 1500, monthlySales: 1875 },
    { rank: 7, name: "Pharmacy 7", profit: 0, monthlySales: 120 },
    { rank: 8, name: "Pharmacy 8", profit: -300, monthlySales: 380 },
    { rank: 9, name: "Pharmacy 9", profit: 700, monthlySales: 890 },
    { rank: 10, name: "Pharmacy 10", profit: 400, monthlySales: 650 },
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
          <Title>Clients (Pharmacies)</Title>
          <ViewDetailsLink to="/pharmacies/clientdetails">View details</ViewDetailsLink>
        </CardHeader>
        <Subtitle>TOP 10</Subtitle>
        <TableContainer>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHeaderCellLeft>RANK</TableHeaderCellLeft>
                <TableHeaderCell>NAME</TableHeaderCell>
                <TableHeaderCell>Profit</TableHeaderCell>
                <TableHeaderCellRight>MONTHLY SALES</TableHeaderCellRight>
              </TableRow>
            </TableHeader>
            <TableBody>
              {topPharmacies.map((pharmacy) => (
                <TableRow key={pharmacy.rank}>
                  <TableCellLeft>{pharmacy.rank}</TableCellLeft>
                  <TableCell>
                    <ProductLink to={`/pharmacies/pharmacy${pharmacy.rank}`}>
                      {pharmacy.name}
                    </ProductLink>
                  </TableCell>
                  <TableCell>{renderProfitBox(pharmacy.profit)}</TableCell>
                  <TableCellRight>{`${pharmacy.monthlySales}€`}</TableCellRight>
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




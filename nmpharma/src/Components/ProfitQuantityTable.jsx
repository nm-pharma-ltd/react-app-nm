import React from "react";
import styled from "styled-components";

export default function ProfitQuantityTable() {
  return (
    <>
      <Card>
        <CardHeader>
          <Title>Product Profit & Quantity</Title>
          <ViewDetailsLink href="#">View details</ViewDetailsLink>
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
              <TableRow>
                <TableCellLeft>1</TableCellLeft>
                <TableCell>Pharmacy 1</TableCell>
                <TableCell>{renderProfitBox(500)}</TableCell>
                <TableCellRight>1250€</TableCellRight>
              </TableRow>
              <TableRow>
                <TableCellLeft>2</TableCellLeft>
                <TableCell>Pharmacy 2</TableCell>
                <TableCell>{renderProfitBox(-200)}</TableCell>
                <TableCellRight>580€</TableCellRight>
              </TableRow>
              <TableRow>
                <TableCellLeft>3</TableCellLeft>
                <TableCell>Pharmacy 3</TableCell>
                <TableCell>{renderProfitBox(800)}</TableCell>
                <TableCellRight>950€</TableCellRight>
              </TableRow>
              <TableRow>
                <TableCellLeft>4</TableCellLeft>
                <TableCell>Pharmacy 4</TableCell>
                <TableCell>{renderProfitBox(1200)}</TableCell>
                <TableCellRight>1520€</TableCellRight>
              </TableRow>
              <TableRow>
                <TableCellLeft>5</TableCellLeft>
                <TableCell>Pharmacy 5</TableCell>
                <TableCell>{renderProfitBox(-500)}</TableCell>
                <TableCellRight>420€</TableCellRight>
              </TableRow>
              <TableRow>
                <TableCellLeft>6</TableCellLeft>
                <TableCell>Pharmacy 6</TableCell>
                <TableCell>{renderProfitBox(1500)}</TableCell>
                <TableCellRight>1875€</TableCellRight>
              </TableRow>
              <TableRow>
                <TableCellLeft>7</TableCellLeft>
                <TableCell>Pharmacy 7</TableCell>
                <TableCell>{renderProfitBox(0)}</TableCell>
                <TableCellRight>0€</TableCellRight>
              </TableRow>
              <TableRow>
                <TableCellLeft>8</TableCellLeft>
                <TableCell>Pharmacy 8</TableCell>
                <TableCell>{renderProfitBox(-300)}</TableCell>
                <TableCellRight>380€</TableCellRight>
              </TableRow>
              <TableRow>
                <TableCellLeft>9</TableCellLeft>
                <TableCell>Pharmacy 9</TableCell>
                <TableCell>{renderProfitBox(700)}</TableCell>
                <TableCellRight>890€</TableCellRight>
              </TableRow>
              <TableRow>
                <TableCellLeft>10</TableCellLeft>
                <TableCell>Pharmacy 10</TableCell>
                <TableCell>{renderProfitBox(400)}</TableCell>
                <TableCellRight>650€</TableCellRight>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </>
  );
}

const Card = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
  margin-right: 20px;
  width: 45%;
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

const ViewDetailsLink = styled.a`
  color: #e16a32;
  text-decoration: none;
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

const renderProfitBox = (profit) => {
  if (profit >= 0) {
    return (
      <GreenBox>
        {`${profit}€`}
      </GreenBox>
    );
  } else {
    return (
      <RedBox>
        {`${profit}€`}
      </RedBox>
    );
  }
};

export const GreenBox = styled.div`
  height: 22px;
  text-align: center;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #368639;
  margin: 0 auto;
  width: 65px;
  background-color: #cfffd1;
  font-size: 13px;

  @media (max-width: 768px) {
    width: 55px;
    font-size: 12px;
  }
`;

const RedBox = styled.div`
  height: 22px;
  text-align: center;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #af0a0a;
  margin: 0 auto;
  width: 65px;
  background-color: #ffc8c8;
  font-size: 13px;

  @media (max-width: 768px) {
    width: 55px;
    font-size: 12px;
  }
`;

// Importy Reactu a dalších komponent
import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from "react-router-dom";
import { InputStock } from './StockCard';

// Komponenta Table
export default function Table({ title, subtitle, viewDetailsLink, width, columns, data, inputValue }) {
  // Navigace pomocí react-router-dom
  const navigate = useNavigate();
  // Stavová proměnná pro data tabulky
  const [tableData, setTableData] = useState(data);

  // Funkce pro změnu hodnoty v tabulce
  const handleChange = (rowIndex, field, value) => {
    const updatedData = [...tableData];
    updatedData[rowIndex] = { ...updatedData[rowIndex], [field]: value };
    setTableData(updatedData);
  };

  // Generování řádků tabulky
  const generateRows = () => {
    return tableData.map((item, index) => (
      <TableRow key={index}>
        {columns.map((column, colIndex) => {
          if (column.field === 'name' || column.field === 'price' || column.field === 'profit') {
            // Sloupce s názvem, cenou a profitem
            return (
              <TableCell key={colIndex} align={column.align}>
                <span>{item[column.field]}</span>
              </TableCell>
            );
          } else if (column.field === 'inputValue') {
            // Sloupec s inputem a číslem
            return (
              <TableCell key={colIndex} align={column.align}>
                <InputStock type="number" placeholder={inputValue} onChange={() => { }} />
                {inputValue && !isNaN(Number(inputValue)) ? (
                  <span>{Number(inputValue)}</span>
                ) : null}
              </TableCell>
            );
          } else {
            // Sloupce s měsíci a inputy
            const currentValue = item[column.field];
            return (
              <TableCell key={colIndex} align={column.align}>
                <KontDown>
                  <InputForecast
                    type="number"
                    value={currentValue !== undefined ? currentValue : ""}
                    onChange={(e) => handleChange(index, column.field, e.target.value)}
                  />
                  9
                </KontDown>

              </TableCell>
            );
          }
        })}
      </TableRow>
    ));
  };


  return (
    <Card width={width}>
      <CardHeader>
        <Title>{title}</Title>
        <ViewDetailsLink to={viewDetailsLink}>View details</ViewDetailsLink>
      </CardHeader>
      <Subtitle>{subtitle}</Subtitle>
      <TableContainer>
        <TableElement>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableHeaderCell key={index} align={column.align}>
                  {column.label}
                </TableHeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{generateRows()}</TableBody>
        </TableElement>
      </TableContainer>
    </Card>
  );
}

const KontDown = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 75px;
  font-weight: 600;
  color: #313131;
`

export const InputForecast = styled.input`
  border: 1px solid #e9e9e9;
    border-radius: 4px;
    font-size: 14px;
    background: #f7f8ff;
    outline: none;
    transition: border-color 0.3s ease;
    height: 35px;
    width: 55px;
    text-align: center;

  &:focus {
    border-color: #949494;
  }
`;


const Card = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
  margin-right: 25px;
  width: ${props => props.width || '48%'};
  min-width: 500px;

  @media (max-width: 1320px){
    width: 100%;
  }
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
  overflow-x: visible;
  margin-bottom: 20px;
`;

const TableElement = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  border-bottom: 1px solid #e0e0e0;
`;

export const TableHeaderCell = styled.th`
  padding: 10px;
  text-align: ${props => (props.align === 'right' ? 'right' : props.align === 'center' ? 'center' : 'left')};
  color: #909090;
  font-weight: 500;
  text-wrap: nowrap;

  span {
    display: block;
    text-align: inherit;
  }
`;

export const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  text-align: ${props => (props.align === 'right' ? 'right' : props.align === 'center' ? 'center' : 'left')};
`;



const TableBody = styled.tbody``;

const TableRow = styled.tr`
  cursor: pointer;
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


export const ProductLink = styled(NavLink)`
  color: #000000;
  text-decoration: none;
  transition: all 0.25s ease-in-out;

  &:hover {
    color: #e16a32;
  }
`;




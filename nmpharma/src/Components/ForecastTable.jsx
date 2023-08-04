import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

// Komponenta TestTable
export default function ForecastTable({ title, subtitle, width, columns, data }) {
  // Funkce pro generování řádků tabulky
  const generateRows = () => {
    return data.map((item, index) => (
      <TableRow key={index}>
        {columns.map((column, colIndex) => {
          if (column.field === 'name' || column.field === 'price' || column.field === 'profit') {
            // Buňka tabulky pro jméno, cenu nebo zisk
            return <TableCell key={colIndex} align={column.align}><span>{item[column.field]}</span></TableCell>;
          } else {
            // Vstupní pole pro každý měsíc
            return (
              <TableCell key={colIndex} align={column.align}>
                <KontDown>
                  <InputForecast type="number" placeholder="20" />
                  <span>{item[column.field]}</span>
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
`;

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
  margin-right: 5px;

  &:focus {
    border-color: #949494;
  }
`;

// Other styled components
// ...

// Add the same styled components as you had before


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




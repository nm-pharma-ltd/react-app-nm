import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CardHeader, Subtitle, Title } from './ForecastTable';

export default function ForecastTableDetail({ width, columns, data, title, subtitle }) {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const tableWidth = (windowWidth * 0.79) - 400;

  const generateRows = () => {
    return data.map((item, index) => (
      <TableRow key={index}>
        {columns.map((column, colIndex) => {
          if (['name', 'price', 'profit'].includes(column.field)) {
            return <TableCell key={colIndex} align={column.align}><span>{item[column.field]}</span></TableCell>;
          } else {
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
    <Card style={{ width: `${tableWidth}px` }}>
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




const Card = styled.div`
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  min-width: 100%; 
  
`;

const TableContainer = styled.div`
    width: 100%;
    overflow-x: auto; 
    margin-bottom: 20px;
    display: flex;
`;

const TableElement = styled.table`
    width: 100%; 
`;

const TableHead = styled.thead`
  border-bottom: 1px solid #e0e0e0;
  text-wrap: nowrap;

`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  text-align: ${props => (props.align === 'right' ? 'right' : props.align === 'center' ? 'center' : 'left')};
`;

const TableBody = styled.tbody`
  text-wrap: nowrap;
`;

const TableRow = styled.tr`
  height: 50px;
  cursor: pointer;
  text-wrap: nowrap;
`;

const TableHeaderCell = styled.th`
  padding: 10px;
  text-align: ${props => (props.align === 'right' ? 'right' : props.align === 'center' ? 'center' : 'left')};
  color: #909090;
  font-weight: 500;

  span {
    display: block;
    text-align: inherit;
  }
`;

const KontDown = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 75px;
  font-weight: 600;
  color: #313131;
`;

const InputForecast = styled.input`
  border: 1px solid #e9e9e9;
  border-radius: 4px;
  font-size: 14px;
  background: #f7f8ff;
  outline: none;
  transition: border-color 0.3s ease;
  height: 35px;
  width: 55px;
  text-align: right;
  margin-right: 5px;
  margin-bottom: 5px;

  &:focus {
    border-color: #949494;
  }
`;

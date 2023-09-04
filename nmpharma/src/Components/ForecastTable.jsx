import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export default function ForecastTable({ title, subtitle, width, columns, data, subcode }) {

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
      <Kont>
        {subcode && <Subcode>{subcode}</Subcode>}
        <Subtitle>{subtitle}</Subtitle>
      </Kont>
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
        <ButtonSidebar>
          <TableHead>
            <TableRow>
              <TableHeaderCell>ACTIONS</TableHeaderCell>
            </TableRow>
          </TableHead>
          {data.map((item, index) => (
            <SidebarButton to='/stock/${id}' key={index}>More</SidebarButton>
          ))}
        </ButtonSidebar>
      </TableContainer>
    </Card>
  );
}

const Kont = styled.div`
  display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
`

const Card = styled.div`
  background: ${props => props.theme.componentBackground};
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
  min-width: 100%;  
`;



export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
  text-wrap: nowrap;

`;

export const Title = styled.h3`
  margin: 0 10px 0 0;
`;

export const Subtitle = styled.p`
  margin: 0 0 10px 0;
  color: #7e7e7e;
`;

const Subcode = styled.p`
  margin: 0 10px 10px 0;
  color: #4d4d4d;
  font-weight: 500;
`;

const TableContainer = styled.div`
    max-width: 100%;
    overflow-x: auto;
    margin-bottom: 20px;
    display: flex; 
`;

const TableElement = styled.table`
    min-width: 100%;
    width: max-content; 
    border-collapse: collapse;
`;


const TableHead = styled.thead`
  border-bottom: 1px solid ${props=>props.theme.line};
  text-wrap: nowrap;

`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid ${props=>props.theme.line};
  text-align: ${props => (props.align === 'right' ? 'right' : props.align === 'center' ? 'center' : 'left')};

  span {
    color: ${props=> props.theme.text};
  }
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

const ButtonSidebar = styled.div`
  position: sticky; 
  top: 0; 
  right: 0; 
  display: flex;
  flex-direction: column;
  background: ${props=> props.theme.componentBackground};
  box-shadow: -2px 0px 4px rgba(0, 0, 0, 0.1); 
  border-bottom: 1px solid ${props=>props.theme.line};
`;

const SidebarButton = styled(NavLink)`
  padding: 6px 10px;
  border: 3px solid #575757;
  border-radius: 5px;
  cursor: pointer;
  margin: 15px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: 0.2s ease-in-out;
  background-color: ${props=> props.theme.componentBackground};
  color: ${props=> props.theme.text};

  &:hover{
    background-color: #575757;
    color: #fff;

  }
`;

const KontDown = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 75px;
  font-weight: 600;
  color: #313131;
`;

const InputForecast = styled.input`
  border: 1px solid ${props=> props.theme.nav};;
  border-radius: 4px;
  color:  ${props=> props.theme.text};
  background: ${props=> props.theme.InputText};
  font-size: 14px;
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

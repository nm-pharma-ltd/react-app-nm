import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { NavLink, useLocation } from 'react-router-dom';
import { Context, FORECAST_BUTTON_SAVE } from '../providers/provider';

export default function ForecastTable({ title, subtitle, width, columns, data, subcode }) {

  const location = useLocation();
  const productDetails = location.state?.productDetails || {};
  const monthsOfStock = location.state?.monthsOfStock || '--';


  const [months, setMonths] = useState([
    {
      month: "January",
      monthIndex: 1
    },
    {
      month: "February",
      monthIndex: 2
    },
    {
      month: "March",
      monthIndex: 3
    },
    {
      month: "April",
      monthIndex: 4
    },
    {
      month: "May",
      monthIndex: 5
    },
    {
      month: "June",
      monthIndex: 6
    },
    {
      month: "July",
      monthIndex: 7
    },
    {
      month: "August",
      monthIndex: 8
    },
    {
      month: "September",
      monthIndex: 9
    },
    {
      month: "October",
      monthIndex: 10
    },
    {
      month: "November",
      monthIndex: 11
    },
    {
      month: "December",
      monthIndex: 12
    },
  ])

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const currentMonth = new Date().getMonth() + 1;
  const [monthsSliced, setMonthsSliced] = useState(false);
  const [store, dispatch] = useContext(Context);

  useEffect(() => {
    if (monthsSliced == false) {
      setMonths(months.slice(currentMonth - 1));
      setMonthsSliced(true)
    }


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

    console.log(data)

    return data && data.map((item, index) => (
      <TableRow key={index}>
        <TableCell>{item.productName}</TableCell>
        {months.map((mesic, colIndex) => {
          if (['name', 'expiry', 'productName'].includes(mesic.field)) {
            return <TableCell key={index} align="center"><span>{item[mesic.field]}</span></TableCell>;
          } else {
            return (
              <TableCell key={colIndex} align="center">
                <KontDown>
                  <span style={{ marginRight: "0.5em" }}>{item.amountOfProducts ? item.amountOfProducts : 0}</span>
                  <InputForecast type="number" placeholder="20" />
                </KontDown>
              </TableCell>
            );
          }
        })}
      </TableRow>
    ));
  };

  // const handleProductClick = (item) => {
  //   // Create a new object to contain the product data, supplierCode, and monthsOfStock
  //   const productDataWithExtras = {
  //     ...item,
  //     supplierCode: data.supplierCode,
  //     expiry: item.productExpire || '--'
  //   };

  //   console.log(productDataWithExtras);
  //   dispatch({ type: FORECAST_BUTTON_SAVE, payload: { item: productDataWithExtras } });
  // };

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
              <TableHeaderCell>
                NAME
              </TableHeaderCell>
              {months.map((mesic, index) => (
                <TableHeaderCell key={index} align="center">
                  {mesic.month.toUpperCase()}
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
            <SidebarButton
              to={{
                pathname: `/stock/${item.productCode}`,
                state: { productDetails: item, monthsOfStock: monthsOfStock }
              }}
              key={index}>
              More
            </SidebarButton>
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
  border-bottom: 1px solid ${props => props.theme.line};
  text-wrap: nowrap;

`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid ${props => props.theme.line};
  text-align: ${props => (props.align === 'right' ? 'right' : props.align === 'center' ? 'center' : 'left')};

  span {
    color: ${props => props.theme.text};
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
  background: ${props => props.theme.componentBackground};
  box-shadow: -2px 0px 4px rgba(0, 0, 0, 0.1); 
  border-bottom: 1px solid ${props => props.theme.line};
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
  background-color: ${props => props.theme.componentBackground};
  color: ${props => props.theme.text};

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
  border: 1px solid ${props => props.theme.nav};;
  border-radius: 4px;
  color:  ${props => props.theme.text};
  background: ${props => props.theme.InputText};
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

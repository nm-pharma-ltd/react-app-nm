import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { CardHeader, Subtitle, Title } from './ForecastTable';

export default function ForecastTableDetail({ width, columns, data, title, subtitle }) {

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

  function addMonths(date, months) {
    date.setMonth(date.getMonth() + months);
    return date;
  }

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [monthsSliced, setMonthsSliced] = useState(false);
  let [inputs, setInputs] = useState({}); // Use state for toOrder inputs in the forecast table

  useEffect(() => {
    // Get the six months ahead from the current month for forecasting
    if (monthsSliced == false) {
      let newMonths = [];
      let currentDate = new Date();

      let currentMonth = currentDate.getMonth();
      let endMonth = addMonths(currentDate, 11).getMonth() + 1;

      let monthIndex = currentMonth; // Index for getting the the month data from the array
      let monthOrder = 0; // Month order index so we can know how they're ordered (because of the year overlap)

      while (monthIndex != endMonth) {
        if (monthIndex > 11)
          monthIndex = 0;

        let new_month = { ...months[monthIndex] };
        new_month["index"] = monthOrder;
        newMonths.push(new_month);

        monthIndex++;
        monthOrder++;
      }

      console.log(newMonths);

      setMonths(newMonths);
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

  // Calculate months of stock using the toOrder input
  const calculateMonthsOfStock = (product, index) => {
    if (product.averageQuantitySold === null)
      return 0;

    let stock = product.inStock + product.quantityOrdered + product.incoming; // This sum stays the same
    let toOrder = 0;

    if (inputs[product.productCode] !== undefined) {
      let monthToOrder = inputs[product.productCode].filter(p => p.month <= index);
      monthToOrder.forEach((item) => toOrder += item["toOrder"]);
    }

    return (stock + toOrder - product.averageQuantitySold * index) / product.averageQuantitySold;
  };

  // Calculate the toOrder placeholder value
  const predictProductsPurchase = (product, index) => {
    let order = 0;

    if (inputs[product.productCode] !== undefined) {
      let monthToOrder = inputs[product.productCode].filter(p => p.month <= index);
      monthToOrder.forEach((item) => order += item["toOrder"]);
    }
    
    let stock = product.inStock + product.quantityOrdered + product.incoming; // This sum stays the same
    let toOrder = 6*product.averageQuantitySold - stock + product.averageQuantitySold * index - order;

    if (toOrder < 0)
      return 0;
    
    return toOrder;
  };

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
  background: ${props => props.theme.componentBackground};
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
  border-bottom: 1px solid ${props=>props.theme.line};
  text-wrap: nowrap;

`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid ${props=>props.theme.line};
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
  color: ${props=> props.theme.text};
`;

const InputForecast = styled.input`
  border: 1px solid #e9e9e9;
  border-radius: 4px;
  font-size: 14px;
  color:  ${props=> props.theme.text};
  background: ${props=> props.theme.InputText};
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

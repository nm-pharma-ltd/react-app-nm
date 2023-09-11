import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaChevronDown } from 'react-icons/fa';
import { TableCell, ViewDetailsLink } from './Table';
import { TiMediaRecord } from 'react-icons/ti';
import { GoBackButton } from '../Pages/ClientsDetails';
import { NavLink } from 'react-router-dom';
import { CardTitle } from './DataCardLarge';

const StockCard = ({ data }) => {
  const cardRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [cardWidth, setCardWidth] = useState(null);
  const [inputsValue, setInputsValue] = useState({});

  const [onOrder, setOnOrder] = useState(0);
  const [incoming, setIncoming] = useState(0);
  const [totalInStock, setTotalInStock] = useState({});
  const [inputValues, setInputValues] = useState({});
  const [monthsOfStock, setMonthsOfStock] = useState({});


  const calculateToOrder = (productCode) => {
    const productData = data.productsForecast.find(prod => prod.productCode === productCode);

    if (!productData) return 0;  // exit the function if the product data is not found

    const sixmonth = productData.averageQuantitySold;

    // Using product-specific values
    const currentOnOrder = productData.quantityOrdered;
    const currentIncoming = productData.incoming;
    const currentTotalInStock = productData.inStock;

    const requiredForSixMonths = sixmonth * 6;
    const currentTotal = currentOnOrder + currentIncoming + currentTotalInStock;

    return requiredForSixMonths - currentTotal > 0 ? requiredForSixMonths - currentTotal : 0;
  };

  const handleCalculation = (productCode) => {
    const toOrder = inputValues[productCode] ? parseInt(inputValues[productCode], 10) : 0;
    const productData = data.productsForecast.find(prod => prod.productCode === productCode);

    if (!productData) return;  // exit the function if the product data is not found

    const sixmonth = productData.averageQuantitySold;

    // Using product-specific values
    const currentOnOrder = productData.quantityOrdered;
    const currentIncoming = productData.incoming;
    const currentTotalInStock = productData.inStock;

    const months = (sixmonth !== 0) ?
      (currentOnOrder + currentIncoming + currentTotalInStock + toOrder) / sixmonth : 0;

    setMonthsOfStock(prevState => ({ ...prevState, [productCode]: months }));
  };

  const handleExpand = () => {
    setExpanded((prevExpanded) => !prevExpanded);
    if (!expanded) {
      data.productsForecast.forEach(product => {
        handleCalculation(product.productCode);
      });
    }
  };

  useEffect(() => {
    if (cardRef.current) {
      setCardWidth(cardRef.current.offsetWidth);
    }

    const handleResize = () => {
      if (cardRef.current) {
        setCardWidth(cardRef.current.offsetWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);


  const handleInputChange = (productCode, value) => {
    setInputValues(prevValues => ({ ...prevValues, [productCode]: value }));
  };

  const handleColorChange = (productCode) => {
    return monthsOfStock[productCode] && monthsOfStock[productCode] < 6 ? 'red' : 'green';
  };


  return (
    <>
      <CardContainer ref={cardRef} expanded={expanded ? 1 : 0}>
        <CardHeaderContainer onClick={handleExpand}>
          <CardTitlee>
            <CodeTitle>
              {data.supplierCode}
            </CodeTitle>
            {data.supplierName}
            <IncomingBadge>
              <TeamBulletI />
              Incoming
            </IncomingBadge>
            <OnOrderBadge>
              <TeamBulletO />
              On-Order
            </OnOrderBadge>
          </CardTitlee>
          <RightKontainer>
            <ForeButton to="/stock/supplier">Forecast all</ForeButton>
            <ExpandIcon expanded={expanded ? 1 : 0} />
          </RightKontainer>
        </CardHeaderContainer>
      </CardContainer>
      {expanded && (
        <ExpandedCard expanded={expanded ? 1 : 0} notopradius={expanded.toString()} width={cardWidth}>
          <ExpandedCardContent>
            <TableContainer>
              <TableHead>
                <TableRow>
                  <TableHeaderCell align='center'>STOCK CODE</TableHeaderCell>
                  <TableHeaderCell align='center'>PRODUCT NAME</TableHeaderCell>
                  <TableHeaderCell align='center'>INCOMING</TableHeaderCell>
                  <TableHeaderCell align='center'>ON ORDER</TableHeaderCell>
                  <TableHeaderCell align='center'>TOTAL IN STOCK</TableHeaderCell>
                  <TableHeaderCell align='center'>MONTHS OF STOCK</TableHeaderCell>
                  <TableHeaderCell align='center'>TO ORDER</TableHeaderCell>
                  <TableHeaderCell align='center'>ACTIONS</TableHeaderCell>
                </TableRow>
              </TableHead>
              <tbody>
                {data.productsForecast && data.productsForecast.map((product, index) => {
                  return (
                    <TableRow key={index}>
                      <TableCellCode align='center'>{product.productCode}</TableCellCode>
                      <TableCell align='center'>{product.productDescription}</TableCell>
                      <TableCellInc align='center'>
                        + {product.incoming}
                      </TableCellInc>
                      <TableCellOrder align='center'>
                        + {product.quantityOrdered}
                      </TableCellOrder>
                      <TableCellTotal align='center'>
                        {product.inStock}
                      </TableCellTotal>

                      <TableCellTotal
                        color={handleColorChange(product.productCode)}
                        align='center'
                      >
                        {monthsOfStock[product.productCode] ? monthsOfStock[product.productCode].toFixed(2) : 0}
                      </TableCellTotal>

                      <TableCell align='center'>
                        <UniInput>
                          <InputStock
                            placeholder={calculateToOrder(product.productCode).toString()}
                            type="number"
                            value={inputValues[product.productCode] || ''}
                            onChange={(e) => handleInputChange(product.productCode, e.target.value)}
                          />
                          <CalcButton onClick={() => handleCalculation(product.productCode)}>=</CalcButton>
                        </UniInput>

                      </TableCell>
                      <TableCell >
                        <ForeButton to='/stock/forecastdetails'>More</ForeButton>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </tbody>
            </TableContainer>
          </ExpandedCardContent>
        </ExpandedCard>
      )}
    </>
  );
};


const TableHeaderCell = styled.th`
  padding: 10px;
  text-align: ${props => (props.align === 'right' ? 'right' : props.align === 'center' ? 'center' : 'left')};
  color: #909090;
  font-weight: 500;
  text-wrap: nowrap;
  background: ${props => props.theme.componentBackground};
  span {
    display: block;
    text-align: inherit;
  }
`;


const RightKontainer = styled.div`
  display: flex;
  align-items: center;
`

export const TableCellCode = styled.td`
  padding: 10px;
  border-bottom: 1px solid ${props => props.theme.line};
  font-weight: 600;
  text-align: ${props => (props.align === 'right' ? 'right' : props.align === 'center' ? 'center' : 'left')};
`;
export const TableCellOrder = styled.td`
  padding: 10px;
  border-bottom: 1px solid ${props => props.theme.line};
  color: ${props => props.theme.menuHeading};
  font-weight: 700;
  text-align: ${props => (props.align === 'right' ? 'right' : props.align === 'center' ? 'center' : 'left')};
`;
export const TableCellInc = styled.td`
  padding: 10px;
  color: ${props => props.theme.inc};
  border-bottom: 1px solid ${props => props.theme.line};
  font-weight: 700;
  text-align: ${props => (props.align === 'right' ? 'right' : props.align === 'center' ? 'center' : 'left')};
`;


export const TableCellTotal = styled.td`
  padding: 10px;
  font-weight: 600;
  border-bottom: 1px solid ${props => props.theme.line};
  text-align: ${props => (props.align === 'right' ? 'right' : props.align === 'center' ? 'center' : 'left')};
  color: ${props => props.color || ''};
`;


const UniInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 0 auto;
`
export const InputStock = styled.input`
    border: 1px solid ${props => props.theme.nav};
    border-radius: 4px;
    font-size: 14px;
    color:  ${props => props.theme.text};
    background: ${props => props.theme.InputText};
    outline: none;
    transition: border-color 0.3s ease;
    height: 40px;
    width: 55px;
    text-align: center;
    onChange={(e) => setInputValue(e.target.value)};
`;

const CardContainer = styled.div`
  width: 100%;
  background-color: ${props => props.theme.nav};
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  border-bottom-left-radius: ${(props) => (props.expanded ? '0' : '10px')};
  border-bottom-right-radius: ${(props) => (props.expanded ? '0' : '10px')};
`;

const CardHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  cursor: pointer;
`;

const CardTitlee = styled.h3`
  margin: 0;
  display: flex;
  align-items: center;
`;

const CodeTitle = styled.h3`
  margin-left: 5px;
  margin-right: 15px;
  font-size: 16px;
  color: ${props => props.theme.textCard};
  font-weight: 500;
`;


const ExpandIcon = styled(FaChevronDown)`
  transition: transform 0.3s ease-in-out;
  transform: ${(props) => (props.expanded ? 'rotate(180deg)' : 'rotate(0deg)')};
`;


const ExpandedCard = styled.div`
  background-color: ${props => props.theme.componentBackground};
  border-radius: ${(props) => (props.notopradius ? '0' : '10px')} ${(props) => (props.notopradius ? '0' : '10px')} 10px 10px;
  padding: 20px;
  //max-height: ${(props) => (props.expanded ? '1000px' : '0')};
  overflow: hidden;
  animation: ${(props) => (props.expanded ? slideDown : slideUp)} 0.3s ease-in-out;
  overflow-x: auto;
  width: ${(props) => (props.expanded ? props.width + 'px' : 'fit-content')};
  min-width: ${(props) => (props.expanded ? props.width + 'px' : '100%')};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

`;

const ExpandedCardContent = styled.div`
  /* Limit the width of the expanded content to the card's width */
  max-width: 100%;
`;

const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  /* Remove fixed width from the table */
`;



const TableHead = styled.thead`
  background-color: #f5f5f5;
`;



const TableRow = styled.tr``;



// const MoreButton = styled.button`
//   background-color: #d54529;
//   color: #fff;
//   padding: 10px 20px;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
//   font-weight: 500;
// `;

const CalcButton = styled.button`
  background-color: #575757;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 10px;

`;

const ForeButton = styled(NavLink)`
  background-color: ${props => props.theme.componentBackground};
  color: ${props => props.theme.text};
  padding: 5px 10px;
  border: 3px solid #575757;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 20px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  transition: 0.2s ease-in-out;

  &:hover{
    background-color: #575757;
    color: #fff;

  }
`;


export const TeamBulletI = styled(TiMediaRecord)`
  color: #1c3a57; 
  font-size: 14px;
`;

export const TeamBulletO = styled(TiMediaRecord)`
  color: #484c51; 
  font-size: 14px;
`;

export const IncomingBadge = styled.div`
  height: 22px;
  text-align: center;
  border-radius: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color:  #1c3a57; 
  margin: 0 0 0 20px;
  background-color: #bdd9ff; 
  min-width: fit-content;
  width: 90px;
  font-size: 13px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;


export const OnOrderBadge = styled.div`
  height: 22px;
  text-align: center;
  border-radius: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color:  #484c51; 
  margin: 0 0 0 20px;
  background-color:  #d5d5d5; 
  min-width: fit-content;
  width: 90px;
  font-size: 13px;
  font-weight: 600;

  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const slideDown = keyframes`
  from {
    max-height: 0;
    opacity: 0;
  }
  to {
    max-height: 1000px;
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    max-height: 1000px;
    opacity: 1;
  }
  to {
    max-height: 0;
    opacity: 0;
  }
`;


export default StockCard;

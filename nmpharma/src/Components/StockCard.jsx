import React, { useEffect, useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaChevronDown } from 'react-icons/fa';
import { TableCell, TableHeaderCell } from './Table';
import { TiMediaRecord } from 'react-icons/ti';

const StockCard = () => {
  const cardRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [cardWidth, setCardWidth] = useState(null);

  const [inputValue, setInputValue] = useState('');
  const [monthsOfStock, setMonthsOfStock] = useState(0);
  const [onOrder, setOnOrder] = useState(80);
  const [incoming, setIncoming] = useState(100);
  const totalInStock = 120;

  const handleCalculation = () => {
    const testData = 100; // Use the value entered in the input box
    const toOrder = inputValue ? parseInt(inputValue, 10) : 0; // Use the value entered in the input box
  
    // Perform the calculation
    const result = (onOrder + incoming + totalInStock + toOrder) / testData;
    setMonthsOfStock(result);
  };

  const handleExpand = () => {
    setExpanded((prevExpanded) => !prevExpanded);

    // Perform the calculation when the card is expanded
    if (!expanded) {
      handleCalculation();
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

  const handleColorChange = () => {
    return monthsOfStock < 6;
  };


  return (
    <>
      <CardContainer ref={cardRef} expanded={expanded ? 1 : 0}>
        <CardHeaderContainer onClick={handleExpand}>
          <CardTitle>
            THE001
            <IncomingBadge>
              <TeamBulletI />
              Incoming
            </IncomingBadge>
            <OnOrderBadge>
              <TeamBulletO/>
              On-Order
            </OnOrderBadge>
          </CardTitle>
          <ExpandIcon expanded={expanded ? 1 : 0} />
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
                <TableRow>
                  <TableCellCode align='center'>NMP019</TableCellCode>
                  <TableCell align='center'>AMLODIPINE TEVA 10 MG</TableCell>
                  <TableCellInc align='center' onClick={() => setIncoming(incoming + 1)}>
                    + {incoming}
                  </TableCellInc>
                  <TableCellOrder align='center' onClick={() => setOnOrder(onOrder + 1)}>
                    + {onOrder}
                  </TableCellOrder>
                  <TableCellTotal align='center'>
                    {totalInStock}
                  </TableCellTotal>
                  <TableCellTotal lessthansixmonths={handleColorChange().toString()} align='center'>{monthsOfStock.toFixed(2)}</TableCellTotal>
                  <TableCell align='center'>
                    <UniInput>
                      <InputStock
                        placeholder='123'
                        type="number"
                        name='calculations'
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                      />
                      <CalcButton onClick={handleCalculation}>=</CalcButton>
                    </UniInput>
                  </TableCell>
                  <TableCell align='center'>
                    <MoreButton>More</MoreButton>
                  </TableCell>
                </TableRow>
                {/* Add more data rows here */}
              </tbody>
            </TableContainer>
          </ExpandedCardContent>
        </ExpandedCard>
      )}
    </>
  );
};

export const TableCellCode = styled.td`
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  font-weight: 600;
  text-align: ${props => (props.align === 'right' ? 'right' : props.align === 'center' ? 'center' : 'left')};
`;
export const TableCellOrder = styled.td`
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  color: #5b5b5b;
  font-weight: 700;
  text-align: ${props => (props.align === 'right' ? 'right' : props.align === 'center' ? 'center' : 'left')};
`;
export const TableCellInc = styled.td`
  padding: 10px;
  color: #284671;
  border-bottom: 1px solid #e0e0e0;
  font-weight: 700;
  text-align: ${props => (props.align === 'right' ? 'right' : props.align === 'center' ? 'center' : 'left')};
`;
export const TableCellTotal = styled.td`
  padding: 10px;
  font-weight: 600;
  border-bottom: 1px solid #e0e0e0;
  text-align: ${props => (props.align === 'right' ? 'right' : props.align === 'center' ? 'center' : 'left')};
  color: ${props => (props.lessthansixmonths ? 'red' : '#0d680e')};
`;

const UniInput = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  margin: 0 auto;
`
export const InputStock = styled.input`
  border: 1px solid #e9e9e9;
    border-radius: 4px;
    font-size: 14px;
    background: #f7f8ff;
    outline: none;
    transition: border-color 0.3s ease;
    height: 40px;
    width: 55px;
    text-align: center;
    onChange={(e) => setInputValue(e.target.value)}

  &:focus {
    border-color: #949494;
  }
`;

const CardContainer = styled.div`
  width: 100%;
  background-color: #fff;
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

const CardTitle = styled.h3`
  margin: 0;
  display: flex;
  align-items: center;
`;

const ExpandIcon = styled(FaChevronDown)`
  transition: transform 0.3s ease-in-out;
  transform: ${(props) => (props.expanded ? 'rotate(180deg)' : 'rotate(0deg)')};
`;


const ExpandedCard = styled.div`
  background-color: #f5f5f5;
  border-radius: ${(props) => (props.notopradius ? '0' : '10px')} ${(props) => (props.notopradius ? '0' : '10px')} 10px 10px;
  padding: 20px;
  max-height: ${(props) => (props.expanded ? '1000px' : '0')};
  overflow: hidden;
  animation: ${(props) => (props.expanded ? slideDown : slideUp)} 0.3s ease-in-out;
  overflow-x: auto;
  width: ${(props) => (props.expanded ? props.width + 'px' : 'fit-content')};
  min-width: ${(props) => (props.expanded ? props.width + 'px' : '100%')};
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



const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f5f5f5;
  }
`;



const MoreButton = styled.button`
  background-color: #d54529;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: 500;
`;

const CalcButton = styled.button`
  background-color: #575757;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin: 0 10px;

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

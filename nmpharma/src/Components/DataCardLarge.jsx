import React from 'react';
import styled from 'styled-components';

const DataCardLarge = ({ supplier, code, name, expiry }) => {
  return (
    <CardContainer>
      <CardContent>
        <CardTitle>{supplier}</CardTitle>
        <CardAmount>{code}</CardAmount>
        <CardAmount>{name}</CardAmount>
      </CardContent>
      <VerticalDivider />
      <ProfitPriceContainer>
        <CardTitle>Expiry date:</CardTitle>
        <CardAmount>{expiry}</CardAmount>
      </ProfitPriceContainer>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1px 1fr;  // 1fr for left, 1px for divider, 1fr for right
  align-items: center;
  border-radius: 15px;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 5px;
  width: 100%;
  height: 80px auto;
  background: ${props => props.theme.componentBackground};
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  align-content: center;

  @media (max-width: 1024px){
    width: 100%;
    align-items: center;
  }
`;

const VerticalDivider = styled.div`
  height: 60%;
  background-color: #c5c5c5;
  grid-column: 2; // this ensures it's in the center column
`;

const CardContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; // added to push content to the left
`;

const CardTitle = styled.h3`
  margin: 0;
  margin-right: 15px;
  font-size: 16px;
  color: ${props=> props.theme.textCard};
  font-weight: 500;
`;

const CardAmount = styled.p`
  margin: 0;
  font-size: 20px;
  margin-right: 18px;
  font-weight: 600;
  color: ${props=> props.theme.textAmount};
`;

const ProfitPriceContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center; // added to push content to the right
`;

const Profit = styled.p`
  margin-right: 20px;
  font-size: 18px;
  color: #272424;
  white-space: nowrap; 
`;

const Price = styled.p`
  margin: 0;
  font-size: 18px;
  color: #272424;
  white-space: nowrap;
`;

export default DataCardLarge;

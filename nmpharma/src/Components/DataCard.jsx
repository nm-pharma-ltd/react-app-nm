import React from 'react';
import styled from 'styled-components';

const DataCard = ({ title, amount, icon, iconBackgroundColor, textColor }) => {
  const Icon = icon;

  return (
    <CardContainer>
      <IconContainer color={iconBackgroundColor}>
        <Icon />
      </IconContainer>
      <CardContent>
        <CardTitle>{title}</CardTitle>
        <CardAmount textColor={textColor}>+{amount}$</CardAmount>
      </CardContent>
    </CardContainer>
  );
};

const CardContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 10px;
  width: 300px;
  height: 150px;
  background: #fff;
  justify-content: space-between;
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color || '#f5f5f5'};
  border-radius: 10px;
  height: 50px;
  width: 50px;
  margin-right: 15px;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const CardTitle = styled.h3`
  margin: 0;
  color: ${(props) => props.textColor || '#808080'};
  font-weight: 500;
`;

const CardAmount = styled.p`
  margin: 0;
  font-weight: bold;
  color: ${(props) => props.textColor || '#808080'};
`;

export default DataCard;

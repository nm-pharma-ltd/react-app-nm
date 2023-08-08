import React from 'react';
import styled from 'styled-components';

const DataCardLarge = ({ supplier, code, name, icon, iconBackgroundColor }) => {

  const Icon = icon;

  return (
    <CardContainer>
      <TopKont>
        <CardContent>
          <CardTitle>{supplier}</CardTitle>
          <CardAmount>{code}</CardAmount>
          <CardAmount>{name}</CardAmount>
        </CardContent>
        <IconContainer color={iconBackgroundColor}>
          <Icon size={22} />
        </IconContainer>
      </TopKont>
    </CardContainer>
  );
};

const TopKont = styled.div`
 display: flex;
 align-items: center;
 justify-content: space-between;
 width: 100%;
`


const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  border-radius: 15px;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 5px;
  width: 100%;
  height: 90px;
  background: #fff;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  justify-content: space-between;

  @media (max-width: 1024px){
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const IconContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.color || '#f5f5f5'};
  border-radius: 10px;
  height: 60px;
  width: 60px;
  margin-right: 15px;
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: auto;

  @media (max-width: 1024px){
    display: flex;
    flex-direction: row;
    align-items: center;
  }

`;

const CardTitle = styled.h3`
  margin: 0;
  margin-right: 15px;
  font-size: 16px;
  color: ${(props) => props.textColor || '#808080'};
  font-weight: 500;
 
  @media (max-width: 1024px){
    margin-right: 10px;
  }

  
`;

const CardAmount = styled.p`
  margin: 0;
  font-size: 20px;
  margin-right: 18px;
  font-weight: 600;
  color: #272424;
`;

export default DataCardLarge;

import React from 'react';
import styled from 'styled-components';

const DataCard = ({ title, amount, icon, iconBackgroundColor, textColor  }) => {

  const Icon = icon;

  return (
    <CardContainer>
      <TopKont>
        <IconContainer color={iconBackgroundColor}>
          <Icon size={22} />
        </IconContainer>
        <CardContent>
          <CardTitle>{title}</CardTitle>
          <CardAmount textColor={textColor}>{amount}</CardAmount>
        </CardContent>
      </TopKont>
      
    </CardContainer>
  );
};

const TopKont = styled.div`
 display: flex;
 align-items: flex-start;
 justify-content: space-between;

 @media (max-width: 1024px){
  align-items: center;
 }


`

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 10px;
  width: 290px;
  height: 120px;
  background: ${props => props.theme.componentBackground};
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  justify-content: space-between;

  @media (max-width: 1159px){
    width: 49%;
  }
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
  flex-direction: column;
  align-items: flex-end;

  @media (max-width: 1024px){
    display: flex;
    flex-direction: row;
    align-items: center;
  }

`;

const CardTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  color: ${props=> props.theme.textCard};
  font-weight: 500;
 
  @media (max-width: 1024px){
    margin-right: 10px;
  }

  
`;

const CardAmount = styled.p`
  margin: 0;
  font-size: 22px;
  font-weight: bold;
  color: ${props => props.textColor};
`;

export default DataCard;

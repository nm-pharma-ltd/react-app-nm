import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FaChevronDown } from 'react-icons/fa';
import { TeamBadge } from './TeamCardDetails';

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
  border-radius: ${(props) => (props.noTopRadius ? '0' : '10px')} ${(props) => (props.noTopRadius ? '0' : '10px')} 10px 10px;
  padding: 20px;
  max-height: ${(props) => (props.expanded ? '1000px' : '0')};
  overflow: hidden;
  animation: ${(props) => (props.expanded ? slideDown : slideUp)} 0.3s ease-in-out;
`;

const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
`;

const TableHead = styled.thead`
  background-color: #f5f5f5;
`;

const TableHeadCell = styled.th`
  padding: 10px;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f5f5f5;
  }
`;

const TableCell = styled.td`
  padding: 10px;
`;

const MoreButton = styled.button`
  background-color: #d54529;
  color: #fff;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const StockCard = () => {
  const [expanded, setExpanded] = useState(false);

  const handleExpand = () => {
    setExpanded((prevExpanded) => !prevExpanded);
  };

  return (
    <>
      <CardContainer expanded={expanded}>
        <CardHeaderContainer onClick={handleExpand}>
          <CardTitle>
            THE001
            <TeamBadge>Incoming</TeamBadge>
          </CardTitle>
          <ExpandIcon expanded={expanded} />
        </CardHeaderContainer>
      </CardContainer>

      {expanded && (
        <ExpandedCard expanded={expanded} noTopRadius>
          <TableContainer>
            <TableHead>
              <TableRow>
                <TableHeadCell>STOCK CODE</TableHeadCell>
                <TableHeadCell>PRODUCT NAME</TableHeadCell>
                <TableHeadCell>ON ORDER</TableHeadCell>
                <TableHeadCell>INCOMING</TableHeadCell>
                <TableHeadCell>TOTAL IN STOCK</TableHeadCell>
                <TableHeadCell>MONTHS OF STOCK</TableHeadCell>
                <TableHeadCell>TO ORDER</TableHeadCell>
                <TableHeadCell>ACTIONS</TableHeadCell>
              </TableRow>
            </TableHead>
            <tbody>
              <TableRow>
                <TableCell>NMP019</TableCell>
                <TableCell>AMLODIPINE TEVA 10 MG</TableCell>
                <TableCell>+80</TableCell>
                <TableCell>+100</TableCell>
                <TableCell>120</TableCell>
                <TableCell>12</TableCell>
                <TableCell>
                  <input type="number" />
                </TableCell>
                <TableCell>
                  <MoreButton>More</MoreButton>
                </TableCell>
              </TableRow>
              {/* Add more data rows here */}
            </tbody>
          </TableContainer>
        </ExpandedCard>
      )}
    </>
  );
};

export default StockCard;

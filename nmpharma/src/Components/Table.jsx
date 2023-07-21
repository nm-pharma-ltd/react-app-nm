import React from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from "react-router-dom";

export default function Table({ title, subtitle, viewDetailsLink, width, columns, data }) {

    const navigate = useNavigate();

    const generateRows = () => {
        return data.map((item, index) => (
            <TableRow key={index} onClick={() => navigate(`/pharmacies/product${item.rank}`)}>
                {columns.map((column, colIndex) => (
                    <TableCell key={colIndex} align={column.align}>
                        {column.field === 'profit' ? (
                            item[column.field] >= 0 ? (
                                <GreenBox>{`${item[column.field]}€`}</GreenBox>
                            ) : (
                                <RedBox>{`${item[column.field]}€`}</RedBox>
                            )
                        ) : (
                            <span>{item[column.field]}</span>
                        )}
                    </TableCell>
                ))}
            </TableRow>
        ));
    };


    return (
        <Card width={width}>
            <CardHeader>
                <Title>{title}</Title>
                <ViewDetailsLink to={viewDetailsLink}>View details</ViewDetailsLink>
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
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
  margin-right: 25px;
  width: ${props => props.width || '48%'};
  min-width: 500px;
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Title = styled.h3`
  margin: 0;
`;

const Subtitle = styled.p`
  margin: 0 0 20px 0;
  color: #7e7e7e;
`;

const TableContainer = styled.div`
  overflow-x: auto;
  margin-bottom: 20px;
`;

const TableElement = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  border-bottom: 1px solid #e0e0e0;
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

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  text-align: ${props => (props.align === 'right' ? 'right' : props.align === 'center' ? 'center' : 'left')};
`;



const TableBody = styled.tbody``;

const TableRow = styled.tr`
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`;



export const ViewDetailsLink = styled(NavLink)`
  color: #e16a32;
  text-decoration: none;
  transition: all 0.25s ease-in-out;

  &:hover {
    color: #753619;
    margin-right: 3px;
  }
`;


export const ProductLink = styled(NavLink)`
  color: #000000;
  text-decoration: none;
  transition: all 0.25s ease-in-out;

  &:hover {
    color: #e16a32;
  }
`;


export const GreenBox = styled.div`
  height: 22px;
  text-align: center;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #0e9f6e;
  margin: 0 auto;
  width: 70px;
  background-color: #def7ec;
  font-size: 13px;
  font-weight: 600;

  @media (max-width: 768px) {
    width: 55px;
    font-size: 12px;
  }
`;

export const RedBox = styled.div`
  height: 22px;
  text-align: center;
  border-radius: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #a72e39;
  margin: 0 auto;
  width: 65px;
  background-color: #fde8e8;
  font-size: 13px;
  font-weight: 600;

  @media (max-width: 768px) {
    width: 55px;
    font-size: 12px;
  }
`;

import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { Dropdownos } from "./BarChart";
import { useEffect, useMemo, useState } from "react";

export default function RankTable({
  title,
  subtitle,
  viewDetailsLink,
  width,
  data,
}) {
  const navigate = useNavigate();

  useEffect(() => {
    console.log(data);
  }, [data]);

  const generateRows = () => {
    return (
      data &&
      data.map((item, index) => (
        <TableRow key={index}>
          <TableCell key={index} align="center">
            {item.rank}
          </TableCell>
          {item.products.map((product) => (
            <TableCell key={product.month} align="center">
              {product.product}
            </TableCell>
          ))}
        </TableRow>
      ))
    );
  };

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const tableWidth = (windowWidth * 0.79) - 400;

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
              <TableHeaderCell>RANK</TableHeaderCell>
              {months.map((month, index) => (
                <TableHeaderCell key={index} align="center">
                  {month.toUpperCase()}
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

const RightMenu = styled.div`
  padding: 0.1em;
`;

const Card = styled.div`
  background-color: ${(props) => props.theme.componentBackground};
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
  margin-right: 25px;
  width: ${(props) => props.width};
  min-width: 100%;

  @media (max-width: 1320px) {
    width: 100%;
  }
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
  margin: 0 0 10px 0;
  color: #7e7e7e;
`;

const TableContainer = styled.div`
  max-width: 100%;
  overflow-x: auto;
  margin-bottom: 20px;
  display: flex;
`;

const TableElement = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  border-bottom: 1px solid ${(props) => props.theme.line};
`;

export const TableHeaderCell = styled.th`
  padding: 10px;
  text-align: ${(props) => props.align || "left"}; // Use the passed alignment
  color: #909090;
  font-weight: 500;
  cursor: pointer;
  text-wrap: nowrap;
`;

export const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid ${(props) => props.theme.line};
  border-right: 1px solid ${(props) => props.theme.line};
  border-left: 1px solid ${(props) => props.theme.line};
  text-align: ${(props) =>
    props.align === "right"
      ? "right"
      : props.align === "center"
      ? "center"
      : "left"};
  white-space: nowrap; // Prevents the text from wrapping onto the next line
  overflow: hidden; // Hides any text that goes beyond the container width
  text-overflow: ellipsis; // Adds ellipsis when the text overflows
  width: auto; // or whatever width you want to set
  max-width: 13em
`;

const TableBody = styled.tbody``;

const TableRow = styled.tr`
  cursor: pointer;

  &:hover {
    background-color: ${(props) => props.theme.background};
  }
`;

export const ViewDetailsLink = styled(NavLink)`
  color: #e16a32;
  text-decoration: none;
  transition: all 0.25s ease-in-out;
  margin-left: 0.5em;

  &:hover {
    color: #753619;
    margin-right: 3px;
  }
`;

export const ProductLink = styled(NavLink)`
  color: ${(props) => props.theme.text};
  text-decoration: none;
  transition: all 0.25s ease-in-out;
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
  min-width: 65px;
  background-color: #def7ec;
  font-size: 13px;
  font-weight: 600;
  max-width: 75px;

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
  background-color: #fde8e8;
  margin: 0 auto;
  width: 65px;
  font-size: 13px;
  font-weight: 600;

  @media (max-width: 768px) {
    width: 55px;
    font-size: 12px;
  }
`;

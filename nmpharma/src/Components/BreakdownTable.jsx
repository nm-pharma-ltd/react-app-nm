import { useEffect, useState } from "react";
import styled from "styled-components";
import { NavLink, useNavigate } from "react-router-dom";
import { Dropdownos } from "./BarChart";

export default function BreakdownTable({
  title,
  subtitle,
  width,
  data,
  content,
}) {
  const navigate = useNavigate();

  const generateRows = () => {
    const processedNames = new Set(); // Create a set to keep track of processed names

    return (
      data &&
      data.map((item, index) => {
        // Check if the name has already been processed
        if (!processedNames.has(item.name)) {
          processedNames.add(item.name); // Add the name to the set

          return (
            <TableRow
              key={index}
              onClick={() =>
                navigate(
                  `/pharmacies/${content}/${
                    content == "clients" ? item.clientCode : item.productCode
                  }`
                )
              }>
              <TableCell key={index}>{item.name}</TableCell>
              {item.sales &&
                item.sales.map((item, index) => (
                  <TableCell key={index} align="center">
                    {item.quantity}
                  </TableCell>
                ))}
            </TableRow>
          );
        }
        return null; // Return null for duplicate names
      })
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
              <TableHeaderCell>NAME</TableHeaderCell>
              {months.map((month, index) => (
                <TableHeaderCell key={index}>
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

const Card = styled.div`
  background-color: ${(props) => props.theme.componentBackground};
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
  margin-right: 25px;
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
  min-width: 100%;
  width: max-content;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  border-bottom: 1px solid ${(props) => props.theme.line};
`;

export const TableHeaderCell = styled.th`
  padding: 10px;
  text-align: ${(props) =>
    props.align === "right"
      ? "right"
      : props.align === "center"
      ? "center"
      : "left"};
  color: #909090;
  font-weight: 500;
  text-wrap: nowrap;

  span {
    display: block;
    text-align: inherit;
  }
`;

export const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid ${(props) => props.theme.line};
  text-align: ${(props) =>
    props.align === "right"
      ? "right"
      : props.align === "center"
      ? "center"
      : "left"};
  white-space: nowrap; // Prevents the text from wrapping onto the next line
  overflow: hidden; // Hides any text that goes beyond the container width
  text-overflow: ellipsis; // Adds ellipsis when the text overflows
  max-width: 220px; // or whatever width you want to set
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
  width: 65px;
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

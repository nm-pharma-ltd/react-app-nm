import styled from 'styled-components';
import { NavLink, useNavigate } from "react-router-dom";
import { Dropdownos } from './BarChart';
import { useMemo, useState } from 'react';

export default function Table({ title, subtitle, viewDetailsLink, width, columns, data, details, content, onMonthChange, selectedMonth, onYearChange, selectedYear }) {
  const navigate = useNavigate();

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'asc',
  });

  const handleHeaderClick = (columnName, fieldName) => {
    const sortableColumns = ["rank", "productDescription", "monthlyProfit", "soldTarget", "clientName", "monthlySale"];
    if (sortableColumns.includes(fieldName)) {
      let direction = 'asc';
      if (sortConfig.key === fieldName && sortConfig.direction === 'asc') {
        direction = 'desc';
      }
      setSortConfig({ key: fieldName, direction });
    }
  };

  const sortedData = useMemo(() => {
    let sortableData = data && [...data];
    if (sortConfig.key !== null) {
      sortableData.sort((a, b) => {
        let aValue = a[sortConfig.key];
        let bValue = b[sortConfig.key];

        if (sortConfig.key === 'monthlyProfit') {
          aValue = parseFloat(aValue.replace('€', '').trim());
          bValue = parseFloat(bValue.replace('€', '').trim());
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableData;
  }, [data, sortConfig]);


  const generateRows = () => {
    return sortedData && sortedData.map((item, index) => (
      <TableRow key={index} onClick={() => navigate(`/pharmacies/${content}/${content === "clients" ? item.clientCode : item.productCode}`)}>
        {columns.map((column, colIndex) => (
          <TableCell key={colIndex} align={column.align}>
            {column.field === 'productName' ? (
              <ProductLink>
                {item[column.field]}
              </ProductLink>
            ) : column.field === 'monthlyProfit' || column.field ==="profit" ? (
              Number(item[column.field]) >= 0 ? (
                <GreenBox>{`${item[column.field]} €`}</GreenBox>
              ) : (
                <RedBox>{`${item[column.field]} €`}</RedBox>
              )
            ) : (
              <span>{item[column.field]}</span>
            )}
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 'July',
    'August', 'September', 'October', 'November', 'December'
  ];

  const years = [2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033];


  const handleMonthChange = (event) => {
    const month = Number(event.target.value);
    console.log("Month selected:", month);
    onMonthChange(month);
  };

  const handleYearChange = (event) => {
    const year = event.target.value;
    console.log("Year selected:", year);
    onYearChange(year);
  };


  const monthDropdown = (
    <DropdownosMain value={selectedMonth} onChange={handleMonthChange}>
      {months.map((month, index) => (
        <option key={index} value={index + 1}>
          {month}
        </option>
      ))}
    </DropdownosMain>
  );
  const yearDropdown = (
    <DropdownosMain value={selectedYear} onChange={handleYearChange}>
      {years.map((year) => (
        <option key={year} value={year}>
          {year}
        </option>
      ))}
    </DropdownosMain>
  );


  return (
    <Card width={width}>
      <CardHeader>
        <Title>{title}</Title>
        <RightMenu>
          {monthDropdown}
          {yearDropdown}
          <ViewDetailsLink to={viewDetailsLink}>{details}</ViewDetailsLink>
        </RightMenu>
      </CardHeader>
      <Subtitle>{subtitle}</Subtitle>
      <TableContainer>
        <TableElement>
          <TableHead>
            <TableRow>
              {columns.map((column, index) => (
                <TableHeaderCell
                  key={index}
                  align={column.align}
                  onClick={() => handleHeaderClick(column.label, column.field)}
                >
                  {column.label}
                  {(column.field === "rank" || column.field === "productDescription" || column.field === "monthlyProfit" || column.field === "clientName" || column.field === "soldTarget" || column.field === "monthlySale") && <span style={{ marginLeft: '5px' }}>↕</span>}
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

const DropdownosMain = styled.select`
  background-color: ${(props) => props.theme.componentBackground};
  border: 1px solid ${(props) => props.theme.line};
  padding: 5px 10px;
  margin-right: 7px;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  cursor: pointer;
  color: ${(props) => props.theme.text};
  max-width: 110px;

  &:hover,
  &:focus {
    border-color: ${(props) => props.theme.line};
  }
`;


const RightMenu = styled.div`
  padding: 0.1em;
`
const Card = styled.div`
  background-color: ${props => props.theme.componentBackground};
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
  margin-right: 25px;
  width: ${props => props.width || '48%'};
  min-width: 250px;

  @media (max-width: 1320px){
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
  overflow-x: auto;
  margin-bottom: 20px;
`;

const TableElement = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableHead = styled.thead`
  border-bottom: 1px solid ${props => props.theme.line};
`;

export const TableHeaderCell = styled.th`
  padding: 10px;
  text-align: ${props => props.align || 'left'}; // Use the passed alignment
  color: #909090;
  font-weight: 500;
  cursor: pointer;
  text-wrap: nowrap;
`;



export const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid ${props => props.theme.line};
  text-align: ${props => (props.align === 'right' ? 'right' : props.align === 'center' ? 'center' : 'left')};
  white-space: nowrap;   // Prevents the text from wrapping onto the next line
  overflow: hidden;      // Hides any text that goes beyond the container width
  text-overflow: ellipsis; // Adds ellipsis when the text overflows
  //width: auto;  
  max-width: 220px;    // or whatever width you want to set
`;



const TableBody = styled.tbody``;

const TableRow = styled.tr`
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.background};
  }
`;



export const ViewDetailsLink = styled(NavLink)`
  color: #e16a32;
  text-decoration: none;
  transition: all 0.25s ease-in-out;
  margin-left: 0.5em;
    
  &:hover {
    color: #753619;
  }
`;


export const ProductLink = styled(NavLink)`
  color: ${props => props.theme.text};
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

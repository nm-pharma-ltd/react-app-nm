import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {Chart, registerables } from "chart.js"
import styled from 'styled-components';
import ApiService from '../api/ApiService';
import { Context } from '../providers/provider';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
Chart.register(...registerables);
const BarChart = ({ onProductNameUpdate }) => {

  const [store] = useContext(Context);
  const { productCode } = useParams();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [chartData, setChartData] = useState({ labels: [], datasets: [] });
  const [totalTarget, setTotalTarget] = useState(0);
  const [productName, setProductName] = useState(''); // Add this to store product name

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
    "December",]


  useEffect(() => {
    const fetchDataForMonth = async (year) => {
      let monthlyDataTarget = new Array(12).fill(null);
      let monthlyDataSold = new Array(12).fill(null);
      let monthlyDataProfit = new Array(12).fill(null);


      const productData = await ApiService.get(`products/${productCode}/${year}/sales`, { "Authorization": "Bearer " + store.user.token });
      console.log(productData)
      setTotalTarget(productData.yearlyTarget)
      productData.monthlySales.forEach(element => {
        const monthIndex = element.month - 1;
        monthlyDataTarget[monthIndex] =(productData.yearlyTarget/12).toFixed(0);
        monthlyDataSold[monthIndex] = element.quantitySold;
        monthlyDataProfit[monthIndex] = element.profit;

      });

      if (productData && productData.productDescription) {
        onProductNameUpdate(productData.productDescription);
        setProductName(productData.productDescription);  // Set the product name to state

      }
      setChartData({
        labels: months,
        datasets: [
          {
            label: 'Target',
            data: monthlyDataTarget,
            backgroundColor: '#dc3545',
          },
          {
            label: 'Sold',
            data: monthlyDataSold,
            backgroundColor: '#4a679d',
          },
          {
            label: 'Profit',
            data: monthlyDataProfit,
            backgroundColor: '#3ebc62',
          },
        ]
      });
    };

    fetchDataForMonth(selectedYear);
  }, [selectedYear, store.user.token]);

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const totalSold = chartData.datasets.length > 0 ? chartData.datasets[1].data.reduce((acc, value) => acc + value, 0) : 0;
  // const totalTarget = chartData.datasets.length > 0 ? chartData.datasets[0].data.reduce((acc, value) => acc + value, 0) : 0;
  const totalProfit = chartData.datasets.length > 0 ? chartData.datasets[2].data.reduce((acc, value) => acc + value, 0) : 0;


  const changeYear = event => {
    setSelectedYear(event.target.value);
  };

  const renderYearDropdown = () => {
    let years = [];
    for (let i = 2020; i <= 2050; i++) {
      years.push(<option key={i} value={i}>{i}</option>);
    }
    return years;
  };


  return (
    <Kontaineros>
      <NavigationContainer>

      </NavigationContainer>

      <ChartContainer>

        <ResponsiveChart>
          <Bar data={chartData} options={options} />
        </ResponsiveChart>
        <InfoContainer>

        <InfoBox>
            <InfoLabel>Year</InfoLabel>
            <Dropdownos value={selectedYear} onChange={e => setSelectedYear(Number(e.target.value))}>
              {renderYearDropdown()}
            </Dropdownos>
          </InfoBox>

          <InfoBox>
            <InfoLabel>Total Profit</InfoLabel>
            <InfoValue>{totalProfit.toFixed(0)} €</InfoValue>
          </InfoBox>

          <InfoBox>
            <InfoLabel>Total Sold</InfoLabel>
            <InfoValue>{totalSold} pk</InfoValue>
          </InfoBox>

          <InfoBox>
            <InfoLabel>Total Target</InfoLabel>
            <InfoValue>{totalTarget} pk</InfoValue>
          </InfoBox>

        </InfoContainer>
      </ChartContainer>
    </Kontaineros>
  )
};
const NavigationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const NavigationButton = styled.button`
  background-color: #ffffff;
  border: none;
  cursor: pointer;
  margin: 0 10px;
  padding: 5px 10px;
  border-radius: 5px;
  transition: background-color 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #f1f1f1;
  }
`;

export const Dropdownos = styled.select`
  background-color: ${props => props.theme.componentBackground};;
  border: 1px solid ${props => props.theme.line};
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 16px;
  outline: none;
  cursor: pointer;
  color: ${props => props.theme.text};
  max-width: 120px;

  &:hover, &:focus {
    border-color: ${props => props.theme.line};;
  }
`;

const Kontaineros = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const ChartContainer = styled.div`
  background-color: ${props => props.theme.componentBackground};
  border-radius: 20px;
  padding: 20px;
  margin-top: 20px;
  margin-right: 20px;
  display: flex;
  width: auto;

  @media (max-width: 1200px){
    flex-direction: column;
  }
`;

const ResponsiveChart = styled.div`
  width: 100%;
  height: auto;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 20px;

  @media (max-width: 1200px){
    flex-direction: column;
  }
`;

const InfoBox = styled.div`
  border-bottom: 1px solid ${props => props.theme.line};;
  padding: 10px;
  margin: 10px;
  width: 100%;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InfoLabel = styled.p`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 5px;
`;

const InfoValue = styled.p`
  font-size: 20px;
  text-align: center;
  margin: 0;
`;

export default BarChart;

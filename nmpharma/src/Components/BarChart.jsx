import React from 'react';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';

const BarChart = () => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Target',
        data: [12, 19, 3, 5, 2, 3, 7, 9, 6, 1, 10, 22],
        backgroundColor: '#dc3545', 
      },
      {
        label: 'Sold',
        data: [9, 18, 2, 5, 2, 3, 2, 1, 5, 1, 10, 25],
        backgroundColor: '#3ebc62', 
      },
      
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  return(
    <ChartContainer>
      <Bar data={data} options={options} />
    </ChartContainer>
  )
  
};

const ChartContainer = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 20px;
  height: 500px;
  margin-top: 20px;
  margin-right: 20px;
`;



export default BarChart;

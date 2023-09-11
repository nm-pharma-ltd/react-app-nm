import React from 'react';
import {Chart} from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

const LineChart = () => {
  
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Profit',
        data: [5, 6, 3, 5, 2, 3, 11, 9, 16, 20, 18, 36],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      }
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <ChartContainer>
      <StyledLine data={data} options={options} />
    </ChartContainer>
  );
};

const ChartContainer = styled.div`
  background-color: ${props=> props.theme.componentBackground};;
  border-radius: 20px;
  padding: 20px;
  
  margin-top: 20px;
  margin-right: 20px;
  margin-bottom: 20px;
`;

const StyledLine = styled(Line)`
  width: 100%;
  height: 100%;
`;

export default LineChart;

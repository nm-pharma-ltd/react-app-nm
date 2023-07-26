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

  const totalSold = data.datasets[1].data.reduce((acc, value) => acc + value, 0);

  return (
    <ChartContainer>
      <ChartWrapper>
        <Bar data={data} options={options} />
      </ChartWrapper>
      <InfoContainer>
        <Info>Total Sold: {totalSold}</Info>
        {/* Další tři důležité informace můžete přidat podle potřeby */}
      </InfoContainer>
    </ChartContainer>
  )
};

const ChartContainer = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  padding: 20px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: 768px) {
    flex-direction: row;
    align-items: flex-start;
  }
`;

const ChartWrapper = styled.div`
  width: 100%;
  height: 300px;
  margin-bottom: 20px;
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media screen and (min-width: 768px) {
    align-items: flex-start;
  }
`;

const Info = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

export default BarChart;

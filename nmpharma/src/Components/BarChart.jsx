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

  // Calculate the total sold for the year
  const totalSold = data.datasets[1].data.reduce((acc, value) => acc + value, 0);

  return (
    <Kontaineros>
      <ChartContainer>
        <ResponsiveChart>
          <Bar data={data} options={options} />
        </ResponsiveChart>
        <InfoContainer>
          <InfoBox>
            <InfoLabel>Total Sold:</InfoLabel>
            <InfoValue>{totalSold}</InfoValue>
          </InfoBox>
          <InfoBox>
            <InfoLabel>Délka pinďoura:</InfoLabel>
            <InfoValue>93cm</InfoValue>
          </InfoBox>
          <InfoBox>
            <InfoLabel>Kvalita grafu:</InfoLabel>
            <InfoValue>Full HD</InfoValue>
          </InfoBox>
          <InfoBox>
            <InfoLabel>Refresh rate:</InfoLabel>
            <InfoValue>64 fps</InfoValue>
          </InfoBox>
        </InfoContainer>
      </ChartContainer>
    </Kontaineros>
  )
};

const Kontaineros = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const ChartContainer = styled.div`
  background-color: #ffffff;
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
  border-bottom: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  width: 100%;
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

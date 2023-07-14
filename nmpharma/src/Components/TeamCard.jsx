import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { GreenBox } from './ProfitQuantityTable';

const TeamCard = ({ teamName, monthGoal, yearGoal, currentAmount }) => {
  const monthProgress = (currentAmount / monthGoal) * 100;
  const yearProgress = (currentAmount / yearGoal) * 100;

  return (
    <TeamBox>
      <TeamName>{teamName}</TeamName>
      <Goal>
        <GoalLabel>Month goal</GoalLabel>
        <GoalAmount>{monthGoal} €</GoalAmount>
      </Goal>
      <ProgressBarWrapper>
        <StyledLinearProgress variant="determinate" value={monthProgress} />
        <LinearProgressLabel>{`${monthProgress}%`}</LinearProgressLabel>
      </ProgressBarWrapper>
      <Goal>
        <GoalLabel>Year goal</GoalLabel>
        <GoalAmount>{yearGoal} €</GoalAmount>
      </Goal>
      <ProgressBarWrapper>
        <StyledLinearProgress variant="determinate" value={yearProgress} />
        <LinearProgressLabel>{`${yearProgress}%`}</LinearProgressLabel>
      </ProgressBarWrapper>
      <Earned>
        <EarnedLabel>Earned now</EarnedLabel>
        <GreenBox>{currentAmount} €</GreenBox>
      </Earned>
    </TeamBox>
  );
};

const TeamBox = styled.div`
  min-width: 200px;
  width: 31%;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-right: 16px;
  margin-bottom: 16px;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 300px;
`;

const TeamName = styled.h3`
  margin: 0;
  font-size: 18px;
`;

const Goal = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 8px;
`;

const GoalLabel = styled.span`
  margin: 0;
  margin-right: 8px;
  font-size: 14px;
  color: #555;
`;

const GoalAmount = styled.span`
  margin: 0;
  font-size: 14px;
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  margin-bottom: 8px;
`;

const StyledLinearProgress = styled(LinearProgress)`
  height: 10px;
`;

const LinearProgressLabel = styled(Typography)`
  font-size: 12px;
  color: #555;
  margin-top: 4px;
`;

const Earned = styled.div`
  display: flex;
  align-items: center;
  margin-top: 8px;
`;

const EarnedLabel = styled.span`
  margin: 0;
  margin-right: 8px;
  font-size: 14px;
  color: #555;
`;

// const EarnedAmount = styled.span`
//   margin: 0;
//   font-size: 14px;
// `;

export default TeamCard;

import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { GreenBox } from '../Components/Table';
import { TiMediaRecord } from 'react-icons/ti';

export default function TeamCardDetail({ teamName, monthGoal, yearGoal, currentAmount }) {
  const monthProgress = (currentAmount / monthGoal) * 100;
  const yearProgress = (currentAmount / yearGoal) * 100;

  return (
    <TeamBox to="/targets/teamdetails">
      <TeamName>
        {teamName}
        <TeamBadge>
          <TeamBulletOrange/>
          Team
        </TeamBadge>
      </TeamName>

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
}

const TeamBulletOrange = styled(TiMediaRecord)`
    color: #004099;
    font-size: 14px;
`

export const TeamBadge = styled.div`
  height: 22px;
  text-align: center;
  border-radius: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #004099;
  margin: 0 20px;
  width: 68px;
  background-color: #a7b0ff;
  font-size: 13px;
  font-weight: 600;

  @media (max-width: 768px) {
    width: 55px;
    font-size: 12px;
  }
`;


const TeamBox = styled(NavLink)`
  width: 100%;
  border-radius: 20px;
  padding: 20px;
  margin-right: 16px;
  margin-bottom: 16px;
  background: linear-gradient(to bottom right, #742700, #ff7f50, #cc6849 );
  height: 370px;
  display: flex;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  cursor: pointer;
  text-decoration: none;
  color: #fff;
  transition: all 0.25s ease-in-out;

  &:hover {
    box-shadow: 0 3px 4px rgba(0, 0, 0, 0.25);
  }
`;

const TeamName = styled.h3`
  font-size: 22px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 10px;
`;

const Goal = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 8px;
  margin-top: 20px;
  flex-direction: column;
`;

const GoalLabel = styled.span`
  margin: 0;
  margin-right: 8px;
  font-size: 14px;
  color: #fff;
`;

const GoalAmount = styled.span`
  margin: 0;
  font-size: 28px;
  font-weight: 600;
  color: #fff;
`;

const ProgressBarWrapper = styled.div`
  width: 100%;
  margin-bottom: 10px;
`;

const StyledLinearProgress = styled(LinearProgress)`
  &.MuiLinearProgress-root {
    height: 8px;
    border-radius: 5px;
    background-color: rgba(0,0,0, 0.28); /* Darker color for unprogressed part */
  }

  & .MuiLinearProgress-barColorPrimary {
    background-color: #fff;
  }
`;


const LinearProgressLabel = styled(Typography)`
  font-size: 12px;
  color: #fff;
`;

const Earned = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;

`;

const EarnedLabel = styled.span`
  margin: 0;
  margin-right: 8px;
  font-size: 14px;
  color: #fff;
`;

import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { GreenBox } from './Table';
import { NavLink } from 'react-router-dom';

const TeamCard = ({ teamName, monthGoal, yearGoal, currentAmount }) => { //Props předávání dat

  //Výpočet progressu
  const monthProgress = (currentAmount / monthGoal) * 100;
  const yearProgress = (currentAmount / yearGoal) * 100;

  return (
    
    <TeamBox to="/targets/teamdetails" >
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

const TeamBox = styled(NavLink)`
  min-width: 200px;
    width: 31%;
    border-radius: 20px;
    padding: 20px;
    margin-right: 16px;
    margin-bottom: 16px;
    background: #fff;
    height: 300px;
    display: flex;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    cursor: pointer;
    text-decoration: none;
    color: #000;
    transition: all 0.25s ease-in-out;


    &:hover{
      box-shadow: 0 3px 4px rgba(0, 0, 0, 0.25);
    }
`;

const TeamName = styled.h3`
  margin-bottom: 10px;
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
  margin-bottom: 10px;
`;

const StyledLinearProgress = styled(LinearProgress)`
  height: 10px;
`;

const LinearProgressLabel = styled(Typography)`
  font-size: 12px;
  color: #555;
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



export default TeamCard;

import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { GreenBox } from '../Components/Table';
import { TiMediaRecord } from 'react-icons/ti';

export default function TeamCardDetail({id, teamName, monthGoal, yearGoal, currentAmount, cardwidth, progressbarheight, index, backgroundgradient }) {
  const monthProgress = (currentAmount / monthGoal) * 100;
  const yearProgress = (currentAmount / yearGoal) * 100;

  return (
    <>
      <TeamBox
        to={`/targets/teamdetails/${id}`}
        cardwidth={cardwidth}
        backgroundgradient={backgroundgradient}
      >
        <TeamName>
          {teamName}
          <TeamBadge>
            <TeamBulletO />
            Team
          </TeamBadge>
        </TeamName>
        <Goal>
          <GoalLabel>Month goal</GoalLabel>
          <GoalAmount>{monthGoal} €</GoalAmount>
        </Goal>
        <ProgressBarWrapper progressbarheight={progressbarheight}>
          <StyledLinearProgress variant="determinate" value={monthProgress} />
          <LinearProgressLabel>{`${Math.floor(monthProgress)}%`}</LinearProgressLabel>
        </ProgressBarWrapper>

        <Goal>
          <GoalLabel>Year goal</GoalLabel>
          <GoalAmount>{yearGoal} €</GoalAmount>
        </Goal>
        <ProgressBarWrapper progressbarheight={progressbarheight}>
          <StyledLinearProgress variant="determinate" value={yearProgress} />
          <LinearProgressLabel>{`${Math.floor(yearProgress)}%`}</LinearProgressLabel>
        </ProgressBarWrapper>

        <Earned>
          <EarnedLabel>Earned now</EarnedLabel>
          <GreenBox>{currentAmount} €</GreenBox>
        </Earned>
      </TeamBox>
    </>
  );
};

export const gradientColors = [
  'linear-gradient(to bottom right, #742700, #ff7f50, #cc6849)', // Bronze
  'linear-gradient(to bottom right,  #646464,#c0c0c0 , #868585)', // Silver
  'linear-gradient(to bottom right, #a48300, #ffcf40, #9f7700)', // Gold
  'linear-gradient(to bottom right, #366784,#305451, #35576d)', // Red-Green-Blue
];


export const TeamBulletO = styled(TiMediaRecord)`
  color: #e7f0ff;
  font-size: 14px;
`;


export const TeamBadge = styled.div`
  height: 22px;
  text-align: center;
  border-radius: 100px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #e7f0ff;
  margin: 0 0 0 20px;
  width: 68px;
  background-color: #5c6c84;
  font-size: 13px;
  font-weight: 600;

  @media (max-width: 768px) {
    width: 55px;
    font-size: 12px;
  }
`;


const TeamBox = styled(NavLink)`
  width: calc(${(props) => props.cardwidth} - 20px);
  border-radius: 20px;
  padding: 20px;
  margin-right: 16px;
  margin-bottom: 16px;
  background: ${props => props.backgroundgradient}; // Use the provided background gradient
  background-color: ${(props) => props.teamColor};
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
  min-width: 320px;

  
  &:hover {
    box-shadow: 0 3px 4px rgba(0, 0, 0, 0.25);
  }

  @media (max-width: 1278px){
    min-width: 47%;
  }

  @media (max-width: 1024px){
    min-width: unset;
    width: 100%;
  }
`

const TeamName = styled.h3`
  font-size: 22px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 1440px){
    font-size: 20px;
  }
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
  height: ${({ progressbarheight }) => progressbarheight || '8px'};
`;

const StyledLinearProgress = styled(LinearProgress)`
  &.MuiLinearProgress-root {
    height: ${({ progressBarHeight }) => progressBarHeight || '8px'};
    border-radius: 5px;
    background-color: rgba(0, 0, 0, 0.28); /* Darker color for unprogressed part */
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

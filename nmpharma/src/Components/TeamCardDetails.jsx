import React from 'react';
import { useState, useEffect, useContext } from "react";
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import styled from 'styled-components';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { GreenBox } from '../Components/Table';
import { TiMediaRecord } from 'react-icons/ti';
import { FaTimes } from 'react-icons/fa';
import ConfirmationPopup from './ConfirmationPopUp';
import ApiService from '../api/ApiService';
import { Context } from '../providers/provider';
import WarningAlert from './WarningAlert';
import DangerAlert from './DangerAlert';

export default function TeamCardDetail({
  id,
  teamName,
  monthGoal,
  yearGoal,
  currentAmount,
  currentAmountMonth,
  cardwidth,
  progressbarheight,
  index,
  backgroundgradient,
  isDetailPage, }) {

  const [store,] = useContext(Context);
  const monthProgress = (currentAmount / monthGoal) * 100;
  const yearProgress = (currentAmount / yearGoal) * 100;
  const { id: paramId } = useParams()
  const [showDeleteTeamPopup, setShowDeleteTeamPopup] = useState(false);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [error2, setError2] = useState('');


  // Handler functions
  const handleOpenDeletePopup = (e) => {
    setShowDeleteTeamPopup(true);
  };

  const handleClosePopup = () => {
    setShowDeleteTeamPopup(false);
  };

  const handleConfirmDelete = async () => {
    setLoading(true);
    try {
      await ApiService.delete(`teams/${paramId}`, { "Authorization": "Bearer " + store.user.token });
      navigate('/pharmacies')
    } catch (error) {
      if (error.status === 403) {
        setError('You dont have permission to do this type of action.')
      }
      else {
        setError2("An error occurred. Please try again.");
      }
      console.error("Error deleting the team:", error);
    }
    setLoading(false);
    setShowDeleteTeamPopup(false);
  };



  const CardContent = (
    <>
      {error && <WarningAlert message={error} />}
      {error2 && <DangerAlert message={error2} />}
      {loading && <LinearProgress />}
      <TeamNameDiv>
        <TeamName>
          <TopKonto>
            {teamName}
            <TeamBadge>
              <TeamBulletO />
              Team
            </TeamBadge>
          </TopKonto>
        </TeamName>
        <BottomKonto>
          {isDetailPage && <DeleteIcon onClick={(e) => handleOpenDeletePopup(e)} />}
        </BottomKonto>
      </TeamNameDiv>
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
        <EarnedLabel>Earned last month</EarnedLabel>
        <GreenBox>{currentAmountMonth} €</GreenBox>
      </Earned>
      <Earned>
        <EarnedLabel>Earned this year</EarnedLabel>
        <GreenBox>{currentAmount} €</GreenBox>
      </Earned>
      {showDeleteTeamPopup && (
        <ConfirmationPopup
          onClose={handleClosePopup}
          onConfirm={handleConfirmDelete}
          message={'Are you sure you want to delete this team?'}
        />
      )}
    </>
  );



  if (isDetailPage) {
    return <TeamBox cardwidth={cardwidth} backgroundgradient={backgroundgradient}>
      {CardContent}
    </TeamBox>
  }

  return (
    <TeamBox to={`/targets/teamdetails/${id}`} cardwidth={cardwidth} backgroundgradient={backgroundgradient}>
      {CardContent}
    </TeamBox>
  );



};



const TopKonto = styled.div`
  display: flex;
  align-items: center;
`;
const BottomKonto = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  `;


const DeleteIcon = styled(FaTimes)`
  top: 10px;
  right: 10px;
  color: white;
  cursor: pointer;
  transition: 0.3s;
  z-index: 990;
  display: flex;
  font-size: 20px;

  &:hover {
    color: red;
  }
`;

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
  background: ${(props) => props.backgroundgradient}; // Use the provided background gradient
  background-color: ${(props) => props.teamColor};
  height: auto;
  min-height: 370px;
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

const TeamNameDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  text-wrap: nowrap;
`;


const Goal = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 5px;
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
  width: 230px;
  margin-bottom: 10px;
`;

const EarnedLabel = styled.span`
  margin: 0;
  margin-right: 8px;
  font-size: 14px;
  color: #fff;
  width: 130px;
`;

import React from 'react';
import { useState, useEffect } from "react";
import styled from 'styled-components';
import TeamCardDetail, { gradientColors } from '../Components/TeamCardDetails';
import { FaCirclePlus } from 'react-icons/fa6';
import AddTeamPopup from '../Components/AddTeam';
import { NavLink } from "react-router-dom";

export default function Teams({})  {

const [isAddTeamPopupOpen, setIsAddTeamPopupOpen] = useState(false);
const [teams, setTeams] = useState([
    {
      name: "Private sales",
      monthGoal: 10000,
      yearGoal: 100000,
      currentAmount: 8000,
    },
    {
      name: "Government sales",
      monthGoal: 20000,
      yearGoal: 200000,
      currentAmount: 15000,
    },
    {
      name: "Company sales",
      monthGoal: 100000,
      yearGoal: 300000,
      currentAmount: 12000,
    },
  ]);


const handleAddTeamClick = () => {
    setIsAddTeamPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsAddTeamPopupOpen(false);
  };
  
  const handleSaveTeam = (newTeam) => {
    setTeams((prevTeams) => [...prevTeams, newTeam]);
    setIsAddTeamPopupOpen(false);
  };

  return (
    <>
      <IconContainer>
        <h2>Teams</h2>
        <IconLink onClick={handleAddTeamClick}>
          <FaCirclePlus />
        </IconLink>
      </IconContainer>
      {isAddTeamPopupOpen && (
        <AddTeamPopup onClose={handleClosePopup} onSave={handleSaveTeam} />
      )}

      <TeamsContainer>
        {teams.map((team, index) => (
          <TeamCardDetail
            key={index}
            teamName={team.name}
            monthGoal={team.monthGoal}
            yearGoal={team.yearGoal}
            currentAmount={team.currentAmount}
            cardwidth={'31%'}
            progressbarheight={'10px'}
            index={index}
            backgroundgradient={gradientColors[index % gradientColors.length]}
          />
        ))}
      </TeamsContainer>
    </>
  );
}

const TeamsContainer = styled.div`
  margin-top: 20px;
  margin-right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const IconLink = styled(NavLink)`
  padding: 10px;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  color: #d54529;
  font-size: 20px;

  &:hover {
    color: #5d5d5d;
    transition: all 0.25s ease-in-out;
  }
`;

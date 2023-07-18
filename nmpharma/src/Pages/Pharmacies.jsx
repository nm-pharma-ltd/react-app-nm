import React, { useState } from "react";
import { FaCirclePlus } from 'react-icons/fa6';
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import TeamCard from '../Components/TeamCard';
import ChatBox from "../Components/ChatBox";
import PharmaciesTable from "../Components/ProfitQuantityTable";
import Clients from "../Components/Clients";
import { Input, InputLabel } from "./Register";
import { Title } from "./ClientsDetails";

const AddTeamPopup = ({ onClose }) => {
  const [teamName, setTeamName] = useState("");
  const [teamMembers, setTeamMembers] = useState("");

  const handleTeamNameChange = (event) => {
    setTeamName(event.target.value);
  };

  const handleTeamMembersChange = (event) => {
    setTeamMembers(event.target.value);
  };

  const handleSave = () => {
    // Perform save logic here
    console.log("Team Name:", teamName);
    console.log("Team Members:", teamMembers);
    onClose();
  };

  return (
    <PopupContainer>
      <PopupContent>
        <PopTitle>Add New Team</PopTitle>
        <InputLabel>
          Team Name
          <Input type="text" value={teamName} onChange={handleTeamNameChange} ></Input>
        </InputLabel>
        <InputLabel>
          Team Members
          <Input type="number" value={teamMembers} onChange={handleTeamMembersChange} />
        </InputLabel>
        <ButtonContainer>
          <Button onClick={handleSave}>Save & Upload</Button>
          <Button onClick={onClose}>Cancel</Button>
        </ButtonContainer>
      </PopupContent>
    </PopupContainer>
  );
};

export default function Pharmacies() {
  const [showPopup, setShowPopup] = useState(false);
  const teams = [
    { name: 'Private sales', monthGoal: 10000, yearGoal: 100000, currentAmount: 8000 },
    { name: 'Government sales', monthGoal: 20000, yearGoal: 200000, currentAmount: 15000 },
    { name: 'Company sales', monthGoal: 100000, yearGoal: 300000, currentAmount: 12000 },
  ];

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <Title>Sales activity</Title>
      <MamRadVelkyZadky>
        <PharmaciesTable />
        <Clients />
      </MamRadVelkyZadky>
      <IconContainer>
        <h2>Teams</h2>
        <IconLink onClick={handleOpenPopup}>
          <FaCirclePlus/>
        </IconLink>
      </IconContainer>

      <TeamsContainer>
        {teams.map((team, index) => (
          <TeamCard
            key={index}
            teamName={team.name}
            monthGoal={team.monthGoal}
            yearGoal={team.yearGoal}
            currentAmount={team.currentAmount}
          />
        ))}
      </TeamsContainer>
      <h2>Chat</h2>
      <ChatBox/>

      {showPopup && <AddTeamPopup onClose={handleClosePopup} />}
    </>
  );
}


const PopTitle = styled.h2`
  margin-bottom: 20px;
  display: flex;
`;

const TeamsContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const MamRadVelkyZadky = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  margin-bottom: 20px;
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

const PopupContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  transition: all 0.25s ease-in-out;
`;

const PopupContent = styled.div`
  background-color: #fff;
    border-radius: 20px;
    padding: 20px;
    width: 500px;
    display: flex;
    flex-direction: column;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-left: 10px;
  border: none;
  border-radius: 5px;
  background-color: #d54529;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #c23d2a;
  }
`;

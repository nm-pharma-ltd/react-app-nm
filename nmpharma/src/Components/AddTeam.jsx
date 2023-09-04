import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Input, InputLabel } from "../Pages/Register";
import ApiService from "../api/ApiService";

const AddTeamPopup = ({ onClose, onSave }) => {
  const [teamName, setTeamName] = useState(""); 
  const [reps, setReps] = useState([]);

  useEffect(() => {
    fetchReps();
  }, []);

  const fetchReps = async () => {
    try {
      const fetchedData = await ApiService.get("teams/reps");
      // Přidáme do načtených dat vlastnost pro označení členů týmu
      const repsWithCheck = fetchedData.map((rep) => ({
        ...rep,
        checked: false,
      }));
      setReps(repsWithCheck);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleTeamNameChange = (e) => {
    setTeamName(e.target.value);
  };

  const handleTeamMemberChange = (index) => {
    // Když je označení změněno, aktualizujeme stav
    const updatedReps = reps.map((rep, i) =>
      i === index ? { ...rep, checked: !rep.checked } : rep
    );
    setReps(updatedReps);
  };

  const handleSave = async () => {
    const selectedMembers = reps.filter((rep) => rep.checked);
    const selectedMemberIds = selectedMembers.map((member) => member.id);
  
    if (teamName.trim() !== "" && selectedMemberIds.length > 0) {
      const newTeam = {
        name: teamName,
        representativesIds: selectedMemberIds,
      };
  
      try {
        await ApiService.post("teams", newTeam);
        onClose();
      } catch (error) {
        console.log(newTeam)
        console.error("Error:", error);
      }
    }
  };

  return (
    <PopupContainer>
      <PopupContent>
        <PopTitle>Add New Team</PopTitle>
        <InputLabel>
          Team Name
          <Input
            type="text"
            value={teamName}
            onChange={handleTeamNameChange}
          />
        </InputLabel>

        <TeamMembersContainer>
          <InputLabel>Team Members</InputLabel>
          {reps.map((member, index) => (
            <TeamMemberItem key={index}>
              <input
                type="checkbox"
                checked={member.checked}
                onChange={() => handleTeamMemberChange(index)}
              />
              <span>{member.name}</span>
            </TeamMemberItem>
          ))}
        </TeamMembersContainer>

        <ButtonContainer>
          <Button onClick={handleSave}>Save & Upload</Button>
          <Button onClick={onClose}>Cancel</Button>
        </ButtonContainer>
      </PopupContent>
    </PopupContainer>
  );
};

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
  background-color: ${props =>props.theme.componentBackground};
  border-radius: 20px;
  padding: 20px;
  width: 500px;
  display: flex;
  flex-direction: column;
`;

const PopTitle = styled.h3`
  margin-bottom: 20px;
  display: flex;
`;

const TeamMembersContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 10px;
  font-weight: bold;
`;

const TeamMemberItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 5px;
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

export default AddTeamPopup;

import React, { useState } from "react";
import styled from 'styled-components';
import { Input, InputLabel } from "../Pages/Register";

const AddTeamPopup = ({ onClose, onSave }) => {
    const [teamName, setTeamName] = useState("");
    const [yearlyTarget, setYearlyTarget] = useState(0);
    const [monthlyTarget, setMonthlyTarget] = useState(0);
    const [teamMembers, setTeamMembers] = useState([
      { name: "John Doe", checked: false },
      { name: "Jane Smith", checked: false },
      // Add more default team members here
    ]);
  
    const handleTeamNameChange = (event) => {
      setTeamName(event.target.value);
    };
  
    const handleYearlyTargetChange = (event) => {
      setYearlyTarget(event.target.value);
    };
  
    const handleMonthlyTargetChange = (event) => {
      setMonthlyTarget(event.target.value);
    };
  
    const handleTeamMemberChange = (index) => {
      const updatedTeamMembers = [...teamMembers];
      updatedTeamMembers[index].checked = !updatedTeamMembers[index].checked;
      setTeamMembers(updatedTeamMembers);
    };
  
    const handleSave = () => {
      const newTeam = {
        name: teamName,
        yearGoal: parseInt(yearlyTarget),
        monthGoal: parseInt(monthlyTarget),
        members: teamMembers.filter(member => member.checked).map(member => member.name),
      };
  
      onSave(newTeam);
    };
    
    return (
        <PopupContainer>
            <PopupContent>
                <PopTitle>Add New Team</PopTitle>
                <InputLabel>
                    Team Name
                    <Input type="text" value={teamName} onChange={handleTeamNameChange} />
                </InputLabel>

                <InputLabel>
                    Yearly Target
                    <Input type="number" value={yearlyTarget} onChange={handleYearlyTargetChange} />
                </InputLabel>

                <InputLabel>
                    Monthly Target
                    <Input type="number" value={monthlyTarget} onChange={handleMonthlyTargetChange} />
                </InputLabel>

                <TeamMembersContainer>
                    <InputLabel>Team Members</InputLabel>
                    {teamMembers.map((member, index) => (
                        <TeamMemberItem key={index}>
                            <input type="checkbox" checked={member.checked} onChange={() => handleTeamMemberChange(index)} />
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

// Styled Components
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

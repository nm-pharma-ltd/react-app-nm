import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Input, InputLabel } from "../Pages/Register";
import ApiService from "../api/ApiService";
import { Context, SIGNEDUSER } from "../providers/provider";
import { FaCheck } from "react-icons/fa";

const AddTeamPopup = ({ onClose, onSave, fetchData }) => {
  const [teamName, setTeamName] = useState("");
  const [yearGoal, setYearGoal] = useState("");
  const [reps, setReps] = useState([]);
  const [store, dispatch] = useContext(Context);

  const date = new Date();
  let year = date.getFullYear();

  useEffect(() => {
    fetchReps();
  }, []);

  const fetchReps = async () => {
    try {
      const fetchedData = await ApiService.get("teams/reps", {
        Authorization: "Bearer " + store.user.token,
      });

      // "teamId": null filter
      const repsWithNullTeamId = fetchedData.filter(
        (rep) => rep.teamId === null
      );

      // repsWithCheck property
      const repsWithCheck = repsWithNullTeamId.map((rep) => ({
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

  const handleYearGoalChange = (e) => {
    setYearGoal(e.target.value);
  };

  const handleTeamMemberChange = (index) => {
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

        const response = await ApiService.post("teams", newTeam, { Authorization: "Bearer " + store.user.token,});

        if (response && response.id) {

          const createdTeamId = response.id;
          
          const goals = {
            year: year,
            teamId: createdTeamId,
            saleGoal: yearGoal,
          };

          await ApiService.post("teams/goal", goals, { Authorization: "Bearer " + store.user.token,})
          fetchData()

        } else {
          console.log("Creating of goals failed")
        }

        onClose();
      } catch (error) {
        console.log(newTeam);
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
          <Input type="text" value={teamName} onChange={handleTeamNameChange} />
        </InputLabel>

        <InputLabel>
          Year goal
          <Input type="text" value={yearGoal} onChange={handleYearGoalChange} />
        </InputLabel>

        <TeamMembersContainer>
          <InputLabel>Team Members</InputLabel>
          <Peoples>
            {reps.map((member, index) => (
              <TeamMemberItem key={index}>
                <label>
                  <HiddenCheckbox
                    type="checkbox"
                    checked={member.checked}
                    onChange={() => handleTeamMemberChange(index)}
                  />
                  <CheckboxWrapper checked={member.checked}>
                    <FaCheck />
                  </CheckboxWrapper>
                  <span>{member.name}</span>
                </label>
              </TeamMemberItem>
            ))}
          </Peoples>
        </TeamMembersContainer>

        <ButtonContainer>
          <Button onClick={handleSave}>Save & Upload</Button>
          <Button onClick={onClose}>Cancel</Button>
        </ButtonContainer>
      </PopupContent>
    </PopupContainer>
  );
};

const Peoples = styled.div`
  max-height: 200px;
  overflow: auto;

  ::-webkit-scrollbar-track {
    background: ${props=>props.theme.componentBackground}; 
  }
`

const HiddenCheckbox = styled.input.attrs({ type: 'checkbox' })`
  display: none;
`;

const CheckboxWrapper = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid ${props => props.theme.line};
  border-radius: 4px;
  background-color: ${props => (props.checked ? props.theme.line : 'transparent')};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
  margin-right: 5px;

  svg {
    visibility: ${props => (props.checked ? 'visible' : 'hidden')};
    font-size: 10px;
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
  background-color: ${props => props.theme.componentBackground};
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
  flex-direction: row;
  align-items: center;
  margin: 7px 0 7px 0;
  border-bottom: 1px solid ${props => props.theme.line};

  > label {
    display: flex;
    align-items: center;
    width: 100%;
    margin-bottom: 9px;
    cursor: pointer;
  }

  span {
    margin-left: 5px;
  }

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

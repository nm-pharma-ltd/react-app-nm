import React, { useState } from "react";
import { FaCirclePlus } from 'react-icons/fa6';
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import ChatBox from "../Components/ChatBox";
import { Input, InputLabel } from "./Register";
import { Title } from "./ClientsDetails";
import Table from "../Components/Table";
import TeamCardDetail, { gradientColors } from "../Components/TeamCardDetails";

export default function Pharmacies() {
  const [showPopup, setShowPopup] = useState(false);

  const teams = [
    { name: 'Private sales', monthGoal: 10000, yearGoal: 100000, currentAmount: 8000 },
    { name: 'Government sales', monthGoal: 20000, yearGoal: 200000, currentAmount: 15000 },
    { name: 'Company sales', monthGoal: 100000, yearGoal: 300000, currentAmount: 12000 },
  ];

  const products = [
    { rank: 1, name: 'Voltaren', profit: 500, soldTarget: `${1250}€ / ${1520}€` },
    { rank: 2, name: 'Product 2', profit: 80, soldTarget: `${580}€ / ${1050}€` },
    { rank: 3, name: 'Product 3', profit: 200, soldTarget: `${405}€ / ${1050}€` },
    { rank: 4, name: 'Product 4', profit: 300, soldTarget: `${705}€ / ${1050}€` },
    { rank: 5, name: 'Product 5', profit: 150, soldTarget: `${820}€ / ${1050}€` },
    { rank: 6, name: 'Product 6', profit: 400, soldTarget: `${1250}€ / ${1520}€` },
    { rank: 7, name: 'Product 7', profit: -400, soldTarget: `${1250}€ / ${1520}€` },
    { rank: 8, name: 'Product 8', profit: -80, soldTarget: `${580}€ / ${1050}€` },
    { rank: 9, name: 'Product 9', profit: 200, soldTarget: `${405}€ / ${1050}€` },
    { rank: 10, name: 'Product 10', profit: 300, soldTarget: `${705}€ / ${1050}€` },
  ];


  const pharmacies = [
    { rank: 1, name: 'Pharmacy 1', profit: 500, monthlysales: `${1520}€` },
    { rank: 2, name: 'Pharmacy 2', profit: 80, monthlysales: `${50}€` },
    { rank: 3, name: 'Pharmacy 3', profit: 200, monthlysales: `${1050}€` },
    { rank: 4, name: 'Pharmacy 4', profit: 300, monthlysales: `${1050}€` },
    { rank: 5, name: 'Pharmacy 5', profit: 150, monthlysales: `${1050}€` },
    { rank: 6, name: 'Pharmacy 6', profit: 400, monthlysales: `${1520}€` },
    { rank: 7, name: 'Pharmacy 7', profit: -400, monthlysales: `${1520}€` },
    { rank: 8, name: 'Pharmacy 8', profit: -80, monthlysales: `${1050}€` },
    { rank: 9, name: 'Pharmacy 9', profit: 200, monthlysales: `${1050}€` },
    { rank: 10, name: 'Pharmacy 10', profit: 300, monthlysales: `${1050}€` },
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
        <Table
          title="Product Profit & Quantity"
          subtitle="TOP 10"
          viewDetailsLink="/pharmacies/productdetails"
          width="47%"
          columns={[
            { label: 'RANK', field: 'rank', align: 'left' },
            { label: 'NAME', field: 'name', align: 'left' },
            { label: 'PROFIT', field: 'profit', align: 'center' },
            { label: 'SOLD/TARGET', field: 'soldTarget', align: 'right' },
          ]}
          data={products}
        />
        <Table
          title="Pharmacies (Clients)"
          subtitle="TOP 10"
          viewDetailsLink="/pharmacies/clientdetails"
          width="47%"
          columns={[
            { label: 'RANK', field: 'rank', align: 'left' },
            { label: 'NAME', field: 'name', align: 'left' },
            { label: 'PROFIT', field: 'profit', align: 'center' },
            { label: 'MONTHLY SALES', field: 'monthlysales', align: 'right' },
          ]}
          data={pharmacies}
        />
      </MamRadVelkyZadky>

      <IconContainer>
        <h2>Teams</h2>
        <IconLink onClick={handleOpenPopup}>
          <FaCirclePlus />
        </IconLink>
      </IconContainer>

      {/* Zobrazení karet týmů */}
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
            index={index} // Pass the index as a prop
            backgroundgradient={gradientColors[index % gradientColors.length]} // Use the index to select a color from the colors array
          />
        ))}
      </TeamsContainer>


      <h2>Chat</h2>
      <ChatBox />

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

export const MamRadVelkyZadky = styled.div`
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

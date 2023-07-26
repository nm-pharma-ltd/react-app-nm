import React, { useState } from "react";
import { FaCirclePlus } from 'react-icons/fa6';
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import ChatBox from "../Components/ChatBox";
import { Title } from "./ClientsDetails";
import Table from "../Components/Table";
import TeamCardDetail, { gradientColors } from "../Components/TeamCardDetails";
import AddTeamPopup from "../Components/AddTeam";


export default function Pharmacies() {
  const [isAddTeamPopupOpen, setIsAddTeamPopupOpen] = useState(false);
  const [teams, setTeams] = useState([
    { name: 'Private sales', monthGoal: 10000, yearGoal: 100000, currentAmount: 8000 },
    { name: 'Government sales', monthGoal: 20000, yearGoal: 200000, currentAmount: 15000 },
    { name: 'Company sales', monthGoal: 100000, yearGoal: 300000, currentAmount: 12000 },
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
        <IconLink onClick={handleAddTeamClick}>
          <FaCirclePlus />
        </IconLink>
      </IconContainer>
      {isAddTeamPopupOpen && (
        <AddTeamPopup onClose={handleClosePopup} onSave={handleSaveTeam} />
      )}

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

    </>
  );
}


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

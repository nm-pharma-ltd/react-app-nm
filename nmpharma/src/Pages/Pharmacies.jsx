import React from "react";
import ProfitQuantityTable from "../Components/ProfitQuantityTable";
import { styled } from "styled-components";
import Clients from "../Components/Clients";
import {FaCirclePlus} from 'react-icons/fa6'
import { NavLink } from "react-router-dom";
import TeamCard from '../Components/TeamCard';

export default function Pharmacies() {

  const teams = [
    { name: 'Private sales', monthGoal: 10000, yearGoal: 100000, currentAmount: 8000 },
    { name: 'Goverment sales', monthGoal: 20000, yearGoal: 200000, currentAmount: 15000 },
    { name: 'Company sales', monthGoal: 100000, yearGoal: 300000, currentAmount: 12000 },
  ];

  return (
    <>
      <h2>Sales activity</h2>
      <MamRadVelkyZadky>
        <ProfitQuantityTable />
        <Clients />
      </MamRadVelkyZadky>
      <IconContainer>
        <h2>Teams</h2>
        <IconLink>
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

const IconLink = styled(NavLink)`
  padding: 10px;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  color: #d54529;

  &:hover {
    color: #5d5d5d;
    -webkit-transition: all 0.25s ease-in-out;
    transition: all 0.25s ease-in-out;
  }
`;

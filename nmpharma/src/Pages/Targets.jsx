import React from "react";
import { styled } from "styled-components";
import TeamCardDetail, { gradientColors } from "../Components/TeamCardDetails";


export default function Targets() {
  const teams = [
    { name: 'Private sales', monthGoal: 10000, yearGoal: 100000, currentAmount: 8000 },
    { name: 'Government sales', monthGoal: 20000, yearGoal: 200000, currentAmount: 15000 },
    { name: 'Company sales', monthGoal: 100000, yearGoal: 300000, currentAmount: 12000 },
  ];

  return (
    <>
      <h2>Targets</h2>
      <TeamsContainer>
        {teams.map((team, index) => (
          <TeamCardDetail
            key={index}
            teamName={team.name}
            monthGoal={team.monthGoal}
            yearGoal={team.yearGoal}
            currentAmount={team.currentAmount}
            cardwidth='33%'
            index={index}
            backgroundgradient={gradientColors[index % gradientColors.length]} // Use the index to select a color from the colors array
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

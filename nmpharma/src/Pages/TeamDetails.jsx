import React from "react";
import { styled } from "styled-components";
import { GoBackButton, TitleWrapper } from "./ClientsDetails";
import TeamCardDetail from "../Components/TeamCardDetails";

const TeamDetails = () => {
  const teams = [
    { name: 'Private sales', monthGoal: 10000, yearGoal: 100000, currentAmount: 8000 },
  ];

  const teamMembers = [
    { name: "John Doe", role: "Manager", monthAmount: 8000, yearAmount: 90000 },
    { name: "Jane Smith", role: "Sales Representative", monthAmount: 6000, yearAmount: 75000 },
    { name: "Mike Johnson", role: "Account Executive", monthAmount: 7000, yearAmount: 80000 },
  ];

  return (
    <>
      <TitleWrapper>
        <h2>Team Details</h2>
        <GoBackButton to="/targets">Back</GoBackButton>
      </TitleWrapper>
      <TeamsContainer>
        {teams.map((team, index) => (
          <TeamCardDetail
            key={index}
            teamName={team.name}
            monthGoal={team.monthGoal}
            yearGoal={team.yearGoal}
            currentAmount={team.currentAmount}
          />
        ))}
      </TeamsContainer>
      <h2>Team members</h2>
      <TeamsContainerM>
        {teamMembers.map((member, index) => (
          <TeamMemberCard key={index}>
            <Avatar />
            <MemberName>{member.name}</MemberName>
            <MemberRole>{member.role}</MemberRole>
            <StatsContainer>
              <Stat>
                <StatLabel>Month</StatLabel>
                <StatValue>{member.monthAmount} €</StatValue>
              </Stat>
              <Stat>
                <StatLabel>Year</StatLabel>
                <StatValue>{member.yearAmount} €</StatValue>
              </Stat>
            </StatsContainer>
          </TeamMemberCard>
        ))}
      </TeamsContainerM>
    </>
  );
};


const TeamsContainerM = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-right: 20px;
`;


const TeamsContainer = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
`;

const TeamMemberCard = styled.div`
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
  width: calc(33% - 20px);
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #ccc; /* Add avatar image or icon here */
`;

const MemberName = styled.h3`
  margin: 10px 0;
  font-size: 18px;
  text-align: center;
`;

const MemberRole = styled.p`
  margin: 0;
  font-size: 14px;
  color: #777;
  text-align: center;
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 20px;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StatLabel = styled.span`
  margin-bottom: 6px;
  font-size: 12px;
  color: #777;
`;

const StatValue = styled.span`
  font-size: 14px;
  font-weight: 600;
`;

export default TeamDetails;

import React from "react";
import { styled } from "styled-components";
import { GoBackButton, TitleWrapper } from "./ClientsDetails";
import TeamCardDetail from "../Components/TeamCardDetails"; // Import the gradientColors array
import { FaUserCircle } from "react-icons/fa";
import { GreenBox } from "../Components/Table";
import { useParams } from "react-router";

const TeamDetails = () => {
  const { id } = useParams();

  const teams = [
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
  ];

  const teamIndex = parseInt(id, 10);
  const team = teams[teamIndex];

  if (!team) {
    return <div>Team not found</div>;
  }

  const { name, monthGoal, yearGoal, currentAmount } = team;

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
        <TeamCardDetail
          teamName={name}
          monthGoal={monthGoal}
          yearGoal={yearGoal}
          currentAmount={currentAmount}
          cardwidth="100%"
          progressBarHeight={10}
          index={teamIndex} // Pass the teamIndex to TeamCardDetail
        />
      </TeamsContainer>
      <h2>Team members</h2>
      <TeamsContainerM>
        {teamMembers.map((member, index) => (
          <TeamMemberCard key={index}>
            <Avatar>
              <FaUserCircle size={75} color="#fff" />
            </Avatar>
            <MemberName>{member.name}</MemberName>
            <MemberRole>{member.role}</MemberRole>
            {/* <StatsContainer>
              <Stat>
                <StatLabel>Month</StatLabel>
                <GreenBox>{member.monthAmount} €</GreenBox>
              </Stat>
              <Stat>
                <StatLabel>Year</StatLabel>
                <GreenBox>{member.yearAmount} €</GreenBox>
              </Stat>
            </StatsContainer> */}
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
  min-width: 190px;

  @media(max-width: 868px){
    
  }
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
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

export default TeamDetails;

import React from "react";
import { useState, useEffect, useContext } from "react";
import { styled } from "styled-components";
import { GoBackButton, TitleWrapper } from "./ClientsDetails";
import TeamCardDetail, { gradientColors } from "../Components/TeamCardDetails";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router";
import ApiService from "../api/ApiService";
import { Context, SIGNEDUSER, TEAMS } from "../providers/provider";

const TeamDetails = () => {

  const [store, dispatch] = useContext(Context);
  const { id } = useParams();
  const [teamMembers, setteamMembers] = useState([]);

 const teams = store.teams;

  const team = teams.find((team) => team.id === parseInt(id, 10));


  useEffect(() => {
    if (team) {
      fetchData();
    }
  }, [team]);


  if (!team) {
    return <div>Team not found</div>;
  }

  const { name, goal, currentAmount } = team;

  async function fetchData() {
    try {
      const response = await ApiService.get(`teams/${id}/members`, {
        Authorization: "Bearer " + store.user.token,
      });
      setteamMembers(response);

    } catch (error) {
      console.error("Error:", error);
    }
  }


  return (
    <>
      <TitleWrapper>
        <h2>Team Details</h2>
        <GoBackButton to="/pharmacies">Back</GoBackButton>
      </TitleWrapper>

      <TeamsContainer>
        <TeamCardDetail
          teamName={name}
          monthGoal={(goal?.saleGoal / 12)?.toFixed(1)}
          yearGoal={goal?.saleGoal || 0}
          currentAmount={0}
          cardwidth="100%"
          progressbarheight={10}
          backgroundgradient={gradientColors[team.id % gradientColors.length]}
          index={id}
        />
      </TeamsContainer>

      <h2>Team members</h2>
      <TeamsContainerM>
        {teamMembers.map((member, index) => (
          <TeamMemberCard key={index}>
            <Avatar>
              <ProfilePic size={75} />
            </Avatar>
            <MemberName>{member.name}</MemberName>
          </TeamMemberCard>
        ))}
      </TeamsContainerM>
    </>
  );
};

const ProfilePic = styled(FaUserCircle)`
  color: ${props=> props.theme.componentBackground};
`

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
  background-color: ${props=> props.theme.componentBackground};
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

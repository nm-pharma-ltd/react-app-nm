import React from "react";
import { useState, useEffect, useContext } from "react";
import { styled } from "styled-components";
import { GoBackButton, TitleWrapper } from "./ClientsDetails";
import TeamCardDetail, { gradientColors } from "../Components/TeamCardDetails";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router";
import ApiService from "../api/ApiService";
import { Context, SIGNEDUSER, TEAMS, TEAM_COLORS } from "../providers/provider";

const TeamDetails = ({ }) => {
  const [store, dispatch] = useContext(Context);
  const { id } = useParams();
  const [teamMembers, setTeamMembers] = useState([]);

  const teamIndex = store.teams.findIndex((item) => item.team.id === parseInt(id));
  const team = store.teams[teamIndex];

  async function fetchData() {
    try {
      const response = await ApiService.get(`teams/earned/${id}`, {
        Authorization: "Bearer " + store.user.token,
      });
      setTeamMembers(response);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    if (team) {
      fetchData();
    }
  }, [id, team]);

  if (!team) {
    return <div>Team not found</div>;
  }
  

  return (
    <>
      <TitleWrapper>
        <h2>Team Details</h2>
        <GoBackButton to="/pharmacies">Back</GoBackButton>
      </TitleWrapper>

      <TeamsContainer>
        <TeamCardDetail
          teamName={team.team.name}
          monthGoal={(team.team.goal?.saleGoal / 12)?.toFixed(0)}
          yearGoal={team.team.goal?.saleGoal || 0}
          currentAmount={team.salesThisYear.toFixed(0)}
          currentAmountMonth={team.salesLastMonth.toFixed(0)}
          cardwidth="100%"
          progressbarheight={10}
          backgroundgradient={store.team_colors[teamIndex]}
          index={id} 
          isDetailPage={true}
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
            <StatLabel>Sales last month: {member.salesLastMonth.toFixed(0)} €</StatLabel>
            <StatLabel>Sales this year: {member.salesThisYear.toFixed(0)} €</StatLabel>
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

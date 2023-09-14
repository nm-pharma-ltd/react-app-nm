import React from "react";
import { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import TeamCardDetail, { gradientColors } from "../Components/TeamCardDetails";
import { FaCirclePlus } from "react-icons/fa6";
import AddTeamPopup from "../Components/AddTeam";
import { NavLink } from "react-router-dom";
import ApiService from "../api/ApiService";
import { Context, SIGNEDUSER, TEAMS, TEAM_COLORS } from "../providers/provider";
import { UnderlineH } from "../Pages/Stock";

export default function Teams({}) {
  const [isAddTeamPopupOpen, setIsAddTeamPopupOpen] = useState(false);
  const [teamsData, setteamsData] = useState([]);
  const [store, dispatch] = useContext(Context);
  

  async function fetchData() {
    try {
      const response = await ApiService.get("teams", {
        Authorization: "Bearer " + store.user.token,
      });

      setteamsData(response);
      dispatch({ type: TEAMS, payload: { response } });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleAddTeamClick = () => {
    setIsAddTeamPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsAddTeamPopupOpen(false);
  };

  const handleSaveTeam = () => {
    fetchData();
    setIsAddTeamPopupOpen(false);
  };


  return (
    <>
      <IconContainer>
        <h2>Teams</h2>
        <IconLink onClick={handleAddTeamClick}>
          <FaCirclePlus />
        </IconLink>
      </IconContainer>
      {isAddTeamPopupOpen && (
        <AddTeamPopup
          onClose={handleClosePopup}
          onSave={handleSaveTeam}
          fetchData={fetchData}
        />
      )}

      <TeamsContainer>
        {teamsData.map((item, index) => {
          return (
            <TeamCardDetail
              key={item.team.id}
              id={item.team.id}
              teamName={item.team.name}
              monthGoal={(item.team.goal?.saleGoal / 12)?.toFixed(0)}
              yearGoal={item.team.goal?.saleGoal || 0}
              currentAmount={item.salesThisYear?.toFixed(0) || 0}
              currentAmountMonth={item.salesLastMonth?.toFixed(0) || 0}
              cardwidth={"31%"}
              progressbarheight={"10px"}  
              index={index}
              backgroundgradient={store.team_colors[index]}
            />
          );
        })}
      </TeamsContainer>
    </>
  );
}
const TeamsContainer = styled.div`
  margin-top: 20px;
  margin-right: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
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

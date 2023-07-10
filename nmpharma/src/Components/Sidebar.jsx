import React from 'react';
import styled from 'styled-components';
import LogoBlack from '../img/Logo2.png';
import { FaUser, FaChartBar, FaListAlt, FaBullseye, FaBell, FaCog } from 'react-icons/fa';
import { TiMediaRecord } from "react-icons/ti";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';

export default function Sidebar() {
  return (
    <StyledSidebar>
      <LogoContainer>
        <Logo src={LogoBlack} alt="Company Logo" />
      </LogoContainer>
      <MenuHeading>Main Menu</MenuHeading>
      <MenuItem to="/pharmacies" >
        <MenuItemIcon>
          <FaUser />
        </MenuItemIcon>
        Pharmacies / Clients
      </MenuItem>
      <MenuItem to="/stock" >
        <MenuItemIcon>
          <FaChartBar />
        </MenuItemIcon>
        Stock
      </MenuItem>
      <MenuItem to="/eru" >
        <MenuItemIcon>
          <FaListAlt />
        </MenuItemIcon>
        ERUs / Tenders
      </MenuItem>
      <MenuItem to="/targets" >
        <MenuItemIcon>  
          <FaBullseye />
        </MenuItemIcon> 
        Targets
      </MenuItem>
      <MenuItem to="/notifications" >
        <MenuItemIcon>
          <FaBell />
        </MenuItemIcon>
        Notifications
        <NotificationPop />
      </MenuItem>
      <MenuHeading className="space">Teams</MenuHeading>
      <MenuItem2>
        <MenuItemIcon>
          <TeamBullet1 />
        </MenuItemIcon>
        Private sales
      </MenuItem2>
      <MenuItem2>
        <MenuItemIcon>
          <TeamBullet2 />
        </MenuItemIcon>
        Government sales
      </MenuItem2>
      <MenuItem2>
        <MenuItemIcon>
          <TeamBullet3 />
        </MenuItemIcon>
        Worldwide sales
      </MenuItem2>
      <MenuHeading />
      <MenuItem2>
        <MenuItemIcon>
          <FaCog />
        </MenuItemIcon>
        Settings
      </MenuItem2>
      <MenuItem2>
        <MenuItemIcon>
          <FaArrowRightFromBracket />
        </MenuItemIcon>
        Log out
      </MenuItem2>
    </StyledSidebar>
  );
}

const StyledSidebar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 250px;
  background-color: #ffffff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  border-radius: 20px;
`;

const LogoContainer = styled.div`
  padding: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Logo = styled.img`
  margin: 20px;
  height: 56px;
`;

const MenuHeading = styled.div`
  padding: 8px 28px;
  color: #555555;
  font-size: 13px;
  text-transform: uppercase;

  &.space {
    margin-top: 20px;
  }
`;

const TeamBullet1 = styled(TiMediaRecord)`
    color: #E16A32;
`
const TeamBullet2 = styled(TiMediaRecord)`
    color: #29CC97;
`
const TeamBullet3 = styled(TiMediaRecord)`
    color: #E13251;
`

const MenuItem = styled(NavLink)`
  padding: 13px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #b1b1b1;
  transition: background-color 0.3s;
  border-radius: 10px;
  font-size: 14px;
  margin: 0 20px;
  text-decoration: none;

  &:hover {
    background-color: #e0e0e037;
    color: #5d5d5d;
    -webkit-transition: all 0.25s ease-in-out;
    transition: all 0.25s ease-in-out;
  }

  &.active {
    background-color: #eeeff8;
    color: #2e2e2e;
    font-weight: 500;
  }
`;

const MenuItem2 = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #b1b1b1;
  transition: background-color 0.3s;
  border-radius: 10px;
  font-size: 14px;
  margin: 0 20px;

  &:hover {
    color: #5d5d5d;
    -webkit-transition: all 0.25s ease-in-out;
    transition: all 0.25s ease-in-out;
  }

  &.active {
    color: #555555;
  }
`;

const MenuItemIcon = styled.div`
  margin-right: 8px;
  display: flex;
`;

const NotificationPop = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 100%;
  background-color: #E13251;
  margin-left: 53px;
  color: #fff;
`;

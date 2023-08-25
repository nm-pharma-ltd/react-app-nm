import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import LogoWhite from '../img/Logo1.png';
import LogoBlack from '../img/Logo2.png';
import { FaUser, FaChartBar, FaListAlt, FaBullseye, FaBell, FaCog } from 'react-icons/fa';
import { TiMediaRecord } from "react-icons/ti";
import { FaAngleLeft, FaAngleRight, FaArrowRightFromBracket } from "react-icons/fa6";
import { NavLink } from 'react-router-dom';
import { Context, LOGOUT } from '../providers/provider';

export default function Sidebar({ isSidebarOpen, toggleSidebar }) {
  const [, dispatch] = useContext(Context);

  const handleLogout = () => {
    dispatch({ type: LOGOUT });
  };
  
  const theme = useContext(ThemeContext);
  const logoSrc = theme.mode === 'dark' ? LogoWhite : LogoBlack;

  return (
    <StyledSidebar open={isSidebarOpen}>
      <LogoContainer>
        <Logo src={logoSrc} alt="Company Logo" />
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
        <NotificationPop>4</NotificationPop>
      </MenuItem>
      <MenuHeading className="space">Teams</MenuHeading>
      <MenuItem2 to="/targets/teamdetails/0">
        <MenuItemIcon>
          <TeamBullet1 />
        </MenuItemIcon>
        Private sales
      </MenuItem2>
      <MenuItem2 to="/targets/teamdetails/1">
        <MenuItemIcon>
          <TeamBullet2 />
        </MenuItemIcon>
        Goverment sales
      </MenuItem2>
      <MenuItem2 to="/targets/teamdetails/2">
        <MenuItemIcon>
          <TeamBullet3 />
        </MenuItemIcon>
        Company sales
      </MenuItem2>
      <MenuHeading />
      <MenuItem2 to="/settings">
        <MenuItemIcon>
          <FaCog />
        </MenuItemIcon>
        Settings
      </MenuItem2>
      <MenuItem2 to="/Login" onClick={handleLogout} >
        <MenuItemIcon>
          <FaArrowRightFromBracket />
        </MenuItemIcon>
        Log out
      </MenuItem2>
      {window.innerWidth < 1024 && (
        <ToggleSidebarButton onClick={toggleSidebar}>
          {isSidebarOpen ? <FaAngleLeft color='#737373' /> : <FaAngleRight color='#737373' />}
        </ToggleSidebarButton>
      )}
    </StyledSidebar>
  );
}

const ToggleSidebarButton = styled.div`
  position: fixed;
  bottom: 10px;
  left: ${props => (props.open ? '270px' : '20px')}; 
  width: 50px;
  height: 50px;
  background-color: #a6a6a636;
  box-shadow: 0 0 10px rgb(0 0 0 / 24%);
  border: 1px solid #61616120;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1000;
  transition: 0.3s, background-color 0.3s;

  &:hover {
    background-color: #6161612b;
  }
`;


const StyledSidebar = styled.div`
  height: 100vh;
  width: 250px;
  background-color: ${props => props.theme.componentBackground};
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  border-radius: 0 20px 20px 0 ;
  z-index: 999;
  position: fixed;
  top: 0;
  left: ${props => (props.open ? '0' : '-250px')};
  width: ${props => (props.open ? '250px' : '0')};
  transition: 0.3s;
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
  color: ${props => props.theme.menuHeading};
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
    color: #8d8d8d;
`
const TeamBullet3 = styled(TiMediaRecord)`
    color: #af8e12;
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
    background-color: ${props => props.theme.nav};
    color: ${props => props.theme.colorNavLink};
    -webkit-transition: all 0.25s ease-in-out;
    transition: all 0.25s ease-in-out;
  }

  &.active {
    background-color: ${props => props.theme.nav};
    color: ${props => props.theme.colorNavLink};
    font-weight: 500;
  }
`;

const MenuItem2 = styled(NavLink)`
  padding: 8px;
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
    color: #5d5d5d;
    -webkit-transition: all 0.25s ease-in-out;
    transition: all 0.25s ease-in-out;
  }
`;

const MenuItemIcon = styled.div`
  margin-right: 8px;
  display: flex;
`;

const NotificationPop = styled.div`
    width: 23px;
    height: 19px;
    border-radius: 20px;
    background-color: #E13251;
    margin-left: 40px;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 12px;
`;

import React, { useState } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { MamRadVelkyZadky } from './Pharmacies';

export default function Settings() {
  const [activeLink, setActiveLink] = useState('');

  const handleNavLinkClick = (link) => {
    setActiveLink(link);
  };

  const renderContent = () => {
    switch (activeLink) {
      case 'profile':
        return <Profile />;
      case 'appearance':
        return <Appearance />;
      case 'notifications':
        return <Notifications />;
      case 'data-export':
        return <DataExport />;
      case 'delete-profile':
        return <DeleteProfile />;
      default:
        return <div>Select an option from the left menu.</div>;
    }
  };

  return (
    <MamRadVelkyZadky>
      <h2>Settings</h2>
      <SettingsCard>
        <NavLinks>
          <MenuItem active={activeLink === 'profile'} onClick={() => setActiveLink('profile')}>
            Profile
          </MenuItem>
          <MenuItem active={activeLink === 'appearance'} onClick={() => setActiveLink('appearance')}>
            Appearance
          </MenuItem>
          <MenuItem active={activeLink === 'notifications'} onClick={() => setActiveLink('notifications')}>
            Notifications
          </MenuItem>
          <MenuItem active={activeLink === 'data-export'} onClick={() => setActiveLink('data-export')}>
            Data Export
          </MenuItem>
          <MenuItem active={activeLink === 'delete-profile'} onClick={() => setActiveLink('delete-profile')}>
            Delete Profile
          </MenuItem>
        </NavLinks>
        <Content>{renderContent()}</Content>
      </SettingsCard>
    </MamRadVelkyZadky>
  );
}

const SettingsCard = styled.div`
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-top: 20px;
  margin-right: 20px;
  width: 100%;
  height: 600px;
  display: flex;
`;

const NavLinks = styled.nav`
  display: flex;
  flex-direction: column;
  margin-right: 20px;
`;

const Content = styled.div`
  flex: 1;
  padding: 10px;
`;

const MenuItem = styled.div`
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

  ${props => props.active && `
    background-color: #eeeff8;
    color: #2e2e2e;
    font-weight: 500;
  `}
`;




export const Profile = () => <div>Profile Content</div>;
export const Appearance = () => <div>Appereance Content</div>;
export const Notifications = () => <div>Notifications Content</div>;
export const DataExport = () => <div>Data Export Content</div>;
export const DeleteProfile = () => <div>Delete Profile Content</div>;
import React, { useState } from 'react';
import styled from 'styled-components';
import { MamRadVelkyZadky } from './Pharmacies';
import { ProfileSettings } from './ProfileSettings';
import { Appearance } from './Appearance';
import { NotificationsSettings } from './NotificationsSettings';
import ConfirmationPopup from '../Components/ConfirmationPopUp';

export default function Settings() {

  const [activeLink, setActiveLink] = useState('profile'); // Initialize to 'profile'

  const renderContent = () => {
    switch (activeLink) {
      case 'profile':
        return <ProfileSettings />;
      case 'appearance':
        return <Appearance />;
      case 'notifications':
        return <NotificationsSettings />;
      default:
        return <ProfileSettings />;
    }
  };

  const [showConfirmPopup, setShowConfirmPopup] = useState(false);

  const handleDeleteProfile = () => {
    setShowConfirmPopup(true);
  };

  const handleClosePopup = () => {
    setShowConfirmPopup(false);
  };

  const handleConfirmDelete = () => {
    console.log("Profile deleted!");
    // Implement actual delete logic here.
    setShowConfirmPopup(false);
  };



  return (
    <MamRadVelkyZadky>
      <h2>Settings</h2>
      <SettingsCard>
        <NavLinks>
          <MenuItem isactive={activeLink === 'profile'} onClick={() => setActiveLink('profile')}>
            Profile
          </MenuItem>
          <MenuItem isactive={activeLink === 'appearance'} onClick={() => setActiveLink('appearance')}>
            Appearance
          </MenuItem>
          <MenuItemN>
            Notifications
          </MenuItemN>
          <MenuItemDelete isactive={activeLink === 'delete-profile'} onClick={handleDeleteProfile}>
            Delete Profile
          </MenuItemDelete>
        </NavLinks>
        <Content>{renderContent()}</Content>
        {showConfirmPopup && (
          <ConfirmationPopup
            onClose={handleClosePopup}
            onConfirm={handleConfirmDelete}
          />
        )}
      </SettingsCard>
    </MamRadVelkyZadky>
  );
}


const SettingsCard = styled.div`
  background-color: ${props => props.theme.componentBackground};
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
  padding: 9px;
`;

const MenuItem = styled.div`
  padding: 13px 25px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #b1b1b1;
  border-radius: 10px;
  font-size: 14px;
  text-decoration: none;
  transition: 0.15s all ease-in-out;
  text-wrap: nowrap;


  ${props => props.isactive && `
    background-color: ${props.theme.nav};
    color: ${props.theme.colorNavLink};
    font-weight: 500;
  `}
  
  &:hover {
    background-color: ${props => props.theme.nav};
    color: ${props => props.theme.colorNavLink};
  }
`;


const MenuItemN = styled.div`
  padding: 13px 25px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #b1b1b1;
  border-radius: 10px;
  border: 2px  dashed ${props => props.theme.nav}; 
  cursor: not-allowed;
  font-size: 14px;
  text-decoration: none;
  transition: 0.15s all ease-in-out;
  text-wrap: nowrap;


  ${props => props.isactive && `
    background-color: ${props.theme.nav};
    color: ${props.theme.colorNavLink};
    font-weight: 500;
  `}
  
  &:hover {
    background-color: ${props => props.theme.nav};
    color: ${props => props.theme.colorNavLink};
  }
`;

const MenuItemDelete = styled.div`
  padding: 13px 25px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #c94141;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 600;
  text-wrap: nowrap;
  text-decoration: none;
  transition: 0.15s all ease-in-out;

  &:hover {
    color: #ad2d2d;
    padding-top: 10px;
  }

`;



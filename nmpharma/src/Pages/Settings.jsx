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
          <MenuItem isactive={activeLink === 'notifications'} onClick={() => setActiveLink('notifications')}>
            Notifications
          </MenuItem>
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

  &:hover {
    background-color: #e0e0e037;
    color: #5d5d5d;
  }

  ${props => props.isactive && `
    background-color: #eeeff8;
    color: #2e2e2e;
    font-weight: 500;

    &:hover {
      background-color: #eeeff8;
      color: #2e2e2e;
    }
  `}
`;

const MenuItemDelete = styled.div`
  padding: 13px 25px;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: #b11414;
  border-radius: 10px;
  font-size: 14px;
  font-weight: 500;
  text-decoration: none;
  transition: 0.15s all ease-in-out;

  &:hover {
    color: #480a0a;
    padding-top: 10px;
  }

`;



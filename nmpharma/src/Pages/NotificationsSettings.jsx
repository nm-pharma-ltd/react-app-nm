import React, { useState } from 'react';
import styled from 'styled-components';

export const NotificationsSettings = () => {
    const [noNotif, setNoNotif] = useState(false);

    const toggleNot = () => setNoNotif(!noNotif);

    return (
        <>
            <HeadingSettings>
                <h3>Notifications Settings</h3>
            </HeadingSettings>
            <ProfileSettingsContainer>
                <SettingItem>
                    <SettingLabel>Notifications</SettingLabel>
                    <Switch>
                        <Checkbox type="checkbox" checked={noNotif} onChange={toggleNot} />
                        <Slider />
                    </Switch>
                </SettingItem>
            </ProfileSettingsContainer>
        </>
    );
};

const HeadingSettings = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
`;

const ProfileSettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 35px;
  background-color: ${props => props.theme.componentBackground};
  width: 100%;
  height: 100%;
`;

const SettingItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #e0e0e0;


`;

const SettingLabel = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;      // Smaller width
  height: 24px;     // Smaller height
`;

const Slider = styled.span`
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  transition: 0.4s;
  border-radius: 24px;  // Adjusted radius

  &::before {
    position: absolute;
    content: "";
    height: 18px;        // Adjusted size
    width: 18px;         // Adjusted size
    left: 3px;           // Adjusted position
    bottom: 3px;         // Adjusted position
    background-color: white;
    transition: 0.4s;
    border-radius: 50%;
  }
`;

const Checkbox = styled.input`
  opacity: 0;
  width: 0;
  height: 0;

  &:checked + ${Slider} {
    background-color: #E16A32;
  }

  &:focus + ${Slider} {
    box-shadow: 0 0 1px #E16A32;
  }

  &:checked + ${Slider}::before {
    transform: translateX(24px); // Adjusted transform
  }
`;



import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { FaPen, FaUser, FaEye, FaEyeSlash, FaUserCircle } from 'react-icons/fa';
import { ViewDetailsLink } from '../Components/Table';
import { Context, SIGNEDUSER } from '../providers/provider';
import ApiService from '../api/ApiService';

export const ProfileSettings = () => {
  console.log("ProfileSettings component rendered");

  const [store, dispatch] = useContext(Context);

  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(store.user.username);
  const [email, setEmail] = useState(store.user.email);
  const [newPassword, setNewPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [actualPassword, setActualPassword] = useState(store.password);


  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleEdit = () => {
    //console.log(store.user.userid);

    if (!isEditing) {
      setNewPassword(actualPassword);
    }
    setIsEditing((prev) => !prev);
  };


  const handleSubmit= (e) => {
    console.log("handleSubmit triggered");
    e.preventDefault();

    //try {
      // Set up your payload
      const payload = {
        id: store.user.userid,
        email: email,
        username: username
      };
      
      
      // Send the PUT request
      const response = ApiService.put(
        'user/edit', 
        payload, 
        {
            "Authorization": "Bearer " + store.user.token
        }
      );
      console.log("Token:", store.user.token);
      console.log("Payload:", payload);
      if (response.status === 200) {
        dispatch({
          type: SIGNEDUSER,
          payload: {
            response: {
              ...store.user, 
              name: username, 
              email: email
            }
          }
        });
      }
      else {
        console.error(`Error updating profile: ${response.status}`);
      }
    //} catch (error) {
    //   console.error(`Failed to update profile: ${error.message}`);
    //1 + 6 / 3 + 3 
    // }

    setNewPassword('');
    setIsEditing(false);
  };

  
  return (
    <>
      <HeadingSettings>
        <h3>Profile Settings</h3>
        <ViewDetailsLink onClick={toggleEdit}>
          Edit
          <Space />
        </ViewDetailsLink>
      </HeadingSettings>
      <ProfileSettingsContainer>
        <Avatar>
          <ProfilePic size={85} />
        </Avatar>
        <ProfileInfo>
          <InfoItem>
            <InfoLabel>Username</InfoLabel>
            {isEditing ?
              <Input type="text" value={username} onChange={(e) => setUsername(e.target.value)} /> :
              <InfoData>{store.user.username}</InfoData>
            }
          </InfoItem>
          <InfoItem>
            <InfoLabel>Email</InfoLabel>
            {isEditing ?
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /> :
              <InfoData>{store.user.email}</InfoData>
            }
          </InfoItem>
        </ProfileInfo>
        {isEditing && <Button onClick={(e) => handleSubmit(e)}>Save Changes</Button>}
      </ProfileSettingsContainer>
    </>
  );
};

export const Avatar = styled.div`
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfilePic = styled(FaUserCircle)`
  color: ${props => props.theme.componentBackground};
`


const HeadingSettings = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 30px;
`;

const Space = styled(FaPen)`
   margin-left: 6px;
`

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  width: 100%;
`;

const InfoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
  border-bottom: 1px solid ${props => props.theme.line};

  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  font-weight: 500;
  color: ${props => props.theme.text};
  height: 46px;
  display: flex;
  align-items: center;
`;

const InfoData = styled.span`
  font-weight: 300;
  color: ${props => props.theme.text2};
`

const ProfileSettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 35px;
  background-color: ${props => props.theme.componentBackground};
  width: 100%;
  height: 100%;
`;



const Input = styled.input`
  padding: 10px;
  border: 1px solid ${props => props.theme.nav};;
  border-radius: 4px;
  text-align: right;
  font-size: 16px;
  background-color: ${props => props.theme.nav};
  outline: none;
  transition: border-color 0.3s ease;
  color: ${props => props.theme.text};

  &:focus{
    border-color: #949494;
  }
`;

const Button = styled.button`
  padding: 10px 20px;
    margin: 25px auto;
    width: 150px;
    background-color: #E16A32;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: 0.1s all ease-out;

  &:hover {
    background-color: #8c3c17;
  }
`;


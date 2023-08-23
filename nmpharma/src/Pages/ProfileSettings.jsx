import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { FaPen, FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import { ViewDetailsLink } from '../Components/Table';
import { Context, SIGNEDUSER } from '../providers/provider';

export const ProfileSettings = () => {

  const [store, dispatch] = useContext(Context);
 
  const [isEditing, setIsEditing] = useState(false);
  const [username, setUsername] = useState(store.name); 
  const [email, setEmail] = useState(store.email); 
  const [newPassword, setNewPassword] = useState('');
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [actualPassword, setActualPassword] = useState(store.password);  


  const togglePasswordVisibility = () => {
      setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleEdit = () => {

      if(!isEditing) {
          setNewPassword(actualPassword);
      }
      setIsEditing(!isEditing);
  };
  

  //Dodělat
  const handleSubmit = (e) => {
    e.preventDefault();
    setActualPassword(newPassword);
    dispatch({
        type: "SIGNEDUSER",
        payload: {
            user: store.user,   
            token: store.token,
            name: username, 
            email: email,
            password: actualPassword
        }
    });

    setNewPassword(''); 
    setIsEditing(false);
    console.log("Profile settings updated!");
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
        <ProfilePic>
          <FaUser size="50" />
        </ProfilePic>
        <ProfileInfo>
          <InfoItem>
            <InfoLabel>Username</InfoLabel>
            {isEditing ?
              <Input type="text" value={store.user.username} onChange={(e) => setUsername(e.target.value)} /> :
              <InfoData>{store.user.username}</InfoData>
            }
          </InfoItem>
          <InfoItem>
            <InfoLabel>Email</InfoLabel>
            {isEditing ?
              <Input type="email" value={store.user.email} onChange={(e) => setEmail(e.target.value)} /> :
              <InfoData>{store.user.email}</InfoData>
            }
          </InfoItem>
        </ProfileInfo>
        {isEditing && <Button onClick={handleSubmit}>Save Changes</Button>}
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
  border-bottom: 1px solid #e0e0e0;

  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  font-weight: 500;
  color: #333;
  height: 46px;
  display: flex;
  align-items: center;
`;

const InfoData = styled.span`
  font-weight: 300;
  color: #555;
`

const ProfileSettingsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  padding: 35px;
  background-color: #ffffff;
  width: 100%;
  height: 100%;
`;

const ProfilePic = styled.div`
  position: relative;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: #e0e0e0;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #e9e9e9;
  border-radius: 4px;
  text-align: right;
  font-size: 16px;
  background: #f7f8ff;
  outline: none;
  transition: border-color 0.3s ease;

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


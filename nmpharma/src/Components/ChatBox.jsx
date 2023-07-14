import React, { useState } from 'react';
import styled from 'styled-components';
import { IconLink } from '../Pages/Pharmacies';
import { FaCirclePlus } from 'react-icons/fa6';

const ChatBox = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      const newMessage = {
        id: new Date().getTime(),
        userName: 'Nigel Schembri',
        message: inputValue,
      };

      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <ChatBoxWrapper>
      <BoxChat>
        <ChatInput
          type="text"
          placeholder="Leave a message here..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} // Přidáme tuto událost
        />
        <IconLink onClick={handleSendMessage}>
          <FaCirclePlus/>
        </IconLink>
      </BoxChat>
      {messages.map((message) => (
        <MessageContainer key={message.id}>
          <MessageHeader>
            <AvatarDiv>
              <Avatar />
              <UserName>{message.userName}</UserName>
            </AvatarDiv>
            <MessageText>{message.message}</MessageText>
          </MessageHeader>
        </MessageContainer>
      ))}
    </ChatBoxWrapper>
  );
};



const BoxChat = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px;
`;

const ChatBoxWrapper = styled.div`
  width: auto;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-right: 16px;
  margin-bottom: 40px;
  margin-top: 20px;
  background: #fff;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid #ccc; 
  padding: 15px 0; 
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  width: 30px;
  height: 30px;
  min-width: 30px;
  min-height: 30px;
  border-radius: 50%;
  background-color: #ccc;
  margin-right: 8px;
`;

const UserName = styled.span`
  font-size: 14px;
  font-weight: bold;
  margin-right: 1em;
`;

const MessageText = styled.span`
  font-size: 12px;
  font-weight: bold;
  outline: none;

  
`;

const ChatInput = styled.input`
  padding: 8px;
  border: none;
  font-size: 14px;
  width: 100%;

  &:focus {
    border-color: #fff;
    outline: none;

  }
`;

// const ChatButton = styled.button`
//   padding: 8px 16px;
//   background-color: #E16A32;
//   border: none;
//   font-size: 14px;
//   cursor: pointer;
//   color: #fff;
// `;

const AvatarDiv = styled.div`
    display: flex;
    align-items: center;
`;



export default ChatBox;

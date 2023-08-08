import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import { FaCirclePlus } from 'react-icons/fa6';
import { BsPersonCircle } from "react-icons/bs";
import { IconLink } from '../Pages/Pharmacies';
import { Context, NOTES } from '../providers/provider'; 

const ChatBox = () => {
  // Získání stavu a dispečera z globálního kontextu
  const [store, dispatch] = useContext(Context);

  // Získání zpráv ze stavu, nebo použití prázdného pole
  const messages = store.messages || [];

  // Stav pro uchování textu nové zprávy
  const [inputValue, setInputValue] = useState('');

  // Efekt, který se spustí při změně stavu store (tzn. načtení nebo změna stavu)
  useEffect(() => {
    // Pokud jsou zprávy v store, vymaž text nové zprávy
    if (store && store.messages) {
      setInputValue('');
    }
  }, [store]); // Efekt se spustí při změně store

  // Funkce pro změnu hodnoty inputValue při změně vstupního pole
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // Funkce pro odeslání zprávy
  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      const newMessage = {
        id: new Date().getTime(),
        userName: 'Nigel Schembri',
        message: inputValue,
      };

      // Vytvoření aktualizovaného pole zpráv s novou zprávou
      const updatedMessages = [...messages, newMessage];

      // Aktualizace stavu v globálním kontextu pomocí dispečera
      dispatch({ type: NOTES, payload: { messages: updatedMessages } });

      // Vymazání textu nové zprávy
      setInputValue('');
    }
  };

  // Funkce pro odeslání zprávy při stisknutí klávesy Enter
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage();
    }
  };

  // Funkce pro odstranění zprávy
  const handleRemoveMessage = (id) => {
    // Filtrace zpráv - odstranění zprávy s daným id
    const updatedMessages = messages.filter((message) => message.id !== id);

    // Aktualizace stavu v globálním kontextu pomocí dispečera
    dispatch({ type: NOTES, payload: { messages: updatedMessages } });
  };

  // Vykreslení komponenty ChatBox
  return (
    <ChatBoxWrapper>
      <BoxChat>
        <ChatInput
          type="text"
          placeholder="Leave a message here..."
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <IconLink onClick={handleSendMessage}>
          <FaCirclePlus />
        </IconLink>
      </BoxChat>
      {messages.map((message) => (
        <MessageContainer key={message.id}>
          <MessageHeader>
            <AvatarDiv>
              <Avatar>
                <UserLogo />
              </Avatar>
              <UserName>{message.userName}</UserName>
            </AvatarDiv>
            <MessageText>{message.message}</MessageText>
            <RemoveIcon onClick={() => handleRemoveMessage(message.id)}>
              <FaTimes />
            </RemoveIcon>
          </MessageHeader>
        </MessageContainer>
      ))}
    </ChatBoxWrapper>
  );
};

const UserLogo = styled(BsPersonCircle)`
  font-size: 2rem;
`;

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
  margin-bottom: 40px;
  margin-top: 20px;
  background: #fff;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 20em;
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
`;

const Avatar = styled.div`
  width: 30px;
  height: 30px;
  min-width: 30px;
  min-height: 30px;
  border-radius: 50%;
  background-color: #fff;
  margin-right: 1em;
`;

const UserName = styled.span`
  font-size: 14px;
  font-weight: bold;
  margin-right: 1em;
`;

const MessageText = styled.span`
  font-size: 12px;
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

const RemoveIcon = styled(FaTimes)`
  color: #4f4f4f;
  margin-left: auto;
  cursor: pointer;
`;

const AvatarDiv = styled.div`
  display: flex;
  align-items: center;
`;

export default ChatBox;

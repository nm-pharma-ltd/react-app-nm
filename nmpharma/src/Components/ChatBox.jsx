import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { BsPersonCircle } from "react-icons/bs";
import { IconLink } from "../Pages/Pharmacies";
import ApiService from "../api/ApiService";
import { Context, SIGNEDUSER} from "../providers/provider";

const ChatBox = () => {
  const [store, dispatch] = useContext(Context);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([])

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const fetchComms = async () => {
      const fetchedData = await ApiService.get("comments"); // Získání aktualizovaných zpráv ze serveru
      setMessages(fetchedData);
  }

  const handleSendMessage = async () => {
    if (inputValue.trim() !== "") {
      const newMessage = {
        userId: store.user.userid,
        content: inputValue,
      };

      try {
        // Odeslat novou zprávu na server
        await ApiService.post("comments", newMessage);

        await fetchComms();

        // Vymazat text nové zprávy
        setInputValue("");
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleRemoveMessage = async (id) => {
    try {
      // Odstranit zprávu z DB
      await ApiService.delete(`comments/${id}`);

      // Načíst aktualizované zprávy ze serveru
      await fetchComms()

    } catch (error) {
      console.error("Error:", error);
    }
  };
  
  useEffect( () => {
     fetchComms()
  },[])
  


  return (
    <ChatBoxWrapper>
      <BoxChat>
        <ChatInput
          type="text"  
          placeholder="Leave a message here..."
          value={inputValue}
          onChange={(e) => handleInputChange(e)}
          onKeyDown={(e) => handleKeyDown(e)}
        />
        <IconLink onClick={() => handleSendMessage()}>
          <FaCirclePlus />
        </IconLink>
      </BoxChat>
      {messages.map((message) => (
        <MessageContainer key={message.commentid}>
          <MessageHeader>
            <AvatarDiv>
              <Avatar>
                <UserLogo />
              </Avatar>
              <UserName>{message.username}</UserName>
            </AvatarDiv>
            <MessageText>{message.content}</MessageText>
            <RemoveIcon onClick={() => handleRemoveMessage(message.commentid)}>
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
  border-radius: 20px;
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

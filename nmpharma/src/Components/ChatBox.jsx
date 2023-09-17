import { useContext, useState, useEffect } from "react";
import styled from "styled-components";
import { FaTimes, FaUserCircle } from "react-icons/fa";
import { FaCirclePlus } from "react-icons/fa6";
import { BsPersonCircle } from "react-icons/bs";
import { IconLink } from "../Pages/Pharmacies";
import ApiService from "../api/ApiService";
import { Context, SIGNEDUSER } from "../providers/provider";

const ChatBox = ({content}) => {
  const [store, dispatch] = useContext(Context);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState([]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };


  const fetchComms = async () => {
    try {
      let endpoint = "comments";

      // Pokud je content roven "basic", použijeme standardní endpoint
      if (content !== "basic") {
        endpoint = `comments/product/${content}`;
      }

      const fetchedData = await ApiService.get(endpoint, {
        Authorization: "Bearer " + store.user.token,
      });

      setMessages(fetchedData);
    } catch (error) {
      console.error("Error:", error);
    }
    
  };

  const handleTokenCommand = () => {
    if (inputValue.trim() === "/token") {
      console.log(store.user.token);
      setInputValue("");
    }
  };

  const handleSendMessage = async () => {
    if (inputValue.trim() !== "") {
      if (inputValue.trim() !== "/token") {
        const newMessage = {
          userId: store.user.userid,
          content: inputValue,
        };

        try {
          // Odeslat novou zprávu na server
          await ApiService.post("comments", newMessage, {
            Authorization: "Bearer " + store.user.token,
          });

          await fetchComms();

          // Vymazat text nové zprávy
          setInputValue("");
        } catch (error) {
          console.error("Error:", error);
        }
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (inputValue.trim() !== "/token") {
        handleSendMessage();
      }
      handleTokenCommand();
    }
  };

  const handleRemoveMessage = async (id, messageAuthor) => {
    // Prověřit, zda je aktuální uživatel autorem komentáře
    if (store.user.username === messageAuthor) {
      try {
        // Odstranit zprávu z DB
        await ApiService.delete(`comments/${id}`, {
          Authorization: "Bearer " + store.user.token,
        });

        // Načíst aktualizované zprávy ze serveru
        await fetchComms();
      } catch (error) {
        console.error("Error:", error);
      }
    } else {
      console.error("Nemáte oprávnění odstranit tento komentář.");
    }
  };

  useEffect(() => {
    fetchComms();
  }, []);

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
                <UserLogo size={40} />
              </Avatar>
              <UserName>{message.username}</UserName>
            </AvatarDiv>
            <MessageText>{message.content}</MessageText>
            {store.user.username === message.username && ( // Přidáno porovnání s aktuálním uživatelem z kontextu
              <RemoveIcon
                onClick={() =>
                  handleRemoveMessage(message.commentid, message.username)
                }
              >
                <FaTimes />
              </RemoveIcon>
            )}
          </MessageHeader>
        </MessageContainer>
      ))}
    </ChatBoxWrapper>
  );
};

const UserLogo = styled(FaUserCircle)`
  color: ${(props) => props.theme.componentBackground};
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
  background: ${(props) => props.theme.componentBackground};
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  max-height: 20em;
`;

const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  border-top: 1px solid ${(props) => props.theme.line};
  padding: 15px 0;
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  min-width: 40px;
  min-height: 40px;
  border-radius: 100%;
  background-color: #aaaaaa;
  display: flex;
  justify-content: center;
  align-items: center;
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
  background-color: ${(props) => props.theme.componentBackground};

  color: ${(props) => props.theme.text};
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

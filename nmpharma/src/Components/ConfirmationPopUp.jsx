import React from "react";
import styled from 'styled-components';

const ConfirmationPopup = ({ onClose, onConfirm }) => {

    return (
        <PopupContainer>
            <PopupContent>
                <PopTitle>Confirmation</PopTitle>
                <p>Are you sure you want to delete your profile?</p>
                <ButtonContainer>
                    <ButtonD onClick={onConfirm}>Yes, Delete</ButtonD>
                    <ButtonC onClick={onClose}>Cancel</ButtonC>
                </ButtonContainer>
            </PopupContent>
        </PopupContainer>
    );
};

const PopupContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
    transition: all 0.25s ease-in-out;
  `;

const PopupContent = styled.div`
    background-color: ${props =>props.theme.componentBackground};
    border-radius: 20px;
    padding: 20px;
    width: 500px;
    display: flex;
    flex-direction: column;
  `;

const PopTitle = styled.h3`
    margin-bottom: 20px;
    display: flex;
  `;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
  `;

const ButtonD = styled.button`
    padding: 10px 20px;
    margin-left: 10px;
    border: none;
    border-radius: 5px;
    background-color: #d51d1d;
    color: #fff;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  
    &:hover {
      background-color: #721010;
    }
  `;
const ButtonC = styled.button`
    padding: 10px 20px;
    margin-left: 10px;
    border: 3px solid #737373;
    border-radius: 5px;
    color: #5e5e5e;
    cursor: pointer;
    font-weight: 500;
    background-color: #ffffff;
    transition: all 0.2s ease-in-out;

&:hover {
  color: #fff;
  background-color: #737373; 
}
`;

export default ConfirmationPopup;

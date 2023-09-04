import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate hook
import styled, { ThemeContext } from 'styled-components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LogoBlack from '../img/Logo2.png';
import LogoWhite from '../img/Logo1.png';
import ApiService from '../api/ApiService';
import { Subtitle, Title } from './Login';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordAgain, setPasswordAgain] = useState('');
  const [feedback, setFeedback] = useState("");


  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== passwordAgain) {
      setFeedback('Passwords do not match!');
      return;
    }

    const userData = {
      email: email,
      username: name,
      password: password
    };

    try {
      await ApiService.post('auth/register', userData);
      navigate('/Login'); // if we reach this line, it means API request was successful, so navigate to Login
    } catch {
      setFeedback('An error occurred. Please try again.');
    }
  };

  const theme = useContext(ThemeContext);
  const logoSrc = theme.mode === 'dark' ? LogoWhite : LogoBlack;


  return (
    <Container>
      <LoginForm>
        <Logo src={logoSrc} alt="Company Logo" />
        <Title>Register here</Title>
        <Subtitle>Enter your credentials here.</Subtitle>
        <InputLabel>
          Name
          <Input type="text" placeholder="Joe Doe" onChange={(e) => setName(e.target.value)} />
        </InputLabel>
        <InputLabel>
          Email
          <Input type="email" placeholder="example@wow.com" onChange={(e) => setEmail(e.target.value)} />
        </InputLabel>
        <InputLabel>
          Password
          <Input type={showPassword ? 'text' : 'password'} placeholder="Strong password" onChange={(e) => setPassword(e.target.value)} />
          <EyeIcon onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </EyeIcon>
        </InputLabel>
        <InputLabel>
          Password again
          <Input type={showPassword ? 'text' : 'password'} placeholder="Type the same password as above" onChange={(e) => setPasswordAgain(e.target.value)} />
          <EyeIcon onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </EyeIcon>
        </InputLabel>
        {feedback && <FeedbackMessage>{feedback}</FeedbackMessage>}
        <Button onClick={(e) => handleRegister(e)}>Register</Button> {/* Update onClick handler */}
        <RegisterLink to="/Login" >Already have an account Login here</RegisterLink>
      </LoginForm>
    </Container>
  );
}


const FeedbackMessage = styled.p`
  color: red;
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
  font-size: 12px;
`;


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 95vh;
  overflow: hidden;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 40px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: ${props => props.theme.componentBackground};
  width: 420px;
  justify-content: center;
`;

const Logo = styled.img`
  margin-bottom: 20px;
  height: 70px;
`;

export const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
  font-size: 14px;
  color: ${props=> props.theme.text2};
  width: 100%;
  position: relative;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-top: 4px;
  border: 1px solid ${props => props.theme.line};
  background: ${props => props.theme.InputText};
  color: ${props => props.theme.text};
  border-radius: 4px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color:  ${props => props.theme.line};
  }
`;

const EyeIcon = styled.span`
  display: flex; /* Add this line */
  align-items: center; /* Add this line */
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #555;

  svg {
    width: 18px;
    height: 18px;
    margin-top: 24px;
  }

  &:hover {
    color: #222;
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #da552c;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
`;

const RegisterLink = styled(NavLink)`
  margin-top: 10px;
  font-size: 12px;
  color: #da552c; /* Change to the button color */
  text-decoration: none;

  &:hover {
    color: #222;
  }
`;

import React, { useContext, useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled, { ThemeContext, createGlobalStyle } from 'styled-components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LogoBlack from '../img/Logo2.png';
import LogoWhite from '../img/Logo1.png';
import ApiService from '../api/ApiService';
import { Context, SIGNEDUSER } from '../providers/provider';
import DangerAlert from '../Components/DangerAlert';

export default function Login() {

  const [store, dispatch] = useContext(Context);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState('');


  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault()
    setEmailError('');
    setPasswordError('');
    setErrorMessage('');

    if (email.trim() === '') {
      setEmailError('Please enter your email');
      return;
    }
    if (!validateEmail(email.trim())) {
      setEmailError('Please enter a valid email address');
      return;
    }
    if (password.trim() === '') {
      setPasswordError('Please enter your password');
      return;
    }
    setLoading(true); 

   
    try {
      const response = await ApiService.post('auth/login', {
        email: email.trim(),
        password: password.trim(),
      });
      setLoading(false); 
      dispatch({ type: SIGNEDUSER, payload: { response } });
       
      
      navigate('/pharmacies');
      

    } catch (error) {
      setLoading(false); 
      if (error.message.includes('net::ERR_CONNECTION')) {
        setErrorMessage('Failed to connect. Please check your network and try again.');
      }
       else if (error.response && error.response.data) {
        setEmailError(error.response.data.email || '');
        setPasswordError(error.response.data.password || '');
      }
      else {
        setErrorMessage('Failed to connect. Please check your network and try again.');
      }
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  const theme = useContext(ThemeContext);
  const logoSrc = theme.mode === 'dark' ? LogoWhite : LogoBlack;

  return (
    <Container>
      {errorMessage && <DangerAlert message={errorMessage} />}
      <GlobalStyle />
      <LoginForm ref={formRef}>
        <Logo src={logoSrc} alt="Company Logo" />
        <Title>Login to Dashboard Kit</Title>
        <Subtitle>Enter your email and password</Subtitle>
        <InputLabel>
          Email
          <Input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError('');
            }}
            className={emailError ? 'error' : ''}
          />
          {emailError && <ErrorLabel>{emailError}</ErrorLabel>}
        </InputLabel>
        <InputLabel>
          Password
          <EyeIconWrapper>
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError('');
              }}
              className={passwordError ? 'error' : ''}
            />
            <EyeIcon onClick={togglePasswordVisibility}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </EyeIcon>
          </EyeIconWrapper>
          {passwordError && <ErrorLabel>{passwordError}</ErrorLabel>}
        </InputLabel>
        <Button onClick={handleLogin}>
          {loading ? <Spinner /> : "Login"}
        </Button>
        <RegisterLink to="/Register" >New user? Register here</RegisterLink>
      </LoginForm>
    </Container>
  );
}

const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid #fff;
  width: 24px;
  height: 24px;
  animation: spin 1s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const keyframes = `
  @keyframes spin {
    0% { transform: translate(-50%, -50%) rotate(0deg); }
    100% { transform: translate(-50%, -50%) rotate(360deg); }
  }
`;

const GlobalStyle = createGlobalStyle`
  ${keyframes}
`;

// Rest of the code...

const ErrorLabel = styled.p`
  color: red;
  font-size: 12px;
`;


const Container = styled.div`
 display: grid;
  place-items: center;
  height: 95vh;
  overflow-y: hidden !important; 
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: ${props => props.theme.componentBackground};
  min-height: 530px;
  width: 420px;
  justify-content: center;
`;

const Logo = styled.img`
  margin-bottom: 20px;
  height: 70px;
`;

export const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 24px;
  color: ${props => props.theme.FormH1};
`;

export const Subtitle = styled.p`
  margin: 0;
  margin-bottom: 20px;
  font-size: 14px;
  color: ${props => props.theme.menuHeading};
`;

const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
  font-size: 14px;
  color: ${props => props.theme.text2};
  width: 100%;
  position: relative;
`;

const Input = styled.input`
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
  &.error {
    border-color: red;
  }

`;

const EyeIconWrapper = styled.span`
  position: relative;
  width: 100%;
`;

const EyeIcon = styled.span`
  position: absolute;
  top: 60%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  color: #555;

  svg {
    width: 18px;
    height: 18px;
  }

  &:hover {
    color: #222;
  }
`;

const Button = styled.button`
  width: 100%;
  height: 45px;
  padding: 12px;
  background-color: #da552c;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s ease-in;
  position: relative;

  &:hover{
    background-color: #a53f20;
  }
`;

const RegisterLink = styled(NavLink)`
  margin-top: 15px;
  font-size: 12px;
  color: #da552c; /* Change to the button color */
  text-decoration: none;

  &:hover {
    color: #222;
  }
`;

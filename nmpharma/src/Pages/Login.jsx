import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LogoBlack from '../img/Logo2.png';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();
  const formRef = useRef(null);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = () => {
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
    // Perform login logic here
    // Assuming successful login, navigate to the dashboard
    navigate('/pharmacies');
  };

  const handleClickOutside = (event) => {
    if (formRef.current && !formRef.current.contains(event.target)) {
      setEmailError('Please fill in all the required fields');
      setPasswordError('Please fill in all the required fields');
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const validateEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  };

  return (
    <Container>
      <LoginForm ref={formRef}>
        <Logo src={LogoBlack} alt="Company Logo" />
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
        <Button onClick={handleLogin}>Login</Button>
        <RegisterLink to="/Register" >New user? Register here</RegisterLink>
      </LoginForm>
    </Container>
  );
}
// Rest of the code...

const ErrorLabel = styled.p`
  color: red;
  font-size: 12px;
`;


const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow-x: hidden;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
  border-radius: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: #fff;
  min-height: 530px;
  width: 420px;
  justify-content: center;
`;

const Logo = styled.img`
  margin-bottom: 20px;
  height: 70px;
`;

const Title = styled.h2`
  margin-top: 0;
  margin-bottom: 10px;
  font-size: 24px;
  color: #222;
`;

const Subtitle = styled.p`
  margin: 0;
  margin-bottom: 20px;
  font-size: 14px;
  color: #555;
`;

const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-bottom: 20px;
  font-size: 14px;
  color: #555;
  width: 100%;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 12px;
  margin-top: 4px;
  border: 1px solid #e9e9e9;

  &.error {
    border-color: red;
  }

  border-radius: 4px;
  font-size: 14px;
  background: #f7f8ff;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #949494;
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
  padding: 12px;
  background-color: #da552c;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 14px;
  cursor: pointer;
  transition: 0.3s ease-in;

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

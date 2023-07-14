import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate hook
import styled from 'styled-components';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import LogoBlack from '../img/Logo2.png';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate hook

  
  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = () => {
    // Perform login logic here
    // Assuming successful login, navigate to the dashboard
    navigate('/pharmacies'); // Navigate to the dashboard page
  };

  return (
    <Container>
      <LoginForm>
        <Logo src={LogoBlack} alt="Company Logo" />
        <Title>Register here</Title>
        <Subtitle>Enter your credentials here.</Subtitle>
        <InputLabel>
          Name
          <Input type="text" placeholder="Joe Doe" />
        </InputLabel>
        <InputLabel>
          Email
          <Input type="email" placeholder="example@wow.com" />
        </InputLabel>
        <InputLabel>
          Password
          <Input type={showPassword ? 'text' : 'password'} placeholder="Strong password" />
          <EyeIcon onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </EyeIcon>
        </InputLabel>
        <InputLabel>
          Password again
          <Input type={showPassword ? 'text' : 'password'} placeholder="Type the same password as above" />
          <EyeIcon onClick={togglePasswordVisibility}>
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </EyeIcon>
        </InputLabel>
        <Button onClick={handleLogin}>Register</Button> {/* Update onClick handler */}
        <RegisterLink to="/Login" >Already have an account Login here</RegisterLink>
      </LoginForm>
    </Container>
  );
}

// Rest of the code...


// Rest of the code...

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
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: #fff;
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
  border-radius: 4px;
  font-size: 14px;
  background: #f7f8ff;
  outline: none;
  transition: border-color 0.3s ease;

  &:focus {
    border-color: #949494;
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

import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { google } from '../assets';

export const Login = () => {
  const navigate = useNavigate();

  const loginClick = () => {
    window.open(`https://stag-entry-casper-recruitment.xquare.app/api/google/auth`, '_blank');
  };

  return (
    <LoginContainer>
      <LoginCard>
        <Title>로그인</Title>
        <GoogleButton onClick={loginClick}>
          <GoogleIcon src={google} alt="google" />
          google로 로그인하기
        </GoogleButton>
        <NavDivider>
          <NavLinks>
            <NavLink onClick={() => navigate('/')}>홈</NavLink>
            <Separator>|</Separator>
            <NavLink onClick={() => navigate('/login-admin')}>
              관리자 로그인
            </NavLink>
          </NavLinks>
        </NavDivider>
      </LoginCard>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;

  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
`;

const LoginCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 40px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 90%;
  max-width: 400px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 29px;
  margin-bottom: 30px;
  font-weight: bold;
`;

const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #ddd;
  border-radius: 10px;
  background-color: white;
  cursor: pointer;
  font-size: 19px;
  transition: background-color 0.2s;
  font-weight: bold;

  &:hover {
    background-color: #f8f8f8;
  }
`;

const GoogleIcon = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const NavDivider = styled.div`
  display: flex;
  align-items: center;
  margin: 20px 0;
  color: #777;
  font-size: 17px;

  &::before,
  &::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid #eee;
  }

  &::before {
    margin-right: 10px;
  }

  &::after {
    margin-left: 10px;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  color: #666;
  font-size: 15px;
`;

const NavLink = styled.span`
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Separator = styled.span`
  margin: 0 8px;
`;

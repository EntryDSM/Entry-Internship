import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { EntryLogo } from './assets';
import { useLocation, useNavigate } from 'react-router-dom';
import { SideBarBtnIcon } from './assets/icons/SideBarBtnIcon';
import { useEffect, useState } from 'react';
import { logoutApi } from '../../../apps/entry-user/src/apis/logoutApi';
import { useCookies } from 'react-cookie';

interface IHeaderType {
  isAdmin?: boolean;
}

type INavType = {
  children?: string;
  isPath?: boolean;
  onClick?: () => void;
  isAdmin?: boolean;
};

const Nav = ({ children, isPath, isAdmin, onClick }: INavType) => {
  return (
    <div>
      <NavContentContainer onClick={onClick}>
        <NavContent isPath={isPath}>{children}</NavContent>
        <NavLine isPath={isPath} isAdmin={isAdmin} />
      </NavContentContainer>
    </div>
  );
};

export const AdminHeader = () => {
  const navigate = useNavigate();
  const navData = [
    {
      name: '전형 일정 수정',
      path: '/admission/schedule/edit',
    },
    {
      name: '접수현황',
      path: '/admin/admission/status',
    },
    {
      name: '지원자 목록',
      path: '/admission/applicants',
    },
  ];

  const { pathname } = useLocation();

  const navClick = (path: string) => {
    navigate(path);
  };

  return (
    <HeaderContainer>
      <NavAllContainer>
        <LogoContainer onClick={() => navigate('/')}>
          <EntryLogo isAdmin={true} />
          <HeaderLogoTitle>EntryCareers Admin</HeaderLogoTitle>
        </LogoContainer>
        <NavContainer>
          {navData.map((data) => (
            <Nav
              key={data.path}
              isPath={pathname === data.path}
              onClick={() => navClick(data.path)}
              isAdmin={true}
            >
              {data.name}
            </Nav>
          ))}
        </NavContainer>
      </NavAllContainer>
      <ButtonContainer>
        <Button
          color={colors.gray[50]}
          backgroundColor={colors.green[500]}
          backgroundHoverColor={colors.green[700]}
        >
          로그아웃
        </Button>
        <Button
          color={colors.gray[900]}
          backgroundColor={'transparent'}
          backgroundHoverColor={colors.gray[100]}
        >
          메인으로
        </Button>
      </ButtonContainer>
    </HeaderContainer>
  );
};

export const CommonHeader = ({ isAdmin }: IHeaderType) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken === '') setIsLogin(false);
    else setIsLogin(true);
  }, []);

  const navigate = useNavigate();
  const navData = [
    {
      name: '지원하기',
      path: '/post',
    },
  ];

  const { pathname } = useLocation();

  const navClick = (path: string) => {
    navigate(path);
    if (isSideClick === true) sideClick(!isSideClick);
  };

  const [isSideClick, setIsSideClick] = useState<boolean>(false);
  const sideClick = () => {
    setIsSideClick(!isSideClick);
  };

  const loginClick = () => {
    navigate('/login-user');
  };

  const [cookies] = useCookies(['accessToken']);
  const apiLogout = logoutApi();
  const logoutClick = () => {
    console.log('logout');
    apiLogout.mutate();
    //로그아웃하는 api
  };

  useEffect(() => {
    const accessToken = cookies.accessToken; //쿠키의 토큰 확인
    if (!accessToken) setIsLogin(false);
    else setIsLogin(true);
  }, [cookies.accessToken]);

  return (
    <HeaderContainer>
      <NavAllContainer>
        <SideBarBtnIcon onClick={sideClick} />
        {isSideClick && (
          <SideNavContainer>
            {navData.map((data) => (
              <SideNavContent
                key={data.path}
                isPath={pathname.includes(data.path)}
                onClick={() => navClick(data.path)}
              >
                {data.name}
              </SideNavContent>
            ))}
          </SideNavContainer>
        )}
        <LogoContainer onClick={() => navigate('/')}>
          <EntryLogo isAdmin={isAdmin} />
          <HeaderLogoTitle>EntryCareers</HeaderLogoTitle>
        </LogoContainer>
        <ButtonContainer>
          {isLogin && (
            <NavContainer>
              {navData.map((data) => (
                <Nav
                  key={data.path}
                  isPath={pathname.includes(data.path)}
                  onClick={() => navClick(data.path)}
                  isAdmin={isAdmin}
                >
                  {data.name}
                </Nav>
              ))}
            </NavContainer>
          )}
          <Button
            color={colors.gray[50]}
            backgroundColor={isAdmin ? colors.green[500] : colors.orange[500]}
            backgroundHoverColor={
              isAdmin ? colors.green[700] : colors.orange[700]
            }
            onClick={isLogin ? logoutClick : loginClick}
          >
            {isLogin ? '로그아웃' : '로그인'}
          </Button>
        </ButtonContainer>
      </NavAllContainer>
    </HeaderContainer>
  );
};

const SideNavContainer = styled.nav`
  transition: 0.6s ease-in;
  width: 100vw;
  height: auto;
  position: absolute;
  top: 64px;
  left: 0;
`;

const SideNavContent = styled.nav`
  transition: 0.6s ease-in;
  width: 100%;
  height: 52px;
  background-color: ${colors.extra.white};
  padding-left: 20px;
  display: flex;
  align-items: center;
  &:hover {
    background-color: ${colors.gray[50]};
  }
`;

const HeaderContainer = styled.header`
  width: 100vw;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  background-color: ${colors.extra.white};
`;

const NavAllContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 100px;
`;

const ButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const Button = styled.button<{
  backgroundColor: string;
  color: string;
  backgroundHoverColor: string;
}>`
  cursor: pointer;
  outline: none;
  transition: 0.3s ease-in;
  border: none;
  padding: 8px 12px;
  border-radius: 8px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  color: ${({ color }) => color};
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  font-weight: 500;
  &:hover {
    background-color: ${({ backgroundHoverColor }) => backgroundHoverColor};
  }
`;

const NavContent = styled.nav<{ isPath: boolean }>`
  transition: 0.2s ease-in;
  font-size: 16px;
  font-weight: 400;
  color: ${({ isPath }) => (isPath ? colors.gray[600] : colors.gray[400])};
  &:hover {
    color: ${colors.gray[600]};
    transform: translateY(-2px);
    transition: ease-in 0.2s;
  }
`;

const NavLine = styled.div<{ isPath: boolean; isAdmin: boolean }>`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 2px;
  border-radius: 1px;
  background-color: ${({ isPath, isAdmin }) => {
    if (!isPath) return 'transparent';
    return isAdmin ? colors.green[500] : colors.orange[500];
  }};
  transition: 0.2s ease-in;
  transform: scaleX(${({ isPath }) => (isPath ? 1 : 0)});
  transform-origin: left ${({ isPath }) => (isPath ? 'right' : 'left')};
`;

const NavContentContainer = styled.nav`
  width: fit-content;
  height: 28px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  align-items: center;
  cursor: pointer;
`;

const NavContainer = styled.nav`
  display: none;
  @media (min-width: 1062px) {
    display: flex;
    align-items: center;
    gap: 32px;
  }
`;

const HeaderLogoTitle = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: ${colors.gray[800]};
`;

const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

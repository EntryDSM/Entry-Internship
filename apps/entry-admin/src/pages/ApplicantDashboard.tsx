import styled from '@emotion/styled';
import { useParams, useNavigate } from 'react-router-dom';
import { useApplicantDetailsApi } from '../apis';

export const ApplicantDashboard = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const reportId = id ? parseInt(id, 10) : null;

  const { data: users, isLoading, isError } = useApplicantDetailsApi(reportId);

  if (isLoading) {
    return <LoadingMessage>로딩 중...</LoadingMessage>;
  }

  if (isError || !users) {
    return <ErrorMessage>지원자 정보를 불러올 수 없습니다.</ErrorMessage>;
  }

  return (
    <ApplicantDashboardAll>
      <ExitButton onClick={() => navigate(-1)}>나가기</ExitButton>
      <Dashboard>
        <HeaderPartContainer>
          <UserName>{users.applicationName}</UserName>
          <ClassNumber>{users.studentId}</ClassNumber>
          <UserInformation>
            <AbilityAll>{users.programmingExperience}</AbilityAll>
            <UserJob>{users.major}</UserJob>
          </UserInformation>
        </HeaderPartContainer>
        <MotivationContainer>{users.motivation}</MotivationContainer>
        <IntroduceContainer>{users.selfIntroduction}</IntroduceContainer>
      </Dashboard>
    </ApplicantDashboardAll>
  );
};

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 18px;
`;

const ErrorMessage = styled.div`
  text-align: center;
  font-size: 18px;
`;

const IntroduceContainer = styled.div`
  border: 1px solid #a1a0a0;
  height: 400px;
  padding: 4%;
  overflow-y: auto;
  margin-bottom: 20px;
  font-size: 16px;
  line-height: 1.5;

  @media (max-width: 1200px) {
    height: 350px;
    padding: 3.5%;
  }

  @media (max-width: 1024px) {
    height: 300px;
    padding: 3%;
    font-size: 15px;
  }

  @media (max-width: 768px) {
    height: 250px;
    padding: 2.5%;
    font-size: 14px;
  }

  @media (max-width: 480px) {
    height: 200px;
    padding: 2%;
    font-size: 13px;
    margin-bottom: 10px;
  }
`;

const MotivationContainer = styled(IntroduceContainer)`
  margin-bottom: 20px;

  @media (max-width: 480px) {
    margin-bottom: 10px;
  }
`;

const UserJob = styled.div`
  width: 125px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #33d37b;
  color: #fff;
  height: 30px;
  font-weight: bold;
  font-size: 11px;
  border-radius: 20px;
  margin-left: 10px;

  @media (max-width: 1024px) {
    width: 110px;
    height: 28px;
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 26px;
    font-size: 10px;
    margin-left: 0;
    margin-top: 5px;
  }

  @media (max-width: 480px) {
    width: 90px;
    height: 24px;
    font-size: 9px;
  }
`;

const AbilityAll = styled.div`
  width: 125px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #33d37b;
  color: #33d37b;
  height: 30px;
  font-weight: bold;
  font-size: 11px;
  border-radius: 20px;

  @media (max-width: 1024px) {
    width: 110px;
    height: 28px;
  }

  @media (max-width: 768px) {
    width: 100px;
    height: 26px;
    font-size: 10px;
  }

  @media (max-width: 480px) {
    width: 90px;
    height: 24px;
    font-size: 9px;
  }
`;

const UserInformation = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 2%;
  flex-grow: 1;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 5px;
    align-items: flex-start;
    padding: 10px 2%;
  }

  @media (max-width: 480px) {
    padding: 8px 2%;
  }
`;

const ClassNumber = styled.div`
  border-right: 1px solid #a1a0a0;
  height: 100%;
  width: 18%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 15px;

  @media (max-width: 1024px) {
    width: 16%;
    font-size: 14px;
  }

  @media (max-width: 768px) {
    width: auto;
    min-width: 80px;
    height: auto;
    padding: 10px;
    font-size: 13px;
    border-right: none;
    border-bottom: 1px solid #a1a0a0;
  }

  @media (max-width: 480px) {
    min-width: 70px;
    padding: 8px;
    font-size: 12px;
  }
`;

const UserName = styled(ClassNumber)`
  font-weight: bold;
`;

const HeaderPartContainer = styled.div`
  height: 55px;
  margin-top: 2%;
  margin-bottom: 20px;
  display: flex;
  border: 1px solid #a1a0a0;
  border-radius: 10px 10px 0 0;

  @media (max-width: 1024px) {
    height: 50px;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
    margin-bottom: 15px;
  }

  @media (max-width: 480px) {
    margin-top: 1%;
    margin-bottom: 10px;
  }
`;

const ExitButton = styled.button`
  width: 110px;
  height: 30px;
  color: #a1a0a0;
  border-radius: 10px;
  margin-left: auto;
  border: 1px solid #a1a0a0;
  margin-top: 5%;
  margin-right: 10%;
  margin-bottom: 10px;
  font-size: 11px;
  background-color: #fff;
  padding: 1%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #e9e7e7;
    color: #7e7e7e;
  }

  @media (max-width: 1024px) {
    width: 100px;
    height: 28px;
  }

  @media (max-width: 768px) {
    width: 90px;
    height: 26px;
    font-size: 10px;
    margin-right: 5%;
    margin-top: 3%;
  }

  @media (max-width: 480px) {
    width: 80px;
    height: 24px;
    font-size: 9px;
    margin-top: 2%;
  }
`;

const Dashboard = styled.div`
  margin: 0 10%;
  width: 80%;
  max-width: 1200px;

  @media (max-width: 1024px) {
    width: 85%;
  }

  @media (max-width: 768px) {
    margin: 0 5%;
    width: 90%;
  }

  @media (max-width: 480px) {
    width: 95%;
  }
`;

const ApplicantDashboardAll = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0;

  @media (max-width: 768px) {
    padding: 15px 0;
  }

  @media (max-width: 480px) {
    padding: 10px 0;
  }
`;

import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { Button, profilIcon } from '@entry/ui';
import { ReportInfo } from '@entry/types';

type ApplicantProps = Pick<
  ReportInfo,
  'reportId' | 'applicationName' | 'major' | 'programmingExperience'
>;

export const ApplicantList = ({
  reportId,
  applicationName,
  major,
}: ApplicantProps) => {
  const navigate = useNavigate();

  return (
    <ApplicantListContainer>
      <ProfilContainer>
        <ProfilImg src={profilIcon} />
        <UserInformation>
          <UserNameContainer>{applicationName}</UserNameContainer>
          <UserJobContainer>{major}</UserJobContainer>
        </UserInformation>
      </ProfilContainer>
      <CheckButtonWrapper>
        <Button
          children="확인하기"
          onClick={() => navigate(`/support/${reportId}`)}
        />
      </CheckButtonWrapper>
    </ApplicantListContainer>
  );
};

const UserJobContainer = styled.div`
  font-size: 13px;
  color: #a1a0a0;
`;

const UserNameContainer = styled.div`
  font-weight: bold;
  font-size: 14px;
`;

const CheckButtonWrapper = styled.div`
  button {
    width: 120px;
    height: 39px;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
  }

  button:hover {
    background-color: #38c278;
  }
`;

const UserInformation = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5%;
  justify-content: space-around;
`;

const ProfilImg = styled.img`
  width: 45px;
  height: 45px;
  object-fit: fill;
  border-radius: 50%;
`;

const ProfilContainer = styled.div`
  display: flex;
  width: 120px;
  gap: 5px;
`;

const ApplicantListContainer = styled.div`
  width: 80%;
  height: 65px;
  border-bottom: 1px solid #a1a0a0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1% 10px 1%;
`;

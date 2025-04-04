import styled from '@emotion/styled';
import { Button } from '@entry/ui';
import { useNavigate } from 'react-router-dom';

type PostType = {
  postName: string;
  keywords: string[];
};

export const PostList = ({ postName, keywords }: PostType) => {
  const navigate = useNavigate();

  return (
    <ApplicantListContainer>
      <ProfilContainer>
        <UserInformation>
          <UserNameContainer>{postName}</UserNameContainer>
          <UserJobContainer>
            {keywords.map((keyword, index) => (
              <KeywordItem key={index}>{keyword}</KeywordItem>
            ))}
          </UserJobContainer>
        </UserInformation>
      </ProfilContainer>
      <CheckButtonWrapper>
        <Button
          children="지원자 보기"
          isAdmin={true}
          onClick={() => navigate('/support-status')}
        />
      </CheckButtonWrapper>
    </ApplicantListContainer>
  );
};

const UserJobContainer = styled.div`
  display: flex;
  gap: 20px;
  font-size: 13px;
  color: #a1a0a0;
  margin-top: 2%;
`;

const KeywordItem = styled.div`
  white-space: nowrap;
`;

const UserNameContainer = styled.div`
  font-weight: bold;
  font-size: 14px;
  white-space: nowrap;
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

const ProfilContainer = styled.div`
  display: flex;
  width: 260px;
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

import { useNavigate, useParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { Button } from '@entry/ui';
import { TitleBanner, ApplyCond } from '../components';
import { useNoticeDetailQuery } from '../apis';

export const DetailPost = () => {
  const navigate = useNavigate();
  const { noticeId } = useParams();
  const noticeIdNumber = noticeId ? Number(noticeId) : 0;

  const { data: careerData, isLoading, isError } = useNoticeDetailQuery(noticeIdNumber);

  if (isLoading) {
    return <LoadingMessage>공고 정보를 불러오는 중입니다...</LoadingMessage>;
  }

  if (isError || !careerData) {
    return <ErrorMessage>공고 정보를 불러올 수 없습니다.</ErrorMessage>;
  }

  return (
    <DetailPostContainer>
      <TitleBanner />

      {/* 상세조회 */}
      <DetailContentContainer>
        <PostTitleContainer>
          <ListItemContent>{careerData.title}</ListItemContent>
          <ImportantList>
            {careerData.focusRecruit && <Focus>집중채용</Focus>}
            {careerData.important && <Important>중요</Important>}
            <FixToolsContainer>
              <Delete
                onClick={() => {
                  if (noticeIdNumber) {
                    navigate(`/admin/delete-notice/${noticeIdNumber}`);
                  }
                }}
              >
                삭제
              </Delete>
              <Edit
                onClick={() => {
                  if (noticeIdNumber) {
                    navigate(`/admin/edit-support/${noticeIdNumber}`);
                  }
                }}
              >
                수정
              </Edit>
            </FixToolsContainer>
          </ImportantList>
        </PostTitleContainer>
        <TechStack>
          {careerData.keyWord.map((tag, index) => (
            <TechTag key={index}>{tag}</TechTag>
          ))}
        </TechStack>
      </DetailContentContainer>
      <ClubInformation>
        {/* 지원서 조건들 */}
        <LeftContainer>
          {careerData.description.map((condition, index) => (
            <ApplyCond
              key={index}
              title={condition.title}
              content={condition.content}
            />
          ))}
        </LeftContainer>
        <RightContainer>
          <TitleImg src={careerData.titleImageUrl} alt="공고 이미지" />
          <ButtonWrapper>
            <Button
              isAdmin={true}
              children="지원자 보기"
              onClick={() => navigate(`/admin/support/${noticeIdNumber}`)}
            />
          </ButtonWrapper>
        </RightContainer>
      </ClubInformation>
    </DetailPostContainer>
  );
};

const ErrorMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: ${colors.extra.error};
`;

const LoadingMessage = styled.div`
  text-align: center;
  font-size: 18px;
  color: ${colors.gray[600]};
`;

const ButtonWrapper = styled.div`
  width: 420px;
  min-width: 300px;
  margin-top: 3%;

  button {
    font-size: 17px;
    cursor: pointer;
    height: 60px;
  }

  button:hover {
    background-color: #38c278;
  }
`;

const TitleImg = styled.img`
  width: 420px;
  min-width: 300px;
  height: auto;
`;

const RightContainer = styled.div`
  width: 100%;
  min-width: 400px;
  display: flex;
  flex-direction: column;

  img {
    border-radius: 20px;
  }
`;

const LeftContainer = styled.div`
  width: 100%;
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const ClubInformation = styled.div`
  margin: 0 15%;
  min-width: 1200px;
  margin-top: 65px;
  display: flex;
`;

const Edit = styled.div`
  &:hover {
    color: #2ac975;
  }
`;

const Delete = styled.div`
  &:hover {
    color: red;
  }
`;

const FixToolsContainer = styled.div`
  color: #a1a0a0;
  margin-left: 15%;
  font-size: 17px;
  display: flex;
  gap: 18px;
  cursor: pointer;
  min-width: 100px;
`;

const TechStack = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  width: 100%;
  margin-top: 10px;
`;

const TechTag = styled.div`
  color: ${colors.gray[400]};
  font-size: 15px;
  font-weight: 500;
`;

const Focus = styled.div`
  width: 60px;
  min-width: 60px;
  height: 22px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffc9c9;
  color: #ff6666;
  border-radius: 15px;
`;

const Important = styled.div`
  width: 60px;
  min-width: 60px;
  height: 22px;
  padding: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #9eaeff;
  color: #002fff;
  border-radius: 15px;
`;

const ImportantList = styled.div`
  display: flex;
  align-items: center;
  font-size: 11px;
  gap: 15px;
  font-weight: bold;
  margin-left: 25px;
`;

const ListItemContent = styled.div`
  font-size: 35px;
  font-weight: 500;
  color: ${colors.gray[600]};
  font-weight: bold;
  min-width: 300px;
`;

const PostTitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DetailContentContainer = styled.div`
  max-width: 1200px;
  margin: 0 15%;
  display: flex;
  flex-direction: column;
  margin-top: 130px;
`;

const DetailPostContainer = styled.div`
  width: 100vw;
  height: 86vh;
`;

import { useEffect, useState } from 'react';
import { colors } from '@entry/design-token';
import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import { ApplyConditions } from '@entry/types';
import { Button } from '@entry/ui';
import { ImgStore, ApplyCond } from '../components';
import { pizza } from '../assets';

export const DetailPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //해당 id에 대한 채용 공고 데이터 api 가져오기

  // 지원서 조건 api
  const [applyData, setApplyData] = useState<ApplyConditions>({
    title: '합류하게 될 전공을 알려드려요.',
    content:
      '피자 배달부는 프로그램의 백엔드를 담당하게 돼요.피자 배달부는 프로그램의 백엔드를 담당하게 돼요.피자 배달부는 프로그램의 백엔드를 담당하게 돼요.피자 배달부는 프로그램의 백엔드를 담당하게 돼요.피자 배달부는 프로그램의 백엔드를 담당하게 돼요.',
  });
  const { title, content } = applyData;

  // 지원하기 경로
  const moveToSupport = () => {
    navigate('/post/:id/application-writing');
  };

  return (
    <DetailPostContainer>
      <TitleContainer>
        <ImgStore name="TitleImg" width="100vw" height="300px" />
        <MentContainer>
          <Top>
            <LogoImg>
              <ImgStore name="LogoOrange" width="30px" />
            </LogoImg>
            <TopMent>
              <There>Entry</There>
              <DSM>DSM</DSM>
              <There>에서</There>
            </TopMent>
          </Top>
          <BottomMent>다음과 같은 인재들을 채용합니다.</BottomMent>
        </MentContainer>
      </TitleContainer>
      {/* 상세조회 */}
      <ContentContainer>
        <DetailContentContainer>
          <PostTitleContainer>
            <ListItemContent>피자 배달부 모집 ( 비정규직 )</ListItemContent>
            <ImportantList>
              <Focus>집중채용</Focus>
              <Important>중요</Important>
            </ImportantList>
          </PostTitleContainer>
          <TechStack>
            <TechTag>개발</TechTag>
            <TechTag>Go언어</TechTag>
            <TechTag>프론트엔드</TechTag>
          </TechStack>
        </DetailContentContainer>
        <ClubInformation>
          {/* 지원서 조건들 get */}
          <LeftContainer>
            <ApplyCond title={title} content={content} />
            <ApplyCond title={title} content={content} />
          </LeftContainer>
          {/* 타이틀 이미지, 지원자 보기(이동) */}
          <RightContainer>
            <TitleImg src={pizza}></TitleImg>
            <ButtonWrapper>
              <Button
                userType="user"
                children="지원하기"
                onClick={moveToSupport}
              />
            </ButtonWrapper>
          </RightContainer>
        </ClubInformation>
      </ContentContainer>
    </DetailPostContainer>
  );
};

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 80px;
  padding: 0px 50px 60px 50px;
`;

const ButtonWrapper = styled.div`
  width: 420px;
  min-width: 300px;

  button {
    font-size: 17px;
    cursor: pointer;
    height: 60px;
  }
`;

const TitleImg = styled.img`
  width: 420px;
  height: auto;
`;

const RightContainer = styled.div`
  width: fit-content;
  display: flex;
  gap: 32px;
  flex-direction: column;
`;

const LeftContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 80px;
`;

const ClubInformation = styled.div`
  width: 100%;
  display: flex;
  gap: 80px;
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
  color: ${colors.gray[500]};
  font-weight: bold;
  min-width: 300px;
`;

const PostTitleContainer = styled.div`
  display: flex;
  align-items: center;
`;

const DetailContentContainer = styled.div`
  width: 100%;
  gap: 16px;
  display: flex;
  flex-direction: column;
`;

const LogoImg = styled.div`
  margin-right: 10px;
  transform: translateY(5px);
`;

const BottomMent = styled.div`
  color: white;
  font-size: 30px;
  margin-top: 16px;
`;

const MentContainer = styled.div`
  position: absolute;
  top: 35%;
  left: 15%;
  z-index: 10;
  display: flex;
  flex-direction: column;
  font-weight: bold;
`;

const DSM = styled.div`
  font-size: 30px;
  color: ${colors.orange[500]};
  padding: 0 5px 0 0;
`;

const There = styled.div`
  color: white;
  font-size: 30px;
`;

const Top = styled.div`
  display: flex;
`;

const TopMent = styled.div`
  display: flex;
  align-items: center;
`;

const TitleContainer = styled.div`
  position: relative;
`;

const DetailPostContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 100px;
`;

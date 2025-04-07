import { useEffect, useState } from 'react';
import { colors } from '@entry/design-token';
import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import { ImgStore, ApplyCond } from '../components';
import { Button } from '@entry/ui';
import { postDetailApi } from '../apis';

export const DetailPost = () => {
  const [datas, setDatas] = useState<{
    noticeId: string;
    title: string;
    keyWord: string[];
    titleImageUrl: string;
    description: [{ title: string; content: string }];
    focusRecruit: boolean;
    important: boolean;
  }>({
    noticeId: '',
    title: '',
    keyWord: [],
    titleImageUrl: '',
    description: [],
    focusRecruit: false,
    important: false,
  });

  const navigate = useNavigate();
  const { id } = useParams();
  const noticeId = id ? parseInt(id) : null;

  const { data } = postDetailApi(noticeId);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (data) {
      setDatas(data);
      console.log('✅ dd:', data);
    }
  }, [data]);

  const moveToSupport = () => {
    navigate(`/post/${id}/application-writing`);
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

      <ContentContainer>
        <DetailContentContainer>
          <PostTitleContainer>
            <ListItemContent>{datas.title}</ListItemContent>
            <ImportantList>
              {datas.focusRecruit && <Focus>집중채용</Focus>}
              {datas.important && <Important>중요</Important>}
            </ImportantList>
          </PostTitleContainer>

          <TechStack>
            {datas.keyWord.map((data, index) => (
              <TechTag key={index}>{data}</TechTag>
            ))}
          </TechStack>
        </DetailContentContainer>

        <ClubInformation>
          <LeftContainer>
            {datas.description.map((data, index) => (
              <ApplyCond
                key={index}
                title={data.title}
                content={data.content}
              />
            ))}
          </LeftContainer>

          <RightContainer>
            <TitleImg src={datas.titleImageUrl} />
            <ButtonWrapper>
              <Button userType="user" onClick={moveToSupport}>
                지원하기
              </Button>
            </ButtonWrapper>
          </RightContainer>
        </ClubInformation>
      </ContentContainer>
    </DetailPostContainer>
  );
};

// 스타일 코드 유지

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

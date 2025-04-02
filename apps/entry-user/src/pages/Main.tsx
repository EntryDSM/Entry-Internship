import styled from '@emotion/styled';
import { mainBanner, mainIpad } from '@entry/ui';
import { colors } from '@entry/design-token';
import { useNavigate } from 'react-router-dom';

export const Main = () => {
  const navigate = useNavigate();
  const postNavClick = () => {
    navigate('/post');
  };
  return (
    <>
      <BannerImg src={mainBanner} />
      <FirstPageContainer>
        <BtnContainer>
          <TitleContainer>
            <Title>Entry에서는 좋은 인재를 찾고 있어요</Title>
            <KeyWord>EntryDSM</KeyWord>
          </TitleContainer>
          <Btn onClick={postNavClick}>지원하러 가기</Btn>
        </BtnContainer>
      </FirstPageContainer>
      <SecondPageContainer>
        <FirstTitleContainer>
          <FirstTitle>EntryCareers 에서는</FirstTitle>
          <SecondTitle isMain={false}>
            Entry <SecondTitle isMain={true}>인턴십</SecondTitle>을 지원할 수
            있어요.
          </SecondTitle>
          <SubTitle>
            Entry 인턴십에서는 프론트엔드와 백엔드 심화 멘토링을 받을 수 있어요!
          </SubTitle>
        </FirstTitleContainer>
        <IpadImg src={mainIpad} alt="ipad" />
      </SecondPageContainer>
      <ThirdPageContainer>
        <BtnContentContainer>
          <SecondTitleContainer>
            <FirstTitle>EntryDSM</FirstTitle>
            <SecondTitle isMain={false}>
              <SecondTitle isMain={true}>서비스</SecondTitle>가 궁금하시다면?
            </SecondTitle>
            <SubTitle>Entry 서비스를 이용해보세요!</SubTitle>
          </SecondTitleContainer>
          <Btn
            onClick={() => {
              window.open('https://www.entrydsm.hs.kr/', '_blank');
            }}
          >
            EntryDSM 바로가기
          </Btn>
        </BtnContentContainer>
      </ThirdPageContainer>
    </>
  );
};

const BtnContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 96px;
  align-items: center;
`;

const BtnAllContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const SecondPageContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  padding: 140px 100px;
`;

const ThirdPageContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.orange[50]};
`;

const IpadImg = styled.img`
  width: 900px;
  position: absolute;
  bottom: 12px;
  right: 12px;
  z-index: -1;
`;

const FirstTitle = styled.div`
  font-size: 36px;
  font-weight: 600;
  color: ${colors.gray[800]};
`;

const SecondTitle = styled.span<{ isMain: boolean }>`
  font-size: 44px;
  font-weight: 600;
  color: ${({ isMain }) => (isMain ? colors.orange[500] : colors.gray[800])};
`;

const SubTitle = styled.div`
  font-size: 24px;
  font-weight: 300;
  color: ${colors.gray[400]};
`;

const SecondTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

const FirstTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 80px;
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 42px;
`;

const FirstPageContainer = styled.div`
  position: relative;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const BannerImg = styled.img`
  height: 100vh;
  width: fit-content;
  position: absolute;
  top: 0;
  z-index: -1;
`;

const Title = styled.div`
  font-size: 60px;
  font-weight: 600;
  color: ${colors.gray[50]};
`;

const KeyWord = styled.div`
  width: 196px;
  height: 52px;
  border-radius: 26px;
  border: 0.5px solid ${colors.gray[100]};
  color: ${colors.gray[100]};
  font-size: 20px;
  font-weight: 400;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Btn = styled.button`
  width: fit-content;
  padding: 20px 100px;
  font-size: 24px;
  font-weight: 600;
  color: ${colors.gray[50]};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.orange[500]};
  border-radius: 20px;
  &:hover {
    background-color: ${colors.orange[600]};
    transition: 0.4s ease-in-out;
  }
`;

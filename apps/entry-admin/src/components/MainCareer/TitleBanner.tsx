import styled from '@emotion/styled';
import { colors } from '@entry/design-token';
import { TitleImgIcon } from '@entry/ui';
import { entryLogoIcon } from '../../assets';

export const TitleBanner = () => {
  return (
    <TitleContainer>
      <Img src={TitleImgIcon} />
      <MentContainer>
        <Top>
          <TopMent>
            <LogoImg src={entryLogoIcon} />
            <There>Entry</There>
            <DSM>DSM</DSM>
            <There>에서</There>
          </TopMent>
        </Top>
        <BottomMent>다음과 같은 인재들을 채용합니다.</BottomMent>
      </MentContainer>
    </TitleContainer>
  );
};

const Img = styled.img`
  margin-right: 18px;

  img {
    width: 100%;
    height: 100px;
  }
`;

const DSM = styled.div`
  font-size: 35px;
  color: ${colors.green[500]};
  padding: 0 5px 0 0;
`;

const There = styled.div`
  color: white;
  font-size: 35px;
`;

const Top = styled.div`
  display: flex;
`;

const TopMent = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  margin-right: 10px;
  transform: translateY(5px);
`;

const BottomMent = styled.div`
  color: white;
  font-size: 35px;
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

const TitleContainer = styled.div`
  position: relative;
`;

import styled from '@emotion/styled';
import { color } from '@entry/design-token';

type TitleType = {
  mainTitle?: string;
  subTitle?: string;
};

export const Title = ({ mainTitle, subTitle }: TitleType) => {
  return (
    <TitleContainer>
      <MainTitle>{mainTitle}</MainTitle>
      <SubTitle>{subTitle}</SubTitle>
    </TitleContainer>
  );
};

const MainTitle = styled.div`
  font-size: 48px;
  font-weight: 600;
  color: ${color.gray[900]};
`;

const SubTitle = styled.div`
  font-size: 16px;
  font-weight: 300;
  color: ${color.gray[400]};
`;

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  align-items: start;
`;

import styled from '@emotion/styled';
import { ApplyConditions } from '@entry/types';

export const ApplyCond = ({ title, content }: ApplyConditions) => {
  return (
    <ApplyCondContainer>
      <TitleAll>{title}</TitleAll>
      <ContentAll>{content}</ContentAll>
    </ApplyCondContainer>
  );
};

const TitleAll = styled.div`
  font-size: 20px;
  font-weight: 600;
  word-break: break-all;
  overflow-wrap: break-word;
`;

const ContentAll = styled.div`
  color: #4f4f4f;
  font-size: 19px;
`;

const ApplyCondContainer = styled.div`
  width: 550px;
  min-width: 400px;
  margin-bottom: 100px;
`;

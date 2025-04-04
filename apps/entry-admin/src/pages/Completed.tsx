import styled from '@emotion/styled';
import { CompleteContents } from '../components/complete';

export const Completed = () => {
  return (
    <CompletedContainer>
      <CompleteContents>작성이 완료 되었습니다!</CompleteContents>
    </CompletedContainer>
  );
};

const CompletedContainer = styled.div`
  width: 100vw;
  height: 86vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

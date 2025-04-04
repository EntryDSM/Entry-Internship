import { CompleteContents } from '../components';
import styled from '@emotion/styled';

export const Edited = () => {
  return (
    <CompletedContainer>
      <CompleteContents>수정이 완료 되었습니다!</CompleteContents>
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

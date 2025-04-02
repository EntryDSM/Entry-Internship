import styled from '@emotion/styled';
import { colors } from '@entry/design-token';

type KeyWordType = {
  children?: string;
  key?: number;
};

export const KeyWord = ({ children, key }: KeyWordType) => {
  return <KeywordContainer key={key}>{children}</KeywordContainer>;
};

const KeywordContainer = styled.div`
  height: 45px;
  border-radius: 23px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 13px 46px;
  border: 1px solid ${colors.green[500]};
  color: ${colors.green[500]};
`;

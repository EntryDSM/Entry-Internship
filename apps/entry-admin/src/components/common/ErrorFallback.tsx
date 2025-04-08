import React from 'react';
import styled from '@emotion/styled';

interface ErrorFallbackProps {
  error?: Error;
  resetErrorBoundary?: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ 
  error, 
  resetErrorBoundary 
}) => {
  return (
    <ErrorContainer>
      <ErrorContent>
        <ErrorTitle>오류가 발생했습니다</ErrorTitle>
        <ErrorMessage>
          {error?.message || '페이지를 표시하는 중 문제가 발생했습니다.'}
        </ErrorMessage>
        <ButtonContainer>
          <HomeButton href="/">홈으로 돌아가기</HomeButton>
          {resetErrorBoundary && (
            <RetryButton onClick={resetErrorBoundary}>다시 시도</RetryButton>
          )}
        </ButtonContainer>
      </ErrorContent>
    </ErrorContainer>
  );
};

const ErrorContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f8f9fa;
`;

const ErrorContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 2rem;
  max-width: 500px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const ErrorTitle = styled.h1`
  font-size: 1.75rem;
  margin-bottom: 1.25rem;
  color: #343a40;
`;

const ErrorMessage = styled.p`
  font-size: 1.125rem;
  margin-bottom: 1.5rem;
  color: #6c757d;
  line-height: 1.5;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 1rem;
`;

const Button = styled.a`
  padding: 0.625rem 1.25rem;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.2s;
`;

const HomeButton = styled(Button)`
  background-color: #0066cc;
  color: white;
  &:hover {
    background-color: #0056b3;
  }
`;

const RetryButton = styled(Button)`
  background-color: #e9ecef;
  color: #495057;
  &:hover {
    background-color: #dee2e6;
  }
`;

export default ErrorFallback;
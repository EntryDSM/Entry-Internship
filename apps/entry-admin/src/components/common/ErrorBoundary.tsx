import React, { Component } from 'react';
import ErrorFallback from './ErrorFallback';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <ErrorFallback error={this.state.error} resetErrorBoundary={() => this.setState({ hasError: false, error: null })} /> || (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            flexDirection: 'column',
            textAlign: 'center',
            padding: '20px',
          }}
        >
          <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>
            오류가 발생했습니다
          </h1>
          <p style={{ fontSize: '18px', marginBottom: '30px', color: '#666' }}>
            문제가 지속되면 관리자에게 문의하세요.
          </p>
          <a
            href="/"
            style={{
              padding: '10px 20px',
              backgroundColor: '#0066cc',
              color: 'white',
              borderRadius: '5px',
              textDecoration: 'none',
              fontSize: '16px',
            }}
          >
            홈으로 돌아가기
          </a>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
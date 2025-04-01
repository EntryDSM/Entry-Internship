import { Global, css } from '@emotion/react';

const style = css`
  @font-face {
    font-family: 'Pretendard-Regular';
    src: url('/fonts/Pretendard-Regular.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    border: 0;
    box-sizing: border-box;
    outline: unset;
    list-style: none;
    font-style: normal;
    font-family: 'Pretendard-Regular', sans-serif;
    text-decoration: none;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  body {
    overflow-x: hidden;
  }

  button {
    outline: none;
    border: none;
    &:active {
      outline: none;
      border: none;
    }
  }
`;

export const GlobalStyle = () => {
  return <Global styles={style} />;
};

import TitleImg from '../../assets/mainCarrers/TitleImg.svg';

type imgType = {
  name: string;
  width?: string;	
  height?: string;
};

type ImgDetail = {
  src: string;
  width: string;
  height: string;
};

export const ImgStore = ({
  name,
  width = '35px',
  height = '35px',
}: imgType) => {
  let Img: ImgDetail | null = null;

  switch (name) {
    case 'TitleImg':
      Img = { src: TitleImg, width, height };
      break;
    default:
      Img = null;
  }

  if (!Img) return null;

  return (
    <img
      src={Img.src}
      style={{
        width: Img.width,
        height: Img.height || 'auto',
        objectFit: 'cover',
        maxWidth: '100%',
      }}
      alt={name}
    />
  );
};

import Write from './write.svg';
import KebabMenu from './kebabMenu.svg';

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

export const IconStore = ({
  name,
  width = '35px',
  height = '35px',
}: imgType) => {
  let Img: ImgDetail | null = null;

  switch (name) {
    case 'Write':
      Img = { src: Write, width, height };
      break;
    case 'KebabMenu':
      Img = { src: KebabMenu, width, height };
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

import Lightbox from 'yet-another-react-lightbox';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';
import './lightbox-styles.css';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import { type RenderSlideProps } from 'yet-another-react-lightbox';
import NextJsImage from '../ui/nextjs-image';
import { TImage } from '@/lib/utils';
import { GetStrapiImage } from '@/lib/strapi-image';

type LightboxComponentProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  images: TImage[];
  zoom?: { maxZoomPixelRatio: number };
};

export const LightboxComponent = ({ isOpen, setIsOpen, images, zoom }: LightboxComponentProps) => {
  return (
    <>
      <Lightbox
        open={isOpen}
        close={() => setIsOpen(false)}
        slides={images.map(image => ({
          src: GetStrapiImage(image.url),
          alt: image.name || '',
        }))}
        render={{
          slide: ({ slide, offset, rect }: RenderSlideProps) => {
            return <NextJsImage slide={slide} offset={offset} rect={rect} />;
          },
        }}
        plugins={[Thumbnails, Zoom]}
        zoom={zoom || { maxZoomPixelRatio: 2 }}
        styles={{
          container: { zIndex: 999999, pointerEvents: 'auto' },
          root: { zIndex: 999999 },
          button: { zIndex: 1000000 },
        }}
      />
    </>
  );
};

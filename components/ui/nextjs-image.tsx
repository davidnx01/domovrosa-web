import Image from 'next/image';

import { isImageSlide } from 'yet-another-react-lightbox';

function isNextJsImage(slide: any) {
  return isImageSlide(slide);
}

export default function NextJsImage({ slide }: any) {
  if (!isNextJsImage(slide.src)) {
    return undefined;
  }

  return (
    <Image
      alt=""
      src={slide.src}
      loading="eager"
      draggable={false}
      height={0}
      width={0}
      sizes={'100vw'}
      className="yarl__slide_image h-auto w-auto"
    />
  );
}

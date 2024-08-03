import React from 'react';
import TextLetRenderContent from './TextLetRenderContent';

const TextLetBlock = () => {
  const textLetRef = React.useRef<HTMLDivElement | null>(null);
  const downloadButtonRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <div
      className="w-full h-[200px] md-lg:w-1/2 md-lg:h-auto border border-black bg-white shadow-2xl rounded-xl divide-y-2 divide-gray/50 text-center hover:scale-[1.01] duration-300 order-first md-lg:order-none"
      ref={textLetRef}
    >
      <TextLetRenderContent textLetRef={textLetRef} downloadButtonRef={downloadButtonRef} />
    </div>
  );
};

export default TextLetBlock;

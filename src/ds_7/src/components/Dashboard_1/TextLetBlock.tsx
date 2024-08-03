import React from 'react';
import TextLetRenderContent from './TextLetRenderContent';

const TextLetBlock = () => {
  const textLetRef = React.useRef<HTMLDivElement | null>(null);
  const downloadButtonRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <div
      className="rounded-xl bg-white border border-black shadow-2xl hover:scale-[1.01] duration-300"
      ref={textLetRef}
    >
      <TextLetRenderContent textLetRef={textLetRef} downloadButtonRef={downloadButtonRef} />
    </div>
  );
};

export default TextLetBlock;

import html2canvas from 'html2canvas';

const exportToPng = async (ref: React.RefObject<HTMLDivElement>) => {
  const element = ref.current;
  const canvas = await html2canvas(element);

  const data = canvas.toDataURL('image/jpg');
  const link = document.createElement('a');

  if (typeof link.download === 'string') {
    link.href = data;
    link.download = 'image.jpg';

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    window.open(data);
  }
};

export const downloadPng = (
  downloadButtonRef: React.RefObject<HTMLDivElement>,
  exportedElementRef: React.RefObject<HTMLDivElement>
) => {
  if (downloadButtonRef.current) {
    downloadButtonRef.current.style.display = 'none';
  }

  exportToPng(exportedElementRef).finally(() => {
    if (downloadButtonRef.current) {
      downloadButtonRef.current.style.display = 'block';
    }
  });
};

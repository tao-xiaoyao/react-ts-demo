import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
// 6版本会报错，且此方法无法解决 需要使用5版本

// "Error: Setting up fake worker failed: "Cannot read properties of undefined (reading 'WorkerMessageHandler')".
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = {
  cMapUrl: 'cmaps/',
  cMapPacked: true,
};
const PdfView = ({ url, loadSuccess, loadError }: any) => {
  const [num, setNum] = useState(null);

  function onLoadSuccess({ num: nextNum }: any) {
    setNum(nextNum);
    loadSuccess?.();
  }

  return url ? (
    <Document
      className="pdf-document"
      file={url}
      onLoadSuccess={onLoadSuccess}
      onLoadError={loadError}
      options={options}
    >
      {Array.from(new Array(num), (el, index) => (
        <Page
          className="pdf-view"
          renderTextLayer={false}
          width={1200}
          key={`page_${index + 1}`}
          pageNumber={index + 1}
        />
      ))}
    </Document>
  ) : (
    <></>
  );
};

export default PdfView;

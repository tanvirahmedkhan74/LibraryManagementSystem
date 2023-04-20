// import React, { useState } from "react";
// import { Page, pdfjs } from "react-pdf";
// import "react-pdf/dist/esm/Page/AnnotationLayer.css";

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// export default function ViewPdf(props) {
//   const [numPages, setNumPages] = useState(null);
//   const [pageNumber, setPageNumber] = useState(1);

//   function onDocumentLoadSuccess({ numPages }) {
//     setNumPages(numPages);
//   }

//   return (
//     <div>
//       <Page
//         file={props.pdfUrl}
//         onLoadSuccess={onDocumentLoadSuccess}
//         onLoadError={(error) => console.error(error)}
//         pageNumber={pageNumber}
//       />
//       <div>
//         <p>
//           Page {pageNumber} of {numPages}
//         </p>
//         <button
//           disabled={pageNumber <= 1}
//           onClick={() => setPageNumber(pageNumber - 1)}
//         >
//           Previous Page
//         </button>
//         <button
//           disabled={pageNumber >= numPages}
//           onClick={() => setPageNumber(pageNumber + 1)}
//         >
//           Next Page
//         </button>
//       </div>
//     </div>
//   );
// }

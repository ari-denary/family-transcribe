import { ElementType } from "react";
import Html from "react-pdf-html";
import {
  Document,
  Page,
  PDFViewer,
  PDFDownloadLink,
} from "@react-pdf/renderer";

interface IUseReactPDF {
  MyPDFViewer: ElementType;
  MyPDFDownloadLink: ElementType;
}

/**
 * useReactPDF: hook for working with react-pdf
 *
 * @param {string} html - a html-like string, REQUIRED
 * @return {IUseReactPDF} - object containing PDFViewer and PDFDownloadLink components
 *
 */
export function useReactPDF(html: string): IUseReactPDF {
  // The document component created by react-pdf.
  // - <Html> takes in a {string} as a child.
  const MyDocument = () => (
    <Document>
      <Page>
        <Html>{html}</Html>
      </Page>
    </Document>
  );

  // The preview for the document component.
  // - <PDFViewer> takes the document component as a child.
  const MyPDFViewer = () => (
    <PDFViewer>
      <MyDocument />
    </PDFViewer>
  );

  // The download link for the document component.
  // - <PDFDownloadLink> takes in a "document" prop: the document component.
  // - <PDFDownloadLink> takes in a "fileName" prop: the name of the file.
  const MyPDFDownloadLink = () => (
    <PDFDownloadLink document={<MyDocument />} fileName="somename.pdf">
      {({ blob, url, loading, error }) =>
        loading ? "Loading document..." : "Download now!"
      }
    </PDFDownloadLink>
  );

  return {
    MyPDFViewer,
    MyPDFDownloadLink,
  };
}

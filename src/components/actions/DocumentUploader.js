import React, { Component } from "react";
import "react-pdf/dist/Page/AnnotationLayer.css";

import { pdfjs, Document, Page } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const options = {
  cMapUrl: "cmaps/",
  cMapPacked: true,
};
// for previewing the uploaded documents
export default class DocumentUploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numPages: null,
    };
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  render() {
    const { numPages } = this.state;

    // console.log(this.props)

    return (
      <div className="Example">
        <div className="Example__container__document">
          <Document
            file={this.props.file}
            onLoadSuccess={this.onDocumentLoadSuccess}
            options={options}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
      </div>
    );
  }
}

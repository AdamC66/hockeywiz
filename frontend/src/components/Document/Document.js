import React, { Component } from "react";
import { Document, Page } from "react-pdf/dist/entry.webpack";

import Button from '@material-ui/core/Button';

export default class MyDocument extends Component {
  state = { numPages: null, pageNumber: 1 };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  goToPrevPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
  goToNextPage = () =>
    this.setState(state => ({ pageNumber: state.pageNumber + 1 }));

  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div>
        <nav>
          <Button variant="contained" color="primary" onClick={this.goToPrevPage}>Prev</Button>
          &nbsp; &nbsp;
          <Button variant="contained" color="primary" onClick={this.goToNextPage}>Next</Button>
        </nav>

        <div style={{ width: 600 }}>
          <Document
            file="/2019-20_RuleBook.pdf"
            onLoadSuccess={this.onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} width={600} />
          </Document>
        </div>

        <p>
          Page {pageNumber} of {numPages}
        </p>
      </div>
    );
  }
}
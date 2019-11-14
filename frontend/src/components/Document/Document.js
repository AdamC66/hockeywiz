import React, { Component } from "react";
import { Document, Page } from "react-pdf/dist/entry.webpack";

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

export default class MyDocument extends Component {
  state = { numPages: null, pageNumber: 1 };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  goToPrevPage = () =>{
    if  (this.state.pageNumber !== 1){
        this.setState(state => ({ pageNumber: state.pageNumber - 1 }));
    }}
  goToNextPage = () =>{
    if (this.state.pageNumber !== this.state.numPages){
        this.setState(state => ({ pageNumber: state.pageNumber + 1 }));
    }}
  goToPage = () =>{
      let field = document.querySelector('#outlined-basic')
      let pageGo = parseInt(field.value, 10)
      if (pageGo > this.state.numPages){
        field.value=""
    }else{
        this.setState(state =>({pageNumber : pageGo}))
    }
    }
  render() {
    const { pageNumber, numPages } = this.state;

    return (
      <div>
        <nav>
          <Button variant="contained" color="primary" onClick={this.goToPrevPage}>Prev</Button>
          &nbsp; &nbsp;
          <Button variant="contained" color="primary" onClick={this.goToNextPage}>Next</Button>
        </nav>
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <TextField
          id="outlined-basic"
          label="Go To Page"
          style={{width:'8em'}}
        /> 
        &nbsp;
        <Button variant="contained" color="primary" onClick={this.goToPage}>Go</Button>


        <div style={{ width: 600 }}>
          <Document
            file="/2019-20_RuleBook.pdf"
            onLoadSuccess={this.onDocumentLoadSuccess}
          >
            <Page pageNumber={pageNumber} width={600} />
          </Document>
        </div>
      </div>
    );
  }
}
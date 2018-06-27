import React, { Component } from 'react';
import '../style.css';
import SearchService  from '../service/SearchService';
import { Button, Intent, FormGroup, Spinner } from "@blueprintjs/core";
export default class SearchController extends Component {
  constructor(props){
    super(props);
    this.state = {results:null};
  }
  componentDidMount(){
    this.searchBar.focus();
  }
  onSearch(text){
    this.searchText = text;
    if(text.length > 2){
      SearchService.search(text,(searchResult,error)=>{
        if(error != null){
          console.log("onSearch error");
          console.log(error );
        }else {
          if(searchResult.searchText == this.searchText){
            this.setState({results:searchResult});
          }
        }
      });
    }
  }
  render() {
    return (
      <div className="searchController">
          <div className="searchControllerTopBar">
              <img className="searchLogo"  src="logo.svg"   onClick={this.props.logOut}  alt="" />
              <input onChange={(event) => this.onSearch(event.target.value)} ref = { element => this.searchBar = element} type="text" className="searchBar" placeholder={this.props.placeholder ? this.props.placeholder : "Search"} autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
          </div>

          {(this.state.results != null) &&
            <div className="searchControllerResults">
            <div className="searchControllerCount">{this.state.results.numFound} books found</div>
                {this.state.results.documents.map(function(document, idx){
                    return (
                      <DocumentCell document = {document} />
                            )
                },this)}
            </div>
          }

      </div>
    );
  }
}

class DocumentCell extends React.Component {
  render(){
    return(
      <div className="documentCell">
          <div className="title">{this.props.document.title}</div>
          <div className="details">{this.props.document.author_name}</div>
      </div>
    );
  }
}

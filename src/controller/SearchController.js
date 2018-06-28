import React, { Component } from 'react';
import '../style.css';
import SearchService  from '../service/SearchService';
import { Button, Intent, Spinner } from "@blueprintjs/core";
export default class SearchController extends Component {
  constructor(props){
    super(props);
    this.state = {results:null,searchText:null,error:null,loading:false};
  }
  componentDidMount(){
    this.searchBar.focus();
  }
  onTapSearchButton(){
    let text = this.state.searchText;
    if(text.length > 2){
      this.setState({loading:true});
      SearchService.search(text,(searchResult,error)=>{
        this.setState({loading:false});
        if(error != null){
          console.log(error );
          this.setState({error:error});
        }else {
          if(searchResult.searchText == this.state.searchText){
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
              <input value={this.state.searchText}
              onChange={(event) => {
                let searchText = event.target.value;
                this.setState({searchText:searchText,error:null})
                }
              }
              ref = { element => this.searchBar = element}
              type="text" className="searchBar" placeholder={this.props.placeholder ? this.props.placeholder : "Search"} autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"/>
                  <Button  loading={this.state.loading} className="pt-large" onClick={() => this.onTapSearchButton()} iconName="search"  loading={this.state.loading} text="Search"/>
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

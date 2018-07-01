
import React, { Component } from 'react';
import '../style.css';
import SearchService  from '../service/SearchService';
import { Button, Intent, Spinner, Dialog, Popover } from "@blueprintjs/core";


export default class SearchController extends Component {
  constructor(props){
    super(props);
    this.state = {results:null,searchText:null,error:null,loading:false,showPopOver:false};
  }
  componentDidMount(){
    this.searchBar.focus();
  }
  onTapSearchButton(){
    let text = this.state.searchText;
    if(text != null && text.length > 2){
      this.setState({loading:true});
      SearchService.search(text,(searchResult,error)=>{
        this.setState({loading:false});
        if(error != null){
          this.setState({error:error});
        }else {
          if(searchResult.searchText == this.state.searchText){
            this.setState({results:searchResult});
          }
        }
      });
    }else {
      this.setState({showPopOver:true});
    }
  }
  render() {
    return (
      <div className="searchController">
          <SearchErrorDialog isOpen={this.state.error != null} onClose={() => this.setState({error:null})} />
          <div className="searchControllerTopBar">
              <img className="searchLogo"  src="logo.svg"   onClick={this.props.logOut}  alt="" />

              <SearchPopOver isOpen={this.state.showPopOver} canOutsideClickClose={true} onClose={() => this.setState({showPopOver:false})}>
                  <input value={this.state.searchText}
                  onKeyPress={(event) => {
                      if(event.key == 'Enter'){
                        this.onTapSearchButton();
                      }
                    }
                  }
                  onChange={(event) => {
                      let searchText = event.target.value;
                      this.setState({searchText:searchText,error:null})
                    }
                  }
                  ref = { element => this.searchBar = element}
                  type="text" className="searchBar" placeholder={this.props.placeholder ? this.props.placeholder : "Search"} autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"
                  />
              </SearchPopOver>
                  <Button  loading={this.state.loading} className="pt-large" onClick={() => this.onTapSearchButton()} iconName="search"  loading={this.state.loading} text="Search"/>
            </div>

          {(!this.state.loading && this.state.results != null) &&
            <div className="searchControllerResults">
                <div className="searchHeader">{this.state.results.numFound} books found</div>
                {this.state.results.documents.map(function(document, idx){
                    return (
                      <SearchCell document = {document} />
                            )
                },this)}
            </div>
          }
          {this.state.loading && <div className="searchControllerLoadingWrapper" ><Spinner/></div>}

      </div>
    );
  }
}
class SearchErrorDialog extends React.Component {
  render(){
    return(
      <Dialog isCloseButtonShown={false} title="Error" icon="error" isOpen={this.props.isOpen} onClose={this.props.onClose} canOutsideClickCancel={true}>
          <div className="pt-dialog-body">An error has occured please try again</div>
          <div className="pt-dialog-footer">
            <div className="pt-dialog-footer-actions">
              <Button text="Ok" intent={Intent.PRIMARY} onClick={this.props.onClose} />
            </div>
          </div>
      </Dialog>
    );
  }
}
class SearchPopOver extends React.Component {
  render(){
    return(
      <Popover isOpen={this.props.isOpen} canOutsideClickClose={true} onClose={this.props.onClose}>
          {this.props.children}
          <div>TEST</div>
      </Popover>
    )
  }
}

class SearchCell extends React.Component {
  render(){
    return(
      <div className="documentCell">
          <div className="title">{this.props.document.title}</div>
          <div className="details">{this.props.document.author_name}</div>
      </div>
    );
  }
}

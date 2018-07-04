
import React, { Component } from 'react';
import '../style.css';
import SearchService  from '../service/SearchService';
import { Button, Intent, Spinner, Dialog, Popover, Position } from "@blueprintjs/core";
import { Pagination } from 'react-bootstrap';

export default class SearchController extends Component {
  constructor(props){
    super(props);
    this.state = {results:null,searchText:null,error:null,loading:false,showPopOver:false,page:1};
  }
  componentDidMount(){
    this.searchBar.focus();
  }
  onSelectPage(page){
    this.setState({page:page});
    if(page*10 > this.state.results.start + 100){
      this.search(this.state.searchText,Math.ceil(page/10),false);
    }
    else if(page*10 <= this.state.results.start ){
      this.search(this.state.searchText,Math.ceil(page/10),false);
    }
  }
  onTapSearchButton(){
    let text = this.state.searchText;
    if(text != null && text.length > 2){
      this.setState({page:1});
      this.search(text,1,true);
    }else {
      this.setState({showPopOver:true});
      this.searchBar.focus();
    }
  }
  search(text,page,timeout){
    this.setState({loading:true});
    SearchService.search(text,page,timeout,(searchResult,error)=>{
      this.setState({loading:false});
      if(error != null){
        this.setState({error:error});
      }else {
        if(searchResult.searchText == this.state.searchText){
          this.setState({results:searchResult});
        }
      }
    });
  }
  render() {
    return (
      <div className="searchController">
          <SearchErrorDialog isOpen={this.state.error != null} onClose={() => this.setState({error:null})} />
          <div className="searchControllerTopBar">
              <img className="searchLogo"  src="logo.svg"   onClick={this.props.logOut}  alt="" />

              <SearchPopOver isOpen={this.state.showPopOver} canOutsideClickClose={true} onClose={() => this.setState({showPopOver:false})}>
                  <input value={this.state.searchText}
                  disabled ={this.state.loading}
                  onKeyPress={(event) => {
                      if(event.key == 'Enter'){
                        this.onTapSearchButton();
                      }
                    }
                  }
                  onChange={(event) => {
                      let searchText = event.target.value;
                      this.setState({searchText:searchText })
                      if(searchText.length > 2){
                        this.setState({ showPopOver:false})
                      }
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
                <SearchDocumentList results={this.state.results} page={this.state.page} />
                <SearchPagination start={Math.max(this.state.page - 5,1)} max={Math.floor(this.state.results.numFound/10)} active={this.state.page} onSelect={(page) => this.onSelectPage(page)}/>
            </div>
          }
          {this.state.loading && <div className="searchControllerLoadingWrapper" ><Spinner className="pt-small"/></div>}

      </div>
    );
  }
}
class SearchDocumentList extends React.Component {
  render(){
    let documents = this.props.results.documents.slice(this.props.page*10-10-this.props.results.start,this.props.page*10-this.props.results.start)
    return(
      <div>
      {documents.map(function(document, idx){
          return (
            <SearchCell document = {document} />
                  )
      },this)}
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
      <Popover popoverClassName="searchPopOver" modifiers ={{"modifiers":{offset:"100px"}}} autoFocus={false} position={Position.BOTTOM_LEFT} isOpen={this.props.isOpen} canOutsideClickClose={true} onClose={this.props.onClose}>
          {this.props.children}
          <div className="popOver" >
            <div className="title">Search text too short</div>
            <div className="details">Your search text must be at least 3 characters long</div>
          </div>
      </Popover>
    )
  }
}
class SearchPagination extends React.Component {
  render(){
    let active = this.props.active;
    let items = [];
    let start = this.props.start;
    let end = Math.min(this.props.start + 9, this.props.max);
    for (let page = start; page <= end; page++) {
        items.push(
            <Pagination.Item active={page === active} onClick={()=>this.props.onSelect(page)}>{page}</Pagination.Item>
        );
    }
    return(
      <Pagination bsSize="small">{items}</Pagination>
    );
  }
}
class SearchCell extends React.Component {
  openUrl(){
    var win = window.open(this.props.document.targetUrl(), '_blank');
    win.focus();
  }
  render(){
    return(
      <div className="searchCell">
          {this.props.document.imageUrl()
            && <div onClick={()=> this.openUrl()} className="searchCellImage"><img src={this.props.document.imageUrl()}/></div>
          }
          <div className="searchCellText">
              <div onClick={()=> this.openUrl()} className="title">{this.props.document.title}</div>
              {this.props.document.author_name && <div className="details">Author: {this.props.document.author_name}</div>}
          </div>
      </div>
    );
  }
}
